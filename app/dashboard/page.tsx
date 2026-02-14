"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const fetchBookmarks = useCallback(async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBookmarks(data);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/login");
      } else {
        setAvatarUrl(data.session.user.user_metadata?.avatar_url || null);
        await fetchBookmarks();
        setLoading(false);
      }
    };

    checkSession();
  }, [router, fetchBookmarks]);

  useEffect(() => {
    const channel = supabase
      .channel("bookmarks-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchBookmarks]);

  const handleAddBookmark = async () => {
    if (!title || !url) {
      toast.error("Title and URL required");
      return;
    }

    try {
      new URL(url);
    } catch {
      toast.error("Invalid URL format");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      toast.error("User not authenticated");
      return;
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .insert([{ title, url, user_id: session.user.id }])
      .select();

    if (error) {
      toast.error("Error adding bookmark");
    } else if (data) {
      setBookmarks((prev) => [data[0], ...prev]);
      setTitle("");
      setUrl("");
      toast.success("Bookmark added!");
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error deleting bookmark");
    } else {
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      toast.success("Bookmark deleted");
    }
  };

  // ✅ Updated Redirect (Logout → Home Page)
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      <aside className="hidden md:flex md:w-64 flex-col bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl">
        <div className="h-16 flex items-center px-6 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
              SB
            </div>
            <span className="text-xl font-semibold tracking-wide">
              SmartBook
            </span>
          </div>
        </div>

        <div className="flex-1" />

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-red-500 px-4 py-2 hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-gray-800 border-b border-gray-700 shadow-md">
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold">
              SB
            </div>
            <span className="font-semibold">SmartBook</span>
          </div>

          <div className="hidden md:block">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-xs text-gray-400">
              Manage your smart bookmarks
            </p>
          </div>

          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
            <img
              src={
                avatarUrl ||
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"
              }
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto">
          <div className="mb-8 rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
            <h2 className="mb-4 text-lg font-semibold">
              Add New Bookmark
            </h2>

            <div className="flex flex-col gap-4 md:flex-row">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-700 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-700 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddBookmark}
                className="rounded-lg bg-blue-600 px-6 py-2 hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {bookmarks.map((bookmark) => {
              const domain = new URL(bookmark.url).hostname;
              const favicon = `https://www.google.com/s2/favicons?domain=${domain}`;

              return (
                <div
                  key={bookmark.id}
                  className="rounded-xl bg-gray-800 p-5 shadow-md hover:shadow-xl transition border border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={favicon} alt="favicon" className="w-5 h-5" />
                    <h3 className="font-semibold truncate">
                      {bookmark.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:underline break-all flex-1"
                    >
                      {bookmark.url}
                    </a>

                    <button
                      onClick={() => handleDelete(bookmark.id)}
                      className="text-sm text-red-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
