import React, { useState } from "react";
import { Add, Search } from '@mui/icons-material'
import CreateCode from "../Codes/Create";
import { useCodeModal } from "../../hooks/useCodeModal";

const Topbar = ({ filters, setFilters }: { filters: any, setFilters: any }) => {
    const filterButtons = ["All", "Recommended", "Related", "Latest", "Famous"];

    const { onOpen } = useCodeModal()
    const [searchValue, setSearchValue] = useState('');


    return (
        <div className="w-full flex flex-col gap-[1rem] ">
            <CreateCode />

            <div className="flex justify-between items-center gap-x-12 " >
                <div className="relative w-[75%] h-12 rounded-lg py-[4px] px-[8px] border border-warm-gray bg-light-gray " >
                    <input
                        type="text"
                        placeholder="Search here... "
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full bg-inherit h-full outline-none border-none "
                    />
                    <button className="absolute right-[1px] top-[50%] transform translate-y-[-50%] w-12 h-[96%] bg-teal-blue text-white rounded-lg " >
                        <Search className="text-white" />
                    </button>
                </div>

                <button onClick={() => onOpen()} className="flex justify-center items-center bg-teal-blue text-white h-12 text-lg rounded-lg px-4 gap-x-1 font-medium " >
                    <Add /> Add
                </button>
            </div>

            <div className="flex justify-between items-center gap-[2rem] ">
                {/* buttons */}
                <div className="flex-[7] w-full flex justify-start items-center gap-[1.5rem] border-b border-teal-blue  ">
                    {filterButtons.map((item, index) => (
                        <div className=" " key={index}>
                            <button onClick={() => setFilters({ ...filters, codes: item.toLowerCase() })} className={` ${filters.codes.toLowerCase() == item.toLowerCase() ? "bg-teal-blue text-white py-[4px] px-[14px] rounded-t-[4px]  " : "text-dark-slate-blue-lighten "}  `}>
                                {item}
                            </button>
                        </div>
                    ))}
                </div>
                {/* select */}
                <div className="flex justify-end flex-[3] " >
                    <select onChange={(e) => setFilters({ ...filters, language: e.target.value })} name="language" id="language-select" className="w-[10rem] h-[40px] rounded-[4px] p-[.5rem] bg-teal-blue text-white cursor-pointer outline-none " >
                        <option value="all">All</option>
                        <option value="python">Python</option>
                        <option value="javascript">Javascript</option>
                        <option value="kotlin">Kotlin</option>
                        <option value="java">Java</option>
                        <option value="ruby">Ruby</option>
                        <option value="c">C</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
