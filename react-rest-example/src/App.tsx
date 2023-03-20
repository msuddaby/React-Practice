import "./App.css";
import { PostsPage } from "./posts/PostsPage";
import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import { getPosts } from "./posts/getPosts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PostsPage />,
      loader: async () => defer({ posts: getPosts() }),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
