import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ArrowRight, Compass, Minimize2 } from "lucide-react";

interface DestinationInfo {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  image: string;
  x: number; // SVG percentage X
  y: number; // SVG percentage Y
  bestTime: string;
  safariType: string;
}

const DESTINATIONS: DestinationInfo[] = [
  {
    id: "kidepo",
    name: "Kidepo Valley National Park",
    description: "Uganda's most isolated national park, offering a rugged wilderness experience that is virtually unmatched in Africa. Home to spectacular mountain landscapes and savanna wildlife.",
    highlights: ["Cheetahs & Ostriches", "Ik & Karamojong Tribal Culture", "Apoka Lookout Point"],
    image: "/images/lac3.jpg",
    x: 82,
    y: 15,
    bestTime: "December to February",
    safariType: "Luxury & Wilderness"
  },
  {
    id: "murchison",
    name: "Murchison Falls National Park",
    description: "Where the mighty Nile squeezes through an extremely narrow 7-meter gorge with thunderous impact. Offers spectacular boat cruises and dense big game viewing.",
    highlights: ["Thundering Waterfall", "Nile River Boat Cruise", "Rothschild Giraffes"],
    image: "/images/lac17.jpg",
    x: 38,
    y: 35,
    bestTime: "January to March, June to September",
    safariType: "Wildlife & Boat Safaris"
  },
  {
    id: "kibale",
    name: "Kibale National Park",
    description: "The primate capital of the world, boasting the highest density and diversity of primates in East Africa, including over 1,500 wild chimpanzees.",
    highlights: ["Chimpanzee Tracking", "13 Primate Species", "Bigodi Wetland Canopy Walk"],
    image: "/images/lac5.jpg",
    x: 27,
    y: 58,
    bestTime: "June to September, December to February",
    safariType: "Chimpanzee Tracking"
  },
  {
    id: "queen",
    name: "Queen Elizabeth National Park",
    description: "Framed by the Rwenzori Mountains, this park features sprawling savannas, crater lakes, and the Kazinga Channel channel filled with hippos and elephants.",
    highlights: ["Tree-climbing Lions of Ishasha", "Kazinga Channel cruise", "Volcanic Crater Lakes"],
    image: "/images/lac8.jpg",
    x: 20,
    y: 68,
    bestTime: "January, February, June to August",
    safariType: "Wildlife & Lions"
  },
  {
    id: "bwindi",
    name: "Bwindi Impenetrable Forest",
    description: "An ancient, misty, rainforest sanctuary that is home to roughly half of the world's remaining endangered Mountain Gorillas. Truly a life-changing trekking experience.",
    highlights: ["Mountain Gorilla Trekking", "Ancient Rainforest Trails", "Batwa Tribal Culture"],
    image: "/images/lac1.jpg",
    x: 15,
    y: 84,
    bestTime: "June to August, December to February",
    safariType: "Gorilla Trekking"
  },
  {
    id: "mburo",
    name: "Lake Mburo National Park",
    description: "A gorgeous mosaic of acacia woodlands and wetlands. This is the only park in southern Uganda where you can walk amongst herds of zebras, impalas, and elands.",
    highlights: ["Walking Safaris", "Zebras & Impalas", "Night Game Drives"],
    image: "/images/lac14.jpg",
    x: 42,
    y: 76,
    bestTime: "June to August, December to February",
    safariType: "Nature Walks & Birding"
  },
  {
    id: "jinja",
    name: "Jinja & Source of the Nile",
    description: "The historic adventure capital of East Africa, where the Nile emerges from Lake Victoria. Known for legendary white-water rafting, kayaking, and quad biking.",
    highlights: ["Source of the Nile Monument", "White Water Rafting", "Kayaking & Speedboats"],
    image: "/images/lac18.jpg",
    x: 65,
    y: 62,
    bestTime: "Year-Round",
    safariType: "Adventure & Rafting"
  }
];

interface UgandaMapProps {
  onSelectSafariType: (type: string) => void;
}

