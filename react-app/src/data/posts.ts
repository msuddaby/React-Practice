import PocketBase from 'pocketbase';
import { PostsRecord } from './pocketbase-types';

const pb = new PocketBase('http://127.0.0.1:8090');

export async function getAllPosts(): Promise<PostsRecord[]> {
    const records = await pb.collection('posts').getFullList();
    const posts = records.map((record) => {
        return {
            id: record.id,
            title: record.title,
            body: record.body,
        };
    });
    return posts;
}        

    