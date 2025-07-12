"use client"
import React from 'react'
import axios, { isCancel, AxiosError } from 'axios';

import { Label, TextInput, Textarea } from "flowbite-react";
const Edit = ({ session, User, update, setUpdate }) => {
    const [form, setForm] = React.useState({
        email: User.email || "",
        username: User.username || "",
        profilepic: User.profilepic || "",
        title: User.Title || "",
        bio: User.Bio || "",
        socialLinks: {
            github: User.socialLinks?.github || "",
            x_com: User.socialLinks?.x_com || "",
            instagram: User.socialLinks?.instagram || "",
            dribbble: User.socialLinks?.dribbble || "",
            linkedin: User.socialLinks?.linkedin || "",
            dev: User.socialLinks?.dev || ""
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if it's a social link
        if (form.socialLinks.hasOwnProperty(name)) {
            setForm({
                ...form,
                socialLinks: {
                    ...form.socialLinks,
                    [name]: value
                }
            });
        } else {
            // Handle username with lowercase conversion and validation
            let processedValue = value;
            if (name === 'username') {
                // Only allow lowercase letters, numbers, and hyphens
                processedValue = value.toLowerCase().replace(/[^a-z0-9.-]/g, '');
            }

            setForm({
                ...form,
                [name]: processedValue
            });
        }
    }

    const submitForm = async () => {
        try {
            console.log('Submitting form:', form);
            
            // Validate username before submitting
            if (!form.username || form.username.trim() === '') {
                alert('Username is required');
                return;
            }
            
            if (form.username.length < 3) {
                alert('Username must be at least 3 characters long');
                return;
            }
            
            // Check if username contains only valid characters
            const validUsernameRegex = /^[a-z0-9.-]+$/;
            if (!validUsernameRegex.test(form.username)) {
                alert('Username can only contain lowercase letters, numbers, and hyphens');
                return;
            }

            const response = await axios.put("/api/user", form);
            console.log('Update response:', response.data);
            
            setUpdate(false);
            alert('Profile updated successfully!');
            
        } catch (error) {
            console.error('Error updating profile:', error);
            
            if (error.response) {
                // Server responded with error status
                console.error('Server error:', error.response.data);
                alert(`Update failed: ${error.response.data.message || 'Server error'}`);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Network error:', error.request);
                alert('Network error. Please check your connection.');
            } else {
                // Something else happened
                console.error('Error:', error.message);
                alert(`Error: ${error.message}`);
            }
        }
    }

    return (
        <>
            <div className='w-[40vw] bg-gray-700 mx-auto p-9 h-[90vh] overflow-y-scroll scrollbar-hide'>
                <div className="flex w-full flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Username">Username (lowercase only)</Label>
                        </div>
                        <TextInput 
                            onChange={handleChange} 
                            id="Username" 
                            type="text" 
                            sizing="sm" 
                            name='username' 
                            maxLength={18} 
                            value={form.username}
                            placeholder="e.g. john-doe123"
                            style={{ textTransform: 'lowercase' }}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="ProfileTitle">Profile Title</Label>
                        </div>
                        <TextInput onChange={handleChange} id="ProfileTitle" type="text" sizing="sm" name='title' value={form.title} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="profilepic">Profile picture URL</Label>
                        </div>
                        <TextInput onChange={handleChange} id="profilepic" type="text" sizing="sm" name='profilepic' value={form.profilepic} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Github">Enter Your Github Link</Label>
                        </div>
                        <TextInput onChange={handleChange} id="Github" type="text" sizing="sm" name='github' value={form.socialLinks.github} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="x_link">Enter Your x.com Link</Label>
                        </div>
                        <TextInput onChange={handleChange} id="x_link" type="text" sizing="sm" name='x_com' value={form.socialLinks.x_com} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="instagram">Enter Your Instagram Link</Label>
                        </div>
                        <TextInput onChange={handleChange} id="instagram" type="text" sizing="sm" name='instagram' value={form.socialLinks.instagram} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Dribbble">Enter Your Dribbble link</Label>
                        </div>
                        <TextInput onChange={handleChange} id="Dribbble" type="text" sizing="sm" value={form.socialLinks.dribbble} name='dribbble' />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="LinkedIn">Enter Your LinkedIn link</Label>
                        </div>
                        <TextInput onChange={handleChange} id="LinkedIn" type="text" sizing="sm" name='linkedin' value={form.socialLinks.linkedin} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="DEV">Enter Your DEV.to Link</Label>
                        </div>
                        <TextInput onChange={handleChange} id="DEV" type="text" sizing="sm" value={form.socialLinks.dev} name='dev' />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="comment">Enter Bio text here</Label>
                        </div>
                        <Textarea onChange={handleChange} className='h-20 resize-none' id="comment" placeholder="about me...." maxLength={230} name='bio' value={form.bio} />
                    </div>
                </div>
                <button className='text-center bg-white p-3 rounded-2xl mt-5' onClick={submitForm}>Submit</button>
            </div>
        </>
    )
}

export default Edit