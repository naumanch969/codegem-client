
const Heading = ({ file, folder, parentFolder }) => {

    return (
        <div className="flex flex-col items-start " >
            <h4 className="text-[18px] font-medium capitalize text-text-emerald-100 " >{parentFolder}/{folder}</h4>
            <h2 style={{ fontSize: '52px' }} className="capitalize text-[52px] font-bold text-transparent text-8xl bg-clip-text bg-gradient-to-tr  from-gray-400 via-emerald-600 to-emerald-900" >
                {file}
            </h2>
        </div>

    )
}

export default Heading;