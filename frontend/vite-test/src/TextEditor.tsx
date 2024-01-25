import { Typography } from "@mui/material";
import { useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';

let icons = ReactQuill.Quill.import('ui/icons');
icons['table'] = '<i class="fa fa-link" aria-hidden="true"></i>';
Quill.register(icons, true);

export const QuillEditor = () => {
  const [textData, setTextData] = useState("");

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        ["image", "table"]
      ]
    },
  }), []);

  const onChange = (e: string) => {
    setTextData(e);
    console.log(`text: ${textData}`);
  };

  return (
    <div>
      <div>
        <Typography>start from here</Typography>
        <ReactQuill 
          theme="snow"
          modules={modules}
          onChange={(value: string) => onChange(value)}
        />
      </div>
      <div>
        <h3>title here</h3>
        <div dangerouslySetInnerHTML={{
          __html: textData
        }} />
      </div>
    </div>
  );
};