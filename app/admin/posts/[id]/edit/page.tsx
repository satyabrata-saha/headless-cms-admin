"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Button from "@/components/Button";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/v1/admin/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((post) => {
        setTitle(post.title);
        setContent(post.content);
        setPost({ post });
      });
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`http://localhost:4000/v1/admin/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY}`,
      },
      body: JSON.stringify({ title, content }),
    });

    router.push("/admin/posts");
  }

  async function publishPost(id: any) {
    const res = await fetch(
      `http://localhost:4000/v1/admin/posts/${id}/publish`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY}`,
        },
      }
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit Post</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Editor */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded bg-black border border-gray-800 px-4 py-2 text-white"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            className="w-full rounded bg-black border border-gray-800 px-4 py-2 text-white font-mono"
          />
          <button className="rounded bg-white px-6 py-2 text-black hover:bg-gray-200">
            Update
          </button>
          {post.published === 0 ? (
            <Button
              post={post}
              publishPost={publishPost}
              classNameTo="border border-gray-500 text-gray-500"
            />
          ) : (
            <span className="text-gray-400 text-sm ml-2">Published</span>
          )}
        </form>

        {/* Live Preview */}
        <div className="rounded border border-gray-800 bg-black p-4 overflow-y-auto">
          <p className="mb-3 text-sm text-gray-400">Live Preview</p>
          <article className="prose prose-invert max-w-none">
            <ReactMarkdown>{content || "Nothing to preview"}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
