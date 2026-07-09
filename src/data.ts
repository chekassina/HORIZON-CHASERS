export interface CategoryMeta {
  title: string;
  image: string;
  intro: string;
  whyChoose: string[];
  permitInfo: string;
  bestTime: string;
  packingList: string[];
  faqs: { q: string; a: string }[];
  itinerary: { day: number; title: string; desc: string }[];
}

export const CATEGORIES_DETAILS: Record<string, CategoryMeta> = {
  "Gorilla Trekking Safaris": {
    title: "Gorilla Trekking Safaris",
    image: "/images/lac3.jpg",
    intro: "Venture deep into the ancient, misty canopy of Bwindi Impenetrable Forest and Mgahinga Gorilla National Park to stand feet away from endangered Mountain Gorillas. This is widely considered the ultimate wildlife encounter on Earth.",
    whyChoose: [
      "Access to half of the world's remaining mountain gorilla population",
      "Led by professional, armed Uganda Wildlife Authority rangers and expert native trackers",
      "High tracking success rate exceeding 99%",
      "Direct contribution to local forest communities and critical mountain gorilla conservation efforts"
    ],
    permitInfo: "Securing a Gorilla permit is mandatory and regulated strictly by the government. Permits are currently priced at $800 for foreign non-residents. We manage the entire application and reservation process seamlessly for you.",
    bestTime: "June to August, and December to February (dry seasons make the dense jungle hillsides much easier to navigate).",
    packingList: [
      "Sturdy waterproof hiking boots with deep grip",
      "Long-sleeved safari shirt and durable trousers to protect against nettles",
      "Thick wool hiking socks (for tucking in trousers to protect against ants)",
      "Rubber-gripped gardening gloves (critical for grasping wild branches on steep ridges)",
      "Lightweight waterproof rain poncho or jacket",
      "Camera with high zoom capabilities and high ISO (no flash photography is permitted)"
    ],
    faqs: [
      { q: "How difficult is the gorilla trek?", a: "Trekking difficulty ranges from moderate to strenuous. You will hike across steep, slippery forest ridges at altitudes between 1,160m and 2,607m. Hikes can take anywhere from 2 to 6 hours. Porters are available for hire to carry daypacks." },
      { q: "What is the minimum age for trekking?", a: "The official minimum age for gorilla trekking in Uganda is 15 years old, strictly enforced by the park authorities." },
      { q: "How close can I get to the gorillas?", a: "The official safe distance is 10 meters (about 32 feet). This is crucial to prevent the transmission of human diseases to the gorillas, who share 98% of our DNA." }
    ],
    itinerary: [
      { day: 1, title: "Scenic Drive to the Jungle", desc: "Pick up from Entebbe, drive through beautiful rolling terraced hills and equatorial landmarks. Arrive at a luxury forest-facing lodge." },
      { day: 2, title: "The Life-Changing Trek", desc: "Rise early for ranger briefing. Enter the ancient forest. Spend a pristine, breathtaking 1 hour with a gorilla family. Celebratory campfire dinner." },
      { day: 3, title: "Departure via Equator Crossing", desc: "Enjoy organic local coffee, drive back to Entebbe, stopping for handcraft shopping and lunch at the Equator crossing." }
    ]
  },
  "Wildlife Safaris": {
    title: "Wildlife Safaris",
    image: "/images/lac2.jpg",
    intro: "Traverse Uganda's expansive savanna parks from Queen Elizabeth to Kidepo Valley and Murchison Falls. View elephants, leopards, buffaloes, and the iconic tree-climbing lions of Ishasha.",
    whyChoose: [
      "Diverse habitats ranging from semi-arid valleys to water-rich savanna canals",
      "Uncrowded game drive tracks ensuring exclusive, quiet wildlife viewing",
      "Combined boat safaris and traditional 4x4 game drives in custom open-roof vehicles",
      "Superb big game density including lions, leopards, giraffes, and huge elephant herds"
    ],
    permitInfo: "All park entrance concessions and vehicle entry permits are fully taken care of inside our packages.",
    bestTime: "June to September and December to February when animals congregate around permanent rivers and savanna waterholes.",
    packingList: [
      "Light neutral-colored clothing (khaki, tan, green; avoid dark blue/black as they attract flies)",
      "High-quality binoculars (critical for spotting leopards and distant prides)",
      "Wide-brimmed sun hat, polarized sunglasses, and SPF 50 sunscreen",
      "Light windbreaker jacket for crisp, open-air sunrise game drives",
      "High-zoom telephoto lens for clean wildlife photography"
    ],
    faqs: [
      { q: "Are we guaranteed to see the tree-climbing lions?", a: "While nature is unpredictable, our professional guides have an exceptional 90% success rate in finding them lounging in the sycamore fig trees of Ishasha." },
      { q: "What vehicles do you use?", a: "We use top-tier customized 4x4 Safari Land Cruisers equipped with pop-up roofs, charging sockets, and a refrigerator with cold drinks." }
    ],
    itinerary: [
      { day: 1, title: "Nile River Valley Sunrise", desc: "Depart early for Murchison Falls. Hike to the top of the world's most powerful waterfall. Stay at a luxurious riverside lodge." },
      { day: 2, title: "Savanna Game Drive & Boat Safari", desc: "Sunrise game drive searching for big cats and giraffes. Afternoon cruise to the bottom of the falls alongside hippos." },
      { day: 3, title: "Ziwa Rhino Tracking & Return", desc: "Drive back, stopping at Ziwa Sanctuary to track Southern White Rhinos on foot with specialized rangers." }
    ]
  },
  "Luxury Safaris": {
    title: "Luxury Safaris",
    image: "/images/lac3.jpg",
    intro: "Experience the ultimate fusion of raw, untamed African wilderness and high-end elegance. Stay in award-winning 5-star lodges, enjoy private chartered flights, and savor curated fine dining under the stars.",
    whyChoose: [
      "Private chartered flights between destinations to bypass long driving hours",
      "Exclusive stays in Uganda's finest boutique lodges and luxury glamping estates",
      "Dedicated, highly certified master safari guides and private 4x4 vehicles",
      "Bespoke amenities including private massage therapies, customized butler service, and premium organic dining"
    ],
    permitInfo: "All high-end permits (gorilla, chimp, boat cruises) are handled with priority booking and VIP delivery.",
    bestTime: "Excellent year-round. January to March and June to October offer prime conditions.",
    packingList: [
      "Breezy, elegant evening wear for lodge dinners",
      "Comfortable lightweight shoes for private charter flights",
      "High-grade camera body and prime lenses",
      "High-protection sunscreen, luxury shades, and wide sunhat",
      "Warm premium fleece or cashmere sweater for chilly forest nights"
    ],
    faqs: [
      { q: "What defines your luxury lodges?", a: "Our handpicked lodges feature private infinity pools, forest-facing decks, en-suite stone baths, premium organic toiletries, and exceptional chef-crafted gourmet menus." },
      { q: "Are domestic flights safe?", a: "Absolutely. We partner exclusively with certified, leading domestic aviation operators utilizing modern aircraft and highly experienced pilots." }
    ],
    itinerary: [
      { day: 1, title: "VIP Airport Landing & Fly-In", desc: "VIP meet-and-greet at Entebbe airport, fly directly via private charter to Bwindi forest. Stay in an ultra-luxurious jungle villa." },
      { day: 2, title: "Elite Gorilla Tracking & Massage", desc: "Track gorillas with a private ranger. Return for a complimentary deep-tissue forest massage and fine dining." },
      { day: 3, title: "Fly back to Victoria Shores", desc: "Board your private aircraft, landing in Entebbe. Enjoy a luxurious sunset boat cruise on Lake Victoria before departure." }
    ]
  },
  "Bird Watching Safaris": {
    title: "Bird Watching Safaris",
    image: "/images/lac4.jpg",
    intro: "Uganda is Africa's premier birding destination, with over 1,080 confirmed species packed into a compact geographic area. Spot Albertine Rift endemics and seek the prehistoric Shoebill Stork.",
    whyChoose: [
      "Led by professional ornithologist guides who identify hundreds of species by call alone",
      "Exceptional variety of habitats: tropical rainforests, papyrus swamps, and savannahs",
      "Specialized, slow-paced itineraries focused on photography and active bird listing",
      "High-probability sightings of the highly sought-after, legendary Shoebill Stork"
    ],
    permitInfo: "Includes all specialized forest reserve permits and traditional papyrus canoe guides.",
    bestTime: "September to April when migratory birds from Europe and North Africa are present in Uganda.",
    packingList: [
      "High-magnification binoculars or spotting scopes",
      "Bird Field Guide to East Africa",
      "Dull green, brown, or dark-grey clothing",
      "Waterproof notebook or tablet with bird list applications",
      "Anklets or high gaiters for walking through swamp pathways"
    ],
    faqs: [
      { q: "Can we see the Shoebill Stork?", a: "Yes, our birding excursions to Mabamba Swamp and Murchison delta have an outstanding 95% record of locating this spectacular bird." },
      { q: "Are the birding guides certified?", a: "Yes, our guides are executive members of the Uganda Bird Guides Club with decades of academic and field experience." }
    ],
    itinerary: [
      { day: 1, title: "Mabamba Swamp Canoe Expedition", desc: "Board a quiet wooden canoe in search of the prehistoric Shoebill. Transfer to Kibale forest canopy." },
      { day: 2, title: "Kibale Forest Canopy Birding", desc: "Search for the rare Green-breasted Pitta and Great Blue Turaco. Explore Bigodi Wetland Sanctuary." },
      { day: 3, title: "Albertine Rift Valley Listing", desc: "Explore Semuliki hot springs and rift valley ridges for forest specialists before returning." }
    ]
  },
  "Chimpanzee Tracking Safaris": {
    title: "Chimpanzee Tracking Safaris",
    image: "/images/lac5.jpg",
    intro: "Walk through the high-canopy jungle of Kibale National Park—the primate capital of the world. Track, listen, and observe wild chimpanzee communities as they swing from branches, hoot, and interact.",
    whyChoose: [
      "Home to over 1,500 habituated chimpanzees in Kibale Forest alone",
      "Chimpanzee Habituation Experience (CHEX) options to spend a full day in the forest",
      "Guided by world-class primate researchers and native expert rangers",
      "Encounters with 12 other spectacular primate species including Red Colobus and L'Hoest's monkeys"
    ],
    permitInfo: "Chimpanzee tracking permits cost $250 for foreign non-residents. Permits are strictly limited per session and fully managed inside our safari plans.",
    bestTime: "Excellent year-round, but dry months of June-September and December-February are best for hiking.",
    packingList: [
      "Comfortable jungle walking shoes or boots",
      "Light rain jacket (it rains frequently in the primate forests)",
      "Binoculars to spot chimps nesting high in the canopy",
      "Insect repellent with a high concentration of DEET",
      "Compact daypack with bottled water and energy snacks"
    ],
    faqs: [
      { q: "What is the difference between Tracking and Habituation?", a: "Standard tracking gives you 1 hour with chimps that are fully used to humans. Habituation (CHEX) allows you to accompany researchers for a full day as they habituate wild chimps." },
      { q: "What is the minimum age for chimpanzee tracking?", a: "The minimum age is 12 years old." }
    ],
    itinerary: [
      { day: 1, title: "Depart to Primate Capital", desc: "Drive west to Kibale Forest, passing through Fort Portal crater highland lakes. Welcome briefing." },
      { day: 2, title: "Chimp Trekking & Bigodi Swamp Walk", desc: "Track chimps in Kibale. Afternoon boardwalk walk in Bigodi Wetlands to spot colobus monkeys and unique plants." },
      { day: 3, title: "Crater Lake Hike & Return", desc: "Scenic walk to Top of the World crater view. Return drive to Kampala/Entebbe." }
    ]
  }
};

