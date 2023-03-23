import { useNavigate } from "react-router";
import { UserDisplay } from "./components/UserDisplay";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="text-center text-slate-50 bg-slate-900 h-40 p-5">
      <h1 onClick={() => navigate("/")} className="text-2xl cursor-pointer">
        Blog
      </h1>
      <div className="max-w-xs m-auto">
        <UserDisplay />
      </div>
    </header>
  );
}
