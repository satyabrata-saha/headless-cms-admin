async function getPosts() {
  const res = await fetch("http://localhost:4000/v1/posts", {
    cache: "no-store",
  });
  return res.json();
}

export default async function PostsPage() {
  const { data } = await getPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <a
          href="/admin/posts/new"
          className="rounded bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
        >
          New Post
        </a>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post: any) => (
              <tr key={post.id} className="border-t border-gray-800">
                <td className="px-4 py-3">{post.title}</td>
                <td className="px-4 py-3 text-center">
                  <span className="rounded bg-gray-800 px-2 py-1 text-xs">
                    Published
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-gray-400 hover:text-white"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