export const DEFAULT_CATEGORY_META = (catName: string): CategoryMeta => ({
  title: catName,
  image: "/images/lac6.jpg",
  intro: `Embark on a customized, professionally guided ${catName} adventure with Horizon Chasers Uganda. Explore the unmatched, wild landscapes of East Africa and create stories that last a lifetime.`,
  whyChoose: [
    "Fully custom-designed itineraries matching your exact budget and timeframe",
    "Expert, native Ugandan English-speaking safari guides",
    "Eco-conscious and sustainable operations direct-funding wildlife preservation",
    "24/7 premium support and safety protocols from booking to departure"
  ],
  permitInfo: "We acquire and secure all required permits directly from the Uganda Wildlife Authority.",
  bestTime: "June to September and December to February are outstanding dry safari seasons.",
  packingList: [
    "Lightweight travel apparel in khaki, tan, or green",
    "Comfortable walking shoes or trail runners",
    "A reliable sun hat and polarized sunglasses",
    "Camera and charger gear",
    "Personal medication and high-strength insect repellent"
  ],
  faqs: [
    { q: "Can this tour be customized?", a: "Yes, all of our safaris are 100% customizable. You can adjust the duration, lodging category, and daily activities to fit your exact preferences." },
    { q: "Are airport transfers included?", a: "Yes, all of our safari packages include complimentary private transfers from Entebbe International Airport on your arrival and departure days." }
  ],
  itinerary: [
    { day: 1, title: "Arrival & Welcome", desc: "Your dedicated Horizon Chasers guide meets you at Entebbe Airport and transfers you to your luxury hotel." },
    { day: 2, title: "Safari Expedition Start", desc: "Embark on your spectacular wilderness journey, enjoying scenic lookouts and local organic farm lunches." },
    { day: 3, title: "Epic Game Drives & Safaris", desc: "Enjoy sunrise and sunset wildlife viewing drives before gathering around a crackling evening campfire." }
  ]
});

