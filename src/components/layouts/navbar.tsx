import React from "react";

export default function Navbar(props: any) {
  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-black via-blue-900 to-black text-white p-4 z-10 flex justify-between items-center">
      <div className="text-2xl font-bold">CRUD COM MOCKS</div>
      <div className="flex space-x-4">
        <a href="/" className="py-2 px-4 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-md transition duration-300 hover:text-black">
          Home
        </a>
        <a href="/cultivar" className="py-2 px-4 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-md transition duration-300 hover:text-black">
          Cultivar
        </a>
        <a href="/embalagens" className="py-2 px-4 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-md transition duration-300 hover:text-black">
          Embalagens
        </a>
      </div>
    </nav>
  );
}
