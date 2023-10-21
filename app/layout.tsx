"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import Appbar from "./_components/AppBar/AppBar";

import Cookies from "js-cookie";
import CreateNewPost from "./_components/Modals/NewPostModal";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./_contexts/AuthContext";
import jwtDecode from "jwt-decode";
import ReRenderContext from "./_contexts/ReRenderContext";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log("hello");
  // const jwt = Cookies.get("jwt");
  // console.log("jwt", jwt);
  const [openAddNew, setOpenAddNew] = useState(false);
  const [user, setUser] = useState(null);
  const [reRenderer, setReRenderer] = useState({});
  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <title>ApifyBook</title>
      </head>
      <body>
        <ToastContainer />
        <MantineProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <AuthContext.Provider
              // @ts-ignore
              value={{
                user,
                setUser,
              }}
            >
              <ReRenderContext.Provider value={{ reRenderer, setReRenderer }}>
                <Appbar setOpenAddNew={setOpenAddNew} />
                <CreateNewPost
                  opened={openAddNew}
                  close={() => {
                    setOpenAddNew(false);
                  }}
                />
                <div className="children">{children}</div>
              </ReRenderContext.Provider>{" "}
            </AuthContext.Provider>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
