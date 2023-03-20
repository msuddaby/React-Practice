import { useReducer } from "react";
import { Header } from "./Header";
import { MainApp } from "./MainApp";
import { authenticate, User } from "./api/authenticate";
import { authorize } from "./api/authorize";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Provider store={store}>
        <Header />
        <MainApp />
      </Provider>
    </div>
  );
}

export default App;
