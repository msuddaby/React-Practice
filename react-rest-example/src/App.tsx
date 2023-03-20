import "./App.css";
import { PostsPage } from "./posts/PostsPage";
import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import { getPosts } from "./posts/getPosts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PostsPage />,
      loader: async () => defer({ posts: getPosts() }),
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;