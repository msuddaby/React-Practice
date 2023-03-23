import { LockOpen } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ClientResponseError } from "pocketbase";
import { createRef, FormEvent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogAlert, BlogAlertType } from "../components/BlogAlert";
import { usePocket } from "../components/PocketContext";

export function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<BlogAlertType>({
    open: false,
    type: "error",
    text: "error",
  });
  const { login } = usePocket();
  const navigate = useNavigate();
  const inputClass = "mb-3";

  const handleSubmit = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();
      //CloseAlert();
      setAlert({ open: false });
      if (usernameRef.current && passwordRef.current) {
        console.log(usernameRef.current.value);
        const result = await login(
          usernameRef.current.value,
          passwordRef.current.value
        );
        if (result instanceof ClientResponseError) {
          setAlert({
            open: true,
            type: "error",
            text: "Login failed, check your username and password!",
          });
          //alert.SetAlert("error", "Login fail!");
        } else {
          //SetAlert("success", "Login success!");
          setAlert({
            open: true,
            type: "success",
            text: "Login success!",
          });
        }
      }
    },
    [login]
  );

  return (
    <>
      <section className="flex justify-center align-middle m-4">
        <div className="flex flex-col max-w-md flex-grow px-4 border rounded border-slate-300">
          <BlogAlert open={alert.open} type={alert.type} text={alert.text} />
          <Typography
            variant="h4"
            component="h2"
            className="py-3 px-1 text-slate-800"
          >
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <div className={inputClass}>
              <TextField
                id="outlined-username"
                fullWidth
                label="Username"
                variant="outlined"
                inputRef={usernameRef}
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
            <Box className="p-2 flex justify-around">
              <Button
                variant="contained"
                color="primary"
                sx={{ mb: 1 }}
                type="submit"
                endIcon={<LockOpen />}
              >
                Log In
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mb: 1 }}
                type="button"
                href="/register"
                endIcon={<LockOpen />}
              >
                Not registered?
              </Button>
            </Box>
          </form>
        </div>
      </section>
    </>
  );
}
