import { useNavigate } from "react-router-dom";
import { PostData } from "../db/types";

type Props = {
  response: PostData[];
};

export function PostsList({ response }: Props) {
  const navigation = useNavigate();
  return (
    <div className="flex align-middle justify-center">
      <div className="sm:grid-cols-1 md:grid-cols-3 grid gap-4 mx-auto max-w-screen-xl lg:mx-0">
        {response.map((post) => (
          <article
            key={post.id}
            className="flex flex-col items-start border rounded p-4 cursor-pointer hover:bg-slate-100 hover:scale-110 transition ease-in-out"
            onClick={() => navigation(`view/${post.id}`, {})}
          >
            <div className="">
              <h3 className="text-slate-900 font-bold break-all mb-3">
                {post.title}
              </h3>
            </div>

            <p className="text-slate-800 break-all">
              {post.body.length > 50
                ? `${post.body.slice(0, 50)}...`
                : post.body}
              {}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
