"use client";

import { FormEvent } from "react";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";

export default function RegisterForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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

          <Button type="blue" className="w-[6rem] py-2.5">
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}
