import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SimplePageSecond = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h1" component="h2">page 2</Typography>
      <Button onClick={() => navigate(-1)}>Previous page</Button>
    </div>
  );
};