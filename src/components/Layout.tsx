import Link from "next/link";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <nav className="mx-auto mb-4 max-w-screen-2xl bg-white">
        <header className="border-y-[0.5px] border-gray-300 text-center text-xl uppercase">
          <p>Navbar</p>
        </header>
        <ol className="flex flex-row uppercase text-black">
          <li className="basis-1/4  border-l-[0.5px] border-b-[0.5px] border-gray-300 py-5 pr-3 pl-4">
            <Link href="/">product asset</Link>
          </li>
          <li className="flex basis-1/4 items-center justify-center border-l-[0.5px] border-b-[0.5px] border-gray-300  py-5 px-3">
            <Link href="/asset">asset</Link>
          </li>
          <li className="flex basis-1/4 items-center justify-center border-l-[0.5px] border-b-[0.5px] border-gray-300  py-5 px-3">
            <Link href="/product">product</Link>
          </li>
          <li className="flex basis-1/4 justify-between border-x-[0.5px] border-b-[0.5px] border-gray-300 py-5 pl-3 pr-4">
            <Link href="/category">category</Link>
          </li>
        </ol>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
