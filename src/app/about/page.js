import React from 'react'
import Image from 'next/image'

import Link from 'next/link'
const Page = () => {
  return (
    <>
      <section className='bg-purple-200 max-w-lvw min-h-[92vh] mx-auto'>
        <h1 className='font-bold mx-auto text-center text-5xl text-fuchsia-700'>About Us</h1>

        <main >
          <div className='flex items-center justify-around flex-col sm:flex-col md:flex-row'>
            <div className='mix-blend-darken overflow-hidden  bg-amber-700'>
              <Image src="/vector.jpg" className='object-cover w-full h-full ' alt="img" width={1000} height={1000} />
            </div>
            <div className="flex items-center justify-around flex-col sm:w-full md:w-1/2 h-[600px]">
              <h2 className='text-6xl font-bold text-[#e87045] m-10'>LiShort</h2>
              <p className='text-lg font-semibold text-cyan-600'>
                Our link shortener service makes sharing URLs simple, fast, and secure. Whether you&apos;re managing a marketing campaign, posting on social media, or just need a cleaner link, our platform lets you shorten, customize, and track your URLs with ease. Built for speed, reliability, and privacy, it delivers a seamless experience for both individuals and businesses. With powerful analytics and an intuitive interface, we help you get more from every click.
              </p>
              <Link href="/shorten" className='text-white m-10 bg-purple-500 rounded-lg font-bold p-3 py-1'>  <button>Try Now</button>  </Link>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Page