import TextField from "@mui/material/TextField";
import { FormEvent, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePocket } from "../components/PocketContext";

export const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const { register } = usePocket();
  const navigate = useNavigate();

  const inputClass = "mb-3";

  const handleSubmit = useCallback(
    async (evt: FormEvent) => {
      evt?.preventDefault();
      if (emailRef.current && passwordRef.current && usernameRef.current) {
        console.log(emailRef.current.value);
        console.log(usernameRef.current.value);
        await register(
          emailRef.current.value,
          passwordRef.current.value,
          usernameRef.current.value
        );
        navigate("/sign-in");
      }
    },
    [register]
  );
  return (
    <section className="flex flex-col">
      <h2>Sign Up</h2>
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
