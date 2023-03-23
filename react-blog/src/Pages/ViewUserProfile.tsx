import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

type Props = {
  username: string;
};

export function ViewUserProfile() {
  const { username } = useLoaderData() as Props;

  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={username}>
          <h2>Profile: {username}</h2>
        </Await>
      </Suspense>
    </>
  );
}
