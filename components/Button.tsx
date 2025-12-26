"use client";

const Button = ({ post, publishPost, classNameTo }: any) => {
  return (
    <button
      className={`rounded bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 ${classNameTo}`}
      onClick={() => publishPost(post.id)}
    >
      Publish
    </button>
  );
};

export default Button;