export const EXPERIENCES_DETAILS = [
  {
    title: "Gorilla Trekking",
    image: "/images/lac7.jpg",
    desc: "Come face to face with the legendary mountain silverbacks in their deep jungle sanctuary.",
    linkCategory: "Gorilla Trekking Safaris"
  },
  {
    title: "Wildlife Safaris",
    image: "/images/lac8.jpg",
    desc: "Embark on classic open-roof 4x4 drives across savannas teeming with lions, leopards, and giraffes.",
    linkCategory: "Wildlife Safaris"
  },
  {
    title: "Chimpanzee Tracking",
    image: "/images/lac9.jpg",
    desc: "Observe wild chimps hoot and play in the high-canopy jungle foliage of Kibale.",
    linkCategory: "Chimpanzee Tracking Safaris"
  },
  {
    title: "Bird Watching",
    image: "/images/lac10.jpg",
    desc: "Explore a birdwatcher's paradise of 1,000+ species with certified master ornithologists.",
    linkCategory: "Bird Watching Safaris"
  },
  {
    title: "Cultural Tours",
    image: "/images/lac11.jpg",
    desc: "Connect with ancient tribal kingdoms, royal drum makers, and Batwa pygmies.",
    linkCategory: "Cultural Safaris"
  },
  {
    title: "Mountain Hiking",
    image: "/images/lac12.jpg",
    desc: "Scale the legendary snow-capped Rwenzori 'Mountains of the Moon' and volcanic peaks.",
    linkCategory: "Mountain Hiking"
  }
];

