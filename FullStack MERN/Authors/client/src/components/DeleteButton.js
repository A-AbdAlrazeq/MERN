import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
const DeleteButton = ({ onClick }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button size="small" variant="outlined" color="error" onClick={onClick}>
        <DeleteIcon fontSize="small" />
      </Button>
    </Stack>
  );
};

export default DeleteButton;
