import { type NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const ProductPage = () => {
  const [loading, setLoading] = useState();
  const products = trpc.product.getAll.useQuery(undefined, {
    keepPreviousData: true,
  });

  return (
    <main className="mx-auto max-w-screen-2xl px-8">
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
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Edit"}
                    </button>
                    <button
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
    </main>
  );
};

export default ProductPage;
