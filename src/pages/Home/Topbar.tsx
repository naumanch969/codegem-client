import React, { useState } from "react";
import { Add, Search } from '@mui/icons-material'
import { useCodeModal } from "../../hooks/useCodeModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
const Topbar = ({ filters, setFilters }: { filters: any, setFilters: any }) => {

    const filterButtons = ["All", "Latest", "Famous", "Trending", "Recommended to you"];
    const { onOpen, onSetGroupId, onSetCollectionId } = useCodeModal()

    const [searchValue, setSearchValue] = useState('');


    return (
        <div className="w-full flex flex-col gap-4 ">

            <div className="flex justify-between items-center gap-x-4 " >
                <div className="relative w-full h-[48px] " >
                    <div className="absolute left-[3px] top-[50%] transform translate-y-[-50%] h-fit ">
                        <Select onValueChange={(value: string) => setFilters({ ...filters, language: value })} >
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Filter By" defaultValue='all' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="python">All</SelectItem>
                                <SelectItem value="error">Error</SelectItem>
                                <SelectItem value="algorithm">Algorithm</SelectItem>
                                <SelectItem value="streak">Streak</SelectItem>
                                <SelectItem value="challenge">Challenge</SelectItem>
                                <SelectItem value="project">Project</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Input
                        type="text"
                        placeholder="Search here... "
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full h-full focus:outline-1 pl-36 text-[17px]"
                    />
                    <Button
                        variant='default'
                        size='sm'
                        className="bg-copper hover:bg-copper-lighten absolute right-[3px] top-[50%] transform translate-y-[-50%] h-[42px] "
                    >
                        <Search className="text-white" />
                    </Button>
                </div>
                <Button onClick={() => { onOpen(); onSetCollectionId(''); onSetGroupId('') }} variant="default">
                    <Add /> <span className="" >Add Code</span>
                </Button>
            </div>

            <div className="flex justify-between items-center gap-8 ">
                {/* buttons */}
                <div className="w-fit flex flex-col justify-between gap-1 h-full ">
                    <div className="w-full flex justify-start items-center gap-1 ">
                        {filterButtons.map((item, index) => (
                            <Button
                                key={index}
                                size='sm'
                                onClick={() => setFilters({ ...filters, codes: item.toLowerCase() })}
                                variant={filters.codes.toLowerCase() == item.toLowerCase() ? "default" : "ghost"}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                    <Separator />
                </div>
                {/* select */}
                <div className="flex justify-end flex-[3] " >
                    <Select onValueChange={(value: string) => setFilters({ ...filters, language: value })} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Language" defaultValue='all' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="javascript">Javascript</SelectItem>
                            <SelectItem value="kotlin">Kotlin</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                            <SelectItem value="c++">C++</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
