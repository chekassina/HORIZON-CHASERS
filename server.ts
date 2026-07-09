import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize data folder and files
const DATA_DIR = path.join(process.cwd(), "data");
const PACKAGES_FILE = path.join(DATA_DIR, "packages.json");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Seed Initial Data
const seedCategories = [
  "Gorilla Trekking Safaris",
  "Wildlife Safaris",
  "Luxury Safaris",
  "Family Safaris",
  "Honeymoon Safaris",
  "Bird Watching Safaris",
  "Chimpanzee Tracking Safaris",
  "Walking Safaris",
  "Cultural Safaris",
  "Adventure Safaris",
  "Photography Safaris",
  "Camping Safaris",
  "Budget Safaris",
  "Mid-range Safaris",
  "Luxury Fly-in Safaris",
  "Private Safaris",
  "Group Safaris",
  "Educational Safaris",
  "Multi-country Safaris",
  "Custom Safaris"
];

const seedPackages = [
  {
    id: "pkg-1",
    title: "3 Days Gorilla Trekking Tour",
    category: "Gorilla Trekking Safaris",
    duration: "3 Days",
    price: 1250,
    rating: 4.9,
    location: "Bwindi Impenetrable Forest",
    image: "/images/lac19.jpg",
    highlights: ["Gorilla Trekking Permit included", "Luxury cottage accommodation", "Expert native tracker guides", "Stunning forest ridge walk"],
    description: "An immersive 3-day adventure into Bwindi's ancient rainforest, home to half of the world's remaining mountain gorillas. Trek deep into the jungle to spend an unforgettable hour observing a mountain gorilla family in their natural habitat.",
    itinerary: [
      { day: 1, title: "Scenic Drive to Bwindi Impenetrable Forest", desc: "Our professional guide picks you up in Entebbe or Kampala. Embark on a highly scenic drive passing through the Equator, rolling hills, and local villages. Arrive at Bwindi Forest Resort for a welcome glass of local passionfruit juice and a gourmet dinner overlooking the misty forest canopy." },
      { day: 2, title: "The Life-Changing Gorilla Trekking Experience", desc: "Rise early for a rich organic breakfast. Gather at the park headquarters for a ranger briefing. Enter the ancient forest in search of your allocated gorilla family. Trekking takes between 2 to 6 hours depending on gorilla movement. Once found, enjoy a pristine, thrilling 1 hour standing mere meters away from these gentle giants. Return for a relaxing massage and evening campfire." },
      { day: 3, title: "Return Journey with Equator Stopover", desc: "Enjoy a leisurely morning watching Hornbills from your private terrace. Depart back to Kampala or Entebbe, stopping for a celebratory lunch at the Equator crossing. Transfer directly to Entebbe International Airport for your departure flight." }
    ],
    included: ["Gorilla Trekking Permit ($800 value)", "Luxury Accommodation & All Meals", "Private 4x4 Safari Land Cruiser", "English-speaking Professional Guide", "Unlimited Bottled Drinking Water", "Evacuation Medical Insurance"],
    excluded: ["International Flights", "Ugandan Entry Visa ($50)", "Tips for Rangers/Guide", "Personal Expenses & Souvenirs"],
    permitInfo: "Uganda gorilla trekking permits must be secured well in advance. Our pricing fully includes the official $800 permit issued by the Uganda Wildlife Authority.",
    bestTime: "June to September, and December to February (dry seasons make trekking trails less muddy and easier to navigate).",
    packingList: ["Sturdy waterproof hiking boots", "Long-sleeved shirt and trousers to protect from nettles", "Waterproof rain jacket or poncho", "Gardening gloves (helpful for grasping branches)", "Insect repellent containing DEET", "Camera with a fast zoom lens (No Flash allowed)"],
    reviews: [
      { author: "Emily Watson", country: "United Kingdom", rating: 5, text: "Looking into the eyes of a silverback gorilla from 5 meters away was a spiritual experience. Horizon Chasers coordinated every detail flawlessly.", date: "2026-05-12" },
      { author: "Jean-Pierre Laurent", country: "France", rating: 5, text: "Un service incroyable! Guide très professionnel et lodge luxueux en pleine jungle.", date: "2026-06-02" }
    ],
    featured: true
  },
  {
    id: "pkg-2",
    title: "5 Days Queen Elizabeth & Chimps",
    category: "Wildlife Safaris",
    duration: "5 Days",
    price: 1850,
    rating: 4.8,
    location: "Queen Elizabeth National Park",
    image: "/images/lac20.jpg",
    highlights: ["Tree-Climbing Lions of Ishasha", "Kazinga Channel Boat Cruise", "Chimpanzee Tracking in Kyambura Gorge", "Scenic volcanic crater drive"],
    description: "Track chimpanzees, view the legendary tree-climbing lions of Ishasha, and enjoy boat safaris alongside massive herds of elephants, hippos, and crocodiles in Uganda's most diverse national park.",
    itinerary: [
      { day: 1, title: "Journey to Queen Elizabeth via Crater Highlands", desc: "Depart Kampala, heading west through lush tea estates and the spectacular Rwenzori Mountains backdrop. Arrive at Mweya Safari Lodge for a twilight dinner overlooking the Kazinga Channel." },
      { day: 2, title: "Sunrise Game Drive & Kazinga Channel Boat Safari", desc: "Set out for an early game drive on the Kasenyi plains to view leopards, lions, Uganda kobs, and giant forest hogs. In the afternoon, embark on an exclusive boat cruise on Kazinga Channel to watch elephants bathing and thousands of hippos and birds." },
      { day: 3, title: "Search for Tree-Climbing Lions in Ishasha", desc: "Drive to the southern Ishasha sector. Search the giant sycamore fig trees for the rare, famous tree-climbing lions lounging in the canopy. Spend the night at a luxurious wilderness camp beside the Ishasha River." },
      { day: 4, title: "Chimpanzee Tracking in Kyambura Gorge", desc: "Descend into the dramatic 'Valley of Apes'—Kyambura Gorge. This subterranean rainforest is home to a habituated troop of chimps. Spend the morning observing their energetic social behavior. Afternoon crater lake photography drive." },
      { day: 5, title: "Scenic Transfer back via Royal Drum Makers", desc: "Return to Kampala, enjoying lunch at Mpambire village to watch traditional drum makers showcase centuries-old musical craftsmanship. Drop-off in Entebbe." }
    ],
    included: ["All Park Entry Fees", "Chimpanzee Trekking Permit", "Luxury Lodge Accommodation", "All Meals", "Private Professional Safari Guide", "Kazinga Channel Boat Cruise Permit"],
    excluded: ["Tips", "Alcoholic Beverages", "Visas", "Laundry Services"],
    permitInfo: "Kyambzee permits are included in this package. Places are limited, so early booking is highly recommended.",
    bestTime: "January, February, June, July, and August.",
    packingList: ["Lightweight safari neutral clothing", "Sun hat and sunglasses", "Binoculars for wildlife viewing", "Sunscreen and bug spray", "Good walking shoes"],
    reviews: [
      { author: "Marcus & Sophia", country: "Germany", rating: 5, text: "Seeing three lionesses sleeping peacefully in a fig tree was incredible! The boat cruise was packed with elephants.", date: "2026-04-20" }
    ],
    featured: true
  },
  {
    id: "pkg-3",
    title: "7 Days Ultimate Luxury Fly-in Safari",
    category: "Luxury Safaris",
    duration: "7 Days",
    price: 4200,
    rating: 5.0,
    location: "Kidepo Valley & Murchison Falls",
    image: "/images/lac21.jpg",
    highlights: ["Scenic Chartered Flights", "5-Star Ultra-luxury lodges", "Exclusive private game drives", "Private boat to bottom of Murchison Falls"],
    description: "Fly directly into Uganda's most remote safari destinations. Avoid long driving hours and maximize your time in Kidepo Valley—often named Africa's finest wilderness—and the legendary Murchison Falls.",
    itinerary: [
      { day: 1, title: "Scenic Domestic Flight to Kidepo Valley", desc: "Board a luxury charter aircraft from Entebbe. Soar north over the Nile, landing directly in Kidepo Valley National Park. Check into Apoka Safari Lodge, built on a giant granite kopje with views of roaming herds of buffalo and zebras." },
      { day: 2, title: "Untamed Game Drives & Ik Cultural Visit", desc: "Set out into the Narus Valley. Kidepo boasts wildlife found nowhere else in Uganda, including cheetahs, ostriches, and bat-eared foxes. Afternoon hike to meet the remote mountain Ik community, learning about their ancient heritage." },
      { day: 3, title: "Flight to Murchison Falls National Park", desc: "Board your private charter flight to Murchison Falls. Touch down in the heart of the park and transfer to Baker's Lodge. Enjoy a private candlelit dinner on the banks of the mighty Nile River." },
      { day: 4, title: "Morning Game Drive & Launch Cruise to the Falls", desc: "Explore the northern delta for Rothschild giraffes, lions, and hyenas. After lunch, take an exclusive private boat safari up-river to the base of Murchison Falls, where the entire Nile squeezes through a 7-meter gorge with thunderous force." },
      { day: 5, title: "Hike to the Top of the Falls & Delta Cruise", desc: "Hike up to the dramatic Top of the Falls to feel the ground vibrate. Afternoon private delta boat trip to spot rare shoebill storks in the papyrus wetlands." },
      { day: 6, title: "Rhino Tracking at Ziwa Sanctuary", desc: "Morning drive south to Ziwa Rhino Sanctuary. Embark on an exciting foot patrol with rangers to track and photograph Uganda's only wild Southern White Rhinos up close." },
      { day: 7, title: "Flight back to Entebbe", desc: "A short final domestic flight back to Entebbe. Relax at a beach-side hotel lounge before your international departure." }
    ],
    included: ["All Domestic Chartered Flights", "Ziwa Rhino Tracking Permits", "5-Star Ultra-luxury Lodging", "Private open-sided 4x4 Safari vehicles", "All gourmet meals & premium wines", "Private butler service"],
    excluded: ["Gratuities", "International flights", "Souvenirs"],
    permitInfo: "Includes all local flight taxes, national park entry concessions, and specialized private ranger fees.",
    bestTime: "Year-round, with dry months of December-February being exceptional for cheetah sightings in Kidepo.",
    packingList: ["Smart-casual lodge wear", "Warm jacket for open air morning drives", "Binoculars", "Telephoto camera gear", "Slip-on comfortable shoes for aircraft travel"],
    reviews: [
      { author: "William Sterling", country: "United States", rating: 5, text: "A masterpiece of a holiday. Flying between Kidepo and Murchison saved so much time and the lodges are world-class. Absolute luxury in the wild.", date: "2026-06-15" }
    ],
    featured: true
  },
  {
    id: "pkg-4",
    title: "10 Days Birding & Cultural Odyssey",
    category: "Bird Watching Safaris",
    duration: "10 Days",
    price: 2950,
    rating: 4.7,
    location: "Kibale, Semuliki & Lake Mburo",
    image: "/images/lac4.jpg",
    highlights: ["Track rare Shoebill Stork", "Albertine Rift Endemics", "Batwa Pygmy forest walk", "Sempaya Hot Springs hike"],
    description: "A specialized, peaceful tour designed for birding enthusiasts and cultural adventurers. Spot over 450 bird species and connect deeply with Uganda's ancient forest tribal kingdoms.",
    itinerary: [
      { day: 1, title: "Arrival & Birding in Entebbe Botanical Gardens", desc: "Welcome to Uganda. Spend the afternoon birdwatching along the shores of Lake Victoria in Entebbe, looking for Great Blue Turacos, hornbills, and weaver birds." },
      { day: 2, title: "Shoebill Search in Mabamba Swamp", desc: "Navigate the narrow papyrus channels of Mabamba Wetlands in a traditional wooden canoe to locate the prehistoric-looking Shoebill Stork. Transfer to Fort Portal." },
      { day: 3, title: "Semuliki Forest Birding & Hot Springs", desc: "Trek the Semuliki rainforest, representing the eastern limit of the great Congo Basin forest. Watch Sempaya Hot Springs boil water naturally. Search for Nkulengu Rail and Hornbills." },
      { day: 4, title: "Cultural Heritage of Tooro Kingdom", desc: "Visit the royal palace of Tooro Kingdom. Walk through Fort Portal's historical sites and enjoy lunch prepared by a local elder using organic volcanic soils garden crops." },
      { day: 5, title: "Birding in Kibale National Park Forest Canopy", desc: "Look for Green-breasted Pitta in the early hours. Walk the Bigodi Wetland Sanctuary boardwalk, a community-run sanctuary rich in primates and over 200 bird species." },
      { day: 6, title: "Scenic Transfer to Queen Elizabeth Park", desc: "Game drive en route. Birding along Kazinga Channel for water birds, fish eagles, and African skimmers." },
      { day: 7, title: "Batwa Cultural Experience", desc: "Walk into the forest with Batwa Pygmy guides. Experience how they hunted, collected wild honey, and used herbal medicine for thousands of years in Bwindi." },
      { day: 8, title: "Scenic Transfer to Lake Mburo National Park", desc: "Drive to Uganda's smallest savannah park. Evening boat cruise to spot African Finfoot and Giant Kingfishers." },
      { day: 9, title: "Walking Safari & Ankole Longhorn Culture", desc: "A rare guided nature walk amongst zebras and impalas. Afternoon visit to an Ankole cattle ranching community to learn about the cultural importance of the majestic long-horned cows." },
      { day: 10, title: "Equator Craft Shopping & Departure", desc: "Transfer back to Entebbe. Stop at royal drum makers and handcraft markets for souvenirs. Evening airport transfer." }
    ],
    included: ["Expert Ornithology Guide", "Mabamba Swamp Canoe Fees", "All Community & Cultural Tour Fees", "Lodge Accommodations & All Meals", "Private Safari Vehicle"],
    excluded: ["Tips", "Visas", "Drinks"],
    permitInfo: "Includes all custom forest and swamp ranger birding fees and community guide stipends.",
    bestTime: "September to April when migratory birds from Europe are present in Uganda.",
    packingList: ["Spotting scope or good binoculars", "Field guide book to East African birds", "Dull neutral green/brown clothing", "Wide brim sun hat", "High capacity SD cards for photography"],
    reviews: [
      { author: "Karen & David", country: "Canada", rating: 5, text: "We spotted the Shoebill within 30 minutes! Our guide, Joseph, knew every single bird call. An exceptional trip.", date: "2026-03-10" }
    ],
    featured: false
  }
];

