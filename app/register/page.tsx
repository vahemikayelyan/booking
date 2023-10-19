import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterForm from "./form";

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="md:p-6 p-4 bg-gray-50 flex justify-center mx-auto">
      <RegisterForm />
    </div>
  );
}
