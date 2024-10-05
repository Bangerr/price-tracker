import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/login");
  }

  const image: string = user.image ? user.image : "";

  return (
    <div>
      <div>Login Page</div>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
      <img src={image} alt="profile" width={28} height={28} />
    </div>
  );
};

export default LoginPage;
