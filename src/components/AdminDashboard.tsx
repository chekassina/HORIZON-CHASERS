import React, { useState, useEffect } from "react";
import { SafariPackage, Booking, Blog } from "../types";
import { 
  Plus, Edit, Trash2, Check, X, Tag, FileText, Calendar, 
  Users, DollarSign, List, Image, MapPin, Award, BookOpen, Compass
} from "lucide-react";

interface AdminDashboardProps {
  onClose: () => void;
  onRefreshData: () => void;
}

export default function AdminDashboard({ onClose, onRefreshData }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"bookings" | "packages" | "blogs" | "categories">("bookings");
  
  // Data States
  const [packages, setPackages] = useState<SafariPackage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form States - Packages
  const [editingPkg, setEditingPkg] = useState<SafariPackage | null>(null);
  const [isPkgFormOpen, setIsPkgFormOpen] = useState(false);
  const [pkgTitle, setPkgTitle] = useState("");
  const [pkgCategory, setPkgCategory] = useState("");
  const [pkgDuration, setPkgDuration] = useState("");
  const [pkgPrice, setPkgPrice] = useState(1000);
  const [pkgLocation, setPkgLocation] = useState("");
  const [pkgImage, setPkgImage] = useState("");
  const [pkgDescription, setPkgDescription] = useState("");
  const [pkgHighlights, setPkgHighlights] = useState("");
  const [pkgBestTime, setPkgBestTime] = useState("");
  const [pkgPacking, setPkgPacking] = useState("");
  const [pkgIncluded, setPkgIncluded] = useState("");
  const [pkgExcluded, setPkgExcluded] = useState("");
  const [pkgFeatured, setPkgFeatured] = useState(false);

  // Form States - Blogs
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");

  // Form States - Categories
  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [pkgsRes, booksRes, blogsRes, catsRes] = await Promise.all([
        fetch("/api/packages"),
        fetch("/api/bookings"),
        fetch("/api/blogs"),
        fetch("/api/categories")
      ]);

      const pkgsData = await pkgsRes.json();
      const booksData = await booksRes.json();
      const blogsData = await blogsRes.json();
      const catsData = await catsRes.json();

      setPackages(pkgsData);
      setBookings(booksData);
      setBlogs(blogsData);
      setCategories(catsData);
    } catch (e) {
      console.error("Error fetching admin data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Actions - Bookings Status
  const handleUpdateBookingStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
        onRefreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Actions - Package Form Trigger
  const handleOpenPkgForm = (pkg: SafariPackage | null) => {
    if (pkg) {
      setEditingPkg(pkg);
      setPkgTitle(pkg.title);
      setPkgCategory(pkg.category);
      setPkgDuration(pkg.duration);
      setPkgPrice(pkg.price);
      setPkgLocation(pkg.location);
      setPkgImage(pkg.image);
      setPkgDescription(pkg.description);
      setPkgHighlights(pkg.highlights.join("\n"));
      setPkgBestTime(pkg.bestTime);
      setPkgPacking(pkg.packingList.join("\n"));
      setPkgIncluded(pkg.included.join("\n"));
      setPkgExcluded(pkg.excluded.join("\n"));
      setPkgFeatured(!!pkg.featured);
    } else {
      setEditingPkg(null);
      setPkgTitle("");
      setPkgCategory(categories[0] || "Gorilla Trekking Safaris");
      setPkgDuration("3 Days");
      setPkgPrice(1500);
      setPkgLocation("");
      setPkgImage("/images/lac6.jpg");
      setPkgDescription("");
      setPkgHighlights("Include gorilla permit\nLuxury jungle lodge stay\nExpert safari trackers");
      setPkgBestTime("June to August");
      setPkgPacking("Hiking boots\nInsect repellent\nRain jacket");
      setPkgIncluded("Permit Included\nMeals and accommodation\nPrivate 4x4 Cruiser");
      setPkgExcluded("International flights\nTips and gratuities\nVisas");
      setPkgFeatured(false);
    }
    setIsPkgFormOpen(true);
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: pkgTitle,
      category: pkgCategory,
      duration: pkgDuration,
      price: Number(pkgPrice),
      location: pkgLocation,
      image: pkgImage,
      description: pkgDescription,
      highlights: pkgHighlights.split("\n").filter(Boolean),
      bestTime: pkgBestTime,
      packingList: pkgPacking.split("\n").filter(Boolean),
      included: pkgIncluded.split("\n").filter(Boolean),
      excluded: pkgExcluded.split("\n").filter(Boolean),
      featured: pkgFeatured,
      rating: editingPkg ? editingPkg.rating : 4.8,
      itinerary: editingPkg ? editingPkg.itinerary : [
        { day: 1, title: "Welcome & Briefing", desc: "Arrival and transfer to lodge." },
        { day: 2, title: "Primate Adventure", desc: "Guided tracking and local wildlife spotting." },
        { day: 3, title: "Scenic Departure", desc: "Equator crossing and return to Airport." }
      ],
      reviews: editingPkg ? editingPkg.reviews : []
    };

    try {
      let res;
      if (editingPkg) {
        res = await fetch(`/api/packages/${editingPkg.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch("/api/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        setIsPkgFormOpen(false);
        fetchData();
        onRefreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this safari package?")) return;
    try {
      const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
        onRefreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Actions - Blog Save
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: blogTitle,
      summary: blogSummary,
      content: blogContent,
      image: blogImage || "/images/lac6.jpg",
      author: blogAuthor || "Horizon Chasers Admin"
    };

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsBlogFormOpen(false);
        setBlogTitle("");
        setBlogSummary("");
        setBlogContent("");
        setBlogImage("");
        setBlogAuthor("");
        fetchData();
        onRefreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this travel blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
        onRefreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Actions - Categories
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName })
      });
      if (res.ok) {
        setNewCatName("");
        fetchData();
        onRefreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gold/15 shadow-2xl overflow-hidden max-w-6xl mx-auto my-8 luxury-shadow">
      {/* Top Header */}
      <div className="bg-forest p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gold/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/25">
            <Compass className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold tracking-tight">Horizon Chasers Uganda</h3>
            <p className="text-xs text-stone-300 font-sans tracking-widest uppercase">Operations Dashboard</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-5 py-2 bg-gold hover:bg-gold/90 text-forest font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          Close Manager
        </button>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "bookings" ? "border-forest text-forest bg-white" : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Inquiries & Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab("packages")}
          className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "packages" ? "border-forest text-forest bg-white" : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <Compass className="w-4 h-4" />
          Safari Packages ({packages.length})
        </button>
        <button
          onClick={() => setActiveTab("blogs")}
          className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "blogs" ? "border-forest text-forest bg-white" : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <FileText className="w-4 h-4" />
          Travel Blog ({blogs.length})
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "categories" ? "border-forest text-forest bg-white" : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <List className="w-4 h-4" />
          Categories ({categories.length})
        </button>
      </div>

      {/* Main Content Pane */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Compass className="w-10 h-10 text-forest animate-spin" />
            <p className="text-sm font-medium text-stone-500">Retrieving operational logs...</p>
          </div>
        ) : (
          <div>
            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl font-bold text-forest">Live Customer Inquiries</h4>
                  <p className="text-xs text-stone-500">Capture from direct website booking and quotation forms</p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-stone-200">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider">
                        <th className="p-4">Guest Info</th>
                        <th className="p-4">Selected Tour</th>
                        <th className="p-4">Travel Details</th>
                        <th className="p-4">Special Requests</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {bookings.map((book) => (
                        <tr key={book.id} className="hover:bg-stone-50/50">
                          <td className="p-4 font-medium text-stone-950">
                            <p className="font-bold text-sm text-stone-900">{book.name}</p>
                            <p className="text-stone-500">{book.email}</p>
                            <p className="text-stone-500">{book.phone}</p>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-600 font-semibold uppercase tracking-wider text-[10px]">
                              {book.packageName || "Custom Consultation"}
                            </span>
                          </td>
                          <td className="p-4">
                            <p className="flex items-center gap-1.5 text-stone-700">
                              <Calendar className="w-3.5 h-3.5 text-gold" />
                              {book.travelDate}
                            </p>
                            <p className="flex items-center gap-1.5 text-stone-500 mt-1">
                              <Users className="w-3.5 h-3.5 text-forest" />
                              {book.guests} Guests
                            </p>
                          </td>
                          <td className="p-4 max-w-[240px] text-stone-600 italic leading-relaxed">
                            {book.preferences || "None specified"}
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                              book.status === "Approved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                              book.status === "Cancelled" ? "bg-rose-50 text-rose-700 border border-rose-200" :
                              "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}>
                              {book.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              {book.status !== "Approved" && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(book.id, "Approved")}
                                  className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center cursor-pointer"
                                  title="Approve & Log"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {book.status !== "Cancelled" && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(book.id, "Cancelled")}
                                  className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center cursor-pointer"
                                  title="Cancel Inquire"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PACKAGES TAB */}
            {activeTab === "packages" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-forest">Manage Safari Packages</h4>
                    <p className="text-xs text-stone-500">Create, edit, delete, and feature safari pages</p>
                  </div>
                  <button
                    onClick={() => handleOpenPkgForm(null)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-forest hover:bg-forest/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    New Package
                  </button>
                </div>

                {isPkgFormOpen && (
                  <form onSubmit={handleSavePackage} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                    <h5 className="font-serif text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
                      {editingPkg ? `Edit Safari: ${editingPkg.title}` : "Add New Premium Safari"}
                    </h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Safari Title</label>
                        <input
                          type="text"
                          required
                          value={pkgTitle}
                          onChange={(e) => setPkgTitle(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Category Link</label>
                        <select
                          value={pkgCategory}
                          onChange={(e) => setPkgCategory(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                        >
                          {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Duration</label>
                        <input
                          type="text"
                          required
                          value={pkgDuration}
                          onChange={(e) => setPkgDuration(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                          placeholder="e.g. 3 Days"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Price (USD)</label>
                        <input
                          type="number"
                          required
                          value={pkgPrice}
                          onChange={(e) => setPkgPrice(Number(e.target.value))}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Location Context</label>
                        <input
                          type="text"
                          required
                          value={pkgLocation}
                          onChange={(e) => setPkgLocation(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                          placeholder="e.g. Bwindi Forest"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Hero Photo URL</label>
                        <input
                          type="text"
                          required
                          value={pkgImage}
                          onChange={(e) => setPkgImage(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Introduction Description</label>
                      <textarea
                        required
                        value={pkgDescription}
                        onChange={(e) => setPkgDescription(e.target.value)}
                        className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium h-24"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Highlights (One per line)</label>
                        <textarea
                          required
                          value={pkgHighlights}
                          onChange={(e) => setPkgHighlights(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium h-24"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Packing List (One per line)</label>
                        <textarea
                          required
                          value={pkgPacking}
                          onChange={(e) => setPkgPacking(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium h-24"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">What's Included (One per line)</label>
                        <textarea
                          required
                          value={pkgIncluded}
                          onChange={(e) => setPkgIncluded(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium h-24"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">What's Excluded (One per line)</label>
                        <textarea
                          required
                          value={pkgExcluded}
                          onChange={(e) => setPkgExcluded(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium h-24"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Best Season to Visit</label>
                        <input
                          type="text"
                          required
                          value={pkgBestTime}
                          onChange={(e) => setPkgBestTime(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-5">
                        <input
                          type="checkbox"
                          id="pkg-featured"
                          checked={pkgFeatured}
                          onChange={(e) => setPkgFeatured(e.target.checked)}
                          className="w-4 h-4 text-forest"
                        />
                        <label htmlFor="pkg-featured" className="text-xs font-bold text-stone-700 cursor-pointer">Feature on Homepage</label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsPkgFormOpen(false)}
                        className="px-4 py-2 border border-stone-200 rounded-lg text-xs font-bold uppercase text-stone-500 hover:text-stone-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-forest text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-forest/90 cursor-pointer"
                      >
                        {editingPkg ? "Update Package" : "Publish Package"}
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 hover:border-gold transition-colors">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 object-cover rounded-xl border border-stone-100 flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 bg-forest/10 text-forest text-[9px] font-bold uppercase rounded tracking-wider">
                              {pkg.category}
                            </span>
                            {pkg.featured && (
                              <span className="px-2 py-0.5 bg-gold/20 text-gold-700 border border-gold/30 text-[9px] font-bold uppercase rounded tracking-wider">
                                Featured
                              </span>
                            )}
                          </div>
                          <h6 className="font-serif font-bold text-stone-900 mt-1.5 text-sm truncate">{pkg.title}</h6>
                          <p className="text-stone-500 text-[11px] mt-0.5">{pkg.location} • {pkg.duration}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-stone-100 pt-2 mt-2">
                          <p className="font-serif font-bold text-forest text-sm">From ${pkg.price}</p>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleOpenPkgForm(pkg)}
                              className="w-7 h-7 bg-stone-50 hover:bg-stone-100 text-stone-600 rounded-full flex items-center justify-center cursor-pointer"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePackage(pkg.id)}
                              className="w-7 h-7 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full flex items-center justify-center cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOGS TAB */}
            {activeTab === "blogs" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-forest">Travel Blog Articles</h4>
                    <p className="text-xs text-stone-500">Publish informative posts to inspire safari seekers</p>
                  </div>
                  <button
                    onClick={() => setIsBlogFormOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-forest hover:bg-forest/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Write Article
                  </button>
                </div>

                {isBlogFormOpen && (
                  <form onSubmit={handleSaveBlog} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                    <h5 className="font-serif text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
                      Write Travel Guide
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Article Title</label>
                        <input
                          type="text"
                          required
                          value={blogTitle}
                          onChange={(e) => setBlogTitle(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                          placeholder="e.g. Best Time to Trek Gorillas"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Author Name / Role</label>
                        <input
                          type="text"
                          required
                          value={blogAuthor}
                          onChange={(e) => setBlogAuthor(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                          placeholder="e.g. Moses Nsubuga, Master Guide"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Header Image URL</label>
                        <input
                          type="text"
                          required
                          value={blogImage}
                          onChange={(e) => setBlogImage(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                          placeholder="/images/lac6.jpg"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Short Summary (For card list)</label>
                        <input
                          type="text"
                          required
                          value={blogSummary}
                          onChange={(e) => setBlogSummary(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Markdown Body Content</label>
                      <textarea
                        required
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        className="w-full bg-white border border-stone-200 focus:border-gold outline-none rounded-lg p-2.5 text-xs text-stone-800 font-medium h-48 font-mono"
                        placeholder="Write standard markdown content here..."
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsBlogFormOpen(false)}
                        className="px-4 py-2 border border-stone-200 rounded-lg text-xs font-bold uppercase text-stone-500 hover:text-stone-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-forest text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-forest/90 cursor-pointer"
                      >
                        Publish Article
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {blogs.map((b) => (
                    <div key={b.id} className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <img
                          src={b.image}
                          alt={b.title}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover rounded-xl border flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h6 className="font-serif font-bold text-stone-900 text-sm truncate">{b.title}</h6>
                          <p className="text-stone-500 text-[11px] mt-0.5">Published {b.date} • By {b.author}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="w-8 h-8 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer"
                        title="Delete Post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CATEGORIES TAB */}
            {activeTab === "categories" && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-xl font-bold text-forest">Manage Safari Categories</h4>
                  <p className="text-xs text-stone-500">Determine categories appearing in the main navigation menu</p>
                </div>

                <form onSubmit={handleAddCategory} className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex gap-3 max-w-md">
                  <input
                    type="text"
                    required
                    placeholder="New Category Name"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="flex-1 bg-white border border-stone-200 focus:border-gold outline-none rounded-lg px-3 text-xs text-stone-800"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-4 py-2.5 bg-forest hover:bg-forest/90 text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </form>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="bg-white border border-stone-200 rounded-xl p-3 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-xs font-medium text-stone-800 truncate">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
