import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Children, Suspense } from "react";
import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import App from "./App";
import { Protected } from "./components/Protected";
import { RequireAdmin } from "./components/RequireAdmin";
import { RequireAuth } from "./components/RequireAuth";
import { getPostById, getPosts } from "./db/getPosts";
import { EditPost } from "./Pages/EditPost";
import { HomePage } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/Register";
import { ViewPost } from "./Pages/ViewPost";
import { CssVarsProvider } from "@mui/joy/styles";
import { ViewUserProfile } from "./Pages/ViewUserProfile";
import { getUserByUsername } from "./db/getUser";

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
      {
        path: "edit/:id",
        element: <EditPost />,
        loader: async ({ params }) => {
          if (params.id === undefined) {
            return;
          }
          const existingData = queryClient.getQueryData([
            "blogPost",
            params.id,
          ]);
          console.log(existingData);
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
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "profile/:username",
        element: <ViewUserProfile />,
        loader: async ({ params }) => {
          if (params.username === undefined) {
            return;
          }
          return defer({
            user: queryClient.fetchQuery(
              ["user", params.username],
              async () => {
                return getUserByUsername(params.username!);
              }
            ),
          });
        },
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/protected",
            element: <Protected />,
          },
        ],
      },
      {
        element: <RequireAdmin />,
        children: [
          {
            path: "/admin-protected",
            element: <Protected />,
          },
        ],
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
