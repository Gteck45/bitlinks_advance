"use client"
import React, { useState,useEffect, useLayoutEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Waves from '../components/test'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const Page = () => {
    const [url, setUrl] = useState('')
    const [shorturl, setShorturl] = useState('')
    const [generated, setGenerated] = useState("")
    const { data: session } = useSession();
    const router = useRouter();
    useLayoutEffect(() => {
        if (!session) {
            router.push('/login');
        }
    }, [session, router]);
    const generate = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl,
            
            "email": session.user.email
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success === true) {
                    setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`);
                    setUrl('')
                    setShorturl('')
                }
            })
            .catch((error) => console.error(error));

    }

    return (
        <>
        
        <div className='mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4'>
           

            <h1 className='font-bold text-2xl'>Generate your short URLs</h1>
            <div className='flex flex-col gap-2'>
                <input
                    type="text"
                    value={url}
                    placeholder='Enter your URL'
                    className='px-4 py-2 focus:outline-purple-600 rounded-md'
                    onChange={e => { setUrl(e.target.value) }} />
                <input
                    type="text"
                    className='px-4 py-2 focus:outline-purple-600 rounded-md'
                    value={shorturl}
                    placeholder='Enter your preferred short URL text'
                    onChange={e => { setShorturl(e.target.value) }} />
                <button className='bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold my-3 text-white' onClick={generate}>Generate</button>
            </div>
            {generated && <> <span>Your Link:</span><code className='w-full overflow-hidden'><Link href={`http://${generated}`} target="_blank" >{generated}</Link></code>
            </>

            }

        </div></>
    )
}

export default Page