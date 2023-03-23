import { Collapse } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { NewPostForm } from "../components/NewPostForm";
import { PostsList } from "../components/PostsList";
import { savePost } from "../db/savePost";
import { DbResponse, PostData } from "../db/types";
import { DbErrorPage } from "./DbErrorPage";

type Data = {
  posts: DbResponse<PostData[]>;
};

function handleSave() {}

export function HomePage() {
  const data = useLoaderData() as Data;
  const queryClient = useQueryClient();
  const [showAddPost, setShowAddPost] = useState(false);

  const { mutate } = useMutation(savePost, {
    onSuccess: (savedPost) => {
      queryClient.setQueryData<DbResponse<PostData[]>>(["blogPosts"], (old) => {
        if (old !== undefined && savedPost !== undefined) {
          if (old.data !== undefined) {
            old.data = [savedPost, ...old.data];
            return old;
          }
        }
      });
    },
  });

  return (
    <div className="text-center p-5 text-xl">
      <h1 className="text-slate-800 my-2 text-4xl mb-6">Home page</h1>
      <button
        type="button"
        className="py-2 px-4 mb-4 text-md rounded text-slate-50 bg-slate-900"
        onClick={() => setShowAddPost((prevState) => !prevState)}
      >
        Add Post
      </button>
      <Collapse in={showAddPost}>
        <div className={`flex justify-center`}>
          <div className="shrink w-1/2 border border-slate-400 rounded m-5 p-4">
            <NewPostForm onSave={mutate} />
          </div>
        </div>
      </Collapse>
      <div className="">
        <h2 className="text-3xl mb-6 font-semibold">Posts</h2>
      </div>
      <Suspense fallback={<div>Fetching...</div>}>
        <Await resolve={data.posts}>
          {(posts: DbResponse<PostData[]>) => {
            if (posts.success) {
              return <PostsList response={posts.data!} />;
            } else {
              return <DbErrorPage error={posts.error!}></DbErrorPage>;
            }
          }}
        </Await>
      </Suspense>
    </div>
  );
}
