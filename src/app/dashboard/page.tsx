"use client";
import useFetch from "@/components/hooks/useFetch";
import Link from "next/link";
import { IoPerson } from "react-icons/io5";

interface User {
  name: string;
  email: string;
  experience: {
    company: string;
    title: string;
    years: string;
    from: string;
    to?: string;
  }[];
  education: {
    school: string;
    degree: string;
    years: string;
    from: string;
    to?: string;
  }[];
}

function Dashboard() {
  const { data, error } = useFetch<{ name: string }>("auth");
  const { data: profile, error: errorProfile } = useFetch<User>("profile/me");

  return (
    <>
      <div className="max-w-[800px] m-auto p-4 text-center bg-gray-900 text-white">
        <div>
          <h1 className="font-bold text-start py-4 text-5xl text-teal-400 pt-9">
            Dashboard
          </h1>
          <div className="flex items-center py-2 gap-2">
            <IoPerson className="text-2xl" />
            <p className="text-2xl">Welcome, {data?.name || "User"}</p>
          </div>
          <p className="text-start py-4">
            You have not yet set up a profile, please add some info
          </p>
          {profile ? (
            <div>
              <div>
                <div className="flex items-center gap-4">
                  <button className="py-2 px-4 bg-gray-700 text-white">
                    <Link href="/editProfile">Edit Profile</Link>
                  </button>
                  <button className="py-2 px-4 bg-gray-700 text-white">
                    <Link href="/addan">Add Experience</Link>
                  </button>
                  <button className="py-2 px-4 bg-gray-700 text-white">
                    <Link href="/edu">Add Education</Link>
                  </button>
                </div>

                <h4 className="text-2xl leading-10 font-bold mt-6">
                  Experience Credentials
                </h4>
                <div className="flex items-center gap-3">
                  <p className="py-2 px-4 bg-gray-800 font-bold text-base leading-7">
                    Company
                  </p>
                  <p className="py-2 px-4 bg-gray-800 font-bold text-base leading-7">
                    Title
                  </p>
                  <p className="py-2 px-4 bg-gray-800 font-bold text-base leading-7">
                    Years
                  </p>
                </div>
                {profile.experience.length > 0 ? (
                  profile.experience.map((exp, index) => (
                    <div key={index} className="flex items-center gap-3 mb-4">
                      <p className="py-2 px-4 bg-gray-800">{exp.company}</p>
                      <p className="py-2 px-4 bg-gray-800">{exp.title}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(exp.from).toLocaleDateString()} -{" "}
                        {exp.to ? new Date(exp.to).toLocaleDateString() : "Now"}
                      </p>
                      <button className="py-2 px-4 bg-red-600 text-white">
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No experience added.</p>
                )}

                <h4 className="text-2xl leading-10 font-bold mt-6">
                  Education Credentials
                </h4>
                <div className="flex items-center gap-3">
                  <p className="py-2 px-4 bg-gray-800 font-bold text-base leading-7">
                    School
                  </p>
                  <p className="py-2 px-4 bg-gray-800 font-bold text-base leading-7">
                    Degree
                  </p>
                  <p className="py-2 px-4 bg-gray-800 font-bold text-base leading-7">
                    Years
                  </p>
                </div>
                {profile.education.length > 0 ? (
                  profile.education.map((edu, index) => (
                    <div key={index} className="flex items-center gap-3 mb-4">
                      <p className="py-2 px-4 bg-gray-800">{edu.school}</p>
                      <p className="py-2 px-4 bg-gray-800">{edu.degree}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(edu.from).toLocaleDateString()} -{" "}
                        {edu.to ? new Date(edu.to).toLocaleDateString() : "Now"}
                      </p>
                      <button className="py-2 px-4 bg-red-600 text-white">
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No education added.</p>
                )}
                <button className="py-2 px-4 bg-red-700 text-white mt-4">
                  Delete My Account
                </button>
              </div>
            </div>
          ) : (
            <button className="bg-teal-500 py-2 text-center flex justify-center px-4 text-white mt-6">
              <Link href="/createProfile">Create Profile</Link>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
