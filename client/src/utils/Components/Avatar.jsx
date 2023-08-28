import { Person } from '@mui/icons-material'


const Avatar = ({ src, className, onClick }) => {

    return (
        <div onClick={onClick} className={`w-[44px] h-[44px] rounded-full cursor-pointer bg-gray-300 flex justify-center items-center ${className?.container} `}>
            {
                src
                    ?
                    <img src={src} alt='image' className="w-full h-full rounded-full " />
                    :
                    <Person style={{ fontSize: '32px' }} className={`text-[32px] text-emerald-500 ${className?.child} `} />
            }
        </div>
    )
}

export default Avatar;