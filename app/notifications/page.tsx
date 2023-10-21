"use client";
import axios from "@/utils/axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Notification from "../_components/Notification/Notification";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const getNotifications = async () => {
    axios
      .get("/notifications/", {
        headers: {
          Authorization: "Bearer " + Cookies.get("jwt"),
        },
      })
      .then((res) => {
        setNotifications(res.data.notifications);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <div>
      {notifications.map((e, index) => {
        return <Notification key={index} notification={e} />;
      })}
    </div>
  );
}
