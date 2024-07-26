import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCollection } from '../../redux/actions/collection'
import { RootState } from '../../redux/store'

const DeleteModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {

    ////////////////////////////////////// VARIABLES ///////////////////////////////////////
    const { isFetching, error, currentCollection } = useSelector((state: RootState) => state.collection)
    const dispatch = useDispatch()

    ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        dispatch<any>(deleteCollection(currentCollection?._id as string))
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="alert-dialog-title">
                Delete the Collection?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this collection?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button onClick={handleClose} className='text-copper bg-white hover:bg-light-gray text-[16px] px-[10px] py-[5px] rounded-[4px] ' >
                    Close
                </button>
                <button onClick={handleDelete} className='bg-copper text-white hover:bg-copper-darken text-[16px] px-[10px] py-[5px] rounded-[4px] ' >
                    {isFetching ? 'Deleting...' : 'Delete'}
                </button>
            </DialogActions>
        </Dialog >
    )
}

export default DeleteModal