"use client";
/* eslint-disable */
import axios from "@/utils/axios";
import { Flex } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import Post from "../_components/Post/Post";
import ReRenderContext from "../_contexts/ReRenderContext";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  // @ts-ignore
  const { reRenderer } = useContext(ReRenderContext);

  const getPosts = async () => {
    setPostsLoading(true);
    axios
      .get("/posts")
      .then((res) => {
        console.log(res.data.posts);
        setPosts(res.data.posts);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        console.log("finally executing");
      });
  };
  console.log(posts);

  useEffect(() => {
    getPosts();
  }, [reRenderer]);

  // useEffect(getPosts,[])

  // useEffect(() => {
  //   axios.get("/posts").then((res) => {});
  // }, []);
  if (posts.length === 0)
    return (
      <div>
        <h1>No posts found</h1>
      </div>
    );
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          width: "100%",
          height: "100vh",

          rowGap: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
        }}
      >
        {posts.map((post, index) => {
          return (
            <div key={index}>
              <Post
                // @ts-ignore
                id={post?._id}
                // @ts-ignore
                username={post?.user?.username}
                // @ts-ignore
                image={post?.image}
                // @ts-ignore
                text={post?.text}
                // @ts-ignore
                userId={post?.user?._id}
                getPosts={getPosts}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
