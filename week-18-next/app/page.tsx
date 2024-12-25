import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col  text-lg w-screen h-screen justify-center items-center">
      To do appilication
      <div className="flex gap-4 mt-4 ">
      <Link  className="bg-green-400 p-3 rounded-full   " href='/signin' >Sign In to Todo App</Link>
      <Link className="bg-green-400 p-3 rounded-full   " href='/signup' >Sign Up to Todo App</Link>
      </div>
    </div>
  );
}
