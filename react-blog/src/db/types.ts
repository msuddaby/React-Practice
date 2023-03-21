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
