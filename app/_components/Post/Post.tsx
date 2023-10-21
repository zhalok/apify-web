import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Accordion,
  AccordionItem,
  TextInput,
  Flex,
  Loader,
} from "@mantine/core";
import Comments from "../Comments/Comments";
import { useContext, useEffect, useState } from "react";
import axios from "@/utils/axios";
import { IconHeartPlus } from "@tabler/icons-react";
import Cookies from "js-cookie";
import AuthContext from "@/app/_contexts/AuthContext";
import { IconHeartFilled } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { IconPencilCheck, IconTrash } from "@tabler/icons-react";

// import { IconHeartFilled } from "@tabler/icons-react";

// import { Comment } from "postcss";

interface postInfo {
  user: {
    name: string;
  };
  text: string;
  image: string;
  getPosts: any;
}

function Post({ id, username, text, image, userId, getPosts }: any) {
  // console.log(postInfo);
  const [reactions, setReactions] = useState([]);
  const [isReacted, setIsReacted] = useState(false);
  const [updateText, setUpdateText] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [postText, setPostText] = useState(text);

  const { user } = useContext(AuthContext);
  // console.log(user.user);
  // console.log(reactions.map((e) => e?.user?._id));
  // console.log(user && reactions.map((e) => e?.user?._id).includes(user.user));

  // console.log(isReacted);
  const getReactions = () => {
    axios.get("/reactions/" + id).then((res) => {
      // console.log(res.data.reactions);
      setReactions(res.data.reactions);
    });
  };

  const addReaction = async () => {
    axios
      .post(
        "/reactions",
        {
          reactionFor: id,
        },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsReacted(true);
        // getReactions();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeReaction = async () => {
    axios
      .delete("/reactions/" + id, {
        headers: {
          Authorization: "Bearer " + Cookies.get("jwt"),
        },
      })
      .then((res) => {
        setIsReacted(false);
      })
      .catch((e) => {
        // console.log()
        toast.error("Error removing reaction");
      });
  };

  const updatePost = async () => {
    setUpdating(true);
    axios
      .patch(
        "/posts/" + id,
        {
          value: postText,
          field: "text",
        },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUpdating(false);
        toast.success("Post updated");
        setUpdateText(false);
      })
      .catch((e) => {
        setUpdating(false);
        toast.error("Error updating post");
        console.log(e);
      });
  };

  const deletePost = async () => {
    axios
      .delete("/posts/" + id, {
        headers: {
          Authorization: "Bearer " + Cookies.get("jwt"),
        },
      })
      .then(() => {
        getPosts();
        toast.success("Post deleted");
      })
      .catch((e) => {
        toast.error("Error deleting post");
      });
  };

  useEffect(() => {
    getReactions();
  }, []);

  useEffect(() => {
    if (user && reactions.map((e) => e?.user?._id).includes(user.user)) {
      setIsReacted(true);
      // console.log("hello");
    }
  }, [reactions]);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        width: "500px",
      }}
    >
      <Card.Section>
        {image && (
          <Image
            // src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            src={image}
            height={160}
            alt="Norway"
          />
        )}
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <h2>{username}</h2>
        {userId === user?.user && (
          <Flex direction={"column"} gap={7}>
            <Group>
              {!updateText ? (
                <IconPencilCheck
                  style={{
                    marginTop: "20px",
                    marginLeft: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setUpdateText(true);
                  }}
                />
              ) : (
                <Flex direction={"row"} gap={5}>
                  <Button
                    color="green"
                    onClick={() => {
                      updatePost();
                    }}
                  >
                    {updating ? <Loader /> : "Update"}
                  </Button>
                  <Button
                    color="red"
                    variant="outline"
                    onClick={() => {
                      setUpdateText(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Flex>
              )}
            </Group>

            <IconTrash
              style={{
                marginLeft: "auto",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                deletePost();
              }}
            />
          </Flex>
        )}
      </Group>

      {updateText ? (
        <TextInput
          value={postText}
          onChange={(e) => {
            setPostText(e.target.value);
          }}
        />
      ) : (
        <Text size="lg">{postText}</Text>
      )}

      {user && (
        <Group
          style={{
            marginTop: "10px",
            marginLeft: "auto",
            cursor: "pointer",
          }}
        >
          {isReacted ? (
            <IconHeartFilled
              onClick={() => {
                removeReaction();
              }}
            />
          ) : (
            <IconHeartPlus
              onClick={() => {
                addReaction();
              }}
            />
          )}
        </Group>
      )}

      <Comments postId={id} />
    </Card>
  );
}

export default Post;
