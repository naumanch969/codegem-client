import { Camera, Clear } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import React, { ChangeEvent, useRef, useState } from 'react'
import { deleteImage, uploadImage } from '../../redux/actions/general'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


export const Upload = ({ image, handleFileChange, handleFileClear }: { image: string, handleFileChange: (e: ChangeEvent) => void, handleFileClear: () => void }) => {

    // const dispatch = useDispatch()
    // const lastSlashIndex = image?.lastIndexOf('/');
    // const filename = image?.substring(lastSlashIndex + 1);
    const imageRef = useRef<HTMLInputElement>(null)


    const { isFetching } = useSelector((state: RootState) => state.general)

    // const handleUploadImage = (e: any) => {
    //     const image = e.target.files[0]
        const formData = new FormData();
        formData.append('image', URL.createObjectURL(selectedFile));
    //     dispatch<any>(uploadImage(formData));
    // };

    // const handleDelete = () => {
    //     dispatch<any>(deleteImage(filename))
    // }

    const handleClick = () => {
        if (imageRef.current)
            imageRef.current.click()
    }

    return (
        <>
            {
                isFetching
                    ?
                    <div className="w-full flex justify-center items-center ">
                        <CircularProgress />
                    </div>
                    :
                    <>
                        {
                            image
                                ?
                                <div className="w-full h-full relative flex justify-center items-center ">
                                    <img src={image} alt="" className="rounded-[8px] w-full h-full object-cover " />
                                    <button onClick={handleFileClear} className="absolute top-[4px] right-[4px] rounded-full bg-black text-white w-[20px] h-[20px] flex justify-center items-center   " ><Clear style={{ fontSize: '16px' }} /></button>
                                </div>
                                :
                                <div className="w-full h-full flex justify-center items-center" >
                                    <input ref={imageRef} type="file" accept="image/*" className='hidden' onChange={handleFileChange} />
                                    <button onClick={handleClick} className="flex flex-col justify-center items-center text-textGray">
                                        <Camera style={{ fontSize: '36px' }} />
                                        Upload Image
                                    </button>
                                </div>
                        }
                    </>
            }
        </>
    )
}