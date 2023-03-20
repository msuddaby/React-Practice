import { useAppContext } from "./AppContext";
import { Content } from "./Content";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "./store/store";

export function MainApp() {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <main className="py-8">
      <h1 className="text-3xl text-center font-bold underline">Welcome</h1>
      <p className="mt-8 text-xl text-center">
        {user ? `Hello ${user.name}!` : "Please sign in."}
      </p>
      <Content />
    </main>
  );
}