const seedBlogs = [
  {
    id: "blog-1",
    title: "Best Time to Visit Uganda for a Safari",
    summary: "Plan your ultimate trip by understanding Uganda's dual dry and wet seasons. Discover month-by-month details on when to track gorillas, view lions, and spot rare birds.",
    content: "### Finding Your Perfect Safari Window\n\nUganda is a year-round travel destination due to its equatorial climate. However, depending on whether your main goal is **gorilla trekking**, **general wildlife game drives**, or **birdwatching**, choosing the right month can elevate your experience.\n\n#### The Dry Seasons (June to September & December to February)\nThese are the peak months and generally considered the best time to visit Uganda. \n* **Why it's great**: Rainfall is minimal, which means forest trails in Bwindi and Mgahinga are less slippery and easier to hike. On the savannahs of Queen Elizabeth and Murchison Falls, vegetation thins out and animals gather around permanent water sources (rivers and waterholes), making wildlife spotting incredibly easy.\n* **Availability**: Permits and luxury lodges sell out 6-12 months in advance during these months.\n\n#### The Wet Seasons (March to May & October to November)\nOften called the 'green season', the rain brings Uganda's dramatic landscapes to vibrant life.\n* **Why it's great**: The landscapes are lush and emerald-green, creating stunning backgrounds for photography. Savannah parks are filled with newborn animals, and migratory birds arrive in thousands. Lodges often offer green-season discounts, and you'll experience a highly private safari with fewer crowds.\n* **Trekking Tip**: Rain typically falls in heavy tropical bursts followed by clear sunshine, rather than a continuous drizzle, so safaris are still perfectly doable with good rain gear!",
    image: "/images/lac2.jpg",
    date: "July 01, 2026",
    author: "Nsubuga Moses, Master Safari Guide"
  },
  {
    id: "blog-2",
    title: "The Ultimate Gorilla Trekking Packing List",
    summary: "Hiking into Bwindi's dense jungle requires preparation. Here is exactly what to pack in your daypack to stay dry, comfortable, and protected from the elements.",
    content: "### Gear Up for the Jungle\n\nGorilla trekking takes place in thick, pristine, high-altitude rainforests. Bwindi Impenetrable Forest is named 'impenetrable' for a reason—there are no paved trails, and rangers frequently cut paths through wild vegetation using machetes. To ensure you focus purely on the breathtaking gorillas rather than physical discomfort, packing the correct gear is essential.\n\n#### 1. Footwear is Priority Number One\n* **Waterproof Hiking Boots**: Ensure they have deep tread and excellent ankle support. Do not attempt trekking in running shoes or brand-new boots you haven't broken in.\n* **Tall Wool Socks**: Prevent blisters and allow you to tuck your trousers inside them to keep safari ants out.\n\n#### 2. Protective Clothing\n* **Long-Sleeved Shirts & Trousers**: Choose lightweight, moisture-wicking materials in earth tones (khaki, green, brown). Avoid bright blue and black (which attract tsetse flies).\n* **Gardening Gloves**: You will frequently grasp wild vines, thorns, and wet soil to stabilize yourself on steep ridges. A pair of rubber-gripped gardening gloves is a lifesaver!\n* **Waterproof Rain Jacket**: Tropical storms can roll in instantly, even in the dry season.\n\n#### 3. Daypack Essentials\n* **Insect Repellent**: Deet-based sprays are highly recommended.\n* **Camera Gear**: Bring a fast lens (no flash allowed). Ensure your camera has a waterproof rain sleeve.\n* **Energy Snacks & 2 Liters of Water**: The park rangers will provide a packed lunch, but extra dried fruits, nuts, or energy bars are brilliant for keeping your energy high.",
    image: "/images/lac1.jpg",
    date: "June 24, 2026",
    author: "Sarah Nakato, Tour Operations Director"
  },
  {
    id: "blog-3",
    title: "Uganda vs Kenya: Which Safari is Right for You?",
    summary: "Both East African nations offer spectacular adventures, but their styles differ. Read our head-to-head comparison to find your ideal match.",
    content: "### Uganda vs Kenya: The East African Showdown\n\nChoosing between Uganda and Kenya is a common dilemma for travelers planning their first trip to East Africa. Both countries offer spectacular wildlife and legendary hospitality, but they deliver fundamentally different safari experiences.\n\n#### Kenya: The Classic Savannah & Great Migration\nKenya is the home of the classic African savannah. The Maasai Mara, Amboseli, and Tsavo offer vast, endless plains. \n* **Wildlife Density**: Famous for immense herds of wildebeests, zebras, and massive prides of lions tracking across open grass.\n* **Infrastructure**: Very high-density tourism with hundreds of safari vehicles in popular areas.\n* **Perfect for**: Travelers seeking classic Lion King landscapes and those focused solely on massive open-country game viewing.\n\n#### Uganda: The Rainforests, Gorillas & Landscape Variety\nUganda is where the East African savannah meets the West African jungle, creating incredibly diverse biomes within a single country.\n* **Primate Capital**: Uganda is home to 20 Primate species. It is the premier destination on Earth for tracking Mountain Gorillas in Bwindi and wild Chimpanzees in Kibale.\n* **Water & Landscapes**: Home to the source of the Nile, massive waterfalls, volcanic crater lakes, and snow-capped Rwenzori Mountains.\n* **Exclusive feel**: Tourism is far less commercialized, meaning game drives are peaceful, and you are unlikely to see dozens of other vehicles surrounding a single animal.\n\n#### The Verdict\nIf your absolute bucket list dream is to stand feet away from a Mountain Gorilla in a misty rainforest, hike through jungle gorges, and cruise the Nile alongside hippos—**Uganda is the undisputed winner**.",
    image: "/images/lac8.jpg",
    date: "May 18, 2026",
    author: "Richard Alinda, Expedition Leader"
  }
];

