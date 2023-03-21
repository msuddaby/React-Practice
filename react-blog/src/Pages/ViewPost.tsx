import { Suspense } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { DbResponse, PostData } from "../db/types";
import { DbErrorPage } from "./DbErrorPage";

type Response = {
  data: DbResponse<PostData>;
};

export function ViewPost() {
  const { data } = useLoaderData() as Response;
  const history = useNavigate();
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
              const created = new Date(p.created);
              return (
                <>
                  <div className="max-w-screen-xl mx-auto my-16">
                    <div className="flex justify-center align-middle">
                      <div className="flex-grow border px-6 pt-4 pb-6 rounded border-slate-200">
                        <div className="border-b-2">
                          <a
                            href="#"
                            className="text-sky-800"
                            onClick={() => history(-1)}
                          >
                            &lt; Back
                          </a>
                          <h3 className="text-3xl pb-2">{p.title}</h3>
                          <p className="text-sm">
                            {created.toLocaleDateString()}
                          </p>
                        </div>
                        <p className="mt-4 whitespace-pre-line">{p.body}</p>
                        <a
                          href="#"
                          className="text-sky-800"
                          onClick={() => history(`/edit/${p.id}/`)}
                        >
                          Edit
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
            return (
              <>
                return <DbErrorPage error={post.error!}></DbErrorPage>
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
