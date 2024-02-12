import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStreak } from '../../redux/actions/streak'
import { RootState } from '../../redux/store'

const DeleteModal = ({ open, setOpen, streakId }: { open: boolean, setOpen: any, streakId: string }) => {

    ////////////////////////////////////// VARIABLES ///////////////////////////////////////
    const { isFetching, error } = useSelector((state: RootState) => state.streak)
    const dispatch = useDispatch()

    ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        dispatch<any>(deleteStreak(streakId))
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="alert-dialog-title">
                Delete the Streak?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this streak?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button onClick={handleClose} className='text-teal-blue bg-white hover:bg-light-gray text-[16px] px-[10px] py-[5px] rounded-[4px] ' >
                    Close
                </button>
                <button onClick={handleDelete} className='bg-teal-blue  text-white hover:bg-teal-blue -darken text-[16px] px-[10px] py-[5px] rounded-[4px] ' >
                    {isFetching ? 'Deleting...' : 'Delete'}
                </button>
            </DialogActions>
        </Dialog >
    )
}

export default DeleteModal