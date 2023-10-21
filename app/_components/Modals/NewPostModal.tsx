import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  FileButton,
  FileInput,
  Flex,
  Group,
  Modal,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useState } from "react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { IconPhoto } from "@tabler/icons-react";
import axios from "@/utils/axios";
import storage from "@/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {
  opened: boolean;
  close: () => void;
}

function CreateNewPost({ opened, close }: Props) {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const uploadImage = async (image: any) => {
    const storageRef = ref(storage, `posts/${uuidv4()}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const addNewPost = async () => {
    const uid = uuidv4();
    console.log(uid);
    // console.log(uid);
    // console.log(photo);
    // const storageRef = ref(storage, `posts/${uid}`);
    const url = await uploadImage(photo);
    console.log(url);
    // await uploadBytes(storageRef, photo as Blob);
  };

  return (
    <Modal opened={opened} onClose={close} title="Add a new Post" centered>
      <Flex direction={"column"} wrap={"wrap"} gap={"md"}>
        <Textarea
          placeholder="Please write your thoughts"
          label="What's in your mind?"
          autosize
          minRows={2}
          size="xl"
          value={text}
          onChange={(event) => {
            setText(event.currentTarget.value);
          }}
        />

        <Group justify="center">
          <FileButton onChange={setPhoto} accept="image/png,image/jpeg">
            {(props) => (
              <Button
                {...props}
                fullWidth
                leftSection={!photo && <IconPhoto />}
                variant="default"
              >
                {photo?.name ? photo?.name : "Pick a photo"}
              </Button>
            )}
          </FileButton>
        </Group>

        <Group justify="center">
          <Button fullWidth onClick={addNewPost}>
            Post
          </Button>
        </Group>
      </Flex>
    </Modal>
  );
}

export default CreateNewPost;
