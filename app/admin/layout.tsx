import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-black">
        <div className="p-6 text-lg font-semibold">CMS Admin</div>
        <nav className="px-4 space-y-2 text-sm">
          <a
            href="/admin"
            className="block rounded px-3 py-2 text-gray-300 hover:bg-gray-900 hover:text-white"
          >
            Dashboard
          </a>
          <a
            href="/admin/posts"
            className="block rounded px-3 py-2 text-gray-300 hover:bg-gray-900 hover:text-white"
          >
            Posts
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 bg-gray-950">{children}</main>
    </div>
  );
}
