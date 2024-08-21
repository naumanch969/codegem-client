import { Image as ImageIcon } from "@mui/icons-material"
import { Tooltip } from "@mui/material"
import FileBase64 from "react-file-base64"


const Image = ({ addImageFunc, handleImageButtonClick, ref }) => {

    return (
        <div ref={ref} id="filebase_image" className=" " >
            <Tooltip placement="top" title="Add Image">
                <ImageIcon onClick={() => handleImageButtonClick()} className="text-[16px] text-emerald-100 bg-emerald-800 rounded-[2px] cursor-pointer p-[1px] " />
            </Tooltip>
            {/* filebase64 component have display none */}
            <FileBase64
                type="file"
                multiple={true}
                onDone={(filesArr) => {
                    addImageFunc(filesArr)
                }
                }
            />
        </div>

    )
}

export default Image;