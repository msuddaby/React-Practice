import { usePocket } from "./components/PocketContext";
import { assertIsUser, User } from "./db/types";

export function Header() {
  const { user } = usePocket();
  const isUser = assertIsUser(user);

  return (
    <header className="text-center text-slate-50 bg-slate-900 h-40 p-5">
      <h1 className="text-2xl">Blog</h1>
      <p>{isUser ? <>Hello, {`${user.username}`}</> : <>Log In</>}</p>
    </header>
  );
}
