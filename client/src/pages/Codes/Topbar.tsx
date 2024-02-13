import React, { useState } from "react";
import { Add, Search } from '@mui/icons-material'
import { useCodeModal } from "../../hooks/useCodeModal";

const Topbar = ({ filters, setFilters }: { filters: any, setFilters: any }) => {

    const filterButtons = ["All", "Recommended", "Related", "Latest", "Famous"];
    const codeModal = useCodeModal()

    const [searchValue, setSearchValue] = useState('');


    return (
        <div className="w-full flex flex-col gap-[1rem] ">

            <div className="flex justify-between items-center " >
                <h1 className="text-[3rem] text-dark-slate-blue font-bold ">Code</h1>

                <div className="flex items-center justify-between gap-[24px] " >
                    <div className="relative w-[16rem] h-[40px] rounded-[4px] py-[4px] px-[8px] border-[1px] border-warm-gray bg-light-gray " >
                        <input
                            type="text"
                            placeholder="Search here... "
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full bg-inherit h-full outline-none border-none "
                        />
                        <button className="absolute right-0 top-[50%] transform translate-y-[-50%] w-[36px] h-[99%] bg-teal-blue text-white " > <Search className="text-white" /> </button>
                    </div>

                    <button onClick={() => codeModal.onOpen()} className="flex justify-center items-center bg-teal-blue text-white w-[48px] h-[48px] text-[32px] rounded-full " ><Add /></button>
                </div>
            </div>


            <div className="flex justify-between items-center gap-[2rem] ">
                {/* buttons */}
                <div className="flex-[7] w-full flex justify-start items-center gap-[1.5rem] border-b-[1px] border-teal-blue  ">
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
