'use client'

import React, { useState } from 'react'
import axios from 'axios'

const LinksClient = ({ initialLinks }) => {
  // Debug: Log what we're receiving
  console.log('initialLinks:', initialLinks, typeof initialLinks);
  
  // Ensure we always have an array
  const [links, setLinks] = useState(() => {
    if (Array.isArray(initialLinks)) {
      return initialLinks;
    }
    // If it's an object with data property, try that
    if (initialLinks && typeof initialLinks === 'object' && initialLinks.data) {
      return Array.isArray(initialLinks.data) ? initialLinks.data : [];
    }
    // If it's an object with links property, try that
    if (initialLinks && typeof initialLinks === 'object' && initialLinks.links) {
      return Array.isArray(initialLinks.links) ? initialLinks.links : [];
    }
    // Fallback to empty array
    return [];
  });
  const [isDeleting, setIsDeleting] = useState(null);

  // Format date consistently for both server and client
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Use consistent formatting that works the same on server and client
    return date.toISOString().slice(0, 16).replace('T', ' ');
  };

  const deleteUrlById = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this link?");
    if (!confirmDelete) return;

    setIsDeleting(id);

    try {
      const response = await axios.delete('/api/links', {
        data: { id },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        // Remove the deleted link from state
        setLinks(prevLinks => prevLinks.filter(link => link._id !== id));
        console.log("Deleted successfully:", response.data.message);
      } else {
        console.error("Failed to delete:", response.data.message);
        alert("Failed to delete the link. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting URL:", error.response?.data || error.message);
      alert("An error occurred while deleting the link.");
    } finally {
      setIsDeleting(null);
    }
  };

  // Additional safety check before rendering
  if (!Array.isArray(links)) {
    console.error('Links is not an array:', links);
    return (
      <div className="text-center text-red-500 mt-8">
        Error: Invalid data format received
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No links found. Create your first shortened link!
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-2">
      {links.map((item, index) => (
        <div 
          className='flex justify-between bg-[#26235c] hover:bg-[#5f5e71] font-bold items-center text-white w-5/6 mx-auto p-4 rounded-md' 
          key={item._id || index}
        >
          <div className='w-[40vh] overflow-hidden' title={item.url}>
            <a 
              href={`/${item.shorturl}`} 
              target='_blank' 
              rel='noopener noreferrer'
              className="hover:underline"
            >
              {`${process.env.NEXT_PUBLIC_HOST}/${item.shorturl}`}
            </a>
          </div>
          <div className='font-mono text-sm'>
            {formatDate(item.CreatedAt)}
          </div>
          <button 
            className={`p-2 rounded-2xl w-24 text-sm ${
              isDeleting === item._id 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-red-700 hover:bg-red-800'
            }`}
            onClick={() => deleteUrlById(item._id)}
            disabled={isDeleting === item._id}
          >
            {isDeleting === item._id ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      ))}
    </ul>
  );
};

export default LinksClient;