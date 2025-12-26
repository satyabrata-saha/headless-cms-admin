import Button from "@/components/Button";

async function getPosts() {
  const res = await fetch("http://localhost:4000/v1/admin/posts/all", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY}`,
    },
  });
  return res.json();
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
export default async function AdminDashboard() {
  const { data } = await getPosts();
  const post = {
    totalPosts: data.length || 0,
    //total publish post where published=1
    publishedPosts:
      data.filter((post: any) => post.published === 1).length || 0,
    draftPosts: data.filter((post: any) => post.published === 0).length || 0,
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-800 bg-black p-4">
            <p className="text-sm text-gray-400">Total Posts</p>
            <p className="text-2xl font-bold">{post.totalPosts}</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-black p-4">
            <p className="text-sm text-gray-400">Published</p>
            <p className="text-2xl font-bold">{post.publishedPosts}</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-black p-4">
            <p className="text-sm text-gray-400">Drafts</p>
            <p className="text-2xl font-bold">{post.draftPosts}</p>
          </div>
        </div>
      </div>
      <div className="space-y-6 mt-4">
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
                {/* <th className="px-4 py-3">Publish</th> */}
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((post: any) => (
                <tr key={post.id} className="border-t border-gray-800">
                  <td className="px-4 py-3">{post.title}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="rounded bg-gray-800 px-2 py-1 text-xs">
                      {post.published === 1 ? "Published" : "Draft"}
                    </span>
                  </td>
                  {/* <td className="px-4 py-3 text-center">
                    {post.published === 0 ? (
                      <Button post={post} publishPost={publishPost} />
                    ) : (
                      <span>t</span>
                    )}
                  </td> */}
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
    </>
  );
}
