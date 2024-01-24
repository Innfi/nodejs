import { Typography } from "@mui/material";
import { useMemo } from "react";
import ReactQuill from "react-quill";

export const QuillEditor = () => {
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ["bold", "italic", "underline"]
      ]
    }
  }), []);

  return (
    <div>
      <Typography>start from here</Typography>
      <ReactQuill 
        theme="snow"
        modules={modules}
      />
    </div>
  );
};