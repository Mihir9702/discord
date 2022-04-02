import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="grid grid-cols-10 h-screen w-full">
      <div className="bg-gray-200 text-center text-2xl">
        <h2>Servers</h2>
      </div>
      <div className="bg-gray-300 col-span-2 text-center text-2xl">
        <h2>Channels</h2>
      </div>
      <div className="bg-gray-400 col-span-5 text-center text-2xl">
        <h2>Messages</h2>
      </div>
      <div className="bg-gray-500 col-span-2 text-center text-2xl">
        <h2>Users</h2>
      </div>
    </div>
  );
};

export default Home;
