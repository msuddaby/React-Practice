import TextField from "@mui/material/TextField";
import { ClientResponseError, ListResult } from "pocketbase";
import { FormEvent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogAlert, BlogAlertType } from "../components/BlogAlert";
import { usePocket } from "../components/PocketContext";
import { User } from "../db/types";

export const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const { register } = usePocket();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<BlogAlertType>({
    open: false,
    type: "error",
    text: "error",
  });

  const inputClass = "mb-3";

  const handleSubmit = useCallback(
    async (evt: FormEvent) => {
      evt?.preventDefault();
      setAlert({ open: false });
      if (emailRef.current && passwordRef.current && usernameRef.current) {
        const result = await register(
          emailRef.current.value,
          passwordRef.current.value,
          usernameRef.current.value
        );
        if (result instanceof ClientResponseError) {
          setAlert({
            open: true,
            type: "error",
            text: `An error occured while registering. ${result.message}`,
          });
        } else if (result !== undefined) {
          setAlert({
            open: true,
            type: "success",
            text: `Registration success! Welcome ${result.username}`,
          });
        }
      }
    },
    [register]
  );
  return (
    <section className="flex flex-col">
      <h2>Sign Up</h2>
      <BlogAlert open={alert.open} text={alert.text} type={alert.type} />
      <form onSubmit={handleSubmit}>
        <div className={inputClass}>
          <TextField
            id="outlined-username"
            label="Username"
            variant="outlined"
            ref={usernameRef}
          />
        </div>
        <div className={inputClass}>
          <TextField
            id="outlined-email"
            label="Email"
            variant="outlined"
            ref={emailRef}
          />
        </div>
        <div className={inputClass}>
          <TextField
            id="outlined-password"
            label="Password"
            type="password"
            variant="outlined"
            ref={passwordRef}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