export default function UgandaMap({ onSelectSafariType }: UgandaMapProps) {
  const [selectedDest, setSelectedDest] = useState<DestinationInfo>(DESTINATIONS[4]); // default Bwindi

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/40 p-6 rounded-3xl border border-gold/10 luxury-shadow">
      {/* Map SVG Canvas Column */}
      <div className="lg:col-span-7 relative bg-stone-50/50 rounded-2xl p-4 overflow-hidden border border-stone-200">
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest text-white text-xs font-semibold rounded-full tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
            Interactive Safari Map
          </span>
          <p className="text-xs text-stone-500 mt-1">Click a glowing gold marker to explore Uganda's wilderness</p>
        </div>

        {/* Simplified Aesthetic SVG Outline of Uganda */}
        <svg
          viewBox="0 0 500 500"
          className="w-full h-auto max-h-[480px] drop-shadow-[0_8px_24px_rgba(31,94,59,0.06)]"
        >
          {/* Uganda borders shape */}
          <path
            d="M 120 40 
               C 180 35, 230 45, 300 20 
               C 340 10, 420 30, 450 60 
               C 470 80, 480 120, 470 170 
               C 460 210, 420 230, 410 270 
               C 400 310, 440 330, 420 380 
               C 400 420, 310 440, 270 470 
               C 230 490, 150 490, 110 480 
               C 80 470, 70 420, 60 380 
               C 50 340, 90 320, 80 270 
               C 70 220, 50 160, 60 110 
               C 70 70, 90 45, 120 40 Z"
            fill="#F3EFE6"
            stroke="#1F5E3B"
            strokeWidth="3"
            strokeLinejoin="round"
            className="transition-colors duration-500"
          />

          {/* Major Lakes representation */}
          {/* Lake Victoria */}
          <path
            d="M 330 380 C 370 360, 450 390, 430 450 C 390 480, 320 460, 330 380 Z"
            fill="#D9E6EF"
            stroke="#A3C5DE"
            strokeWidth="1.5"
          />
          {/* Lake Albert */}
          <path
            d="M 100 180 C 120 150, 170 110, 190 140 C 170 180, 120 220, 100 180 Z"
            fill="#D9E6EF"
            stroke="#A3C5DE"
            strokeWidth="1.5"
          />
          {/* Lake Edward */}
          <path
            d="M 60 340 C 70 330, 90 330, 85 365 C 75 375, 55 360, 60 340 Z"
            fill="#D9E6EF"
            stroke="#A3C5DE"
            strokeWidth="1.5"
          />

          {/* Render glowing markers for each destination */}
          {DESTINATIONS.map((dest) => {
            const isSelected = selectedDest.id === dest.id;
            // Map percentage x,y into SVG dimensions (500x500)
            const mapX = (dest.x / 100) * 500;
            const mapY = (dest.y / 100) * 500;

            return (
              <g
                key={dest.id}
                className="cursor-pointer group"
                onClick={() => setSelectedDest(dest)}
              >
                {/* Ping animation effect */}
                <circle
                  cx={mapX}
                  cy={mapY}
                  r={isSelected ? "18" : "10"}
                  className={`fill-gold/20 stroke-gold/40 ${isSelected ? "animate-ping" : "group-hover:animate-ping"}`}
                  style={{ transformOrigin: `${mapX}px ${mapY}px`, animationDuration: "1.5s" }}
                />

                {/* Inner solid gold marker */}
                <circle
                  cx={mapX}
                  cy={mapY}
                  r={isSelected ? "8" : "6"}
                  fill={isSelected ? "#1F5E3B" : "#C9A227"}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  className="transition-all duration-300 shadow"
                />

                {/* Label tooltips on map */}
                <g transform={`translate(${mapX}, ${mapY - 14})`}>
                  <rect
                    x="-60"
                    y="-10"
                    width="120"
                    height="18"
                    rx="4"
                    fill={isSelected ? "#1F5E3B" : "#FFFFFF"}
                    className="stroke-stone-200 shadow-sm transition-colors duration-300"
                    style={{ strokeWidth: "0.5px" }}
                  />
                  <text
                    x="0"
                    y="2"
                    textAnchor="middle"
                    fill={isSelected ? "#FFFFFF" : "#2D2D2D"}
                    className="font-sans text-[8px] font-bold tracking-wider"
                  >
                    {dest.name.split(" ")[0]} {dest.name.split(" ")[1] === "Valley" || dest.name.split(" ")[1] === "Falls" ? dest.name.split(" ")[1] : ""}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Information Preview Side Column */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full bg-stone-50 p-6 rounded-2xl border border-stone-100 min-h-[440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDest.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden border border-stone-200 shadow-inner">
              <img
                src={selectedDest.image}
                alt={selectedDest.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-stone-200">
                <p className="text-[10px] font-bold text-forest uppercase tracking-widest">{selectedDest.safariType}</p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-forest tracking-tight">
                {selectedDest.name}
              </h3>
              <div className="flex gap-4 mt-1.5 text-xs text-stone-500">
                <p>
                  <strong className="text-stone-700">Best Time:</strong> {selectedDest.bestTime}
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              {selectedDest.description}
            </p>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Wildlife & Features</p>
              <div className="grid grid-cols-1 gap-1.5">
                {selectedDest.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="pt-6 border-t border-stone-200 mt-auto">
          <button
            onClick={() => onSelectSafariType(selectedDest.safariType)}
            className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-forest/90 text-white py-3 px-4 rounded-xl text-sm font-semibold tracking-wider uppercase transition-colors"
          >
            <span>Explore Related Safaris</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
