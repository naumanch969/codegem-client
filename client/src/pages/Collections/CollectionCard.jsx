import { Favorite } from '@mui/icons-material'
import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const CollectionCard = ({ collection }) => {
    return (
        <Card
            elevation={3}
            className="bg-light-gray-light  p-[8px] rounded shadow-md transition-transform transform hover:scale-105"
        >
            <CardContent>
                <Typography variant="h6" component="h3" className="text-dark-slate-blue">
                    <Favorite fontSize="small" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                    {collection.name}
                </Typography>
                <Typography variant="body2" className="text-cool-gray-dark max-lines-10">
                    {collection.description}
                </Typography>
                <Link
                    to={`/collections/${collection._id}`}
                    className="cursor-pointer text-teal-blue hover:text-teal-blue-dark hover:underline transition-colors duration-300"
                >
                    View Collection
                </Link>
            </CardContent>
        </Card>
    )
}

export default CollectionCard