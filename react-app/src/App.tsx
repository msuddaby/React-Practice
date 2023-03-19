import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState, useEffect } from "react";
import { PostsRecord } from "./data/pocketbase-types";
import { getAllPosts } from "./data/posts";
import { PersonScore } from "./components/PersonScore";
import IndividualPost from "./components/IndividualPost";

function App() {
  const [posts, setPosts] = useState<PostsRecord[]>([]);

  useEffect(() => {
    async function getPosts() {
      const result = await getAllPosts();
      setPosts(result);
    }
    getPosts();
  }, []);

  return (
    <div className="p-3">
      {posts.map((post) => (
        <IndividualPost post={post} />
      ))}
    </div>
  );
}

export default App;
