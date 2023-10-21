import axios from "@/utils/axios";
import { Button, Flex, Loader, TextInput } from "@mantine/core";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function ReplyBox({
  getReplies,
  commentId,
}: {
  getReplies: () => void;
  commentId: string;
}) {
  const [text, setText] = useState("");
  const [addingReply, setAddingReply] = useState(false);
  const addReply = async () => {
    if (!text) {
      toast.error("Please write something");
      return;
    }
    setAddingReply(true);
    axios
      .post(
        "/replies",
        {
          text,
          comment: commentId,
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
        getReplies();
        setAddingReply(false);
        toast.success("Comment added");
      })
      .catch((e) => {
        toast.error("Error adding comment");
        setAddingReply(false);
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
          addReply();
        }}
      >
        {addingReply ? <Loader /> : "Add"}
      </Button>
    </Flex>
  );
}
