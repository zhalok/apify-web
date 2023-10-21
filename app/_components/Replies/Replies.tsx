import axios from "@/utils/axios";
import { useContext, useEffect, useState } from "react";
import Reply from "./Reply";
import { Accordion } from "@mantine/core";
import AuthContext from "@/app/_contexts/AuthContext";
import ReplyBox from "./ReplyBox";

export default function Replies({ comment }: { comment: any }) {
  const [replies, setReplies] = useState([]);
  // @ts-ignore
  const { user } = useContext(AuthContext);

  const getReplies = async () => {
    axios
      .get("/replies/all/" + comment._id)
      .then((res) => {
        console.log("replies", res.data.replies);
        setReplies(res.data.replies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getReplies();
  }, []);

  return (
    <div>
      <Accordion>
        {
          <Accordion.Item key={1} value={"Replies"}>
            <Accordion.Control>{"Replies"}</Accordion.Control>
            <Accordion.Panel>
              {user && (
                <ReplyBox getReplies={getReplies} commentId={comment?._id} />
              )}
              {replies.map((e) => {
                return <Reply reply={e} getReplies={getReplies} />;
              })}
            </Accordion.Panel>
          </Accordion.Item>
        }
      </Accordion>
    </div>
  );
}
