import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import { Await, useLoaderData, useParams } from "react-router-dom";
import { getPostById } from "../db/getPosts";
import { DbResponse, PostData } from "../db/types";

type Response = {
  data: DbResponse<PostData>;
};

export function ViewPost() {
  const { data } = useLoaderData() as Response;
  return (
    <>
      <Suspense
        fallback={
          <div>
            <p>Loading</p>
          </div>
        }
      >
        <Await resolve={data}>
          {(post: DbResponse<PostData>) => {
            if (post.success) {
              const p = post.data!;
              return (
                <>
                  <h3 className="text-3xl">{p.title}</h3>
                  <p>{p.body}</p>
                </>
              );
            }
            return (
              <>
                <h3>Error</h3>
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
