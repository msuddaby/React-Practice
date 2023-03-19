import { PostsRecord } from "../data/pocketbase-types";

interface Props {
  post: PostsRecord;
}

function IndividualPost({ post }: Props) {
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
}

export default IndividualPost;
