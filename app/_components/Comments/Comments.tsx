import {
  Accordion,
  AccordionItem,
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  Group,
  Paper,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import CommentBox from "./CommentBos";
import AuthContext from "@/app/_contexts/AuthContext";
import { AuthContextType } from "@/app/_contexts/AuthContext";

export default function Comments({ postId }: { postId: any }) {
  const [comments, setComments] = useState([]);

  const [opened, { toggle }] = useDisclosure(false);

  //@ts-ignore
  const { user } = useContext(AuthContext);

  const getComments = async () => {
    axios
      .get("/comments/all/" + postId)
      .then((res) => {
        console.log("comments", res.data.comments);
        setComments(res.data.comments);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Accordion defaultValue="Apples">
      {
        <Accordion.Item key={1} value={"Comments"}>
          <Accordion.Control>{"Comments"}</Accordion.Control>
          <Accordion.Panel>
            {user && <CommentBox getComments={getComments} postId={postId} />}
            {comments.map((e) => {
              return <Comment comment={e} getComments={getComments} />;
            })}
          </Accordion.Panel>
        </Accordion.Item>
      }
    </Accordion>
  );
}
