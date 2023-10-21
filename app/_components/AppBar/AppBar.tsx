import { useEffect, useState } from "react";
import { Group, Code, Pill } from "@mantine/core";
import Cookies from "js-cookie";

import {
  IconBellRinging,
  IconSwitchHorizontal,
  IconLogout,
  IconArticle,
  IconNewSection,
} from "@tabler/icons-react";
// import { MantineLogo } from "@mantine/ds";
import classes from "./Appbar.module.css";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
// import { cookies } from "next/headers";

export default function Appbar({ setOpenAddNew }: { setOpenAddNew: Function }) {
  const router = useRouter();
  const [active, setActive] = useState("Billing");
  const [loggedIn, setLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  // const router = useRouter();

  // console.log("jwt", jwt);

  const data = [
    { route: "/feed", label: "News Feed", icon: IconArticle },
    {
      label: "Add New Post",
      icon: IconNewSection,
      onclickEvent: () => {
        setOpenAddNew(true);
      },
    },
    {
      route: "/notifications",
      label: "Notifications",
      icon: IconBellRinging,
    },
  ];

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

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      setLoggedIn(true);
    }
  }, []);

  const links = data.map((item, index) => {
    if (!loggedIn && item.label === "Add New Post") return null;
    // if(item.label === "Notifications") return
    return (
      <div
        className={classes.link}
        data-active={item.label === active || undefined}
        //   href={item.link}
        style={{
          cursor: "pointer",
        }}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          // setActive(item.label);
          if (item.onclickEvent) {
            item.onclickEvent();
            return;
          }
          router.push(item.route);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
        <span
          style={{
            marginLeft: "auto",
          }}
        >
          {item.label === "Notifications" && (
            <Pill>{notifications.length}</Pill>
          )}
        </span>
      </div>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          {/* <MantineLogo size={28} /> */}
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      {loggedIn ? (
        <div className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              Cookies.remove("jwt");
              window.location.reload();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      ) : (
        <div className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              router.push("/login");
            }}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Login</span>
          </a>

          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              router.push("/signup");
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Signup</span>
          </a>
        </div>
      )}
    </nav>
  );
}
