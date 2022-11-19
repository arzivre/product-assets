import type { Product } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { ChangeEvent } from "react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const ProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("1");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [selectItem, setSelectItem] = useState<Product>();

  const [loading, setLoading] = useState(false);

  const utils = trpc.useContext();
  const products = trpc.product.getAll.useQuery(undefined, {
    keepPreviousData: true,
  });

  const deleteItem = trpc.product.delete.useMutation({
    onSettled() {
      utils.product.invalidate();
    },
  });
  const create = trpc.product.create.useMutation({
    onSettled() {
      utils.product.invalidate();
    },
  });

  function handleUpdate(data: Product) {
    setSelectItem(data);
    setShowFormUpdate(true);
  }

  function handleDelete(id: string) {
    setLoading(true);
    deleteItem.mutate({ id });
    setLoading(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = {
      name,
      price: Number(price),
      description,
    };
    create.mutate(data);
    reset();
  }

  function reset() {
    setName("");
    setPrice("");
    setDescription("");
    setShowForm(false);
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-8">
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
                <th className="border">slug</th>
                <th className="border">price</th>
                <th className="border">description</th>
                <th className="border">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.data?.map((product, index) => (
                <tr key={product.id}>
                  <td className="border">{index + 1}</td>
                  <td className="border">{product.product_name}</td>
                  <td className="border">{product.product_slug}</td>
                  <td className="border">{product.price}</td>
                  <td className="border">{product.description}</td>
                  <td className="border">
                    <div className="flex gap-4 px-2">
                      <button
                        className="rounded bg-blue-400 px-4 py-2 
                      text-blue-900 hover:bg-blue-400"
                        onClick={() => handleUpdate(product)}
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Edit"}
                      </button>
                      <button
                        className="rounded bg-red-400 px-4 py-2 
                      text-red-900 hover:bg-red-400"
                        onClick={() => handleDelete(product.id)}
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
        <Update data={selectItem as Product} setShow={setShowFormUpdate} />
      )}
    </main>
  );
};
interface UpdateProps {
  data: Product;
  setShow: Dispatch<SetStateAction<boolean>>;
}
const Update = ({ data, setShow }: UpdateProps) => {
  const [name, setName] = useState(data.product_name);
  const [price, setPrice] = useState(data.price.toString());
  const [description, setDescription] = useState(data.description);
  const [loading, setLoading] = useState(false);

  const utils = trpc.useContext();
  const update = trpc.product.update.useMutation({
    onSettled() {
      utils.product.invalidate();
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const input = {
      id: data.id,
      name,
      price: Number(price),
      description,
    };
    update.mutate(input);
    reset();
  }

  function reset() {
    setName("");
    setPrice("");
    setDescription("");
    setLoading(false);
    setShow(false);
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="mr-4 flex justify-between">
          <h2 className="text-2xl font-bold uppercase ">
            Create Product Asset
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

export default ProductPage;
