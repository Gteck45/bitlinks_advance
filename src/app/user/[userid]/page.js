import { redirect } from "next/navigation"
import clientPromise from "../../../../lib/mongodb"
import Link from "next/link";
export default async function Page({params}) {
    const Userid=(await params).userid
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("users");
    const User=await collection.findOne({ username: Userid });
    if(User){
        
        return  <>
            <div className="absolute top-0 z-[-2] h-screen min-w-screen max-w-[200vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#D5C6FF_1px)] bg-[size:20px_20px]"></div>
            <section className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
                <main>
                    <div className="container mx-auto max-w-7xl">
                        <div className='flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8'>
                            {/* Profile Card */}
                            <div className='bg-[#26235c] fade-in w-full max-w-[538px] lg:w-[538px] h-auto min-h-[717px] lg:h-[717px] mx-auto rounded-[30px] sm:rounded-[50px] mt-4 sm:mt-10 relative px-4 py-6 sm:px-6 sm:py-8'>
                                <div className="absolute bottom-0 right-0 w-full h-[9%] border-r-4 sm:border-r-8 border-l-4 sm:border-l-8 border-t-[15px] sm:border-t-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-[#F7DF1E] rounded-t-4xl rotate-180 z-10"></div>
                                
                                {/* Profile Image Section */}
                                <div className='image w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full mx-auto relative py-2'>
                                    <div className="relative w-[170px] sm:w-[220px] h-[170px] sm:h-[220px] mx-auto">
                                        {/* Profile Image */}
                                        {User?.profilepic && (
                                            <img
                                                className="w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full object-cover absolute top-[10px] p-2 sm:p-3 left-[10px] z-10"
                                                src={User.profilepic}
                                                alt="profile"
                                            />
                                        )}

                                        {/* Rotated Yellow Arc */}
                                        <svg
                                            className="absolute top-0 left-0 w-full h-full z-0"
                                            viewBox="0 0 220 220"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10,110a100,100 0 1,1 200,0"
                                                className='shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
                                                stroke="#F7DF1E"
                                                strokeWidth="9"
                                                fill="none"
                                                transform="rotate(90 110 110)" 
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* User Details */}
                                <div className='Details w-full max-w-[480px] mx-auto px-2 sm:px-4'>
                                    <h1 className='text-[#F9F871] text-2xl sm:text-3xl text-center mt-4 sm:mt-5 break-words'>
                                        {User?.username || 'User'}
                                    </h1>
                                    <p className='mx-auto text-[#A79AE0] text-center text-base sm:text-lg mt-2 break-words'>
                                        {User?.Title || ''}
                                    </p>
                                    <p className='mx-auto text-white text-center text-base sm:text-lg font-serif mt-2 break-words px-2'>
                                        {User?.Bio || ''}
                                    </p>
                                </div>

                                {/* Email */}
                                <div className="email relative bg-[#9082EC] w-fit max-w-[90%] p-2 px-4 sm:px-6 rounded-2xl mt-4 sm:mt-6 text-center mx-auto text-white font-bold text-lg sm:text-2xl break-all">
                                    {User?.email || 'No email'}
                                </div>

                                {/* Social Links */}
                                <div className="quickLinks mt-8 sm:mt-16 lg:mt-24 w-full max-w-[408px] mx-auto px-4">
                                    <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                                        <Link href={User?.socialLinks?.x_com || "https://x.com"} target="_blank" className="hover:scale-110 transition-transform">
                                            <img src="/Twitter_Icon.png" className="w-[40px] sm:w-[48px] object-contain h-[30px] sm:h-[35px]" alt="Twitter_icon" />
                                        </Link>

                                        <Link href={User?.socialLinks?.instagram || "https://instagram.com"} target="_blank" className="hover:scale-110 transition-transform">
                                            <img src="/Instagram_Icon.png" className="w-[40px] sm:w-[48px] object-contain h-[30px] sm:h-[35px]" alt="Instagram_icon" />
                                        </Link>

                                        <Link href={User?.socialLinks?.dribbble || "https://dribbble.com"} target="_blank" className="hover:scale-110 transition-transform">
                                            <img src="/Dribbble_Icon.png" className="w-[40px] sm:w-[48px] object-contain h-[30px] sm:h-[35px]" alt="Dribbble_icon" />
                                        </Link>

                                        <Link href={User?.socialLinks?.linkedin || "https://linkedin.com"} target="_blank" className="hover:scale-110 transition-transform">
                                            <img src="/LinkedIn_Icon.png" className="w-[40px] sm:w-[48px] object-contain h-[30px] sm:h-[35px]" alt="Linkedin_icon" />
                                        </Link>

                                        <Link href={User?.socialLinks?.github || "https://github.com"} target="_blank" className="hover:scale-110 transition-transform">
                                            <img src="/GitHub_Icon.png" className="w-[40px] sm:w-[48px] object-contain h-[30px] sm:h-[35px]" alt="GitHub_icon" />
                                        </Link>

                                        <Link href={User?.socialLinks?.devto || "https://dev.to"} target="_blank" className="hover:scale-110 transition-transform">
                                            <img src="/DEV.to_Icon.png" className="w-[40px] sm:w-[48px] object-contain h-[30px] sm:h-[35px]" alt="Dev.to_icon" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Edit Button - Full width on mobile, side panel on desktop */}
                                        
                        </div>
                    </div>
                </main>
            </section>
        </>
     
       
    }else{
        // redirect('/')
        
    }
    return <div>user with userid :{Userid} not found</div>
}