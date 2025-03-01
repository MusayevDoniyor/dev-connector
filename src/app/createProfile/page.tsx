"use client";
import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../components/utils/url";
import { IoPerson } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function CreateProfile() {
  const router = useRouter(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [githubusername, setGithubUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newProfile = {
      status,
      company,
      website,
      location,
      skills: skills.split(",").map((s) => s.trim()),
      githubusername,
      bio,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      const res = await axios.post(`${baseUrl}profile`, newProfile, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Xatolik:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] m-auto p-6 text-center bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="font-bold text-5xl text-[#17a2b8] pt-6">
        Create Your Profile
      </h1>
      <div className="flex items-center gap-2 justify-center mt-4">
        <IoPerson className="text-3xl text-white" />
        <p className="text-xl text-gray-300">
          Let's get some information to make your profile
        </p>
      </div>
      <p className="text-gray-400 mt-2">* = required field</p>
      <form
        className="w-full max-w-[600px] mx-auto flex flex-col items-start gap-4 mt-6"
        onSubmit={onSubmit}
      >
        <select
          className="w-full border py-2 px-4 bg-gray-800 text-white rounded-md"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">* Select Professional Status</option>
          <option value="developer">Developer</option>
          <option value="junior-developer">Junior Developer</option>
          <option value="senior-developer">Senior Developer</option>
          <option value="manager">Manager</option>
          <option value="student">Student or Learning</option>
          <option value="instructor">Instructor or Teacher</option>
          <option value="intern">Intern</option>
          <option value="other">Other</option>
        </select>
        <input
          className="w-full border py-2 px-4 bg-gray-800 text-white rounded-md"
          placeholder="Company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="w-full border py-2 px-4 bg-gray-800 text-white rounded-md"
          placeholder="Website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <input
          className="w-full border py-2 px-4 bg-gray-800 text-white rounded-md"
          placeholder="Location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="w-full border py-2 px-4 bg-gray-800 text-white rounded-md"
          placeholder="* Skills (comma separated)"
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <input
          className="w-full border py-2 px-4 bg-gray-800 text-white rounded-md"
          placeholder="Github Username"
          type="text"
          value={githubusername}
          onChange={(e) => setGithubUsername(e.target.value)}
        />
        <textarea
          className="w-full border py-2 px-4 bg-gray-800 text-white rounded-md"
          placeholder="A short bio of yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />
        <button
          type="submit"
          className="bg-[#17a2b8] text-white py-2 px-4 rounded-md hover:bg-[#138496] transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
