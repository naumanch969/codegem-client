import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Snackbar } from '../utils/Components';
import { error } from '../redux/reducers/user';

interface AuthWrapperProps {
    children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {

    const dispatch = useDispatch()
    const { error: userError } = useSelector((state: RootState) => state.user);
    const [snackbarText, setSnackbarText] = React.useState<string>('');

    useEffect(() => {
        if (userError) {
            setSnackbarText(userError);
        }
    }, [userError]);

    const onClose = () => {
        dispatch(error(''));
        setSnackbarText('');
    }


    // Pass additional props to children using React.cloneElement
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement<any>(child, { snackbarText, setSnackbarText });
        }
        return child;
    });

    return (
        <>
            <Snackbar text={snackbarText} onClose={onClose} />
            {childrenWithProps}
        </>
    );
};

export default AuthWrapper;
