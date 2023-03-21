import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import App from "./App";
import { getPostById, getPosts } from "./db/getPosts";
import { HomePage } from "./Pages/Home";
import { ViewPost } from "./Pages/ViewPost";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: async () => {
          const existingData = queryClient.getQueryData(["blogPosts"]);
          if (existingData) {
            return defer({ posts: existingData });
          }
          return defer({
            posts: queryClient.fetchQuery(["blogPosts"], getPosts),
          });
        },
      },
      {
        path: "view/:id",
        element: <ViewPost />,
        loader: async ({ params }) => {
          if (params.id === undefined) {
            return;
          }
          const existingData = queryClient.getQueryData([
            "blogPost",
            params.id,
          ]);
          if (existingData) {
            return defer({ data: existingData });
          } else {
            return defer({
              data: queryClient.fetchQuery(
                ["blogPost", params.id],
                async () => {
                  return getPostById(params.id!);
                }
              ),
            });
          }
        },
      },
    ],
  },
]);

export function Routes() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
