"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth, logout } from "@/app/(backend)/lib/client-auth";
import { Plus, Edit, Trash2, Upload, X, Package, Home } from "lucide-react";

const CATEGORY_OPTIONS = ["rice", "wheat", "spices", "pulses"] as const;
type CategoryOption = (typeof CATEGORY_OPTIONS)[number];

interface Product {
  id: string;
  name: string;
  category: CategoryOption;
  description: string;
  specifications: string;
  image?: string;
}

interface FormData {
  name: string;
  category: CategoryOption;
  description: string;
  specifications: string;
  image: string;
}

const INITIAL_FORM_STATE: FormData = {
  name: "",
  category: "rice",
  description: "",
  specifications: "",
  image: "",
};

export default function ProductManagementPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    userId: string;
    username: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previousImage, setPreviousImage] = useState("");
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);

  useEffect(() => {
    const verifyAuth = async () => {
      const authResult = await checkAuth();
      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
        await fetchProducts();
      } else {
        router.push("/admin/login");
      }
      setLoading(false);
    };

    verifyAuth();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteImageFromServer = async (imagePath: string) => {
    if (!imagePath) return;

    try {
      await fetch(`/api/delete-image?path=${encodeURIComponent(imagePath)}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (response.ok) {
        const data = await response.json();

        // Delete old image if replacing
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
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = editingProduct ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Delete old image if editing and image changed
        if (
          editingProduct &&
          previousImage &&
          previousImage !== formData.image
        ) {
          await deleteImageFromServer(previousImage);
        }

        await fetchProducts();
        resetForm();
        alert(
          editingProduct
            ? "Product updated successfully!"
            : "Product created successfully!"
        );
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    }
  };


  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setPreviousImage(product.image || "");
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      specifications: product.specifications,
      image: product.image || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const productToDelete = products.find((p) => p.id === id);

    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (response.ok) {
        if (productToDelete?.image) {
          await deleteImageFromServer(productToDelete.image);
        }
        await fetchProducts();
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const resetForm = async () => {
    // Delete uploaded image if canceling without saving
   

    setFormData(INITIAL_FORM_STATE);
    setEditingProduct(null);
    setPreviousImage("");
    setShowForm(false);
  };

  const dltImg = async (id: string) => {
    await deleteImageFromServer(id);
  };
  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      rice: "bg-green-100 text-green-800",
      wheat: "bg-yellow-100 text-yellow-800",
      spices: "bg-red-100 text-red-800",
      pulses: "bg-orange-100 text-orange-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-full bg-gray-50 p-8 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-[rgb(65,114,190)]">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Product Management
              </h1>
              <p className="text-gray-600 mt-2">
                Create, edit, and manage your product catalog
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
                className="bg-[rgb(65,114,190)] hover:bg-[rgb(52,91,152)] text-white font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
              >
                <Plus size={20} />
                {showForm ? "Cancel" : "Add Product"}
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

        {/* Product Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Basmati Rice Premium"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(65,114,190)]"
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(65,114,190)] bg-white"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Brief description of the product..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(65,114,190)]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Specifications *
                </label>
                <textarea
                  required
                  value={formData.specifications}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specifications: e.target.value,
                    })
                  }
                  rows={6}
                  placeholder="Enter detailed specifications (e.g., Origin, Grain Length, Moisture Content, etc.)"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(65,114,190)] font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tip: Use line breaks to separate different specifications
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Product Image
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
                      <span className="text-sm text-gray-600 truncate max-w-xs">
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
                      className="w-40 h-40 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-[rgb(65,114,190)] hover:bg-[rgb(52,91,152)] text-white font-semibold px-6 py-2 rounded-lg transition"
                >
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    dltImg(formData.image);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            All Products ({products.length})
          </h2>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No products found. Add your first product!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 hover:shadow-lg transition flex flex-col"
                >
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="mb-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                        product.category
                      )}`}
                    >
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="text-xs text-gray-500 mb-4">
                    <p className="font-semibold mb-1">Specifications:</p>
                    <p className="line-clamp-2">{product.specifications}</p>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-[rgb(65,114,190)] hover:bg-[rgb(52,91,152)] text-white font-semibold px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Edit size={18} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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
