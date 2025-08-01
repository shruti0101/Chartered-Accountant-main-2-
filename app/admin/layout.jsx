import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import { Data } from "@/Data/Data";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <ToastContainer theme="colored" />
      <Sidebar />

      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">

          {/* Left: Admin Panel Text */}
          <div  className="text-blue-800 text-xl font-bold">
            Admin Panel
          </div>

          {/* Right: Profile Image */}
<Image
  src={Data.profile}
  alt="Profile"
  width={40}
  height={40}
  style={{ width: "40px", height: "40px" }} // Force both dimensions
  className="bg-gray-200 rounded-full object-cover"
/>



        </div>

        {/* Main page content */}
        {children}
      </div>
    </div>
  );
}
