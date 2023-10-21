import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE,
  headers: {
    "Content-type": "application/json",
  },
});
