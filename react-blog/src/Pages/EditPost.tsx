import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { NewPostForm } from "../components/NewPostForm";
import { updatePost } from "../db/savePost";
import { DbResponse, PostData } from "../db/types";
import { DbErrorPage } from "./DbErrorPage";

type Response = {
  data: DbResponse<PostData>;
};

export function EditPost() {
  const data = useLoaderData() as Response;
  const history = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(updatePost, {
    onSuccess: (savedPost) => {
      if (savedPost === undefined) {
        throw new Error("uh");
      } else {
      }
      queryClient.setQueryData<DbResponse<PostData>>(
        ["blogPost", savedPost.id],
        (old) => {
          if (old !== undefined && old.data !== undefined) {
            old.data = savedPost;
            return old;
          }
        }
      );
    },
    onSettled: (settle) => {
      if (settle !== undefined) {
        history(`/view/${settle.id}`);
      }
    },
  });

  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={data.data}>
          {(post: DbResponse<PostData>) => {
            if (post.data !== undefined) {
              return (
                <>
                  <div className="max-w-screen-xl mx-auto my-16">
                    <div className="flex justify-center align-middle">
                      <div className="flex-grow border px-6 pt-4 pb-6 rounded border-slate-200">
                        <a
                          href="#"
                          className="text-sky-800"
                          onClick={() => history(-1)}
                        >
                          &lt; Discard
                        </a>
                        <h2 className="text-2xl font-semibold mb-3">
                          Editing Post
                        </h2>
                        <NewPostForm onSave={mutate} editValues={post.data} />
                      </div>
                    </div>
                  </div>
                </>
              );
            }
            return (
              <>
                <DbErrorPage error={post.error!} />
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
