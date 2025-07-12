"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setSetshowdropdown] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <nav className='min-h-16 bg-purple-700 flex justify-between px-3 items-center text-white sticky top-0 z-50 relative'>
            <div className="logo font-bold text-2xl md:text-3xl">
                <Link href={'/'}>LiShort</Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button 
                    className="flex flex-col justify-center items-center w-8 h-8 space-y-1"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Desktop menu */}
            <ul className='hidden md:flex justify-center items-center gap-4'>
                <Link href='/'><li className="hover:text-purple-200 transition-colors">Home</li></Link>
                <Link href='/about'><li className="hover:text-purple-200 transition-colors">About</li></Link>
                <Link href='/shorten'><li className="hover:text-purple-200 transition-colors">Shorten</li></Link>
                <Link href='/contact-us'><li className="hover:text-purple-200 transition-colors">Contact Us</li></Link>
                
                <div className='relative'>
                    {session ? (
                        <>
                            <button 
                                id="dropdownDefaultButton" 
                                onClick={() => setSetshowdropdown(!showdropdown)} 
                                onBlur={() => { setTimeout(() => { setSetshowdropdown(false) }, 150) }} 
                                className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-colors" 
                                type="button"
                            >
                                Welcome {session.user.name}
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            <div className={`z-10 ${showdropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 absolute left-6 top-full mt-1`}>
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <Link href={'/dashboard'} className="block px-4 py-2 hover:bg-gray-100 transition-colors">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link href={'/your-links'} className="block px-4 py-2 hover:bg-gray-100 transition-colors">Your Links</Link>
                                    </li>
                                    <li onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors">
                                        Sign out
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <li className='flex gap-3'>
                            <Link href="/shorten" className='bg-purple-500 hover:bg-purple-600 rounded-lg font-bold px-3 py-1 transition-colors'>
                                <button>Try Now</button>
                            </Link>
                            <Link href="/login" className='bg-purple-500 hover:bg-purple-600 rounded-lg font-bold px-3 py-1 transition-colors'>
                                <button>Login</button>
                            </Link>
                        </li>
                    )}
                </div>
            </ul>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-purple-700 border-t border-purple-600 shadow-lg z-40">
                <ul className='flex flex-col py-4 px-3 space-y-2'>
                    <Link href='/' onClick={() => setIsMobileMenuOpen(false)}>
                        <li className="py-2 px-3 hover:bg-purple-600 rounded transition-colors">Home</li>
                    </Link>
                    <Link href='/about' onClick={() => setIsMobileMenuOpen(false)}>
                        <li className="py-2 px-3 hover:bg-purple-600 rounded transition-colors">About</li>
                    </Link>
                    <Link href='/shorten' onClick={() => setIsMobileMenuOpen(false)}>
                        <li className="py-2 px-3 hover:bg-purple-600 rounded transition-colors">Shorten</li>
                    </Link>
                    <Link href='/contact-us' onClick={() => setIsMobileMenuOpen(false)}>
                        <li className="py-2 px-3 hover:bg-purple-600 rounded transition-colors">Contact Us</li>
                    </Link>
                    
                    {session ? (
                        <div className="border-t border-purple-600 pt-2 mt-2">
                            <div className="py-2 px-3 text-purple-200 text-sm">Welcome {session.user.name}</div>
                            <Link href='/dashboard' onClick={() => setIsMobileMenuOpen(false)}>
                                <li className="py-2 px-3 hover:bg-purple-600 rounded transition-colors">Dashboard</li>
                            </Link>
                            <Link href='/your-links' onClick={() => setIsMobileMenuOpen(false)}>
                                <li className="py-2 px-3 hover:bg-purple-600 rounded transition-colors">Your Links</li>
                            </Link>
                            <li 
                                onClick={() => {
                                    signOut();
                                    setIsMobileMenuOpen(false)
                                }} 
                                className="py-2 px-3 hover:bg-purple-600 rounded cursor-pointer transition-colors"
                            >
                                Sign out
                            </li>
                        </div>
                    ) : (
                        <div className="border-t border-purple-600 pt-2 mt-2 space-y-2">
                            <Link href="/shorten" onClick={() => setIsMobileMenuOpen(false)} className='block'>
                                <button className="w-full bg-purple-500 hover:bg-purple-600 rounded-lg font-bold py-2 px-3 transition-colors">Try Now</button>
                            </Link>
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className='block'>
                                <button className="w-full bg-purple-500 hover:bg-purple-600 rounded-lg font-bold py-2 px-3 transition-colors">Login</button>
                            </Link>
                        </div>
                    )}
                </ul>
            </div>
            )}
        </nav>
    )
}

export default Navbar