export const GALLERY_IMAGES = [
  { url: "/images/lac13.jpg", caption: "Endangered Mountain Gorilla in Bwindi Rainforest Canopy" },
  { url: "/images/lac14.jpg", caption: "Herd of African Elephants Grazing in Queen Elizabeth Park" },
  { url: "/images/lac15.jpg", caption: "Spectacular Sunrise over the Savannah Ridges" },
  { url: "/images/lac16.jpg", caption: "Chimpanzee Lounging High in Kibale Forest Canopy" },
  { url: "/images/lac17.jpg", caption: "Mighty Murchison Falls Crashing Through 7-meter Gorge" },
  { url: "/images/lac18.jpg", caption: "Golden Sunsets on the Nile River Cruise" }
];

export const FAQ_ITEMS = [
  { q: "Is Uganda safe for travelers?", a: "Yes, Uganda is widely regarded as one of the safest and most hospitable countries in Africa. National parks are patrolled 24/7 by dedicated, professional Uganda Wildlife Authority rangers. We only utilize secure, premium transport and fully-vetted luxury lodges." },
  { q: "What are the visa and health requirements?", a: "Most travelers require an Electronic Visa (e-Visa) secured online before travel ($50). A Yellow Fever vaccination certificate is mandatory for entry. Malaria prophylactics are highly recommended. We provide full detailed advice upon booking." },
  { q: "What is your refund and postponement policy?", a: "Postponements are highly flexible. In the event of cancellations, refunds are subject to lodge policies and the non-refundable nature of government gorilla/chimp permits. We strongly recommend purchasing comprehensive travel insurance." },
  { q: "How do we request a custom itinerary?", a: "Simply use our 'Plan Your Trip' booking form. Detail your desired destinations, guest counts, budget preferences, and our master itinerary architects will design a bespoke draft proposal for you within 24 hours entirely free of charge!" }
];
