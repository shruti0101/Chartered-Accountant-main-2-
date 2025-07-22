const BlogTable = ({ title, date, mongoId ,deleteBlog }) => {
  const BlogDate = new Date(date);

  return (
    <tr className="bg-white border-t hover:bg-blue-50 transition">
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
        {title || "No title"}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
        {BlogDate.toDateString()}
      </td> 

      <td onClick={()=> deleteBlog(mongoId)} className="px-3 py-4 whitespace-nowrap text-red-600 hover:text-red-800 font-semibold cursor-pointer">

        Delete
      </td>
    </tr>
  );
};
export default BlogTable;
