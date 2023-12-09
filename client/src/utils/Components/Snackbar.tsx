

import React from 'react'
import { Snackbar, IconButton, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function SnackbarComponent({ text, onClose }: { onClose: () => void, text: string }) {


    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {

        if (reason === 'clickaway') {
            return;
        }

        onClose()
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                {/* UNDO */}
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <Close fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={text.length > 0}
                autoHideDuration={6000}
                onClose={handleClose}
                message={text}
                action={action}
            />
        </div>
    );
}