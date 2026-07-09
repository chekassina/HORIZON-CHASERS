import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Menu, X, ArrowRight, ShieldCheck, Heart, User, Sparkles, 
  ChevronLeft, ChevronRight, MessageSquare, Phone, Mail, MapPin, 
  Star, StarHalf, Play, Calendar, Users, DollarSign, Filter, Search, Eye, Landmark, HelpCircle, ArrowUpRight, Check
} from "lucide-react";
import UgandaMap from "./components/UgandaMap";
import AIAssistant from "./components/AIAssistant";
import AdminDashboard from "./components/AdminDashboard";
import SafariTierComparison from "./components/SafariTierComparison";
import { SafariPackage, Booking, Blog } from "./types";
import { CATEGORIES_DETAILS, DEFAULT_CATEGORY_META, EXPERIENCES_DETAILS, FAQ_ITEMS, GALLERY_IMAGES } from "./data";

export default function App() {
  // Navigation & Views
  const [currentView, setCurrentView] = useState<"home" | "about" | "category" | "packages" | "blogs" | "faq" | "contact" | "book-now">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("Gorilla Trekking Safaris");
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"safaris" | "destinations" | "experiences" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Database States (Fetched from Express server)
  const [packages, setPackages] = useState<SafariPackage[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Admin Dashboard Mode
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Media & Modals
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption: string } | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Tour Filters State
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDuration, setFilterDuration] = useState("All");
  const [filterBudget, setFilterBudget] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Booking Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    guests: 2,
    preferences: "",
    packageId: "",
    packageName: ""
  });
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  // Count-up stats (Simulated beautifully)
  const [stats, setStats] = useState({ travelers: 0, reviews: 0, years: 0, packagesCount: 0 });

  useEffect(() => {
    fetchServerData();
    
    // Scroll listener for sticky transparent-to-white navbar
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsNavbarSticky(true);
      } else {
        setIsNavbarSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Animate statistics counters
    const interval = setInterval(() => {
      setStats((prev) => {
        const travelers = prev.travelers < 1200 ? prev.travelers + 24 : 1200;
        const reviews = prev.reviews < 98 ? prev.reviews + 2 : 98;
        const years = prev.years < 15 ? prev.years + 1 : 15;
        const packagesCount = prev.packagesCount < 50 ? prev.packagesCount + 1 : 50;
        return { travelers, reviews, years, packagesCount };
      });
    }, 40);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const fetchServerData = async () => {
    setIsLoading(true);
    try {
      const [pkgsRes, blogsRes, catsRes] = await Promise.all([
        fetch("/api/packages"),
        fetch("/api/blogs"),
        fetch("/api/categories")
      ]);
      const pkgs = await pkgsRes.json();
      const blgs = await blogsRes.json();
      const cats = await catsRes.json();
      setPackages(pkgs);
      setBlogs(blgs);
      setCategories(cats);
    } catch (e) {
      console.error("Error loading server-side datasets:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Triggered when user selects a safari category
  const handleSelectCategoryPage = (catName: string) => {
    setSelectedCategory(catName);
    setCurrentView("category");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsBookingSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          travelDate: "",
          guests: 2,
          preferences: "",
          packageId: "",
          packageName: ""
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const triggerDirectInquiry = (pkg: SafariPackage) => {
    setFormData((prev) => ({
      ...prev,
      packageId: pkg.id,
      packageName: pkg.title
    }));
    setCurrentView("book-now");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTierInquiry = (tierName: string) => {
    setFormData((prev) => ({
      ...prev,
      packageId: "custom-tier",
      packageName: `${tierName} Bespoke Plan`,
      preferences: `I am interested in customizing an itinerary centered around the ${tierName} Tier standards. Please provide details on matching accommodations, vehicles, and park activities.`
    }));
    setCurrentView("book-now");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Testimonials list
  const TESTIMONIALS = [
    {
      name: "Elizabeth & Thomas Sterling",
      country: "Chicago, USA",
      image: "/images/lac2.jpg",
      review: "The 3-day gorilla trek exceeded every expectation. Seeing the silverback beat his chest from 4 meters away was raw, primal, and deeply emotional. Horizon Chasers' guides are masters of their craft."
    },
    {
      name: "Dr. Alistair Vance",
      country: "Edinburgh, Scotland",
      image: "/images/lac1.jpg",
      review: "Our custom 10-day birding safari was designed with absolute scientific precision. Spotting the Shoebill Stork in Mabamba was a career highlight. Luxurious lodges, perfect meals, and unmatched expertise."
    },
    {
      name: "The Laurent Family",
      country: "Paris, France",
      image: "/images/lac15.jpg",
      review: "Traveling with children in Africa can be nerve-wracking, but Horizon Chasers made our family trip to Queen Elizabeth and Murchison flawlessly safe, comfortable, and magical. The children are still talking about the lions!"
    }
  ];

  // Filters calculation
  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory = filterCategory === "All" || pkg.category === filterCategory;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pkg.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDuration = true;
    if (filterDuration !== "All") {
      const days = parseInt(pkg.duration);
      if (filterDuration === "short") matchesDuration = days <= 3;
      else if (filterDuration === "medium") matchesDuration = days > 3 && days <= 6;
      else if (filterDuration === "long") matchesDuration = days > 6;
    }

    let matchesBudget = true;
    if (filterBudget !== "All") {
      if (filterBudget === "luxury") matchesBudget = pkg.price >= 3000;
      else if (filterBudget === "mid") matchesBudget = pkg.price >= 1500 && pkg.price < 3000;
      else if (filterBudget === "budget") matchesBudget = pkg.price < 1500;
    }

    return matchesCategory && matchesSearch && matchesDuration && matchesBudget;
  });

  // Load the current category metadata
  const currentCategoryMeta = CATEGORIES_DETAILS[selectedCategory] || DEFAULT_CATEGORY_META(selectedCategory);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans relative flex flex-col justify-between">
      
      {/* IMMERSIVE HEADER / TOP NAV */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isNavbarSticky || currentView !== "home"
            ? "bg-white/95 backdrop-blur-md text-charcoal border-b border-forest/15 py-4 shadow-sm"
            : "bg-transparent text-white border-b border-white/10 py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={() => { setCurrentView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 bg-forest rounded-full flex items-center justify-center border border-gold/30 group-hover:border-gold transition-all">
              <span className="text-white font-bold text-xs">HC</span>
            </div>
            <div className="text-left">
              <h1 className={`font-serif text-lg font-black tracking-tight leading-none ${isNavbarSticky || currentView !== "home" ? "text-forest" : "text-white"}`}>
                HORIZON CHASERS <span className="text-gold">UGANDA</span>
              </h1>
              <p className="text-[8px] font-bold tracking-[0.25em] uppercase text-stone-400 leading-none mt-1">
                Luxury Travel Reimagined
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest">
            <button 
              onClick={() => setCurrentView("home")} 
              className={`hover:text-gold transition-colors cursor-pointer ${currentView === "home" ? "text-gold" : isNavbarSticky || currentView !== "home" ? "text-charcoal" : "text-white"}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentView("about")} 
              className={`hover:text-gold transition-colors cursor-pointer ${currentView === "about" ? "text-gold" : isNavbarSticky || currentView !== "home" ? "text-charcoal" : "text-white"}`}
            >
              About Us
            </button>

            {/* Safaris Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("safaris")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`text-xs font-semibold uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-1.5 cursor-pointer py-2 ${isNavbarSticky || currentView !== "home" ? "text-charcoal" : "text-white"}`}>
                Safaris <span className="text-[9px]">▼</span>
              </button>
              <AnimatePresence>
                {activeDropdown === "safaris" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-8 left-0 w-80 bg-white border border-forest/10 shadow-xl p-5 grid grid-cols-1 gap-2 text-left text-xs"
                  >
                    <p className="text-[9px] font-bold text-forest uppercase tracking-widest pb-1.5 border-b border-forest/10">Safari Types</p>
                    <div className="max-h-60 overflow-y-auto no-scrollbar space-y-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleSelectCategoryPage(cat)}
                          className="w-full text-left p-2 hover:bg-ivory hover:text-forest rounded-none font-medium transition-colors cursor-pointer"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Destinations Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("destinations")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`text-xs font-semibold uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-1.5 cursor-pointer py-2 ${isNavbarSticky || currentView !== "home" ? "text-charcoal" : "text-white"}`}>
                Destinations <span className="text-[9px]">▼</span>
              </button>
              <AnimatePresence>
                {activeDropdown === "destinations" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-8 left-0 w-72 bg-white border border-forest/10 shadow-xl p-5 grid grid-cols-1 gap-2 text-left text-xs"
                  >
                    <p className="text-[9px] font-bold text-forest uppercase tracking-widest pb-1.5 border-b border-forest/10">National Parks & Places</p>
                    {["Bwindi Forest", "Queen Elizabeth", "Murchison Falls", "Kibale Forest", "Lake Mburo", "Kidepo Valley", "Jinja Nile"].map((dest) => (
                      <button
                        key={dest}
                        onClick={() => {
                          setCurrentView("home");
                          setTimeout(() => {
                            const mapEl = document.getElementById("interactive-map");
                            if (mapEl) mapEl.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }}
                        className="w-full text-left p-2 hover:bg-ivory hover:text-forest rounded-none font-medium transition-colors cursor-pointer"
                      >
                        {dest}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Experiences Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("experiences")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`text-xs font-semibold uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-1.5 cursor-pointer py-2 ${isNavbarSticky || currentView !== "home" ? "text-charcoal" : "text-white"}`}>
                Experiences <span className="text-[9px]">▼</span>
              </button>
              <AnimatePresence>
                {activeDropdown === "experiences" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-8 left-0 w-72 bg-white border border-forest/10 shadow-xl p-5 grid grid-cols-1 gap-2 text-left text-xs"
                  >
                    <p className="text-[9px] font-bold text-forest uppercase tracking-widest pb-1.5 border-b border-forest/10">Key Primate & Adventure Experiences</p>
                    {EXPERIENCES_DETAILS.map((exp) => (
                      <button
                        key={exp.title}
                        onClick={() => handleSelectCategoryPage(exp.linkCategory)}
                        className="w-full text-left p-2 hover:bg-ivory hover:text-forest rounded-none font-medium transition-colors cursor-pointer"
                      >
                        {exp.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setCurrentView("packages")} 
              className={`hover:text-gold transition-colors cursor-pointer ${currentView === "packages" ? "text-gold" : isNavbarSticky || currentView !== "home" ? "text-charcoal" : "text-white"}`}
            >
              Tour Packages
            </button>
            <button 
              onClick={() => setCurrentView("blogs")} 
              className={`hover:text-gold transition-colors cursor-pointer ${currentView === "blogs" ? "text-gold" : isNavbarSticky || currentView !== "home" ? "text-charcoal" : "text-white"}`}
            >
              Blog
            </button>
            <button 
              onClick={() => setCurrentView("faq")} 
              className={`hover:text-gold transition-colors cursor-pointer ${currentView === "faq" ? "text-gold" : isNavbarSticky || currentView !== "home" ? "text-charcoal" : "text-white"}`}
            >
              FAQ
            </button>
            <button 
              onClick={() => setCurrentView("contact")} 
              className={`hover:text-gold transition-colors cursor-pointer ${currentView === "contact" ? "text-gold" : isNavbarSticky || currentView !== "home" ? "text-charcoal" : "text-white"}`}
            >
              Contact
            </button>
          </nav>

          {/* Direct CTA Buttons */}
          <div className="hidden xl:flex items-center gap-3">
            <button 
              onClick={() => setCurrentView("book-now")}
              className="px-6 py-2.5 bg-gold hover:bg-gold/90 text-white text-xs font-bold uppercase tracking-widest border border-gold/10 transition-all shadow-sm cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-inherit hover:text-gold transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU NAV PANEL */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 bg-white border-b border-stone-200 shadow-2xl z-30 p-6 flex flex-col gap-4 text-left max-h-[85vh] overflow-y-auto xl:hidden"
          >
            <button 
              onClick={() => { setCurrentView("home"); setIsMobileMenuOpen(false); }}
              className="text-sm font-bold uppercase tracking-wide text-stone-700 hover:text-forest py-2 border-b"
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentView("about"); setIsMobileMenuOpen(false); }}
              className="text-sm font-bold uppercase tracking-wide text-stone-700 hover:text-forest py-2 border-b"
            >
              About Us
            </button>
            
            {/* Mobile Categories Accordion */}
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Safari Landing Pages</p>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto no-scrollbar bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategoryPage(cat)}
                    className="text-left text-xs font-semibold text-stone-600 hover:text-forest py-1.5 truncate"
                  >
                    • {cat.replace(" Safaris", "")}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { setCurrentView("packages"); setIsMobileMenuOpen(false); }}
              className="text-sm font-bold uppercase tracking-wide text-stone-700 hover:text-forest py-2 border-b"
            >
              Tour Packages
            </button>
            <button 
              onClick={() => { setCurrentView("blogs"); setIsMobileMenuOpen(false); }}
              className="text-sm font-bold uppercase tracking-wide text-stone-700 hover:text-forest py-2 border-b"
            >
              Blog Guides
            </button>
            <button 
              onClick={() => { setCurrentView("faq"); setIsMobileMenuOpen(false); }}
              className="text-sm font-bold uppercase tracking-wide text-stone-700 hover:text-forest py-2 border-b"
            >
              FAQ
            </button>
            <button 
              onClick={() => { setCurrentView("contact"); setIsMobileMenuOpen(false); }}
              className="text-sm font-bold uppercase tracking-wide text-stone-700 hover:text-forest py-2 border-b"
            >
              Contact Us
            </button>
            
            <button 
              onClick={() => { setCurrentView("book-now"); setIsMobileMenuOpen(false); }}
              className="w-full py-3 bg-forest text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center shadow"
            >
              Book My Safari
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN VIEWPORT BODY CONTAINER */}
      <main className="flex-grow pt-16">
        
        {/* HOMEPAGE VIEW */}
        {currentView === "home" && (
          <div className="space-y-24 pb-24">
            
            {/* HERO CINEMATIC SLIDER SECTION */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/images/lac1.jpg" 
                  alt="Uganda Untamed Safari background" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/60" />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-6 mt-16">
                <motion.span 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gold/20 text-gold border border-gold/45 text-xs font-bold tracking-widest uppercase rounded-full"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Horizon Chasers Uganda
                </motion.span>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-none"
                >
                  Discover Uganda's <br />
                  <span className="text-gold italic font-normal">Untamed Beauty</span>
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-stone-200 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed"
                >
                  Experience unforgettable gorilla trekking, chimpanzee habituation, pristine wildlife savannas, cultural encounters, and tailor-made luxury adventures across East Africa.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                  <button 
                    onClick={() => { setCurrentView("packages"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="w-full sm:w-auto px-8 py-4 bg-forest hover:bg-forest/90 border border-gold/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Explore Safaris <ArrowRight className="w-4 h-4 text-gold" />
                  </button>
                  <button 
                    onClick={() => { setCurrentView("book-now"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Plan Your Trip
                  </button>
                </motion.div>
              </div>

              {/* Scroll guide */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-[10px] font-bold tracking-widest uppercase animate-bounce">
                <span>Scroll to Begin</span>
                <span className="w-1.5 h-6 bg-gold rounded-full" />
              </div>
            </section>

            {/* WELCOME LUXURY SECTION */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gold/10">
                <img 
                  src="/images/lac2.jpg" 
                  alt="Gorilla canopy" 
                  referrerPolicy="no-referrer"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-gold/20 shadow-lg">
                  <p className="font-serif font-black text-forest text-lg">Licensed & Eco-Tourism Certified</p>
                  <p className="text-xs text-stone-500 mt-1">100% committed to community preservation and wild habitat funding.</p>
                </div>
              </div>

              <div className="space-y-6 text-left">
                <span className="text-xs font-bold text-gold uppercase tracking-widest">A Warm Welcome</span>
                <h3 className="font-serif text-4xl md:text-5xl font-bold text-forest tracking-tight">
                  Welcome to <br />Horizon Chasers Uganda
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  We are a premium, locally-rooted tour operator specializing in bespoke and luxury travel itineraries. Every safari with us is a carefully composed adventure, built around your personal wishes and designed to immerse you deeply in Africa's most breathtaking wild corners.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-gold/20">
                      <ShieldCheck className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-900 text-sm">100% Tailor-made</h5>
                      <p className="text-stone-500 text-xs">Architected exactly for you.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-gold/20">
                      <User className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-900 text-sm">Local Expert Guides</h5>
                      <p className="text-stone-500 text-xs">Deep native jungle wisdom.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-gold/20">
                      <Heart className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-900 text-sm">Sustainable Tourism</h5>
                      <p className="text-stone-500 text-xs">Supporting forest tribes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-gold/20">
                      <Sparkles className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-900 text-sm">Affordable Luxury</h5>
                      <p className="text-stone-500 text-xs">Pristine 5-star comfort.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED EXPERIENCES SECTION */}
            <section className="bg-stone-50 py-24 border-y border-stone-200">
              <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
                <div className="space-y-4 max-w-2xl mx-auto">
                  <span className="text-xs font-bold text-gold uppercase tracking-widest">Curated Journeys</span>
                  <h3 className="font-serif text-4xl md:text-5xl font-bold text-forest tracking-tight">
                    Featured Uganda Experiences
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Choose your main adventure. Each experience opens into an fully integrated dedicated safari sub-universe designed to spark ultimate inspiration.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                  {EXPERIENCES_DETAILS.map((exp, idx) => (
                    <div 
                      key={idx}
                      className="bg-ivory rounded-none overflow-hidden border border-forest/15 hover:border-gold hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div className="relative overflow-hidden aspect-video">
                        <img 
                          src={exp.image} 
                          alt={exp.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                        <h4 className="absolute bottom-4 left-4 font-serif text-xl font-bold text-white tracking-wide">
                          {exp.title}
                        </h4>
                      </div>
                      <div className="p-6 space-y-4">
                        <p className="text-stone-600 text-xs leading-relaxed leading-loose">{exp.desc}</p>
                        <button 
                          onClick={() => handleSelectCategoryPage(exp.linkCategory)}
                          className="w-full py-3 bg-white border border-forest/10 hover:border-gold hover:bg-forest hover:text-white rounded-none text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* POPULAR PACKAGES (PREVIEW GRID) */}
            <section className="max-w-7xl mx-auto px-6 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-gold uppercase tracking-widest">Handcrafted Itineraries</span>
                  <h3 className="font-serif text-4xl md:text-5xl font-bold text-forest tracking-tight">
                    Popular Safari Packages
                  </h3>
                </div>
                <button 
                  onClick={() => { setCurrentView("packages"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="flex items-center gap-2 px-6 py-3 bg-forest text-white hover:bg-forest/90 text-xs font-bold uppercase tracking-widest rounded-none border border-gold/15 transition-all cursor-pointer"
                >
                  View All Packages <ArrowRight className="w-4 h-4 text-gold animate-pulse" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {packages.filter(p => p.featured).slice(0, 3).map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className="bg-ivory rounded-none overflow-hidden border border-forest/15 hover:border-gold hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-forest text-[9px] font-bold tracking-widest uppercase border border-forest/10 rounded-none">
                        {pkg.duration}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-forest text-white px-3 py-1.5 border border-gold/25 text-xs font-bold tracking-widest uppercase rounded-none">
                        From ${pkg.price}
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-stone-500 text-[9px] uppercase font-bold tracking-widest mb-1.5">
                          <MapPin className="w-3 h-3 text-gold" />
                          {pkg.location}
                        </div>
                        <h4 className="font-serif text-xl font-bold text-forest leading-snug">
                          {pkg.title}
                        </h4>
                      </div>

                      <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                        {pkg.description}
                      </p>

                      <div className="pt-4 border-t border-forest/10 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                          <span className="text-xs font-bold text-stone-800">{pkg.rating}</span>
                          <span className="text-[10px] text-stone-400">({pkg.reviews.length} reviews)</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleSelectCategoryPage(pkg.category)}
                            className="px-3 py-2 bg-white border border-forest/10 hover:border-gold text-[9px] font-bold uppercase tracking-widest rounded-none transition-all cursor-pointer"
                          >
                            Itinerary
                          </button>
                          <button 
                            onClick={() => triggerDirectInquiry(pkg)}
                            className="px-4 py-2 bg-gold hover:bg-gold/90 text-white border border-gold/10 text-[9px] font-bold uppercase tracking-widest rounded-none transition-all cursor-pointer"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INTERACTIVE MAP COMPONENT */}
            <section id="interactive-map" className="max-w-7xl mx-auto px-6 space-y-12">
              <div className="space-y-4 max-w-3xl mx-auto text-center">
                <span className="text-xs font-bold text-gold uppercase tracking-widest">Geographical Showcase</span>
                <h3 className="font-serif text-4xl md:text-5xl font-bold text-forest tracking-tight">
                  Interactive Uganda National Parks Map
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Discover the premier wildlife reserves, misty gorilla habitats, and cascading waterfalls. Click each glowing hotspot to view detailed previews of the region.
                </p>
              </div>

              <UgandaMap onSelectSafariType={(type) => {
                // Map the highlighted park types into a safari category name
                if (type.includes("Gorilla")) handleSelectCategoryPage("Gorilla Trekking Safaris");
                else if (type.includes("Chimpanzee")) handleSelectCategoryPage("Chimpanzee Tracking Safaris");
                else if (type.includes("Birding")) handleSelectCategoryPage("Bird Watching Safaris");
                else handleSelectCategoryPage("Wildlife Safaris");
              }} />
            </section>

            {/* PROMOTIONAL CINEMATIC VIDEO */}
            <section className="bg-forest py-24 text-white relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/images/lac15.jpg" 
                  alt="Scenic wild sunset" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-15"
                />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
                <span className="text-xs font-bold text-gold uppercase tracking-widest">Cinematic Promotion</span>
                <h3 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
                  Witness Uganda's Wonders in Motion
                </h3>
                <p className="text-stone-300 text-sm max-w-xl mx-auto">
                  Take a 2-minute visual safari. Experience gorilla families, thundering Nile currents, and pride of lions under the savanna sun.
                </p>

                <div className="pt-6">
                  <button 
                    onClick={() => setIsVideoOpen(true)}
                    className="w-20 h-20 bg-gold hover:bg-gold/90 text-forest rounded-full flex items-center justify-center shadow-2xl border border-white/20 mx-auto animate-pulse cursor-pointer"
                  >
                    <Play className="w-8 h-8 fill-forest ml-1" />
                  </button>
                </div>
              </div>
            </section>

            {/* WHY CHOOSE US STATS */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-ivory border border-forest/15 py-12 rounded-none">
              <div>
                <h4 className="font-serif text-4xl lg:text-5xl font-bold text-forest tracking-tight">
                  {stats.travelers}+
                </h4>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-2">Happy Travelers</p>
              </div>
              <div>
                <h4 className="font-serif text-4xl lg:text-5xl font-bold text-forest tracking-tight">
                  {stats.reviews}%
                </h4>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-2">Positive Reviews</p>
              </div>
              <div>
                <h4 className="font-serif text-4xl lg:text-5xl font-bold text-forest tracking-tight">
                  {stats.years}+
                </h4>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-2">Years Experience</p>
              </div>
              <div>
                <h4 className="font-serif text-4xl lg:text-5xl font-bold text-forest tracking-tight">
                  {stats.packagesCount}+
                </h4>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-2">Safari Packages</p>
              </div>
            </section>

            {/* TESTIMONIALS SLIDER */}
            <section className="max-w-5xl mx-auto px-6 space-y-12 text-center">
              <span className="text-xs font-bold text-gold uppercase tracking-widest">Client Stories</span>
              <h3 className="font-serif text-4xl font-bold text-forest">What Our Explorers Say</h3>

              <div className="relative bg-white border border-forest/15 p-8 md:p-12 rounded-none text-left shadow-sm">
                <Star className="w-8 h-8 text-gold fill-gold opacity-15 absolute top-8 left-8" />
                
                <p className="font-serif text-lg md:text-xl text-stone-800 leading-relaxed italic">
                  "{TESTIMONIALS[testimonialIndex].review}"
                </p>

                <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-forest/10 flex-wrap">
                  <div className="flex items-center gap-3">
                    <img 
                      src={TESTIMONIALS[testimonialIndex].image} 
                      alt={TESTIMONIALS[testimonialIndex].name} 
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded-none border border-forest/10"
                    />
                    <div>
                      <h6 className="font-bold text-stone-900 text-sm">{TESTIMONIALS[testimonialIndex].name}</h6>
                      <p className="text-xs text-stone-500">{TESTIMONIALS[testimonialIndex].country}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                      className="w-10 h-10 border border-forest/10 rounded-none flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                      className="w-10 h-10 border border-forest/10 rounded-none flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* MASONRY GALLERY */}
            <section className="max-w-7xl mx-auto px-6 space-y-12">
              <div className="space-y-4 max-w-2xl mx-auto text-center">
                <span className="text-xs font-bold text-gold uppercase tracking-widest">Visual Brochure</span>
                <h3 className="font-serif text-4xl font-bold text-forest">The Uganda Gallery</h3>
                <p className="text-stone-600 text-sm">A hand-picked collection of gorgeous imagery from our recent expeditions.</p>
              </div>

              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {GALLERY_IMAGES.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setLightboxImage(img)}
                    className="relative rounded-none overflow-hidden cursor-zoom-in border border-forest/15 hover:border-gold hover:shadow-lg transition-all duration-300 group break-inside-avoid"
                  >
                    <img 
                      src={img.url} 
                      alt={img.caption} 
                      referrerPolicy="no-referrer"
                      className="w-full object-cover rounded-none group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                      <p className="text-white text-xs font-bold font-serif">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CALL TO ACTION BANNER */}
            <section className="max-w-7xl mx-auto px-6">
              <div className="bg-forest text-white rounded-none p-10 md:p-16 text-center space-y-6 border border-gold/25 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <img src="/images/lac2.jpg" alt="elephant" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                  <span className="text-xs font-bold text-gold uppercase tracking-widest">Unforgettable Odyssey</span>
                  <h3 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
                    Ready for the Adventure of a Lifetime?
                  </h3>
                  <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                    Contact our bespoke safari planners now and outline your travel dates, ideas, and goals today.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button 
                      onClick={() => setCurrentView("book-now")}
                      className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold/90 text-white border border-gold/15 font-bold text-xs uppercase tracking-widest rounded-none transition-all shadow-lg cursor-pointer"
                    >
                      Book Your Safari
                    </button>
                    <button 
                      onClick={() => setCurrentView("contact")}
                      className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs uppercase tracking-widest rounded-none transition-all cursor-pointer"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* DEDICATED SAFARI CATEGORY PAGE (EACH SAFARI GETS ITS OWN PROFESSIONAL VIEW) */}
        {currentView === "category" && (
          <div className="space-y-20 pb-24 text-left">
            
            {/* HERO BANNER WITH PHOTOGRAPHY */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src={currentCategoryMeta.image} 
                  alt={currentCategoryMeta.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/30" />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-4">
                <span className="text-xs font-bold text-gold uppercase tracking-widest">Exclusive Safari Category</span>
                <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
                  {currentCategoryMeta.title}
                </h2>
                <div className="w-16 h-1 bg-gold rounded mx-auto" />
              </div>
            </section>

            {/* OVERVIEW & WHY CHOOSE THIS SAFARI */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-serif text-3xl font-bold text-forest">Safari Overview</h3>
                <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {currentCategoryMeta.intro}
                </p>

                <div className="bg-stone-50 border border-stone-200 p-6 rounded-2xl space-y-4 mt-6">
                  <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    Essential Permit Information
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {currentCategoryMeta.permitInfo}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-3xl space-y-6 luxury-shadow">
                <h4 className="font-serif text-xl font-bold text-forest">Why Book with Horizon Chasers?</h4>
                <div className="space-y-4">
                  {currentCategoryMeta.whyChoose.map((point, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-5 h-5 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-forest" />
                      </div>
                      <p className="text-stone-700 text-xs leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* DETAILED SAMPLE ITINERARY */}
            <section className="max-w-5xl mx-auto px-6 space-y-8">
              <h3 className="font-serif text-3xl font-bold text-forest text-center">Exemplary Itinerary</h3>
              <p className="text-stone-600 text-sm text-center max-w-xl mx-auto">This represents our award-winning base structure which is 100% customizable based on your preferences.</p>
              
              <div className="relative border-l-2 border-gold/30 pl-6 ml-4 space-y-10 py-4">
                {currentCategoryMeta.itinerary.map((day) => (
                  <div key={day.day} className="relative">
                    {/* Circle marker on line */}
                    <span className="absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-forest border-2 border-gold flex items-center justify-center text-[8px] text-white font-bold" />
                    
                    <div>
                      <span className="text-[10px] font-bold text-gold uppercase tracking-widest font-mono">Day {day.day}</span>
                      <h4 className="font-serif text-lg font-bold text-stone-900 mt-1">{day.title}</h4>
                      <p className="text-stone-600 text-xs mt-2 leading-relaxed">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PACKING GUIDE & INCLUSIONS/EXCLUSIONS */}
            <section className="bg-stone-50 py-16 border-y border-stone-200">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-3xl border border-stone-200 space-y-6">
                  <h4 className="font-serif text-xl font-bold text-forest">What's Included & Excluded</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Inclusions</p>
                      <ul className="space-y-2">
                        <li className="text-xs text-stone-600 flex items-center gap-2">✔ High-end Lodging & All Meals</li>
                        <li className="text-xs text-stone-600 flex items-center gap-2">✔ Private 4x4 Cruiser & Fuel</li>
                        <li className="text-xs text-stone-600 flex items-center gap-2">✔ Required Permits Included</li>
                        <li className="text-xs text-stone-600 flex items-center gap-2">✔ Master English-speaking Guide</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-rose-600 uppercase tracking-widest">Exclusions</p>
                      <ul className="space-y-2">
                        <li className="text-xs text-stone-600 flex items-center gap-2">❌ International Airfare</li>
                        <li className="text-xs text-stone-600 flex items-center gap-2">❌ Entry Visa fee ($50)</li>
                        <li className="text-xs text-stone-600 flex items-center gap-2">❌ Personal Gratuities & Tips</li>
                        <li className="text-xs text-stone-600 flex items-center gap-2">❌ Souvenirs and alcohol</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-stone-200 space-y-6">
                  <h4 className="font-serif text-xl font-bold text-forest">Packing Guide & Seasons</h4>
                  <p className="text-xs text-stone-500">
                    <strong className="text-stone-700">Best Season:</strong> {currentCategoryMeta.bestTime}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Recommended Gear</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                      {currentCategoryMeta.packingList.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <section className="max-w-4xl mx-auto px-6 space-y-8">
              <h3 className="font-serif text-2xl font-bold text-forest text-center">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {currentCategoryMeta.faqs.map((f, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200">
                    <h5 className="font-bold text-stone-900 text-sm flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      {f.q}
                    </h5>
                    <p className="text-stone-600 text-xs mt-2 leading-relaxed ml-6">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* RELATED PACKAGES */}
            <section className="max-w-7xl mx-auto px-6 space-y-8">
              <h3 className="font-serif text-2xl font-bold text-forest">Related Packages in this Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.filter((pkg) => pkg.category === selectedCategory).map((pkg) => (
                  <div key={pkg.id} className="bg-white border rounded-2xl overflow-hidden p-4 flex gap-4">
                    <img src={pkg.image} alt={pkg.title} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h5 className="font-bold text-stone-900 text-sm">{pkg.title}</h5>
                        <p className="text-stone-500 text-[11px] mt-0.5">{pkg.duration} • From ${pkg.price}</p>
                      </div>
                      <button 
                        onClick={() => triggerDirectInquiry(pkg)}
                        className="text-[10px] bg-forest text-white py-1.5 px-3 rounded font-bold uppercase hover:bg-forest/90 mt-2 cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INTEGRATED DIRECT INQUIRY FORM */}
            <section className="max-w-3xl mx-auto px-6">
              <div className="bg-white border p-8 rounded-3xl luxury-shadow space-y-6">
                <h4 className="font-serif text-2xl font-bold text-forest text-center">Inquire about {currentCategoryMeta.title}</h4>
                <p className="text-xs text-stone-500 text-center">Specify your dream dates, preferences, and details below to log with our specialists.</p>
                
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                        placeholder="+1 (555) 019-2834"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Estimated Travel Month</label>
                      <input 
                        type="date" 
                        required 
                        value={formData.travelDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, travelDate: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">No. of Guests</label>
                      <input 
                        type="number" 
                        required 
                        min="1"
                        value={formData.guests}
                        onChange={(e) => setFormData(prev => ({ ...prev, guests: Number(e.target.value) }))}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Specific Preferences / Questions</label>
                    <textarea 
                      value={formData.preferences}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferences: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 h-24"
                      placeholder="e.g., We require luxury lodges and have dietary preferences..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isBookingSubmitting}
                    className="w-full py-3.5 bg-forest text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-forest/95 transition-colors cursor-pointer"
                  >
                    {isBookingSubmitting ? "Transmitting Operational Logs..." : "Submit Inquiry"}
                  </button>

                  {isBookingSubmitted && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center">
                      ✔ Thank you! Your customized safari inquiry has been successfully transmitted directly to the Admin Operations Dashboard. An expert consultant will contact you within 24 hours.
                    </div>
                  )}
                </form>
              </div>
            </section>

          </div>
        )}

        {/* TOUR PACKAGES VIEW WITH RICH FILTER CONTROLS */}
        {currentView === "packages" && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 text-left">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Bespoke Expeditions</span>
              <h2 className="font-serif text-4xl font-bold text-forest">Tour Packages catalog</h2>
              <p className="text-stone-600 text-sm">Use our high-end filtering suite to find the exact duration, budget, or experience that matches your travel dreams.</p>
            </div>

            {/* Price & Inclusions Safari Tier Comparison Table */}
            <SafariTierComparison onSelectInquiry={handleTierInquiry} />

            {/* Filter Suite Row */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-gold" /> Category
                </label>
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 outline-none"
                >
                  <option value="All">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gold" /> Duration
                </label>
                <select 
                  value={filterDuration}
                  onChange={(e) => setFilterDuration(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 outline-none"
                >
                  <option value="All">All Durations</option>
                  <option value="short">Short (1-3 Days)</option>
                  <option value="medium">Medium (4-6 Days)</option>
                  <option value="long">Long (7+ Days)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-gold" /> Budget Range
                </label>
                <select 
                  value={filterBudget}
                  onChange={(e) => setFilterBudget(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 outline-none"
                >
                  <option value="All">All Budgets</option>
                  <option value="budget">Under $1,500</option>
                  <option value="mid">Mid-range ($1,500 - $3,000)</option>
                  <option value="luxury">Luxury Elite ($3,000+)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <Search className="w-3.5 h-3.5 text-gold" /> Search Terms
                </label>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Bwindi, Lion, Flight..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 outline-none"
                />
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white border rounded-3xl overflow-hidden shadow-sm hover:border-gold transition-colors flex flex-col justify-between">
                  <div>
                    <img src={pkg.image} alt={pkg.title} className="w-full aspect-video object-cover" />
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-1.5 text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                        <MapPin className="w-3.5 h-3.5 text-gold" />
                        {pkg.location}
                      </div>
                      <h4 className="font-serif text-lg font-bold text-stone-900">{pkg.title}</h4>
                      <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">{pkg.description}</p>
                    </div>
                  </div>
                  <div className="p-6 border-t border-stone-100 flex items-center justify-between">
                    <p className="font-serif font-bold text-forest text-sm">From ${pkg.price}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleSelectCategoryPage(pkg.category)}
                        className="px-3.5 py-2 bg-stone-100 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                      >
                        Details
                      </button>
                      <button 
                        onClick={() => triggerDirectInquiry(pkg)}
                        className="px-4 py-2 bg-forest text-white rounded-lg text-[10px] font-bold uppercase tracking-wider"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPackages.length === 0 && (
                <div className="col-span-full py-12 text-center text-stone-500 font-medium">
                  No matching safari packages found. Adjust filters or search terms.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TRAVEL BLOG VIEW */}
        {currentView === "blogs" && (
          <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 text-left">
            <div className="text-center space-y-4 max-w-xl mx-auto">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Safari Intelligence</span>
              <h2 className="font-serif text-4xl font-bold text-forest">Uganda Expedition Guides</h2>
              <p className="text-stone-600 text-sm">Explore expert travel wisdom, month-by-month climate guides, and specialized packing checklists published by our rangers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((b) => (
                <div key={b.id} className="bg-white border rounded-3xl overflow-hidden shadow-sm hover:border-gold transition-colors p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <img src={b.image} alt={b.title} className="w-full aspect-video object-cover rounded-2xl" />
                    <div>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{b.date} • By {b.author}</p>
                      <h4 className="font-serif text-xl font-bold text-forest mt-1">{b.title}</h4>
                    </div>
                    <p className="text-stone-600 text-xs leading-relaxed">{b.summary}</p>
                  </div>
                  <div className="border-t border-stone-100 pt-4 mt-6">
                    <button 
                      onClick={() => handleSelectCategoryPage("Gorilla Trekking Safaris")} // redirects to corresponding templates
                      className="text-xs font-bold uppercase tracking-wider text-gold hover:text-forest flex items-center gap-1"
                    >
                      Read Full Guide <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ VIEW */}
        {currentView === "faq" && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 text-left">
            <div className="text-center space-y-4 max-w-xl mx-auto">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Help & Support</span>
              <h2 className="font-serif text-4xl font-bold text-forest">Frequently Asked Questions</h2>
              <p className="text-stone-600 text-sm">Everything you need to know about safety, visas, permit acquisitions, and safari logistics.</p>
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200">
                  <h4 className="font-bold text-stone-900 text-sm flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    {item.q}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed mt-2 pl-6">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT VIEW */}
        {currentView === "contact" && (
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Get in Touch</span>
              <h2 className="font-serif text-4xl font-bold text-forest">Bespoke Consultations</h2>
              <p className="text-stone-600 text-sm leading-relaxed">Our elite safari planning offices are based in Kampala and Entebbe, Uganda. Speak with an expert consultant today to design your dream custom travel blueprint.</p>
              
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold" />
                  <p className="text-xs font-medium text-stone-800">+256 702 456 789 / +256 782 123 456</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold" />
                  <p className="text-xs font-medium text-stone-800">inquiries@horizonchasersuganda.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold" />
                  <p className="text-xs font-medium text-stone-800">Plot 12, Kampala Road, Kampala, Uganda</p>
                </div>
              </div>

              {/* Simulated Google Map */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-stone-100 flex items-center justify-center p-4 text-center">
                <div className="space-y-1">
                  <Compass className="w-8 h-8 text-forest mx-auto animate-spin" style={{ animationDuration: "10s" }} />
                  <p className="text-xs font-bold text-stone-700">Horizon Chasers Headquarters</p>
                  <p className="text-[10px] text-stone-400">Kampala Road, Plot 12, Uganda</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 luxury-shadow">
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <h4 className="font-serif text-2xl font-bold text-forest">Request a Custom Proposal</h4>
                <p className="text-xs text-stone-500">Completely complimentary blueprint designs within 24 hours.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Email</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Contact Phone</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Outline Your Travel Intent & Budget Preferences</label>
                  <textarea 
                    value={formData.preferences}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferences: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 h-28"
                    placeholder="We want to see gorillas in Bwindi, chimpanzees in Kibale, and request private charter fly-in options..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isBookingSubmitting}
                  className="w-full py-3 bg-forest text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-forest/95 transition-colors cursor-pointer"
                >
                  {isBookingSubmitting ? "Transmitting..." : "Send Proposal Request"}
                </button>

                {isBookingSubmitted && (
                  <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-center text-xs">
                    ✔ Inquiry logged successfully! An expert consultant will call/email you shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* BOOK NOW VIEW (DIRECT BOOKING AND QUOTATION FORM) */}
        {currentView === "book-now" && (
          <div className="max-w-4xl mx-auto px-6 py-12 text-left">
            <div className="bg-white p-8 rounded-3xl border border-stone-200 luxury-shadow space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Expedition Logistics</span>
                <h2 className="font-serif text-3xl font-bold text-forest">Online Booking & Quotation Form</h2>
                <p className="text-stone-500 text-xs">Submit your details to establish a booking on our server. Administrators will review and contact you instantly.</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4 pt-4 border-t">
                {formData.packageName && (
                  <div className="p-3 bg-stone-50 border border-gold/20 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-forest">Selected Safari Tour:</p>
                      <p className="text-stone-700 mt-0.5">{formData.packageName}</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, packageId: "", packageName: "" }))}
                      className="text-[10px] bg-stone-200 hover:bg-stone-300 text-stone-600 rounded px-2 py-1 uppercase font-bold"
                    >
                      Clear Selection
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Traveller Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                      placeholder="Sarah Jenkins"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Email</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                      placeholder="sarah@oxford.edu"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                      placeholder="+44 7700 900077"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Estimated Travel Date</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.travelDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, travelDate: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Guests Count</label>
                    <input 
                      type="number" 
                      required 
                      min="1"
                      value={formData.guests}
                      onChange={(e) => setFormData(prev => ({ ...prev, guests: Number(e.target.value) }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Special Preferences / Requirements</label>
                  <textarea 
                    value={formData.preferences}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferences: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 h-28"
                    placeholder="Provide any dietary requirements, physical limitations, or preferred hotels..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isBookingSubmitting}
                  className="w-full py-4 bg-forest text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-forest/95 transition-colors cursor-pointer"
                >
                  {isBookingSubmitting ? "Transmitting..." : "Submit My Online Booking"}
                </button>

                {isBookingSubmitted && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center">
                    ✔ Inquiry logged successfully! An expert consultant will call/email you shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

      </main>

      {/* WHATSAPP CHAT INTEGRATION FLOATING LINK */}
      <div className="fixed bottom-24 left-6 z-50">
        <a 
          href="https://wa.me/256702456789" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-2xl text-xs font-bold uppercase tracking-wider cursor-pointer border border-white/20"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Chat</span>
        </a>
      </div>

      {/* PREMIUM AI TRAVEL ASSISTANT WIDGET */}
      <AIAssistant />

      {/* ADMIN DASHBOARD MODAL/OVERLAY */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-sm overflow-y-auto p-4 flex items-center justify-center">
          <div className="w-full max-w-6xl">
            <AdminDashboard 
              onClose={() => setIsAdminOpen(false)} 
              onRefreshData={() => fetchServerData()}
            />
          </div>
        </div>
      )}

      {/* LIGHTBOX FOR MASONRY GALLERY */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-charcoal/95 z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white hover:text-gold cursor-pointer"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={lightboxImage.url} 
            alt={lightboxImage.caption} 
            referrerPolicy="no-referrer"
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
          />
          <p className="text-white text-sm font-serif mt-4 text-center tracking-wider">{lightboxImage.caption}</p>
        </div>
      )}

      {/* PROMOTIONAL CINEMATIC VIDEO MODAL */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 bg-charcoal/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <button 
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gold cursor-pointer"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-charcoal relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Elegant Cinematic Promo Simulation */}
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Uganda Safari Cinematic Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

      {/* FOOTER AREA */}
      <footer className="bg-charcoal text-stone-300 py-16 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center border border-gold/25">
                <Compass className="w-4 h-4 text-gold" />
              </div>
              <h4 className="font-serif text-lg font-black tracking-tight text-white">HORIZON CHASERS</h4>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Explore Uganda's prime wildlife reserves, pristine rainforests, and authentic cultural experiences with East Africa's leading luxury tour operator.
            </p>
            <p className="text-[10px] text-stone-500">
              © {new Date().getFullYear()} Horizon Chasers Uganda. All rights reserved.
            </p>
          </div>

          {/* Categories Col */}
          <div className="space-y-4">
            <h5 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2">Safari Styles</h5>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {categories.slice(0, 5).map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => handleSelectCategoryPage(cat)}
                  className="text-left text-stone-400 hover:text-gold transition-colors cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h5 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2">Quick Contact</h5>
            <p className="text-xs text-stone-400 leading-relaxed">
              Plot 12, Kampala Road, Kampala, Uganda <br />
              inquiries@horizonchasersuganda.com <br />
              +256 702 456 789
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setCurrentView("contact")}
                className="text-xs text-gold font-bold hover:underline cursor-pointer"
              >
                Send Direct Message
              </button>
            </div>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-4">
            <h5 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2">Bespoke Updates</h5>
            <p className="text-xs text-stone-400 leading-relaxed">Subscribe to receive seasonal migration updates and green-season discounts.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 outline-none flex-1 focus:border-gold"
              />
              <button 
                onClick={() => alert("Thank you for subscribing to Horizon Chasers Uganda newsletter!")}
                className="bg-gold hover:bg-gold/90 text-charcoal font-bold px-3 py-2 rounded-lg text-xs cursor-pointer"
              >
                Join
              </button>
            </div>

            {/* Backoffice Operations Link */}
            <div className="pt-4 border-t border-white/5">
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold rounded text-[10px] font-bold uppercase tracking-widest text-gold transition-colors cursor-pointer"
              >
                <Landmark className="w-3.5 h-3.5" />
                Administrative Dashboard
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
