import { Search } from "@mui/icons-material";


const Input = () => {



    const handleSearch = () => {
        setShowSearchBorder(true)
    }


    return (
        <div className={` relative min-w-[17rem] flex justify-between gap-[0px] w-auto h-[2rem] bg-inherit `} >
            <Search onClick={() => handleSearch} style={{ height: "100%", width: '2rem' }} className="cursor-pointer relative top-[-1%] bg-inherit   text-emerald-400  h-full text-[26px] w-[2rem] " />
            <div className=" w-[15rem] h-full relative " >
                <input
                    style={{ outline: 'none' }}
                    className={`h-full w-full bg-inherit text-emerald-400  outline-none pl-[8px] `}
                    onChange={(e) => setValue(e.target.value)} placeholder="Search..." name="search" value={value}
                    onFocus={() => setShowSearchBorder(true)}
                    ref={wrapperRef}
                />
                <Cancel style={{ display: `${value.length == 0 ? 'none' : 'block'} `, fontSize: '16px', top: '0', height: "100%" }} onClick={() => setValue("")} className={`${value.length == 0 ? 'none' : 'block'} cursor-pointer absolute right-[1%] top-0 h-full text-[16px]  `} />
            </div>
        </div>

    )
}

export default Input;