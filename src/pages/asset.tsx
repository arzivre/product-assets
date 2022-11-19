import type { Asset } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const AssetPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [imgsSrc, setImgsSrc] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [selectItem, setSelectItem] = useState<Asset>();

  const utils = trpc.useContext();
  const assets = trpc.asset.getAll.useQuery(undefined, {
    keepPreviousData: true,
  });
  const deleteAsset = trpc.asset.delete.useMutation({
    onSettled() {
      utils.asset.getAll.invalidate();
    },
  });

  const create = trpc.asset.create.useMutation({
    onSettled() {
      utils.asset.getAll.invalidate();
    },
  });

  function onChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    for (const file of e?.target?.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc(reader.result as string);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  }

  function handleUpdate(data: Asset) {
    setSelectItem(data);
    setShowFormUpdate(true);
  }

  function handleDelete(id: string) {
    setLoading(true);
    deleteAsset.mutate({ id });
    setLoading(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = {
      name,
      files: imgsSrc,
    };
    create.mutate(data);
    reset();
  }

  function reset() {
    setName("");
    setImgsSrc("");
    setLoading(false);
    setShowForm(false);
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-8">
      <Head>
        <title>Muhammad Sony Fauzi - Asset</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mr-4 flex justify-between">
            <h2 className="text-2xl font-bold uppercase ">Create Asset</h2>
            <button
              onClick={() => setShowForm(false)}
              className="rounded bg-rose-300 px-4 py-2 text-rose-900 hover:bg-rose-400"
              disabled={loading}
            >
              Cancel Create
            </button>
          </div>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="file"
            multiple
            placeholder="Image"
            onChange={onChangeFile}
          />
          <section className="flex flex-row justify-between">
            {imgsSrc && (
              <picture>
                <img
                  src={imgsSrc}
                  alt="preview image"
                  className="h-[100px] w-[100px]"
                />
              </picture>
            )}
          </section>
          <button
            type="submit"
            className="rounded bg-green-300 px-4 py-2 text-green-900 hover:bg-green-400"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      )}
      {!showForm && !showFormUpdate && (
        <div className="mr-4 flex justify-between pb-4">
          <h2 className="text-2xl font-bold uppercase ">Asset </h2>
          <button
            onClick={() => setShowForm(true)}
            className="rounded bg-green-300 px-4 py-2 text-green-900 hover:bg-green-400"
            disabled={loading}
          >
            {assets.isLoading ? "Loading..." : "Create"}
          </button>
        </div>
      )}
      {!showForm && !showFormUpdate && (
        <section>
          <table className="w-full">
            <thead className="border">
              <tr>
                <th className="border">No</th>
                <th className="border">Name</th>
                <th className="border">Product Asset Id</th>
                <th className="border">size</th>
                <th className="border">path</th>
                <th className="border">Image</th>
                <th className="border">Action</th>
              </tr>
            </thead>
            <tbody>
              {assets.data?.map((asset, index) => (
                <tr key={asset.id}>
                  <td className="border">{index + 1}</td>
                  <td className="border">{asset.name}</td>
                  <td className="border">{asset.productAssetId}</td>
                  <td className="border">{asset.size}</td>
                  <td className="border">
                    <a
                      href={asset.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Link
                    </a>
                  </td>
                  <td className="border">
                    <picture>
                      <img
                        src={asset.path}
                        alt={asset.name}
                        className="h-[100px] w-[100px]"
                      />
                    </picture>
                  </td>
                  <td className="border">
                    <div className="flex gap-4 px-2">
                      <button
                        className="rounded bg-blue-400 px-4 py-2 
                      text-blue-900 hover:bg-blue-400"
                        onClick={() => handleUpdate(asset)}
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Edit"}
                      </button>
                      <button
                        className="rounded bg-red-400 px-4 py-2 
                      text-red-900 hover:bg-red-400"
                        onClick={() => handleDelete(asset.id)}
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      {showFormUpdate && (
        <Update data={selectItem as Asset} setShow={setShowFormUpdate} />
      )}
    </main>
  );
};

interface UpdateProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  data: Asset;
}
const Update = ({ setShow, data }: UpdateProps) => {
  const [name, setName] = useState(data.name);
  const [imgsSrc, setImgsSrc] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const utils = trpc.useContext();
  const update = trpc.asset.update.useMutation({
    onSettled() {
      utils.asset.getAll.invalidate();
    },
  });

  function onChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    for (const file of e?.target?.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc(reader.result as string);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const input = {
      id: data.id,
      files: imgsSrc,
      oldFiles: data.name, //* Image public_id
    };
    update.mutate(input);
    reset();
  }

  function reset() {
    setName("");
    setImgsSrc("");
    setLoading(false);
    setShow(false);
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="mr-4 flex justify-between">
          <h2 className="text-2xl font-bold uppercase ">
            Update Product Asset
          </h2>
          <button
            onClick={() => setShow(false)}
            className="rounded bg-rose-300 px-4 py-2 text-rose-900 hover:bg-rose-400"
            disabled={loading}
          >
            Cancel Update
          </button>
        </div>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={true}
        />
        <input
          type="file"
          multiple
          placeholder="Image"
          onChange={onChangeFile}
        />
        <section className="flex flex-col">
          <h3>Old Image</h3>
          <div className="flex flex-row  justify-between">
            <picture>
              <img
                src={data.path}
                alt="preview image"
                className="h-[100px] w-[100px]"
              />
            </picture>
          </div>
          <h3>New Image</h3>
          <div className="flex flex-row  justify-between">
            {imgsSrc && (
              <picture>
                <img
                  src={imgsSrc}
                  alt="preview image"
                  className="h-[100px] w-[100px]"
                />
              </picture>
            )}
          </div>
        </section>
        <button
          type="submit"
          className="rounded bg-green-300 px-4 py-2 text-green-900 hover:bg-green-400"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default AssetPage;
