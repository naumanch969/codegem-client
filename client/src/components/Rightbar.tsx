import React, { ChangeEvent, useState } from "react"
import { ArrowForward, Cancel, Search, ArrowRightAlt } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Link } from "react-scroll"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"


const Rightbar = () => {

    ////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const { codes } = useSelector((state: RootState) => state.code)
    const codesPerPage = 10
    const currentPage = 1
    const totalDocs = codes.length
    const numberOfPages = Math.ceil(totalDocs / codesPerPage)
    const startingPoint = (currentPage * codesPerPage) - codesPerPage
    const endPoint = (currentPage * codesPerPage)

    ////////////////////////////////////////// STATES /////////////////////////////////////////////////////
    const [searchInput, setSearchInput] = useState('')

    ////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////

    ////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }

    const handleClick = () => {

    }
    ////////////////////////////////////////// Actual Component ///////////////////////////////////////////////////
    return (
        <div className="thinScrollbar w-full h-full p-[10px] overflow-scroll " >

            <div className="sticky top-0 bg-inherit " >

                <h3 className="text-[24px] font-medium text-text-emerald-100 h-[48px] flex justify-between items-center  " >In This Page</h3>

                <div className="relative  py-[5px] " >
                    <input className="w-full h-[2rem] rounded-[10px] p-[5px] border-[1px] border-gray-400 text-text-emerald-100 pr-[22px] " value={searchInput} onChange={handleChange} placeholder="search" />
                    <Cancel
                        className={` ${searchInput.length == 0 ? 'hidden' : 'block'} outline-none cursor-pointer absolute right-[5px] top-[50%] transform translate-x-0 translate-y-[-50%] text-[18px] `}
                        onClick={() => setSearchInput('')}
                    />
                </div>

                <div className="" >
                    <p className="text-[20px] font-medium text-text-emerald-200 pb-[5px] " >No. of codes: <span>{codes.length}</span>  </p>
                </div>
            </div>



            <div className="flex flex-col items-start  " >
                {
                    codes?.slice(startingPoint, endPoint)?.map((code, index) => (
                        <Link
                            id="link"
                            to={code?._id}
                            activeClass="active"
                            smooth={true}
                            spy={true}
                            offset={-100}
                            duration={300}
                            className="flex items-center gap-[5px] hover:text-emerald-900 cursor-pointer "
                        >
                            <p >{index + 1}.</p>
                            <p className="my-[4px] underline " >
                                {code?.title}
                            </p>
                        </Link>
                    ))
                }
            </div>


        </div>
    )
}

export default Rightbar




const links = [
    {
        title: 'what is tuple of python explained',
    },
    {
        title: 'Annoying Errors',
    },
    {
        title: 'conversion',
    },
    {
        title: 'useRef explained',
    },
    {
        title: 'folder structure example',
    },
    {
        title: 'this is title no. 6',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'URI Malformed',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'Funtion to copy text',
    },
    {
        title: 'code block',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'env file',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'config js file of tailwind',
    },
    {
        title: 'what is tuple of python explained',
    },
    {
        title: 'Annoying Errors',
    },
    {
        title: 'conversion',
    },
    {
        title: 'useRef explained',
    },
    {
        title: 'folder structure example',
    },
    {
        title: 'this is title no. 6',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'URI Malformed',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'Funtion to copy text',
    },
    {
        title: 'code block',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'env file',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'config js file of tailwind',
    },
    {
        title: 'what is tuple of python explained',
    },
    {
        title: 'Annoying Errors',
    },
    {
        title: 'conversion',
    },
    {
        title: 'useRef explained',
    },
    {
        title: 'folder structure example',
    },
    {
        title: 'this is title no. 6',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'URI Malformed',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'Funtion to copy text',
    },
    {
        title: 'code block',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'env file',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'config js file of tailwind',
    },
]