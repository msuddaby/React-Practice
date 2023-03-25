import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../../lib/context";
import { useUserData } from "../../lib/hooks";
import "firebase/compat/auth";

export default function App({ Component, pageProps }: AppProps) {
  const { user, username } = useUserData();

  return (
    <>
      <UserContext.Provider value={{ user, username }}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}
