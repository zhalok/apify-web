import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  FileButton,
  FileInput,
  Flex,
  Group,
  Loader,
  Modal,
  Notification,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useContext, useState } from "react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { IconPhoto } from "@tabler/icons-react";
import axios from "@/utils/axios";
import storage from "@/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { IconX, IconCheck } from "@tabler/icons-react";
import { set } from "firebase/database";
import ReRenderContext from "@/app/_contexts/ReRenderContext";

interface Props {
  opened: boolean;
  close: () => void;
}

function CreateNewPost({ opened, close }: Props) {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    show: false,
    color: "",
    tittle: "",
    icon: "",
  });

  // @ts-ignore
  const { setReRenderer } = useContext(ReRenderContext);

  const uploadImage = async (image: any) => {
    const storageRef = ref(storage, `posts/${uuidv4()}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const addNewPost = async (e: any) => {
    e.preventDefault();
    if (!text) {
      toast.error("Please write something");

      return;
    }
    setUploading(true);
    try {
      const url = photo ? await uploadImage(photo) : null;
      const response = await axios.post(
        "/posts",
        {
          text,
          image: url,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );
      toast.success("Post added successfully");

      setReRenderer({});
      setUploading(false);
      // set
      setText("");
      setPhoto(null);
      close();
      // console.log(response.data);
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Add a new Post" centered>
      {/* <ToastContainer /> */}

      <form onSubmit={addNewPost}>
        <Flex direction={"column"} wrap={"wrap"} gap={"md"}>
          <Textarea
            required
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
              {uploading ? <Loader /> : "Post"}
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  );
}

export default CreateNewPost;
