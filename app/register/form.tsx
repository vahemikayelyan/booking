"use client";

import { registerUser } from "@/services/auth.service";
import { FormError } from "@/utils/shared";
import { FormEvent, useState } from "react";
import Button from "../../components/Button";
import InputGroup from "../../components/InputGroup";

export default function RegisterForm() {
  const [formError, setFormError] = useState<FormError>();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({});

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const response = await registerUser({ email, password });

    if (response.ok) {
      //console.log("is ok");
      //router.refresh();
      //router.push("/services");
    } else {
      if (response.formError) {
        setFormError(response.formError);
      } else {
      }
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
            error={formError?.email}
            placeholder="name@company.com"
          />

          <InputGroup
            name="password"
            type="password"
            title="Password"
            error={formError?.password}
          />

          <div>
            <Button type="blue" className="w-[6rem] py-2.5">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
