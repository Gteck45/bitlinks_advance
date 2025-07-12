// page.js (Server Component)
import React from 'react'
import axios from 'axios';
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import LinksClient from '../components/LinksClient'

const Page = async () => {
  let usergeneratedlinks = [];
  let session = null;
  let error = null;

  try {
    // Get session server-side
    session = await getServerSession(authOptions);

    // Use session email or fallback
    const email = session?.user?.email || "gteck4dd5@gmail.com";

    // Fetch user data server-side


    const response = await axios.post(
      `https://profileshorten.gteck45.cloud/api/links`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Get the result
    const data = response.data;


    if (response.ok) {
      const userData = await response.json();


      // Handle different response formats
      if (Array.isArray(userData)) {
        usergeneratedlinks = userData;
      } else if (userData && Array.isArray(userData.data)) {
        usergeneratedlinks = userData.data;
      } else if (userData && Array.isArray(userData.links)) {
        usergeneratedlinks = userData.links;
      } else {
        console.warn('Unexpected data format:', userData);
        usergeneratedlinks = [];
      }
    } else {
      error = `Failed to fetch links: ${response.status}`;
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    error = "Failed to load links";
  }

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen min-w-screen max-w-[200vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#D5C6FF_1px)] bg-[size:20px_20px]"></div>
      <h1 className='mx-auto text-center font-bold font-stretch-75% text-2xl'>Your Generated Links</h1>

      {error && (
        <div className="text-red-500 text-center mt-4">{error}</div>
      )}

      <LinksClient initialLinks={usergeneratedlinks} />
    </>
  )
}

export default Page