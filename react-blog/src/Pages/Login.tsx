import { TextField } from "@mui/material";
import { FormEvent, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePocket } from "../components/PocketContext";

export function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = usePocket();
  const navigate = useNavigate();
  const inputClass = "mb-3";

  const handleSubmit = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();
      if (usernameRef.current && passwordRef.current) {
        console.log(usernameRef.current.value);
        await login(usernameRef.current.value, passwordRef.current.value);
        navigate("");
      }
    },
    [login]
  );

  return (
    <>
      <section className="flex flex-col">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className={inputClass}>
            <TextField
              id="outlined-username"
              label="Username"
              variant="outlined"
              inputRef={usernameRef}
            />
          </div>
          <div className={inputClass}>
            <TextField
              id="outlined-password"
              label="Password"
              type="password"
              variant="outlined"
              inputRef={passwordRef}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}
