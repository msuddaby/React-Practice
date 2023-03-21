import PocketBase, { ClientResponseError } from 'pocketbase';
import { DbResponse, PostData } from './types';

const pb = new PocketBase('http://127.0.0.1:8090');

export async function getPosts(): Promise<DbResponse<PostData[]>> {
    try {
        await fakeNetwork();
        const response = await pb.collection('posts').getFullList<PostData>({
            sort: '-created'
        });
        return { data: response, success: true };
    }
    catch (err: any) {
        if (err  instanceof ClientResponseError) {
            return { error: err, success: false}
        }
        else {
            throw new Error(err);
        }
        
    }
    
}

export async function getPostById(id: string): Promise<DbResponse<PostData>> {
    try {
        await fakeNetwork();
        const response = await pb.collection('posts').getOne<PostData>(id);
        return { data: response, success: true };
    }
    catch (err: any) {
        if (err instanceof ClientResponseError) {
            return { error: err, success: false}
        }
        else {
            throw new Error("An unknown error occured!");
        }
    }
    
    
}

async function fakeNetwork() {
    return new Promise((res) => {
        setTimeout(res, 4000);
    })
}
