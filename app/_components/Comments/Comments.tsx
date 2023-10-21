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
import { useEffect, useState } from "react";
import Comment from "./Comment";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import CommentBox from "./CommentBos";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  const [opened, { toggle }] = useDisclosure(false);

  const getComments = async () => {
    axios
      .get("/comments/all/" + postId)
      .then((res) => {
        console.log("comments", res.data.comments);
        setComments(res.data.comments);
      })
      .catch((e) => {
        // toast.error("Error getting comments");
        console.log(e);
      });
    // console.log(response.data.comments);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    // <Box maw={400} mx="auto">
    //   <Group justify="center" mb={5}>
    //     <Button onClick={toggle}>Toggle content</Button>
    //   </Group>

    //   <Collapse in={opened}>
    //     <Text>{/* ... content */}</Text>
    //   </Collapse>
    // </Box>
    <Accordion defaultValue="Apples">
      {
        <Accordion.Item key={1} value={"Comments"}>
          <Accordion.Control>{"Comments"}</Accordion.Control>
          <Accordion.Panel>
            <CommentBox getComments={getComments} postId={postId} />
            {comments.map((e) => {
              return <Comment comment={e} />;
            })}
          </Accordion.Panel>
        </Accordion.Item>
      }
    </Accordion>
  );
}
