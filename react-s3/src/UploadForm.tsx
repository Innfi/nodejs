import React from 'react';
import axios, { AxiosResponse } from 'axios';


export const UploadForm = () => {

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    axios.post('http://localhost:1330', data)
      .then((value: AxiosResponse<any>) => {
        console.log(`status: ${value.status}`);
      })
      .catch((err: any) => {
        console.log(`err: ${err}`);
      });
  };

  return (
  <div>
    <form action="info" method="post" encType="multipart/form-data" 
      onSubmit={(e) => onSubmit(e)}>
    <label htmlFor="file">file</label>
    <input type="file" name="file" id="file" required />
    <input type="submit" />
    </form>
  </div>
  );
};