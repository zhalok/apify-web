import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

export default function Comment({ comment }: { comment: any }) {
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
      {/* <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section> */}

      <Text size="sm">{comment?.text}</Text>
    </Card>
  );
}
