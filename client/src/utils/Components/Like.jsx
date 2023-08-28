

import { IconButton } from "@mui/material";
import { ThumbUpAlt, ThumbUpAltOutlined } from "@mui/icons-material";

import { useStateContext } from "../../contexts/ContextProvider"

const Like = ({ likes }) => {

    const { userState } = useStateContext()

    const hasLikedCodeBlock = likes.findIndex((id) => id === userState.user._id)



    if (likes.length > 0) {
        return hasLikedCodeBlock !== -1
            ?            // if user likes the code
            (
                <>
                    <ThumbUpAlt fontSize="small" className="text-emerald-400" />
                    {likes.length > 2
                        ?
                        `You and ${likes.length - 1} others`
                        :
                        ` ${likes.length} ${likes.length > 1 ? 'Likes' : 'Like'}  `
                    }
                </>
            )
            :         // if user unLike the code
            (
                <>
                    <ThumbUpAltOutlined fontSize="small" className="text-emerald-400 " />
                    {likes.length} {likes.length > 1 ? "Likes" : "Like"}
                </>
            )
    }
    else {
        return (
            <>
                <ThumbUpAltOutlined fontSize="small" className="text-emerald-400 " /> Like
            </>
        )
    }


}

export default Like;