const seedBookings = [
  {
    id: "book-1",
    name: "Dr. Sarah Jenkins",
    email: "sarah.jenkins@oxford.ac.uk",
    phone: "+44 7700 900077",
    packageId: "pkg-1",
    packageName: "3 Days Gorilla Trekking Tour",
    travelDate: "2026-09-15",
    guests: 2,
    preferences: "Celebrating our 10th wedding anniversary. We would prefer a cottage with a panoramic valley view if available. Interested in hiring a porter for the trek.",
    status: "Approved",
    createdAt: "2026-07-01T10:30:00Z"
  },
  {
    id: "book-2",
    name: "Robert Chen",
    email: "rob.chen@techventures.com",
    phone: "+1 (555) 342-9901",
    packageId: "pkg-3",
    packageName: "7 Days Ultimate Luxury Fly-in Safari",
    travelDate: "2026-12-22",
    guests: 4,
    preferences: "Flying with family. Require VIP terminal transfers at Entebbe. One of the guests is vegetarian.",
    status: "Pending",
    createdAt: "2026-07-08T15:45:00Z"
  }
];

// Write initial JSON files if they don't exist
if (!fs.existsSync(PACKAGES_FILE)) {
  fs.writeFileSync(PACKAGES_FILE, JSON.stringify(seedPackages, null, 2));
}
if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(seedBookings, null, 2));
}
if (!fs.existsSync(BLOGS_FILE)) {
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(seedBlogs, null, 2));
}
if (!fs.existsSync(CATEGORIES_FILE)) {
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(seedCategories, null, 2));
}

