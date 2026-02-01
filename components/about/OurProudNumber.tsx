"use client";

import ScrollMotion from '@/components/motion/ScrollMotion';
import { useLocale } from '@/lib/i18n';
import Translations from '@/messages/translations';
import { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from "react-simple-maps";
import { Tooltip } from "react-tooltip";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const OurProudNumber = () => {
  const [content, setContent] = useState("");
  const { locale } = useLocale();
  const t = Translations[locale].AboutUs.ProudNumbers;

  const stats = [
    { value: "15+", label: t.stats.experience },
    { value: "3", label: t.stats.factories },
    { value: "99%", label: t.stats.retention },
    { value: "500+", label: t.stats.projects }
  ];

  // ISO 3166-1 numeric codes for highlighted countries
  const highlightedCountries = useMemo(() => [
    "840", "124", "484", 
    "276", "724", "826", "250", "380", 
    "036", 
    "634", "682", "784"
  ], []);

  return (
    <ScrollMotion animation="fade-up">
    <section className="py-8 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-title text-gray-900 mb-2">
            {t.titlePrefix}
          </h2>
          <span className="text-4xl md:text-5xl font-title text-primary">
            {t.titleHighlight}
          </span>
        </div>

        {/* Stats Container */}
        <div className="bg-[#E9F7EB] rounded-[3rem] p-8 md:p-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[160px]"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base px-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* World Map */}
        <div className="relative w-full h-[250px] md:h-[500px] lg:h-[600px] flex items-center justify-center bg-gray-50/10 rounded-3xl overflow-hidden border border-gray-100/50">
          <ComposableMap 
            projection="geoEqualEarth"
            projectionConfig={{ 
              scale: 180,
              center: [0, 0] 
            }}
            width={900}
            height={500}
            className="w-full h-full"
            data-tooltip-id="my-tooltip"
          >
           <Sphere stroke="#D4E7D9" strokeWidth={0.5} id="sphere" fill="transparent" />
           <Graticule stroke="#D4E7D9" strokeWidth={0.5} />
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo) => {
                  const isHighlighted = highlightedCountries.includes(geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                         if (isHighlighted) {
                             setContent(`${geo.properties.name}`);
                         } else {
                             setContent("");
                         }
                      }}
                       onMouseLeave={() => {
                        setContent("");
                      }}
                      fill={isHighlighted ? "#28883D" : "#E2E8F0"}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { 
                          fill: isHighlighted ? "#1e6b2e" : "#CBD5E1", 
                          outline: "none",
                          cursor: isHighlighted ? "pointer" : "default"
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          <Tooltip id="my-tooltip" content={content} float place="top" style={{ backgroundColor: "#1e293b", color: "#fff", borderRadius: "8px", padding: "8px 12px" }} />
        </div>

      </div>
    </section>
    </ScrollMotion>
  );
};

export default OurProudNumber;
