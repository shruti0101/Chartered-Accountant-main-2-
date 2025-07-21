// "use client";

// import axios from "axios"
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import Header from "@/components/Header/header";

// export default function Home() {
//   const router = useRouter();

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get("/api/users/logout");
//       router.push("/login");
//       toast.success(res.data.message);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   return (
    
//         <button onClick={logoutHandler} className="bg-zinc-800 px-2 py-1 text-end rounded-md text-white">Logout</button>
      

  
//   )
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page