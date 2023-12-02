import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteGroup } from '../../redux/actions/group'
import { RootState } from '../../redux/store'
import { useNavigate } from 'react-router-dom'

const DeleteModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {

    ////////////////////////////////////// VARIABLES ///////////////////////////////////////
    const { isFetching, error, currentGroup } = useSelector((state: RootState) => state.group)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        dispatch<any>(deleteGroup(currentGroup?._id as string, navigate))
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="alert-dialog-title">
                Delete the Group?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this group?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button onClick={handleClose} className='text-teal-blue bg-white hover:bg-light-gray text-[16px] px-[10px] py-[5px] rounded-[4px] ' >
                    Close
                </button>
                <button onClick={handleDelete} className='bg-teal-blue text-white hover:bg-teal-blue-darken text-[16px] px-[10px] py-[5px] rounded-[4px] ' >
                    {isFetching ? 'Deleting...' : 'Delete'}
                </button>
            </DialogActions>
        </Dialog >
    )
}

export default DeleteModal