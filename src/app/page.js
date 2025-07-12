import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";


const Poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900"
});


export default function Home() {
  return (
    <main className="bg-purple-100">
      <section className="grid grid-cols-1 h-screen">
        <div className=" flex flex-col gap-4 items-center justify-center ">
          <p className={`text-3xl font-bold ${Poppins.className}`}>The best URL shortener </p>
          <p className="text-center">We are the most populor URL Shortener in the world </p>
          <div  className='flex text-white gap-3 justify-start'>
            <Link href="/shorten" className='bg-purple-500 rounded-lg font-bold p-3 py-1'>  <button>Try Now</button>  </Link>
            <Link href="/login" className='bg-purple-500 rounded-lg font-bold p-3 py-1'>  <button>Login/SignUp</button>  </Link>
          </div>
        </div>
        <div className=" flex justify-start relative">
          <Image alt="an Image" src={'/vector.jpg'} fill={true} className="mix-blend-darken object-contain" />
        </div>
      </section>

    </main>
  );
}
