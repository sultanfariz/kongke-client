import axios from 'axios';
import { parseCookies } from 'nookies';

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${parseCookies()['token']}`,
    post: {
      'Content-Type': 'application/json',
    },
  },
});

const cloudinaryUploadApi = async (picture) => {
  if (!picture) return;
  const formData = new FormData();
  formData.append('file', picture);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

  return await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, {
    method: 'post',
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      return data.secure_url;
    })
    .catch((err) => err);
};

export { baseApi, cloudinaryUploadApi };
