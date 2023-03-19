import { useReducer } from "react";
import { Header } from "./Header";
import { MainApp } from "./MainApp";
import { authenticate, User } from "./api/authenticate";
import { authorize } from "./api/authorize";
import "./App.css";

type State = {
  user: undefined | User;
  permissions: undefined | string[];
  loading: boolean;
};
const initialState: State = {
  user: undefined,
  permissions: undefined,
  loading: false,
};
type Action =
  | {
      type: "authenticate";
    }
  | {
      type: "authenticated";
      user: User | undefined;
    }
  | {
      type: "authorize";
    }
  | {
      type: "authorized";
      permissions: string[];
    };
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "authenticate":
      return { ...state, loading: true };
    case "authenticated":
      return { ...state, loading: false, user: action.user };
    case "authorize":
      return { ...state, loading: true };
    case "authorized":
      return { ...state, loading: false, permissions: action.permissions };
    default:
      return state;
  }
}

function App() {
  const [{ user, permissions, loading }, dispactch] = useReducer(
    reducer,
    initialState
  );

  async function handleSignInClick() {
    dispactch({ type: "authenticate" });
    const authenticatedUser = await authenticate();
    dispactch({
      type: "authenticated",
      user: authenticatedUser,
    });
    if (authenticatedUser !== undefined) {
      dispactch({ type: "authorize" });
      const authorizedPermissions = await authorize(authenticatedUser.id);
      dispactch({
        type: "authorized",
        permissions: authorizedPermissions,
      });
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Header user={user} onSignInClick={handleSignInClick} loading={loading} />
      <MainApp user={user} permissions={permissions} />
    </div>
  );
}

export default App;
