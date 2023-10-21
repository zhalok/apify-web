"use client";
import React from "react";
import { Button, Card, TextInput, useMantineTheme } from "@mantine/core";
import axios from "@/utils/axios";
import { Loader } from "@mantine/core";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const theme = useMantineTheme();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const router = useRouter();

  const login = async () => {
    setLoginLoading(true);
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      setLoginLoading(false);
      //   console.log("response", response);
      const token = response.data.token;
      Cookies.set("jwt", token);
      window.location.reload();
      // router.refresh();
    } catch (e) {
      //   console.log(e?.response?.data?.statusCode);
      if (e?.response?.data?.statusCode === 401) {
        setError("Invalid credentials");
      }
      setLoginLoading(false);
    }
  };

  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "fit-content",
      }}
    >
      <Card
        shadow="sm"
        padding="lg"
        style={{
          maxWidth: 450,
          minWidth: 450,
          backgroundColor: theme.colors.dark[0.5], // added darker background color
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <TextInput
            label="Email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            style={{ marginTop: theme.spacing.xs }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <small
            style={{
              color: "red",
            }}
          >
            {error}
          </small>
          <Button
            type="submit"
            variant="outline"
            color="blue"
            fullWidth
            style={{ marginTop: theme.spacing.md }}
          >
            {loginLoading ? <Loader size={"sm"} /> : "Login"}
          </Button>

          <Button
            type="submit"
            variant="outline"
            color="blue"
            fullWidth
            style={{ marginTop: theme.spacing.md }}
          >
            Signup
          </Button>
        </form>
      </Card>
    </div>
  );
}
