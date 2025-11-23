"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../common/Button";
import Input from "../common/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gitUsername, setGitUsername] = useState("");
  const [twitterUsername, setTwitterUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          gitUsername,
          twitterUsername,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Registration failed");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Registration successful");
      router.push("/login");
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative z-10 w-full max-w-lg mx-3 md:mx-0">
        <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-5 w-full backdrop-blur-sm">
          <div className="flex flex-col justify-center items-center gap-2 text-center">
            <h2 className="text-3xl font-semibold text-foreground font-heading">
              Create Account
            </h2>
            <p className="text-foreground/80 text-sm">
              Register to start your coding journey
            </p>
          </div>
          <Button
            onClick={() => signIn("google")}
            variant="secondary"
            className="w-full"
          >
            <Image
              src="/google.svg"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
              width={20}
              height={20}
              unoptimized
            />
            Register with Google
          </Button>
          <div className="flex items-center">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-3 text-foreground/80 text-sm">or</span>
            <div className="flex-1 border-t border-border"></div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerUser();
            }}
          >
            <Input
              label="Name"
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4"
            />
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
              label="GitHub Username"
              type="text"
              name="gitusername"
              placeholder="GitHub Username"
              value={gitUsername}
              onChange={(e) => setGitUsername(e.target.value)}
              className="mb-4"
            />
            <Input
              label="Twitter Username"
              type="text"
              name="twitterusername"
              placeholder="Twitter Username"
              value={twitterUsername}
              onChange={(e) => setTwitterUsername(e.target.value)}
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
              className="text-foreground/80 flex items-center justify-start w-full gap-2 mb-4"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              <span>Show Password</span>
            </button>
            <Button
              onClick={() => registerUser()}
              variant="primary"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Registering..." : "Register your account"}
            </Button>
          </form>

          <p className="flex items-center justify-start gap-1 text-foreground/80 text-sm">
            <span>Already have an account?</span>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
