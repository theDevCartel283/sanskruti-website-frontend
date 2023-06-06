"use client";

import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/common/input";
import { useAppDispatch } from "@/redux/store/hooks";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import axios from "axios";
import { useRouter } from "next/navigation";
import UIButton from "@/components/common/button";
import { Metadata, NextPage } from "next";
import { loggedIn } from "@/redux/slice/user.slice";

export const metadata: Metadata = {
  title: "Sanskruti NX - Login",
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [emailOrNumber, setEmailOrNumber] = useState("");
  const [password, setPassword] = useState("");

  const checkType = () => {
    if (Number.isNaN(Number(emailOrNumber))) {
      return emailOrNumber;
    } else {
      return Number(emailOrNumber);
    }
  };

  const _submit = async () => {
    if (!emailOrNumber?.trim() || !password?.trim()) {
      dispatch(
        setNotification({
          message: "fill all details",
          type: "warning",
          content:
            "We request the user to please fill all the required fields.",
        })
      );
      return dispatch(showNotification());
    }

    const emailOrNumberWithType = checkType();

    const link = `${process.env.ENDPOINT}/api/v1/user/login`;
    const body = { emailOrNumber: emailOrNumberWithType, password };

    const registerResponse = await axios
      .post<NotificationType>(link, body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        console.log(res);
        dispatch(
          setNotification({ message: response.message, type: response.type })
        );
        dispatch(showNotification());
        if (res.status === 200) {
          dispatch(loggedIn());
          return router.replace("/");
        }
      })
      .catch((err) => {
        const response = err.response.data;
        dispatch(
          setNotification({
            message: response.message,
            type: response.type,
          })
        );
        dispatch(showNotification());
      });
  };

  const handleGoogleAuth = () => {
    window.open(`${process.env.ENDPOINT}/api/v1/googlelogin`, "_self");
  };

  return (
    <div className="flex w-full flex-col justify-center gap-5 rounded-md">
      <div className="text-center text-xl font-bold ">LOGIN</div>

      <div className="flex flex-col gap-3">
        <Input
          input_type="text"
          placeholder="Login with email or number"
          value={emailOrNumber}
          setValue={setEmailOrNumber}
        />

        {/* Password */}
        <Input
          input_type="password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />

        <UIButton
          className="h-10 border-black bg-black text-white"
          onClick={_submit}
        >
          SUBMIT
        </UIButton>
      </div>

      <span className="text-center">OR</span>

      <div className="flex w-full gap-3 font-semibold max-lg:flex-col">
        <UIButton onClick={handleGoogleAuth} className="w-full gap-2">
          <FcGoogle className="h-6 w-6" />
          <span>GOOGLE</span>
        </UIButton>

        <UIButton className="w-full gap-2">
          <BsFacebook className="h-6 w-6 text-facebook" />
          <span>FACEBOOK</span>
        </UIButton>
      </div>

      <div className="flex justify-center gap-1">
        Don&apos;t have an account?
        <Link
          href="/auth/register"
          className="font-semibold text-blue-700 hover:text-blue-500 hover:underline"
        >
          register here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
