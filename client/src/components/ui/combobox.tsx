"use client"

import React, { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "./badge"

interface Props {
    items: string[],
    selected: any[] | any,
    emptyString?: string,
    className?: string,
    placeholder?: string,
    onSelect: (value: string) => void,
    onFilter: (value: string) => void,
    showBadges?: boolean,
    isMultiple?: boolean
}


export function Combobox({ items, selected, emptyString, className, placeholder, onSelect, onFilter, showBadges = true, isMultiple: isMultipe = true }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] h-fit flex justify-between items-center ", className)}
                >
                    <div className="flex justify-start flex-wrap gap-2 " >
                        {
                            selected?.length > 0 // if any element is selected
                                ?
                                isMultipe
                                    ?
                                    (showBadges ? selected.map((s: string, i: number) =>
                                        <Badge key={i} className="flex items-center gap-1 capitalize" >
                                            {s}
                                            <X
                                                onClick={(event) => { event.stopPropagation(); onFilter(s); }}
                                                className="w-4 h-4 rounded-full cursor-pointer"
                                            />
                                        </Badge>) : <span className="" >{selected[selected?.length - 1].charAt(0).toUpperCase() + selected[selected?.length - 1].slice(1)}</span>
                                    )
                                    :
                                    <span className="text-light" >{selected.charAt(0).toUpperCase() + selected.slice(1)}</span>
                                :
                                <span className="text-light " >{placeholder}</span>
                        }
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-[200px] max-h-52 overflow-y-scrol p-0", className)}>
                <Command className="w-full h-full  " >
                    <CommandInput placeholder={"Search"} />
                    <CommandEmpty>{emptyString || "No item found."} </CommandEmpty>
                    <CommandList className="hover:bg-background" >
                        {items.map((item) => (
                            <CommandItem
                                key={item}
                                value={item.toLowerCase()}
                                onSelect={(currentValue: string) => { onSelect(currentValue); setOpen(false) }}
                                className="hover:bg-pink-400"
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        (
                                            isMultipe
                                                ? selected.find((i: string) => i.toLowerCase() == item.toLowerCase())
                                                : selected.toLocaleString() == item.toLowerCase()
                                        )
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {item}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
