"use client";
import { baseUrl } from "../../../components/utils/url";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { AiTwotoneDislike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

type CommentType = {
  _id: string;
  text: string;
  name: string;
  date: string;
};

type PostDetail = {
  _id: string;
  text: string;
  name: string;
  date: string;
  avatar: string;
  email: string;
  likes: string[];
  comments: CommentType[];
};

const Page = () => {
  const { postsid } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");

  const fetchPostDetail = async () => {
    try {
      if (!postsid) throw new Error("Post ID not found.");

      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const { data } = await axios.get(`${baseUrl}posts/${postsid}`, {
        headers: { "x-auth-token": token },
      });

      setPost(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postsid, router]);

  if (loading)
    return (
      <div className="text-center font-semibold text-lg mt-10 text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        {error}
      </div>
    );
  if (!post)
    return <div className="text-center mt-10 text-white">Post not found.</div>;

  return (
    <div className="max-w-[800px] m-auto p-4 text-center bg-gray-900 text-white min-h-screen">
      <h1 className="font-bold text-3xl text-start pb-6 text-[#17a2b8] pt-6">
        Post Detail
      </h1>
      <div className="border rounded-lg p-4 shadow-md flex items-start gap-4 bg-gray-800">
        <img
          src={post.avatar || "/default-avatar.png"}
          alt={post.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col w-full">
          <h3 className="text-sm font-semibold">{post.name}</h3>
          <p className="text-gray-400 text-xs">
            {new Date(post.date).toLocaleDateString()}
          </p>
          <p className="text-gray-300 mt-2 text-start">{post.text}</p>
        </div>
      </div>

      {/* Comments section */}
      <div className="mt-6 text-start">
        <h2 className="font-semibold text-xl">Comments</h2>
        <div className="flex flex-col gap-2 mt-3">
          <input
            className="h-12 w-full border px-2 rounded-md bg-gray-700 text-white"
            placeholder="Write a comment..."
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-[#17a2b8] text-white px-4 py-2 rounded-md font-semibold"
            onClick={() => {}}
          >
            Comment
          </button>
        </div>

        <div className="mt-4">
          {post.comments?.length === 0 ? (
            <p className="text-gray-400">Hozircha hech qanday izoh yo‘q</p>
          ) : (
            post.comments?.map((comment, index) => (
              <div
                key={comment._id || index}
                className="border-b border-gray-700 py-3 flex items-start gap-3"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{comment.name}</h4>
                  <p className="text-gray-400 text-xs">
                    {new Date(comment.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300 mt-1">{comment.text}</p>
                </div>
                <button className="text-red-500">
                  <MdDelete />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
