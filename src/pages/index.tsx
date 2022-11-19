import type { Asset, Product, ProductAsset } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

interface NewProductAsset {
  data: ProductAsset & {
    asset_id: Asset[];
    product_id: Product;
  };
}

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("1");
  const [description, setDescription] = useState("");
  const [imgsSrc, setImgsSrc] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectItem, setSelectItem] = useState<
    ProductAsset & {
      asset_id: Asset[];
      product_id: Product;
    }
  >();

  const utils = trpc.useContext();
  const productAsset = trpc.productAsset.getAll.useQuery(undefined, {
    keepPreviousData: true,
  });
  const deleteItem = trpc.productAsset.delete.useMutation({
    onSettled() {
      utils.productAsset.getAll.invalidate();
    },
  });
  const create = trpc.productAsset.create.useMutation({
    onSettled() {
      utils.productAsset.getAll.invalidate();
      setLoading(false);
    },
  });

  function onChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    for (const file of e?.target?.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc((imgs) => [...imgs, reader.result as string]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  }

  function handleUpdate(
    data: ProductAsset & {
      asset_id: Asset[];
      product_id: Product;
    }
  ) {
    setSelectItem(data);
    setShowFormUpdate(true);
  }

  function handleDelete(id: string) {
    setLoading(true);
    deleteItem.mutate({ id });
    setLoading(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = {
      name,
      price: Number(price),
      description,
      files: imgsSrc,
    };
    create.mutate(data);
    reset();
  }

  function reset() {
    setName("");
    setPrice("");
    setDescription("");
    setImgsSrc([]);
    setLoading(false);
    setShowForm(false);
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-8">
      <Head>
        <title>Muhammad Sony Fauzi - Product Asset</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mr-4 flex justify-between">
            <h2 className="text-2xl font-bold uppercase ">
              Create Product Asset
            </h2>
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
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            cols={3}
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            multiple
            placeholder="Image"
            onChange={onChangeFile}
          />
          <section className="flex flex-row justify-between">
            {imgsSrc &&
              imgsSrc.map((link) => (
                <picture key={link}>
                  <img
                    src={link}
                    alt="preview image"
                    className="h-[100px] w-[100px]"
                  />
                </picture>
              ))}
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
          <h2 className="text-2xl font-bold uppercase ">Product Asset</h2>
          <button
            onClick={() => setShowForm(true)}
            className="rounded bg-green-300 px-4 py-2 text-green-900 hover:bg-green-400"
            disabled={loading}
          >
            Create
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
                <th className="border">Price</th>
                <th className="border">Description</th>
                <th className="border">Image</th>
                <th className="border">Action</th>
              </tr>
            </thead>
            <tbody>
              {productAsset.data?.map((product, index) => (
                <tr key={product.id}>
                  <td className="border">{index + 1}</td>
                  <td className="border">{product.product_id.product_name}</td>
                  <td className="border">{product.product_id.price}</td>
                  <td className="border">{product.product_id.description}</td>
                  <td className="flex border">
                    {product.asset_id.map((asset) => (
                      <div key={asset.id} className="flex-grow">
                        <picture>
                          <img
                            src={asset.path}
                            alt={asset.name}
                            className="h-[150px] w-[200px]"
                          />
                        </picture>
                      </div>
                    ))}
                  </td>
                  <td className="border">
                    <div className="flex justify-end gap-4 px-2">
                      <button
                        className="rounded bg-blue-400 px-4 py-2 
                      text-blue-900 hover:bg-blue-400"
                        onClick={() => handleUpdate(product)}
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Edit"}
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded bg-red-400 px-4 py-2 
                      text-red-900 hover:bg-red-400"
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
        <Update
          data={
            selectItem as ProductAsset & {
              asset_id: Asset[];
              product_id: Product;
            }
          }
          setShow={setShowFormUpdate}
        />
      )}
    </main>
  );
};

interface UpdateProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  data: ProductAsset & {
    asset_id: Asset[];
    product_id: Product;
  };
}
const Update = ({ setShow, data }: UpdateProps) => {
  const [name, setName] = useState(data.product_id.product_name);
  const [price, setPrice] = useState(data.product_id.price.toString());
  const [description, setDescription] = useState(data.product_id.description);
  const [imgsSrc, setImgsSrc] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const utils = trpc.useContext();
  const update = trpc.productAsset.update.useMutation({
    onSettled() {
      utils.productAsset.invalidate();
    },
  });

  function onChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    for (const file of e?.target?.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc((imgs) => [...imgs, reader.result as string]);
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
      name: name as string,
      price: Number(price),
      description: description as string,
      files: imgsSrc as string[],
    };
    update.mutate(input);
    reset();
  }

  function reset() {
    setName("");
    setPrice("");
    setDescription("");
    setImgsSrc([]);
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
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          cols={3}
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            {data.asset_id.map((url) => (
              <picture key={url.id}>
                <img
                  src={url.path}
                  alt="preview image"
                  className="h-[100px] w-[100px]"
                />
              </picture>
            ))}
          </div>
          <h3>New Image</h3>
          <div className="flex flex-row  justify-between">
            {imgsSrc &&
              imgsSrc.map((link) => (
                <picture key={link}>
                  <img
                    src={link}
                    alt="preview image"
                    className="h-[100px] w-[100px]"
                  />
                </picture>
              ))}
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

export default Home;
