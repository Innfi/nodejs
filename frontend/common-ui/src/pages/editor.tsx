import { Box, Card, Grid, Typography } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

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
    setData(e);
  };

  return (
    <Grid container spacing={2} sx={{ display: "flex" }}>
      <Grid item xs={6}>
        <ReactQuill 
          ref={(element: ReactQuill) => {
            if (!element) return;

            quillRef.current = element;
          }}
          modules={quillModules} 
          theme="snow"
          placeholder="edit from here"
          value={data}
          onChange={(e) => onChange(e)}
        />
      </Grid>
      <Grid item xs={6}>
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </Grid>
    </Grid>
  );
};

/**
 * 
        <Box sx={{ minWidth: 300, minHeight: 400}}>
          <Card variant="outlined">
            <Typography variant="body2" gutterBottom>
              {data}
            </Typography>
          </Card>
        </Box>
 */