"use client";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {};
  // useEffect(() => {
  //   axios.get("/posts").then((res) => {});
  // }, []);
  return <div>Hello</div>;
}
