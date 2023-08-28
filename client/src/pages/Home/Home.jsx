import Accounts from './Accounts'
import CreateCode from './CreateCode'
import Code from './Code'
import { useEffect, useState } from 'react'
import { image1 } from '../../assets'
import { useStateContext } from '../../contexts/ContextProvider'
import { Loading } from '../../utils/Components'
import { useDispatch, useSelector } from 'react-redux'
import { getCodes } from '../../redux/actions/code'
import Cookie from 'js-cookie'

const Home = () => {
    
    //////////////////////////// VARIABLES ////////////////////////////////////
    const { showSidebar,  setShowSidebar } = useStateContext()
    const dispatch = useDispatch()
    const { codes, isFetcihng } = useSelector(state => state.code)

    //////////////////////////// STATES ///////////////////////////////////////

    //////////////////////////// USE EFFECTS //////////////////////////////////
    useEffect(() => {
        setShowSidebar(true)
        dispatch(getCodes())
    }, [])
    
    //////////////////////////// FUNCTIONS /////////////////////////////////////
    
    return (
        <div className={`w-full h-full flex ${showSidebar ? 'lg:w-[80%] md:w-[75%]' : 'lg:w-[95%] md:w-[94%]'} `} >
            <div className={`md:w-full h-full px-[3rem] ${showSidebar ? 'lg:w-[65%]' : 'lg:w-[70%]'} `} >
                <div className={`w-full h-full flex flex-col gap-[2rem] ${showSidebar ? ' py-[2rem] ' : ' lg:px-[6rem] md:px-[4rem] py-[2rem] '} `} >

                    <CreateCode />

                    {
                        isFetcihng
                            ?
                            <Loading />
                            :
                            <div className="w-full flex flex-col items-center gap-[1rem] " >
                                {
                                    codes.map((code, index) => (
                                        <Code code={code} key={index} />
                                    ))
                                }
                            </div>
                    }

                </div>
            </div>


        </div>
    )
}

export default Home;



const codes = [
    {
        _id: 'codeId',
        user: 'user1',
        content: {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae dicta modi nesciunt ad voluptatum dignissimos corrupti nostrum ab aliquid, consectetur est consequatur perferendis magni facilis blanditiis voluptatibus possimus odio ullam earum quasi. Odio iure aliquam, dolorem sed sunt sapiente. Nihil culpa ducimus dolore repellendus! Ab facere eaque voluptatum veniam ea vero voluptate at numquam, et dolorum iure omnis nam corporis esse sint delectus, iste quam aliquam quo rerum laudantium accusantium consequatur veritatis aperiam. Laborum, aut debitis, voluptatibus corporis deserunt exercitationem animi vel perspiciatis dicta ab rerum voluptates modi? Iure quis repudiandae eaque fugit, minima consequuntur nihil nam nostrum ipsam neque. Cum iusto incidunt ratione nesciunt magni numquam, repudiandae ipsam nostrum! Sapiente eos quidem numquam quisquam. Corporis magnam ea veritatis iste temporibus id optio minima adipisci, unde obcaecati laborum ad, illum, ab aliquam a? Sit commodi, nostrum facere natus adipisci quasi quisquam culpa repudiandae est rem iure harum dolores! Sit sed quisquam amet et saepe tenetur perferendis, iste ipsam asperiores voluptates quasi ea consequuntur non repudiandae? Ea dolorem soluta, consequatur, numquam saepe quisquam ex at laborum molestiae, nisi sed accusantium autem. Ex debitis officiis unde pariatur sed cupiditate, corporis, quae consequuntur repellendus officia ratione voluptas cumque facere dolores modi a. Fuga.',
            selected: [{ start: '4', end: '9', styles: ['italic'] }]
        },
        image: [image1]
        ,
        tags: {
            type: 'user',
            name: 'akbar',
            user: 'userId'
        },
        hashTags: ['hashtag1', 'hashtag2', 'hashtag3'],
        likes: ['userId'],
        comments: {
            user: 'userId',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nobis ',
            createdAt: Date.now
        },
        createdAt: Date.now,
        updatedAt: Date.now,
        visibility: 'public'
    },
    {
        _id: 'codeId',
        user: 'user2',
        content: {
            text: '',
            selected: [{ start: '4', end: '9', styles: ['italic'] }]
        },
        image: [image1],
        tags: {
            type: 'user',
            name: 'akbar',
            user: 'userId'
        },
        hashTags: ['hashtag'],
        likes: ['userId'],
        comments: {
            user: 'userId',
            content: 'this is content of the comment',
            createdAt: Date.now
        },
        createdAt: Date.now,
        updatedAt: Date.now,
        visibility: 'public'
    },
]






// text: { type: String, required: true }, // The original text that was highlighted
// user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who made the highlight
// start: { type: Number, required: true }, // The starting index of the highlighted text
// end: { type: Number, required: true }, // The ending index of the highlighted text
// createdAt: { type: Date, default: Date.now }, // The date and time the highlight was created
const users = [
    {
        userId: '',
        name: '',
        username: '',
        email: '',
        bio: '',
        DOB: '',
        picture: '',
        gender: '',
        location: '',
        friends: [],
        activityLog: [],
        registerationDate: '',
        loginAt: '',
    }
]

const urlRegEx = /(https?:\/\/[^\s]+)/g
const handleSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const start = selection.anchorOffset;
    const end = selection.focusOffset;
    console.log(`Selected text: ${selectedText}`);
    console.log(`Start index: ${start}`);
    console.log(`End index: ${end}`);
}
// onMouseUp(handleSelection)

const isBold = document.queryCommandState("bold");
    // "bold" - Indicates whether the selected text is bold.