// Helpers to read/write JSON files
const getPackages = () => JSON.parse(fs.readFileSync(PACKAGES_FILE, "utf-8"));
const savePackages = (data: any) => fs.writeFileSync(PACKAGES_FILE, JSON.stringify(data, null, 2));

const getBookings = () => JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"));
const saveBookings = (data: any) => fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(data, null, 2));

const getBlogs = () => JSON.parse(fs.readFileSync(BLOGS_FILE, "utf-8"));
const saveBlogs = (data: any) => fs.writeFileSync(BLOGS_FILE, JSON.stringify(data, null, 2));

const getCategories = () => JSON.parse(fs.readFileSync(CATEGORIES_FILE, "utf-8"));
const saveCategories = (data: any) => fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(data, null, 2));

// Express JSON body parser
app.use(express.json());

// API Routes

// Packages API
app.get("/api/packages", (req, res) => {
  try {
    res.json(getPackages());
  } catch (error) {
    res.status(500).json({ error: "Failed to read packages" });
  }
});

app.post("/api/packages", (req, res) => {
  try {
    const pkgs = getPackages();
    const newPkg = {
      id: `pkg-${Date.now()}`,
      ...req.body
    };
    pkgs.push(newPkg);
    savePackages(pkgs);
    res.status(201).json(newPkg);
  } catch (error) {
    res.status(500).json({ error: "Failed to add package" });
  }
});

