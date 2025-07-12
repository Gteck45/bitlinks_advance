
'use client';

import React, { useState } from 'react';
import Edit from './Edit'; // adjust path as needed

export default function EditButton({ session, User }) {
    const [update, setUpdate] = useState(false);

    return (
        <>
            <div className="button bg-purple-500 w-[90px] fixed top-20 left-0 text-center m-3 p-3 text-2xl text-white rounded-2xl cursor-pointer"
                onClick={() => setUpdate(!update)}>
                {update ? "close" : "Edit"}
            </div>

            {update && (
                <div className="fade-in">
                    <Edit session={session} User={User} update={update} setUpdate={setUpdate}/>
                </div>
            )}
        </>
    );
}