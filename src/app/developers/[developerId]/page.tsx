"use client";

import { baseUrl } from "../../../components/utils/url";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Experience {
  title: string;
  company: string;
  from: string;
  to?: string;
  description?: string;
}

interface DeveloperInterface {
  _id: string;
  user?: {
    name: string;
    avatar: string;
  };
  status?: string;
  bio?: string;
  company?: string;
  location?: string;
  skills?: string[];
  education?: {
    school: string;
    degree: string;
    fieldofstudy: string;
    from: string;
    to?: string;
  }[];
  experience?: Experience[];
  website?: string;
  githubusername?: string;
}

// GitHub reposi uchun interfeys
interface Repo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  html_url: string;
}

const Developers = () => {
  const { developerId } = useParams(); 
  const [info, setInfo] = useState<DeveloperInterface | null>(null); 
  const [github, setGithub] = useState<Repo[] | null>(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${baseUrl}profile/user/${developerId}`);
        setInfo(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (developerId) {
      fetchUserData(); 
    }
  }, [developerId]);

  useEffect(() => {
    const fetchGithubData = async () => {
      if (!info?.githubusername) return;
      try {
        const resgithub = await axios.get(
          `${baseUrl}profile/github/${info.githubusername}`
        );
        setGithub(resgithub.data);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchGithubData();
  }, [info?.githubusername]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center">
        <img
          src={info?.user?.avatar}
          alt={info?.user?.name}
          className="w-36 h-36 rounded-full border-4 border-gray-700"
        />

        <h2 className="text-2xl font-bold mt-4">{info?.user?.name}</h2>
        <h3 className="text-lg text-gray-400">{info?.company}</h3>
        <p className="text-gray-400 mt-2">{info?.location}</p>
        <p className="text-gray-300 text-center mt-2 px-4">{info?.bio}</p>

        {info?.skills && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-300">Skills:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {info.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Developers;
