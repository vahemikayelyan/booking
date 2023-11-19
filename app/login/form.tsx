"use client";

import { Tab, Tabs } from "@/components/Tabs";
import { useActivePathnameStore } from "@/store/active-pathname";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Button from "../../components/Button";
import InputGroup from "../../components/InputGroup";

export default function LoginForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [activeLoginType, setActiveLoginType] = useState<string>("1");
  const { setActivePathname } = useActivePathnameStore();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setErrorMsg("");
    setIsLoading(true);

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response?.ok) {
      router.refresh();
      router.push("/dashboard");
      setActivePathname("/dashboard");
    } else {
      setErrorMsg("Incorrect credantials!");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign in to your account
        </h1>
        <div className="mt-2 mb-6">
          <Tabs
            defaultTabId={activeLoginType}
            onChange={(tabId) => setActiveLoginType(tabId)}
          >
            <Tab id="1">Business</Tab>
            <Tab id="2">Customer</Tab>
          </Tabs>
        </div>
        <form
          action="#"
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit}
        >
          <InputGroup
            name="email"
            placeholder="Your email"
            autoComplete="on"
            error={errorMsg}
          />

          <InputGroup name="password" placeholder="Password" type="password" />

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  autoComplete="off"
                  aria-describedby="remember"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500">
                  Remember me
                </label>
              </div>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="blue" className="w-full py-2.5" isLoading={isLoading}>
            Sign in
          </Button>
          <p className="text-sm font-light text-gray-500">
            Don’t have an account yet?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
