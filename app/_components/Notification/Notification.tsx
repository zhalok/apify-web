import { Card, Text } from "@mantine/core";

export default function Notification({ notification }: { notification: any }) {
  console.log(notification);
  return (
    <div>
      <Card
        // padding="xl"
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          width: "500px",
          marginTop: "10px",
        }}
      >
        {/* top, right, left margins are negative – -1 * theme.spacing.xl */}
        <Card.Section style={{ padding: "10px" }}>
          <Text size="lg">{`${notification.text} by ${notification?.commenter?.username}`}</Text>
          <Text size="sm" mt={5}>
            <b>Post:</b> {notification?.post?.text}
          </Text>
          <Text size="sm" mt={5}>
            <b>Comment:</b> {notification?.comment?.text}
          </Text>
        </Card.Section>
      </Card>
    </div>
  );
}
