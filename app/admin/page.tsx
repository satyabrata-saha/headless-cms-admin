export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-800 bg-black p-4">
          <p className="text-sm text-gray-400">Total Posts</p>
          <p className="text-2xl font-bold">—</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-black p-4">
          <p className="text-sm text-gray-400">Published</p>
          <p className="text-2xl font-bold">—</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-black p-4">
          <p className="text-sm text-gray-400">Drafts</p>
          <p className="text-2xl font-bold">—</p>
        </div>
      </div>
    </div>
  );
}
