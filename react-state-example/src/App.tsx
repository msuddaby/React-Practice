import { useReducer } from "react";
import { Header } from "./Header";
import { MainApp } from "./MainApp";
import { authenticate, User } from "./api/authenticate";
import { authorize } from "./api/authorize";
import "./App.css";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <AppProvider>
        <Header />
        <MainApp />
      </AppProvider>
    </div>
  );
}

export default App;
