"use client"
import React from 'react'
import { UserProvider } from '../context/context'

const detailsWrapper = ({ children }) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}

export default detailsWrapper