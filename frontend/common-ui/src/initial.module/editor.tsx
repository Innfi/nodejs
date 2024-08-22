import { Box, Card, Grid, TextField, Typography } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import { counterSelector } from "../common/state";

const initData: string = `
  <body>
    <p>body starts from here</p>
    <ul>item 1</ul>
    <ul>item 2</ul>
    <ul>item 3</ul>
  </body>
  `;

export const SimpleHtmlEditor = () => {
  const [data, setData] = useState(initData);
  const [counter, setCounter] = useRecoilState(counterSelector);

  const quillRef = useRef<ReactQuill>();
  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ size: ["small", "large"] }],
      ],
    }
  }), []);

  const onChange = (e: string) => {
    setCounter(counter +1);
    setData(e);
  };

  return (
    <Grid container spacing={2} sx={{ display: "flex" }}>
      <Grid item xs={6}>{counter}</Grid>
      <Grid item xs={6}>
        <TextField sx={{
          width: 800,
          "& .MuiInputBase-root": {
            height: 800,
          }
        }}
        multiline 
        rows={50}
        onChange={(e) => onChange(e.target.value)}
        value={data} 
      />
      </Grid>
      <Grid item xs={6}>
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </Grid>
    </Grid>
  );
};
