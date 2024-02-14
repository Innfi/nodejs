import { Typography } from "@mui/material";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import '../index.css';

export const EditorCK = () => {
  const initialData = "<p>start from here</p>";

  return (
    <div className="editor">
      <Typography variant="body1">typo</Typography>
      <CKEditor 
        editor={ClassicEditor}
        data={initialData}
        onChange={(e) => console.log(e)}
      />
    </div>
  );
};