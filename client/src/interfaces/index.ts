export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: number;
  password?: string;
  // profilePicture?: string | { name: string };
  profilePicture?: string;
  // coverImage?: string | { name: string };
  coverImage?: string;
  bio?: string;
  title?: string;
  location?: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  interests: string[];
  programming: string[];
  hobbies: string[];
  books: string[];
  verified?: boolean;
  saved?: string[];
  friends?: string[];
  sentShares: (string | Share)[]; // if populated, array of Share otherwise of string
  receivedShares: (string | Share)[]; // if populated, array of Share otherwise of string
  sentRequests?: string[];
  receivedRequests?: string[];
  notifications: Notification[];
  mutualFriends?: number; // for friends section
  createdAt?: Date | string;
}

export interface Code {
  _id?: string;
  user?: User;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: { name: string; user: string }[];
  hashTags: string[];
  likes: string[];
  comments: (string | Comment)[];
  shares: (string | Share)[]; // if populated, array of Share otherwise of string
  groups?: string;
  visibility: string;
  createdAt?: Date | string;
}

export interface Challenge {
  _id?: string;
  user?: User;
  title: string;
  description: string;
  language: string;
  challenge: string;
  solution: string;
  tags: { name: string; user: string }[];
  hashTags: string[];
  likes: string[];
  comments: (string | Comment)[];
  shares: (string | Share)[]; // if populated, array of Share otherwise of string
  groups?: string;
  visibility: string;
  createdAt?: Date | string;
}

export interface Streak {
  _id?: string;
  user?: User;
  title: string;
  description: string;
  language: string;
  streak: { description: string; code: string }[];
  tags: { name: string; user: string }[];
  hashTags: string[];
  likes: string[];
  comments: (string | Comment)[];
  shares: (string | Share)[]; // if populated, array of Share otherwise of string
  group?: string;
  visibility: string;
  createdAt?: Date | string;
}

export interface Collection {
  _id: string;
  name: string;
  description: string;
  language: string;
  categories: string[];
  codes: Code[];
  streaks: Streak[];
  shares: (string | Share)[];
  stars: string[];
  challenges: Challenge[];
  owner: User | string;
  visibility: string;
  createdAt: Date | string;
}

export interface Group {
  _id?: string;
  name: string;
  createdAt?: Date | string;
  avatar: string;
  description: string;
  members: string[];
  categories: string[];
  languages: string[];
  admin: User | string;
  shares: (string | Share)[]; // if populated, array of Share otherwise of string
  codes: Code[];
  streaks: Streak[];
  challenges: Challenge[];
}

export interface Share {
  _id?: string;
  from: string;
  to: string;
  postId: string;
  postType: "code" | "streak" | "challenge";
  sharedTo: "friend" | "group";
  createdAt: Date | string;
}

export interface Comment {
  _id?: string;
  postId: string;
  user: string | User;
  content: string;
  createdAt?: Date | string;
}

export interface Notification {
  _id: string;
  user: string | User;
  title: string;
  description: string;
  type: "GENERAL" | "POST_CREATE" | "FRIEND_REQUEST";
  isRead: boolean;
}
