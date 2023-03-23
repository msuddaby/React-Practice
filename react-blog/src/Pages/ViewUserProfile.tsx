import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { assertIsUser, User } from "../db/types";
import { DbErrorPage } from "./DbErrorPage";

type Props = {
  user: User;
};

export function ViewUserProfile() {
  const { user } = useLoaderData() as Props;

  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={user}>
          {(user: User) => {
            const isUser = assertIsUser(user);
            if (!isUser) {
              return (
                <>
                  <DbErrorPage error={user} />
                </>
              );
            }
            return (
              <>
                <div className="max-w-screen-xl mx-auto my-16">
                  <div className="flex justify-center align-middle">
                    <div className="flex-grow border px-6 pt-4 pb-6 rounded border-slate-200">
                      <div className="border-b-2">
                        <h3 className="text-3xl pb-2">{user.username}</h3>
                      </div>
                      <p className="mt-4 whitespace-pre-line">bio</p>
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
