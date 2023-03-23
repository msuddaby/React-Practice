import { ClientResponseError } from 'pocketbase';
import { NewPostData, PostData } from "./types";
import PocketBase from 'pocketbase';
import { PbUser, usePocket } from '../components/PocketContext';

const pb = new PocketBase("http://127.0.0.1:8090");

export async function savePost(newPostData: NewPostData) {
    try {
        if (!pb.authStore.isValid) {
            return;
        }
        newPostData.author = pb.authStore.model!.id;
        const response = pb.collection('posts').create<PostData>(newPostData);
        return response;
    }
    catch (error) {
        console.log('oopsies!');

    }
}

export async function updatePost(postData: PostData) {
    try {
        const response = pb.collection('posts').update<PostData>(postData.id, postData);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}