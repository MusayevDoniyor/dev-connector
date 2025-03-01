"use client";
import { useEffect, useState, FormEvent } from "react";
import { IoPerson } from "react-icons/io5";
import axios from "axios";
import { baseUrl } from "../../components/utils/url";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    githubusername: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login again.");

        const res = await axios.get(`${baseUrl}profile/me`, {
          headers: {
            "x-auth-token": token,
          },
        });

        const profile = res.data;
        setFormData({
          status: profile.status || "",
          company: profile.company || "",
          website: profile.website || "",
          location: profile.location || "",
          skills: profile.skills ? profile.skills.join(", ") : "",
          githubusername: profile.githubusername || "",
          bio: profile.bio || "",
        });
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      await axios.post(
        `${baseUrl}profile`,
        {
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
        },
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] m-auto p-6 text-center bg-[#1a1a1a] text-[#f5f5f5] rounded-lg shadow-lg">
      <h1 className="font-bold text-5xl text-[#17a2b8] pt-9">
        Edit Your Profile
      </h1>
      <div className="flex items-center gap-2 justify-center mt-4">
        <IoPerson className="text-3xl" />
        <p className="text-xl">Add some changes to your profile</p>
      </div>
      <form
        className="w-full flex flex-col items-start gap-6 mt-6"
        onSubmit={onSubmit}
      >
        <select
          name="status"
          className="w-full border py-3 px-4 bg-[#333] text-[#f5f5f5] rounded-lg"
          value={formData.status}
          onChange={onChange}
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
        {Object.keys(formData).map(
          (key) =>
            key !== "status" && (
              <input
                key={key}
                name={key}
                className="w-full border py-3 px-4 bg-[#333] text-[#f5f5f5] rounded-lg"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={formData[key as keyof typeof formData]}
                onChange={onChange}
              />
            )
        )}
        <button
          type="submit"
          className="w-full bg-[#17a2b8] text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-[#1396a4] transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
