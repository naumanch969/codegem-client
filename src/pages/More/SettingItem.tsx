import { ChevronRight } from 'lucide-react'
import React, { ReactNode } from 'react'

interface Props {
    field: string,
    value: string,
    icon: ReactNode,
    onClick?: any
}
const SettingItem: React.FC<Props> = ({ field, value, icon, onClick }) => {

    return (
        <div onClick={onClick} className="flex items-center py-2 px-4 rounded-md hover:bg-light-gray transition duration-200 cursor-pointer">
            <div className="mr-2 text-cool-gray">
                {icon}
            </div>
            <div>
                <p className="text-cool-gray font-medium">{field}</p>
                <p className="text-cool-gray">{value || field}</p>
            </div>
            <ChevronRight className="ml-auto w-4 h-4 text-cool-gray" />
        </div>
    )
}

export default SettingItem