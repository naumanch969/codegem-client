import { SearchOff } from '@mui/icons-material'
import React, { useState } from 'react'

const Search = ({ handleSearch }) => {

    const [searchQuery, setSearchQuery] = useState('')


    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search Friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue-dark focus:border-transparent"
            />
            <span onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <SearchOff />
            </span>
        </div>
    )
}

export default Search