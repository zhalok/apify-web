"use client";
import axios from "@/utils/axios";
import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import Post from "../_components/Post/Post";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
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

  useEffect(() => {
    getPosts();
  }, []);

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
          // width: "100%",
          // width: "70%",
          width: "100%",
          height: "100vh",
          // overflowY: "scroll",
          rowGap: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
        }}
      >
        {posts.map((post) => {
          return (
            <div>
              <Post
                id={post?._id}
                user={post?.user?.username}
                image={post?.image}
                text={post?.text}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
