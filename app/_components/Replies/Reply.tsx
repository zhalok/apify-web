import axios from "@/utils/axios";
import { Button, Card, Flex, Loader, Text, TextInput } from "@mantine/core";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import AuthContext from "@/app/_contexts/AuthContext";
import { IconPencilSearch, IconTrash } from "@tabler/icons-react";

export default function Reply({
  reply,
  getReplies,
}: {
  reply: any;
  getReplies: any;
}) {
  //   console.log(reply);
  const [text, setText] = useState(reply?.text);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [doUpdate, setDoUpdate] = useState(false);

  // @ts-ignore
  const { user } = useContext(AuthContext);

  const updateReply = async () => {
    // setDoUpdate
    setUpdating(true);
    axios
      .patch(
        "/replies/" + reply._id,
        {
          text,
        },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then((res) => {
        setDoUpdate(false);
        setUpdating(false);
        toast.success("Reply updated");
        setText(res.data.reply.text);
      })
      .catch((e) => {
        setDoUpdate(false);
        setUpdating(false);
        toast.error("Error updating reply");
      });
  };

  const deleteReply = async () => {
    setDeleting(true);
    axios
      .delete("/replies/" + reply._id, {
        headers: {
          Authorization: "Bearer " + Cookies.get("jwt"),
        },
      })
      .then((res) => {
        getReplies();
        setDeleting(false);
        toast.success("Reply deleted");
      })
      .catch((e) => {
        setDeleting(false);
        toast.error("Error deleting reply");
      });
  };

  return (
    <div>
      <Card
        // padding="xl"
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          //   width: "500px",
          marginTop: "10px",
        }}
      >
        <Text size="lg">
          <b>{reply?.user?.username}</b>
        </Text>

        {/* <Text>{text}</Text>
         */}
        <Flex direction={"row"} gap={2}>
          {!doUpdate ? (
            <Text size="sm">{text}</Text>
          ) : (
            <>
              <TextInput
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              {doUpdate && (
                <Button
                  onClick={() => {
                    // updateComment();
                    updateReply();
                  }}
                >
                  {updating ? <Loader /> : "Update"}
                </Button>
              )}
            </>
          )}
          {/* @ts-ignore */}
          {user?.user == reply?.user?._id && !deleting && !updating && (
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
                  //   deleteComment();
                  deleteReply();
                }}
              />
            </Flex>
          )}
        </Flex>
      </Card>
    </div>
  );
}
