import axios from "@/utils/axios";
import { Button, Flex, Loader, TextInput } from "@mantine/core";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function CommentBox({
  getComments,
  postId,
}: {
  getComments: () => void;
  postId: string;
}) {
  const [text, setText] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const addComment = async () => {
    if (!text) {
      toast.error("Please write something");
      return;
    }
    setAddingComment(true);
    axios
      .post(
        "/comments",
        {
          text,
          post: postId,
        },
        {
          headers: {
            // @ts-ignore
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then((res) => {
        setText("");
        getComments();
        setAddingComment(false);
        toast.success("Comment added");
      })
      .catch((e) => {
        toast.error("Error adding comment");
        setAddingComment(false);
      });
  };

  return (
    <Flex direction={"row"} gap={2}>
      <TextInput
        placeholder="Add a comment"
        style={{
          width: "75%",
        }}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button
        style={{
          width: "20%",
          marginLeft: "auto",
        }}
        onClick={() => {
          addComment();
        }}
      >
        {addingComment ? <Loader /> : "Add"}
      </Button>
    </Flex>
  );
}
