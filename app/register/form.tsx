"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";

export default function RegisterForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const response = await fetch("api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(await response.json());

    if (response.ok) {
      //console.log("is ok");
      //router.refresh();
      //router.push("/services");
    } else {
      //const { error } = response as unknown as { error: string };
      //console.log(response, 6666666);
      //setErrorMsg(error);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create a New Account
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          action="#"
          onSubmit={handleSubmit}
        >
          <InputGroup
            name="email"
            title="Your email"
            autoComplete="on"
            placeholder="name@company.com"
          />

          <InputGroup name="password" title="Password" type="password" />

          <small className="text-red-500">{errorMsg}</small>

          <Button type="blue" className="w-[6rem] py-2.5">
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}
