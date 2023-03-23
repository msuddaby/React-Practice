import { ClientResponseError } from "pocketbase"

export type PostData = {
    id: string,
    title: string,
    body: string,
    created: string,
}

export type NewPostData = {
    title: string,
    body: string
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
    return typeof(userData) === 'object' && userData !== null && ('role' in userData);
}