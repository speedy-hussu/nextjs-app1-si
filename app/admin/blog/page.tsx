"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth, logout } from "@/lib/client-auth";
import { Plus, Edit, Trash2, Upload, X, FileText, Home } from "lucide-react";

const CATEGORY_OPTIONS = [
  "Industry Insights",
  "Export Guidelines",
  "Quality Standards",
] as const;
type CategoryOption = (typeof CATEGORY_OPTIONS)[number];

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: Date | string;
  category: string;
  readTime: number;
  image?: string;
}

export default function page() {
  const [user, setUser] = useState<{
    userId: string;
    username: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previousImage, setPreviousImage] = useState<string>("");
  const router = useRouter();

  const [formData, setFormData] = useState<{
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: CategoryOption;
    readTime: number;
    image: string;
  }>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    date: "",
    category: CATEGORY_OPTIONS[0],
    readTime: 5,
    image: "",
  });

  useEffect(() => {
    const verifyAuth = async () => {
      const authResult = await checkAuth();
      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
        fetchPosts();
      } else {
        router.push("/admin/login");
      }
      setLoading(false);
    };

    verifyAuth();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  // Function to delete image from server
  const deleteImageFromServer = async (imagePath: string) => {
    if (!imagePath) return;

    try {
      const response = await fetch(`/api/delete-image?path=${encodeURIComponent(imagePath)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete image from server");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (response.ok) {
        const data = await response.json();
        
        // Delete old image if it exists and we're replacing it
        if (formData.image) {
          await deleteImageFromServer(formData.image);
        }
        
        setFormData({ ...formData, image: data.path });
      } else {
        const error = await response.json();
        alert(error.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = async () => {
    if (formData.image) {
      await deleteImageFromServer(formData.image);
      setFormData({ ...formData, image: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : "/api/blog";
      const method = editingPost ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If we're editing and the image changed, delete the old image
        if (editingPost && previousImage && previousImage !== formData.image) {
          await deleteImageFromServer(previousImage);
        }
        
        await fetchPosts();
        resetForm();
        alert(
          editingPost
            ? "Blog post updated successfully!"
            : "Blog post created successfully!"
        );
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save blog post");
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("Failed to save blog post");
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setPreviousImage(post.image || "");
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date as unknown as string,
      category: post.category as CategoryOption,
      readTime: post.readTime,
      image: post.image || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      // Find the post to get its image
      const postToDelete = posts.find(p => p.id === id);
      
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Delete the associated image if it exists
        if (postToDelete?.image) {
          await deleteImageFromServer(postToDelete.image);
        }
        
        await fetchPosts();
        alert("Blog post deleted successfully!");
      } else {
        alert("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert("Failed to delete blog post");
    }
  };

  const resetForm = async () => {
    // If canceling with unsaved image, delete it
    if (!editingPost && formData.image) {
      await deleteImageFromServer(formData.image);
    }
    // If canceling edit and image was changed but not saved, delete the new image
    else if (editingPost && formData.image && formData.image !== previousImage) {
      await deleteImageFromServer(formData.image);
    }
    
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      date: "",
      category: CATEGORY_OPTIONS[0],
      readTime: 5,
      image: "",
    });
    setEditingPost(null);
    setPreviousImage("");
    setShowForm(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-full bg-gray-100 p-8 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Blog Management
              </h1>
              <p className="text-gray-600 mt-2">
                Create, edit, and manage your blog posts
              </p>
            </div>
            <div className="flex gap-4 flex-wrap justify-end">
              <button
                onClick={() => router.push("/admin")}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
              >
                <Home size={20} />
                Admin Home
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
              >
                <Plus size={20} />
                {showForm ? "Cancel" : "Add Post"}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Blog Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Author *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Date (display) *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date as unknown as string}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as CategoryOption,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Read Time (minutes) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        readTime: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Short Excerpt *
                </label>
                <textarea
                  required
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full Content *
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={8}
                  placeholder="Write the full article content here..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Featured Image
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition flex items-center gap-2">
                    <Upload size={20} />
                    {uploadingImage ? "Uploading..." : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                  {formData.image && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {formData.image}
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-red-600 hover:text-red-700"
                        title="Remove image"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                >
                  {editingPost ? "Update Post" : "Create Post"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blog Posts List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            All Blog Posts ({posts.length})
          </h2>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No blog posts found. Create your first article!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border rounded-lg p-4 hover:shadow-lg transition flex flex-col"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {post.author} • {post.date as unknown as string}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Category:{" "}
                    <span className="font-semibold">{post.category}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Edit size={18} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}