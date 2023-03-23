import { ClientResponseError } from "pocketbase"
import { PbUser } from "../components/PocketContext"

export type PostData = {
    id: string,
    title: string,
    body: string,
    created: string,
    author?: string,
    expand: { author: PbUser },
}

export type NewPostData = {
    title: string,
    body: string,
    author?: string,
}

export type DbResponse<T> = {
    success: boolean,
    data?: T,
    error?: ClientResponseError,
}

export type User = {
    username: string,
    email?: string,
    password?: string,
    role: string
}

export function assertIsUser(userData: any): userData is User {
    return typeof(userData) === 'object' && userData !== null && ('username' in userData);
}