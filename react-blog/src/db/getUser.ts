import PocketBase, { ClientResponseError } from 'pocketbase';
import { User } from "./types";

const pb = new PocketBase('http://127.0.0.1:8090');

export async function getUserByUsername(username: string) {
    try {
        const response = await pb.collection('users').getFirstListItem<User>(`username="${username}"`);
        return response;
    } catch (err: any) {
        if (err instanceof ClientResponseError) {
            return err;
        }
        else {
            throw new Error("An unknown error occured!");
        }
    }

}