app.put("/api/packages/:id", (req, res) => {
  try {
    const pkgs = getPackages();
    const index = pkgs.findIndex((p: any) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Package not found" });
    }
    pkgs[index] = { ...pkgs[index], ...req.body };
    savePackages(pkgs);
    res.json(pkgs[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update package" });
  }
});

app.delete("/api/packages/:id", (req, res) => {
  try {
    const pkgs = getPackages();
    const filtered = pkgs.filter((p: any) => p.id !== req.params.id);
    savePackages(filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete package" });
  }
});

// Bookings / Inquiries API
app.get("/api/bookings", (req, res) => {
  try {
    res.json(getBookings());
  } catch (error) {
    res.status(500).json({ error: "Failed to read bookings" });
  }
});

app.post("/api/bookings", (req, res) => {
  try {
    const books = getBookings();
    const newBook = {
      id: `book-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "Pending",
      ...req.body
    };
    books.push(newBook);
    saveBookings(books);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

app.put("/api/bookings/:id", (req, res) => {
  try {
    const books = getBookings();
    const index = books.findIndex((b: any) => b.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Booking not found" });
    }
    books[index] = { ...books[index], ...req.body };
    saveBookings(books);
    res.json(books[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});

// Blogs API
app.get("/api/blogs", (req, res) => {
  try {
    res.json(getBlogs());
  } catch (error) {
    res.status(500).json({ error: "Failed to read blogs" });
  }
});

app.post("/api/blogs", (req, res) => {
  try {
    const blogs = getBlogs();
    const newBlog = {
      id: `blog-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      ...req.body
    };
    blogs.push(newBlog);
    saveBlogs(blogs);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to publish blog" });
  }
});

app.delete("/api/blogs/:id", (req, res) => {
  try {
    const blogs = getBlogs();
    const filtered = blogs.filter((b: any) => b.id !== req.params.id);
    saveBlogs(filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

// Categories API
app.get("/api/categories", (req, res) => {
  try {
    res.json(getCategories());
  } catch (error) {
    res.status(500).json({ error: "Failed to read categories" });
  }
});

app.post("/api/categories", (req, res) => {
  try {
    const cats = getCategories();
    if (cats.includes(req.body.name)) {
      return res.status(400).json({ error: "Category already exists" });
    }
    cats.push(req.body.name);
    saveCategories(cats);
    res.status(201).json({ success: true, categories: cats });
  } catch (error) {
    res.status(500).json({ error: "Failed to save category" });
  }
});

// AI Travel Assistant Endpoint (Gemini API)
app.post("/api/assistant", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return res.json({
        reply: "Hello! I am your Horizon Chasers Uganda Travel Assistant. It seems my server is currently awaiting a configured Gemini API key to provide live, intelligent responses, but I can tell you that we offer amazing luxury safaris, gorilla trekking, and wildlife game drives across Uganda! Please feel free to browse our Safari Packages or fill out an inquiry form and our human experts will get in touch immediately!",
        systemNotice: true
      });
    }

    // Initialize @google/genai SDK
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    // Format chat history for generateContent
    // Translate client message history (role: user/assistant) to content part format
    // The system instruction provides the persona.
    const systemInstruction = `You are the official Horizon Chasers Uganda AI Travel Assistant. Your goal is to inspire and guide travelers in planning their dream African safari. 
Provide luxurious, immersive, and detailed information about Uganda's gorillas, chimpanzees, wildlife national parks (Bwindi, Queen Elizabeth, Murchison Falls, Kibale, Mburo, Kidepo), local culture, travel seasons, visas, and packing lists. 
Answer questions in a high-class, welcoming, friendly, and nature-inspired tone. 
Recommend specific tour packages based on their preferences (e.g. recommend "3 Days Gorilla Trekking Tour" if they want gorilla trekking, or "7 Days Ultimate Luxury Fly-in Safari" for high-end travel).
Always encourage them to fill out the Inquiry/Book Now form or use the live booking features. Be brief and beautifully styled (use markdown list formatting for readability).`;

    // Map messages history
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I am currently processing your request. Please ask any question about Uganda's magical safaris!";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to connect to the AI Travel Assistant. Please try again." });
  }
});

// Initialize Vite and Start Server
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Horizon Chasers Uganda Server running on http://localhost:${PORT}`);
  });
}

start();
