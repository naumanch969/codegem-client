import React, { useState } from "react";
import { Add, Search, Filter } from '@mui/icons-material'
import { useChallengeModal } from "../../hooks/useChallengeModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Combobox } from "@/components/ui/combobox";
import { X } from "lucide-react";
import { programmingLanguages } from "@/constant";
import { Badge } from "@/components/ui/badge";

interface Props {
    activeMenu: string,
    setActiveMenu: any,
    languages: string[],
    setLanguages: any,
    searchedQuery: string,
    setSearchedQuery: any,
}

const Topbar = ({
    activeMenu,
    setActiveMenu,
    languages,
    setLanguages,
    searchedQuery,
    setSearchedQuery,
}: Props) => {

    const filterButtons = ["All", "Latest", "Famous", "Trending", "Recommended to you"];
    const { onOpen } = useChallengeModal()
    const [searchValue, setSearchValue] = useState('');

    const onLanguageFilter = (value: string) => {
        setLanguages((pre: string[]) => pre.filter(item => item.toLowerCase() != value.toLowerCase()))
    }
    const onLanguageSelect = (value: string) => {
        const isExist = languages.find(l => l.toLowerCase() == value.toLowerCase())
        if (isExist)
            onLanguageFilter(value)
        else
            setLanguages((pre: string[]) => ([...pre, value]))
    }

    return (
        <div className="w-full flex flex-col gap-4 ">
            <div className="flex justify-between items-center gap-8 ">
                <div className="relative w-full " >
                    <Input
                        type="text"
                        placeholder="Search here... "
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={e => e.key == 'Enter' && setSearchedQuery(searchValue)}
                        className="w-full "
                    />
                    <Button
                        onClick={() => setSearchedQuery(searchValue)}
                        variant='default'
                        size='sm'
                        className="absolute right-[2.52px] top-[50%] transform translate-y-[-50%]"
                    >
                        <Search className="text-white" />
                    </Button>
                </div>
                <Button onClick={() => { onOpen(); onSetCollectionId(''); onSetGroupId('') }} variant="default">
                    <Add /> <span className="" >Add Challenge</span>
                </Button>
            </div>

            <div className="flex justify-between items-center gap-x-4 " >
                {/* buttons */}
                <div className="w-fit flex flex-col justify-between gap-1 h-full ">
                    <div className="w-full flex justify-start items-center gap-1 ">
                        {filterButtons.map((item, index) => (
                            <Button
                                key={index}
                                size='sm'
                                onClick={() => setActiveMenu(item.toLowerCase())}
                                variant={activeMenu.toLowerCase() == item.toLowerCase() ? "default" : "ghost"}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                    <Separator />
                </div>
                {/* select */}
                <div className="relative">
                    <Combobox
                        items={programmingLanguages}
                        onFilter={(value: string) => onLanguageFilter(value)}
                        onSelect={(value: string) => onLanguageSelect(value)}
                        selected={languages}
                        emptyString='No language found'
                        placeholder='Language'
                        className=''
                        showBadges={false}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <Filter />
                    </span>
                </div>
            </div>

            {(searchedQuery || languages.length > 0) &&
                <div className="flex justify-start items-center flex-wrap gap-2 mt-2 ">
                    <span className='text-lg text-muted-foreground' >Filters: </span>
                    {
                        searchedQuery &&
                        <Badge className="flex items-center gap-1 capitalize" >
                            {searchedQuery}
                            <X
                                onClick={(event) => { event.stopPropagation(); setSearchedQuery(''); setSearchValue('') }}
                                className="w-4 h-4 rounded-full cursor-pointer"
                            />
                        </Badge>
                    }
                    {
                        languages.map((s: string, i: number) =>
                            <Badge variant='secondary' key={i} className="flex items-center gap-1 uppercase" >
                                {s}
                                <X
                                    onClick={(event) => { event.stopPropagation(); onLanguageFilter(s); }}
                                    className="w-4 h-4 rounded-full cursor-pointer"
                                />
                            </Badge>
                        )
                    }
                </div>
            }

        </div>
    );
};

export default Topbar;
