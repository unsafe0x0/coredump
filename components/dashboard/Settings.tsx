"use client";

import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Input from "../common/Input";
import Button from "../common/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

interface SettingsProps {
  onBack: () => void;
  userData: {
    name: string;
    gitUsername: string;
    twitterUsername: string;
    profileImage: string;
    privateKey: string;
  };
}

const Settings: React.FC<SettingsProps> = ({ onBack, userData }) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: userData.name,
    gitUsername: userData.gitUsername,
    twitterUsername: userData.twitterUsername || "",
    password: "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateUserMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        toast.error("Failed to update");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Updated successfully");
    },
  });

  const handleSave = async () => {
    updateUserMutation.mutate();
  };

  const handleSignOut = async () => {
    toast.info("Logging out...");
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-5">
        <button
          onClick={onBack}
          className="p-3 bg-[#202020] rounded-md text-neutral-300 hover:text-white hover:bg-[#222222]"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <h2 className="text-3xl font-semibold text-white font-heading">
          Settings
        </h2>
      </div>

      <div className="bg-[#202020] rounded-md p-5 backdrop-blur-sm">
        <h3 className="text-xl font-semibold text-white mb-4 font-heading">
          Profile Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your full name"
          />
          <Input
            label="GitHub Username"
            type="text"
            value={formData.gitUsername}
            onChange={(e) => handleInputChange("gitUsername", e.target.value)}
            placeholder="Enter your GitHub username"
          />
          <Input
            label="Twitter Username (Optional)"
            type="text"
            value={formData.twitterUsername}
            onChange={(e) =>
              handleInputChange("twitterUsername", e.target.value)
            }
            placeholder="Enter your Twitter username"
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div className="flex justify-end items-center gap-4">
          <Button onClick={handleSignOut} variant="tertiary">
            Logout
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateUserMutation.isPending}
            variant="primary"
          >
            {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
