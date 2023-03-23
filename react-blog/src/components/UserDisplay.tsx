import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { assertIsUser } from "../db/types";
import { usePocket } from "./PocketContext";

export function UserDisplay() {
  const { user, logout } = usePocket();
  const isUser = assertIsUser(user);
  const navigate = useNavigate();

  const containerStyle = "p-2 flex justify-between";
  console.log(JSON.stringify(user));
  console.log(isUser);
  if (isUser) {
    return (
      <>
        <Box className={containerStyle}>
          <p>Hello, {user.username}!</p>
          <Button variant="text" onClick={() => logout()}>
            Sign Out
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <p>Hello!</p>
      <Box className={containerStyle}>
        <Button variant="outlined" onClick={() => navigate("/register")}>
          Register
        </Button>
        <Button variant="outlined" onClick={() => navigate("/login")}>
          Log in
        </Button>
      </Box>
    </>
  );
}
