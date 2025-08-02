"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 w-full max-w-lg mx-3 md:mx-0">
        <div className="bg-neutral-900 rounded-lg p-5 flex flex-col gap-5 w-full backdrop-blur-sm">
          <div className="flex flex-col justify-center items-center gap-2 text-center">
            <h2 className="text-3xl font-semibold text-white font-heading">
              Welcome Back
            </h2>
            <p className="text-neutral-300 text-sm">
              Login to continue your coding journey
            </p>
          </div>
          <Button
            label="Login with Google"
            onClick={() => signIn("google")}
            variant="primary"
            className="w-full"
            image="/google.svg"
          />
          <div className="flex items-center">
            <div className="flex-1 border-t border-neutral-700/50"></div>
            <span className="px-3 text-neutral-400 text-sm">or</span>
            <div className="flex-1 border-t border-neutral-700/50"></div>
          </div>
          <form onSubmit={handleLogin}>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-neutral-400 flex items-center justify-start w-full gap-2 mb-4"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              <span>Show Password</span>
            </button>
            <Button
              label="Login your account"
              type="submit"
              variant="primary"
              className="w-full"
            />
          </form>

          <p className="flex items-center justify-start gap-1 text-neutral-300 text-sm">
            <span>Don't have an account?</span>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
