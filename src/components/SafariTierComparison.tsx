import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, X, ShieldCheck, Compass, Info, DollarSign, Calendar, Users, Award, Gem, Flame } from "lucide-react";

interface SafariTierComparisonProps {
  onSelectInquiry: (tierName: string) => void;
}

export default function SafariTierComparison({ onSelectInquiry }: SafariTierComparisonProps) {
  const [duration, setDuration] = useState<number>(5); // 3, 5, 7, 10 days
  const [currency, setCurrency] = useState<"USD" | "EUR" | "UGX">("USD");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const durationOptions = [3, 5, 7, 10];
  const currencyRates = {
    USD: { symbol: "$", rate: 1, label: "USD" },
    EUR: { symbol: "€", rate: 0.92, label: "EUR" },
    UGX: { symbol: "UGX ", rate: 3750, label: "UGX (Shs)" }
  };

  const formatPrice = (usdAmount: number) => {
    const config = currencyRates[currency];
    const converted = usdAmount * config.rate;
    if (currency === "UGX") {
      return `${config.symbol}${Math.round(converted / 1000) * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const tiers = [
    {
      id: "budget",
      name: "Adventure Budget",
      subtitle: "Close to Nature & Authentic",
      tagline: "Uncompromising wildlife access for conscious explorers.",
      avgDailyPriceUSD: 190,
      icon: Compass,
      iconColor: "text-stone-500",
      accentColor: "border-stone-200 hover:border-stone-400",
      badge: "Incredible Value",
      badgeColor: "bg-stone-100 text-stone-700 border-stone-200",
      features: {
        accommodation: "Cozy eco-campsites, wilderness bandas, or clean local tourist guesthouses.",
        vehicle: "4WD Customized Safari Van with high-clearance & popup roof.",
        meals: "Full board local & continental meals prepared by camp chefs or lodge kitchens.",
        permitLogistics: "Standard gorilla/chimpanzee permit procurement and scheduling.",
        guides: "Dedicated professional driver-guide with certified national park licenses.",
        activities: "Scheduled group game drives, standard boat cruises, and nature walks.",
        excursions: "Shared boat rides on Kazinga Channel or Murchison delta.",
        amenities: "Bottled drinking water in vehicle, standard park maps, binoculars shared.",
        idealFor: "Backpackers, solo travelers, student researchers, long-term expeditions."
      }
    },
    {
      id: "midrange",
      name: "Classic Mid-Range",
      subtitle: "Comfort Meets the Wild",
      tagline: "The ideal sweet spot of comfort, privacy, and exceptional value.",
      avgDailyPriceUSD: 440,
      icon: ShieldCheck,
      iconColor: "text-forest",
      accentColor: "border-forest shadow-md ring-1 ring-forest/10 scale-102 z-10",
      badge: "Most Popular",
      badgeColor: "bg-forest/10 text-forest border-forest/20",
      features: {
        accommodation: "Stunning 3-4★ safari lodges & premium luxury tented camps with en-suite bathrooms and gorgeous views.",
        vehicle: "Private 4x4 Safari Land Cruiser with guaranteed window seats & popup roof.",
        meals: "Gourmet three-course dinners, hot cooked breakfasts, and gourmet picnic baskets.",
        permitLogistics: "Priority permit acquisition, customized trekking groups, pre-booking coordination.",
        guides: "Expert senior naturalist guide with specialized knowledge of flora, fauna & birding.",
        activities: "Unlimited private game drives, fast-track boat cruises, and community visits.",
        excursions: "Classic boat cruises, chimpanzee walks, guided canopy walking.",
        amenities: "Unlimited cold water, charging ports in vehicle, reference books, high-end binoculars.",
        idealFor: "Couples, families with kids, amateur photographers, comfort-seeking travelers."
      },
      isFeatured: true
    },
    {
      id: "luxury",
      name: "Elite Luxury",
      subtitle: "Opulence in the Wilderness",
      tagline: "Bespoke VIP travel with domestic chartered flights and boutique sanctuaries.",
      avgDailyPriceUSD: 1180,
      icon: Gem,
      iconColor: "text-gold",
      accentColor: "border-gold hover:border-gold/80 bg-stone-900 text-white",
      badge: "Signature VIP",
      badgeColor: "bg-gold/25 text-gold border-gold/35",
      features: {
        accommodation: "Exquisite 5★ boutique forest villas, designer lodges with private plunge pools & forest canopy decks.",
        vehicle: "Extended luxury 4x4 Land Cruiser with climate control, plus domestic flights between parks.",
        meals: "Chef-curated organic a-la-carte menus, vintage wines, imported premium spirits & private bush dinners.",
        permitLogistics: "VIP fast-track permit handling, custom private tracking, personal porters fully included.",
        guides: "Elite veteran master guide with 15+ years experience and dedicated private armed ranger escort.",
        activities: "Completely customizable private schedules, exclusive night game drives, and private park activities.",
        excursions: "Chartered private boat cruises, helicopter scenic flights, exclusive tribal interactions.",
        amenities: "Onboard cooler with premium drinks, gourmet snack baskets, high-powered individual binoculars.",
        idealFor: "Honeymooners, luxury collectors, private groups, travelers looking for the absolute finest."
      }
    }
  ];

  const compareRows = [
    { key: "accommodation", label: "Lodging & Resorts" },
    { key: "vehicle", label: "Safari Transport" },
    { key: "meals", label: "Dining & Drinks" },
    { key: "permitLogistics", label: "Permit Clearance" },
    { key: "guides", label: "Guiding Standards" },
    { key: "activities", label: "Game Drive Privacy" },
    { key: "excursions", label: "Key Inclusions" },
    { key: "amenities", label: "Onboard Comforts" },
    { key: "idealFor", label: "Best Suited For" }
  ];

  return (
    <div id="safari-tier-comparison" className="space-y-8 bg-white border border-forest/15 p-6 md:p-8 lg:p-12 shadow-sm rounded-none">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-forest/10">
        <div>
          <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono flex items-center gap-1.5">
            <Award className="w-4 h-4 text-gold" /> Experience Matrix
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-forest mt-1">Compare Safari Tiers Side-by-Side</h3>
          <p className="text-stone-500 text-xs mt-1 max-w-xl">
            Horizon Chasers offers three carefully tailored safari tiers. Adjust the duration and currency below to see an instant dynamic cost estimation.
          </p>
        </div>

        {/* Interactive Toggles */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          {/* Duration Selector */}
          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest">Duration Selection</label>
            <div className="flex bg-stone-100 p-0.5 border border-stone-200">
              {durationOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setDuration(opt)}
                  className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    duration === opt ? "bg-forest text-white shadow-sm" : "text-stone-600 hover:text-forest"
                  }`}
                >
                  {opt} Days
                </button>
              ))}
            </div>
          </div>

          {/* Currency Toggle */}
          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest">Select Currency</label>
            <div className="flex bg-stone-100 p-0.5 border border-stone-200">
              {(Object.keys(currencyRates) as Array<"USD" | "EUR" | "UGX">).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    currency === curr ? "bg-gold text-white shadow-sm" : "text-stone-600 hover:text-gold"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Table Layout */}
      <div className="overflow-x-auto no-scrollbar -mx-6 px-6">
        <div className="min-w-[850px] table-fixed w-full">
          {/* Table Head: Card Summaries */}
          <div className="grid grid-cols-12 gap-4 pb-6">
            <div className="col-span-3 flex flex-col justify-end pb-4">
              <div className="space-y-2 pr-4 border-r border-forest/10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-forest uppercase tracking-widest font-mono">Safari Blueprint</div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 mt-1">The Luxury Standards</h4>
                  <p className="text-stone-500 text-[11px] mt-2 leading-relaxed">
                    Hover over any tier feature to highlight and compare specifications across all classes of travel.
                  </p>
                </div>
                <div className="text-[10px] text-stone-400 italic font-mono">
                  *All prices are estimations based on selected duration.
                </div>
              </div>
            </div>

            {tiers.map((t) => {
              const IconComp = t.icon;
              const totalEstPrice = t.avgDailyPriceUSD * duration;
              return (
                <div
                  key={t.id}
                  className={`col-span-3 p-5 border flex flex-col justify-between relative transition-all duration-300 ${t.accentColor}`}
                >
                  {/* Badge */}
                  <span className={`absolute -top-3 right-4 px-2 py-0.5 border text-[9px] font-bold uppercase tracking-widest ${t.badgeColor}`}>
                    {t.badge}
                  </span>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <IconComp className={`w-5 h-5 ${t.iconColor}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${t.id === "luxury" ? "text-gold" : "text-stone-400"}`}>
                        Tier {t.id === "budget" ? "I" : t.id === "midrange" ? "II" : "III"}
                      </span>
                    </div>

                    <div>
                      <h4 className={`font-serif text-lg font-bold ${t.id === "luxury" ? "text-gold" : "text-stone-900"}`}>{t.name}</h4>
                      <p className={`text-[10px] italic mt-0.5 ${t.id === "luxury" ? "text-stone-300" : "text-stone-500"}`}>{t.subtitle}</p>
                    </div>

                    <p className={`text-xs ${t.id === "luxury" ? "text-stone-300" : "text-stone-600"} leading-relaxed min-h-[48px]`}>
                      {t.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-forest/10 mt-4 space-y-2">
                    <div>
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${t.id === "luxury" ? "text-stone-400" : "text-stone-400"}`}>Avg. Daily / Person</span>
                      <p className={`text-xl font-bold font-serif ${t.id === "luxury" ? "text-gold" : "text-forest"}`}>
                        {formatPrice(t.avgDailyPriceUSD)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Est. Total ({duration} Days)</span>
                      <p className="text-xs font-bold font-serif">
                        {formatPrice(totalEstPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table Body: Feature Rows */}
          <div className="space-y-1">
            {compareRows.map((row) => (
              <div
                key={row.key}
                onMouseEnter={() => setHoveredRow(row.key)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`grid grid-cols-12 gap-4 items-center p-3.5 border transition-colors ${
                  hoveredRow === row.key 
                    ? "bg-ivory border-gold/35 shadow-sm" 
                    : "bg-stone-50/40 border-stone-100"
                }`}
              >
                {/* Row Header Label */}
                <div className="col-span-3">
                  <span className={`text-xs font-bold uppercase tracking-wider ${hoveredRow === row.key ? "text-forest font-serif" : "text-stone-700"}`}>
                    {row.label}
                  </span>
                </div>

                {/* Columns content */}
                {tiers.map((t) => {
                  const featureValue = t.features[row.key as keyof typeof t.features];
                  return (
                    <div
                      key={t.id}
                      className={`col-span-3 text-xs leading-relaxed px-1.5 ${
                        t.id === "luxury" ? "text-stone-200" : "text-stone-600"
                      }`}
                    >
                      <div className="flex items-start gap-1.5">
                        <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                          t.id === "luxury" ? "text-gold" : "text-emerald-600"
                        }`} />
                        <span>{featureValue}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Table Footer Actions */}
          <div className="grid grid-cols-12 gap-4 pt-6">
            <div className="col-span-3"></div>
            {tiers.map((t) => (
              <div key={t.id} className="col-span-3">
                <button
                  onClick={() => onSelectInquiry(t.name)}
                  className={`w-full py-3.5 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    t.id === "luxury"
                      ? "bg-gold hover:bg-gold/90 text-white border border-gold/15"
                      : t.id === "midrange"
                      ? "bg-forest hover:bg-forest/90 text-white border border-forest/15 shadow-md"
                      : "bg-white hover:bg-stone-50 text-stone-800 border border-stone-200"
                  }`}
                >
                  Inquire {t.name.split(" ")[1] || t.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Accordion View for Responsive Integrity */}
      <div className="lg:hidden space-y-6 pt-4 border-t border-stone-100">
        <h4 className="font-serif text-base font-bold text-forest text-center">Mobile Summary Comparison</h4>
        <div className="space-y-4">
          {tiers.map((t) => {
            const IconComp = t.icon;
            const totalEstPrice = t.avgDailyPriceUSD * duration;
            return (
              <div key={t.id} className={`p-5 border space-y-4 ${t.accentColor === "border-gold hover:border-gold/80 bg-stone-900 text-white" ? "bg-stone-900 text-white border-gold" : "bg-stone-50 border-stone-200"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComp className={`w-5 h-5 ${t.iconColor}`} />
                    <h5 className="font-serif font-bold text-sm">{t.name}</h5>
                  </div>
                  <span className={`px-2 py-0.5 border text-[8px] font-bold uppercase tracking-widest ${t.badgeColor}`}>
                    {t.badge}
                  </span>
                </div>

                <p className="text-xs text-stone-500 italic">{t.tagline}</p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-forest/10">
                  <div>
                    <span className="text-[9px] text-stone-400 block uppercase">Daily rate</span>
                    <span className="font-bold text-forest text-base">{formatPrice(t.avgDailyPriceUSD)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 block uppercase">Total ({duration} Days)</span>
                    <span className="font-bold text-base">{formatPrice(totalEstPrice)}</span>
                  </div>
                </div>

                {/* Key Bullet List for Mobile */}
                <div className="space-y-1.5 pt-3 border-t border-forest/10 text-xs text-stone-600">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Lodging:</strong> {t.features.accommodation}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Vehicle:</strong> {t.features.vehicle}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Guides:</strong> {t.features.guides}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectInquiry(t.name)}
                  className={`w-full py-3 text-[10px] font-bold uppercase tracking-widest transition-all mt-2 cursor-pointer ${
                    t.id === "luxury"
                      ? "bg-gold text-white"
                      : t.id === "midrange"
                      ? "bg-forest text-white"
                      : "bg-white text-stone-800 border"
                  }`}
                >
                  Inquire {t.name.split(" ")[1]}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
