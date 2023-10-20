"use client";
import React from "react";
import { Button, Card, TextInput, useMantineTheme } from "@mantine/core";
import axios from "@/utils/axios";
import { Loader } from "@mantine/core";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const theme = useMantineTheme();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [signupLoading, setSignupLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const signup = async () => {
    if (!email || !password || !confirmPassword || !username) {
      setError("Please fill all the fields");
      toast.error("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSignupLoading(true);
    try {
      const response = await axios.post("/auth/signup", {
        email,
        password,
        username,
        confirmedPassword: confirmPassword,
      });
      setSignupLoading(false);

      const token = response.data.token;
      Cookies.set("jwt", token);
      window.location.reload();
    } catch (e) {
      //   console.log(e?.response?.data?.statusCode);
      if (e?.response?.data?.statusCode === 401) {
        // setError("Invalid credentials");
        // toast.error("Invalid credentials");
        // toast(e?.response?.data?.message);
        console.log(e);
      }
      setSignupLoading(false);
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
      <ToastContainer />
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
            signup();
          }}
        >
          <TextInput
            label="Username"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
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
          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="Enter your password again"
            required
            style={{ marginTop: theme.spacing.xs }}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
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
            {signupLoading ? <Loader size={"sm"} /> : "Signup"}
          </Button>
          <Button
            type="submit"
            variant="outline"
            color="blue"
            fullWidth
            style={{ marginTop: theme.spacing.md }}
          >
            {/* {signupLoading ? <Loader size={"sm"} /> : "Login"}
             */}
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
