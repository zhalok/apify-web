import AuthContext from "@/app/_contexts/AuthContext";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Flex,
  Loader,
  TextInput,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { IconPencilSearch, IconTrash } from "@tabler/icons-react";
import axios from "@/utils/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { IconPencilCheck } from "@tabler/icons-react";
import Replies from "../Replies/Replies";
// import Cookies from "js-cookie";
// import { set } from "firebase/database";

export default function Comment({
  comment,
  getComments,
}: {
  comment: any;
  getComments: any;
}) {
  //   console.log(comment);
  // @ts-ignore
  const { user, setUser }: { user: string; setUser: () => void } =
    useContext(AuthContext);

  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [doUpdate, setDoUpdate] = useState(false);
  const [newComment, setNewComment] = useState(comment?.text);

  const updateComment = async () => {
    // setDoUpdate
    setUpdating(true);
    axios
      .patch(
        "/comments/" + comment._id,
        {
          text: newComment,
        },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then((res) => {
        // getComments();
        setDoUpdate(false);
        setUpdating(false);
        toast.success("Comment updated");
        setNewComment(res.data.comment.text);
      })
      .catch((e) => {
        setDoUpdate(false);
        setUpdating(false);
        toast.error("Error updating comment");
      });
  };

  const deleteComment = async () => {
    setDeleting(true);

    axios
      .delete("/comments/" + comment._id, {
        headers: {
          Authorization: "Bearer " + Cookies.get("jwt"),
        },
      })
      .then((res) => {
        toast.success("Comment deleted");
        getComments();
        setDeleting(false);
      })
      .catch((e) => {
        toast.error("Error deleting comment");

        setDeleting(false);
      });
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        marginTop: "10px",
      }}
    >
      <Text size="lg">
        <b>{comment?.user?.username}</b>
      </Text>

      <Flex direction={"row"} gap={2}>
        {!doUpdate ? (
          <Text size="sm">{newComment}</Text>
        ) : (
          <>
            <TextInput
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
            />
            {doUpdate && (
              <Button
                onClick={() => {
                  updateComment();
                }}
              >
                {updating ? <Loader /> : "Update"}
              </Button>
            )}
          </>
        )}
        {/* @ts-ignore */}
        {user?.user == comment?.user?._id && !deleting && !updating && (
          <Flex direction={"row"} ml={"auto"} gap={10}>
            <IconPencilSearch
              cursor={"pointer"}
              onClick={() => {
                setDoUpdate((prev) => !prev);
              }}
            />
            <IconTrash
              cursor={"pointer"}
              onClick={() => {
                deleteComment();
              }}
            />
          </Flex>
        )}
      </Flex>
      <Replies comment={comment} />
    </Card>
  );
}
