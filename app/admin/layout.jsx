import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import { Data } from "@/Data/Data"; 
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <div className="flex">
      <ToastContainer theme="colored" />
      <Sidebar />

      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
          <h3 className="font-bold text-xl text-blue-800">Admin Panel </h3>
          <Image
            src={Data.profile}
            alt="Profile"
            width={40}
            height={40}
            className="bg-gray-200 rounded-full"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
