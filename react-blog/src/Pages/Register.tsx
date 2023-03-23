import { LockOpen } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
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
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
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
      if (
        emailRef.current &&
        passwordRef.current &&
        usernameRef.current &&
        confirmPasswordRef.current
      ) {
        const result = await register(
          emailRef.current.value,
          passwordRef.current.value,
          usernameRef.current.value,
          confirmPasswordRef.current.value
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
    <section className="flex justify-center align-middle m-4">
      <div className="flex flex-col max-w-md flex-grow px-4 border rounded border-slate-300">
        <BlogAlert open={alert.open} type={alert.type} text={alert.text} />
        <Typography
          variant="h4"
          component="h2"
          className="py-3 px-1 text-slate-800"
        >
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className={inputClass}>
            <TextField
              id="outlined-username"
              fullWidth
              label="Username"
              type="text"
              variant="outlined"
              inputRef={usernameRef}
            />
          </div>
          <div className={inputClass}>
            <TextField
              id="outlined-email"
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              inputRef={emailRef}
            />
          </div>
          <div className={inputClass}>
            <TextField
              id="outlined-password"
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              inputRef={passwordRef}
            />
          </div>
          <div className={inputClass}>
            <TextField
              id="outlined-password"
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              inputRef={confirmPasswordRef}
            />
          </div>
          <Box className="p-2 flex justify-around">
            <Button
              variant="contained"
              color="primary"
              sx={{ mb: 1 }}
              type="submit"
              endIcon={<LockOpen />}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mb: 1 }}
              type="button"
              onClick={() => {
                navigate("/login");
              }}
              endIcon={<LockOpen />}
            >
              Already registered?
            </Button>
          </Box>
        </form>
      </div>
    </section>
  );
};
