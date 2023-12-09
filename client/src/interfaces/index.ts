export interface User {
    _id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    phone?: number
    password?: string
    profilePicture?: string
    saved?: string[] | []
    friends?: string[] | []
    sentRequests?: string[] | []
    receivedRequests?: string[] | []
    createdAt?: Date
    mutualFriends?: number // for friends section
}

export interface Code {
    _id?: string
    user?: User
    title: string
    description: string
    code: string
    tags: { name: string, user: string }[]
    hashTags: string[]
    likes: string[]
    comments: { user: string, content: string, createdAt: string }[]
    shares: { from: string, to: string, sharedAt: string }[]
    groups: { from: string, group: string, sharedAt: string }[]
    visibility: string
    createdAt?: Date
}

export interface Collection {
    _id: string
    name: string
    description: string
    codes: Code[] | []
    owner: User | string
    visibility: string
}

export interface Group {
    _id?: string
    name: string
    createdAt?: Date
    avatar: string
    description: string
    members: string[] | []
    categories: [] | string[]
    admin: User | string
    sharedCodes: { from: User | string, code: Code, sharedAt: Date }[] | []
    codes: Code[] | []
}