import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

const Create = ({ open, onClose, onCreateGroup }) => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    const handleCreateGroup = () => {
        // Validate inputs and perform group creation
        if (groupName && groupDescription) {
            onCreateGroup({
                name: groupName,
                description: groupDescription,
            });
            setGroupName('');
            setGroupDescription('');
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="bg-white p-6 rounded shadow-md w-[25rem] mx-auto mt-20">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Create New Group</h2>
                    <Close onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700" />
                </div>
                <div className="mb-4">
                    <label htmlFor="group-name" className="block font-medium text-gray-700">
                        Group Name
                    </label>
                    <TextField
                        id="group-name"
                        variant="outlined"
                        fullWidth
                        value={groupName}
                        onChange={e => setGroupName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="group-description" className="block font-medium text-gray-700">
                        Description
                    </label>
                    <TextField
                        id="group-description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={groupDescription}
                        onChange={e => setGroupDescription(e.target.value)}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className="mt-6"
                    onClick={handleCreateGroup}
                >
                    Create Group
                </Button>
            </div>
        </Modal>
    );
};

export default Create;
