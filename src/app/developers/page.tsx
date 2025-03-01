"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../components/utils/url";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";

interface Profile {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  company: string;
  location: string;
  status: string;
  skills: string[];
}

export default function Developers() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${baseUrl}profile`);
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError("Failed to load profiles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading)
    return <div className="text-center text-lg py-10">Loading profiles...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="font-bold text-4xl text-[#17a2b8] pb-6">Developers</h1>
      <div className="flex items-center gap-2 text-xl pb-6">
        <IoPerson className="text-3xl text-[#17a2b8]" />
        <p>Welcome to the community</p>
      </div>
      <div className="space-y-4">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="flex items-center gap-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <img
              src={profile.user.avatar || "/default-avatar.png"}
              alt={profile.user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {profile.user.name || "No Name"}
              </h2>
              <p className="text-gray-400 text-sm">
                {profile.status} at {profile.company}
              </p>
              <p className="text-gray-500 text-xs">{profile.location}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.skills.slice(0, 5).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Link href={`/developers/${profile.user._id}`}>
              <button className="bg-[#17a2b8] text-white px-4 py-2 rounded-lg hover:bg-[#138496] transition">
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
