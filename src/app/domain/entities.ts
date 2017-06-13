import { Observable } from 'rxjs/Observable';

export class User {
    loginname: string;
    id: string | number;
    avatar_url?: string;
}
export class Auth {
    user?: User;
    hasError: boolean;
    redirectUrl: string;
    errMsg: string;
}
export class Author {
    loginname: string;
    avatar_url: string;
}
export class Topics {
    id: string;
    author: Author;
    title: string;
    last_reply_at: string;
}

export class Topic {
    id: string;
    author_id: string;
    tab: string;
    content: string;
    title: string;
    last_reply_at: string;
    good: boolean;
    top: boolean;
    reply_count: number;
    visit_count: number;
    create_at: string;
    author: Author
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
export class Replies {
    id: string;
    author: Author;
    content: string;
    ups: string[];
    create_at: string;
    reply_id: string;
    is_uped: boolean;
}
export class TopicDetail {
    id: string;
    author_id: string;
    tab: string;
    title: string;
    good: boolean;
    top: boolean;
    reply_count: number;
    visit_count: number;
    content: string;
    reply_id: string;
    create_at: string;
    author: Author;
    replies: Replies[];
    is_collect: boolean;
}

export class Message {
    id: string;
    type: string;
    has_read: boolean;
    author: Author;
    topic: {
        id: string;
        title: string;
        last_reply_at: string;
    };
    reply: {
        id: string;
        content: string;
        ups: string[];
        create_at: string;
    }
}

export const BASE_API_URL = 'https://cnodejs.org/api/v1';
export const USER_INFO_KEY = 'USER_INFO_KEY';
export const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
export const REDIRECT_URL = 'REDIRECT_URL';
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
