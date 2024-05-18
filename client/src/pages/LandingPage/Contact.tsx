import React from 'react'
import { Contact as contactImage } from '@/assets'
import { Button } from '@/components/ui/button'
import { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const Contact = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const intiialData = { name: '', email: '', subject: '', message: '' }

    ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
    const [formData, setFormData] = useState(intiialData)
    const [loading, setLoading] = useState(false)

    ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formData?.name) return toast.error('Name is required.')
        if (!formData?.email) return toast.error('Email is required.')
        if (!formData?.subject) return toast.error('Subject is required.')
        if (!formData?.message) return toast.error('Message is required.')

        // setLoading(true)
        // dispatch<any>(contact(formData))
        //     .finally(() => {
        //         setFormData(intiialData)
        //         setLoading(false)
        //     })
    }

    ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////
    return (
        <div className="min-h-screen flex flex-col justify-start items-center py-32 ">
            <div className="flex flex-col justify-center items-center w-full h-fit  ">
                <h2 className="text-5xl font-bold text-foreground ">Contact Us</h2>
                <span className=' px-32 mt-4 text-center ' >For any inquiries or assistance, don't hesitate to reach out to us.</span>
            </div>
            <div className="bg-gray-100 grid grid-cols-2 justify-center gap-12 mt-20 w-full rounded-lg px-8 py-12 ">
                <div className="col-span-1">
                    <img src={contactImage} alt="" className='h-full px-12' />
                </div>
                <form onSubmit={onSubmit} className="col-span-1 flex flex-col gap-4 ">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name='name'
                            value={formData.name}
                            onChange={onChange}
                            placeholder='John Doe'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Email</label>
                        <input
                            type="text"
                            name='email'
                            value={formData.email}
                            onChange={onChange}
                            placeholder='johndoe@example.com'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Subject</label>
                        <input
                            type="text"
                            name='subject'
                            value={formData.subject}
                            onChange={onChange}
                            placeholder='Subject'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Message</label>
                        <textarea
                            rows={5}
                            name='message'
                            value={formData.message}
                            onChange={onChange}
                            placeholder='Place your message here'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Button disabled={loading} >{loading ? 'Processing...' : 'Submit'}</Button>
                </form>
            </div>
        </div>
    )
}

export default Contact