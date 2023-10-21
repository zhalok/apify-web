import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Accordion,
  AccordionItem,
} from "@mantine/core";
import Comments from "../Comments/Comments";
// import { Comment } from "postcss";

interface postInfo {
  user: {
    name: string;
  };
  text: string;
  image: string;
}

function Post({ id, user, text, image }: any) {
  // console.log(postInfo);
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
        <Image
          // src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          src={image}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <h2>{user}</h2>
      </Group>

      <Text size="lg">{text}</Text>

      <Comments postId={id} />
    </Card>
  );
}

export default Post;
