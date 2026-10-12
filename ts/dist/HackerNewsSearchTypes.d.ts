export interface Item {
    author?: string;
    children?: any[];
    comment_text?: string;
    created_at?: string;
    created_at_i?: number;
    id?: string;
    num_comments?: number;
    objectID?: string;
    points?: number;
    story_id?: number;
    tags?: any[];
    title?: string;
    url?: string;
}
export interface ItemLoadMatch {
    id: number;
}
export interface Search {
    author?: string;
    children?: any[];
    comment_text?: string;
    created_at?: string;
    created_at_i?: number;
    num_comments?: number;
    objectID?: string;
    points?: number;
    story_id?: number;
    tags?: any[];
    title?: string;
    url?: string;
}
export interface SearchListMatch {
    hits_per_page?: number;
    numeric_filter?: string;
    page?: number;
    query: string;
    tag?: string;
}
export interface User {
    about?: string;
    created_at?: string;
    id?: string;
    karma?: number;
    submitted?: any[];
    username?: string;
}
export interface UserLoadMatch {
    id: string;
}
