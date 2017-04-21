export class User {
    loginname: string;
    id: number;
    avatar_url?: string;
}
export class Auth {
    user?: User;
    hasError: boolean;
    redirectUrl: string;
    errMsg: string;
}
export class Topics {
    id: string;
    author: {
        loginname: string;
        avatar_url: string;
    };
    title: string;
    last_reply_at: string;
}

export class UserDetails {
    loginname: string;
    avatar_url: string;
    githubUsername: string;
    create_at: string;
    score: number;
    recent_topics: Topics[]
    recent_replies: Topics[]
}

export const BASE_API_URL = "https://cnodejs.org/api/v1";
export const USER_INFO_KEY = "USER_INFO_KEY";
export const AUTH_TOKEN_KEY = "AUTH_TOKEN_KEY";
export const REDIRECT_URL = "REDIRECT_URL";