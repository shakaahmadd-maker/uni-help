import React from "react";
import { STATS_DATA } from "../data";
import { FileCheck, Users, School } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCheck: FileCheck,
  Users: Users,
  School: School
};

export default function ReusableStats() {
  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-brand-blue-950/5 border border-brand-blue-100 p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-stretch divided">
          {STATS_DATA.map((stat, idx) => {
            const IconComponent = iconMap[stat.iconName] || FileCheck;
            return (
              <div
                key={stat.label}
                id={`stat-card-${idx}`}
                className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-5 transition-transform duration-300 hover:translate-y-[-2px]"
              >
                {/* Visual Icon Outer Container */}
                <div className="p-4 rounded-2xl bg-brand-blue-50 text-brand-blue-600 block shrink-0">
                  <IconComponent className="h-7 w-7 stroke-[2]" />
                </div>
                
                {/* Copy blocks */}
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-brand-blue-950 tracking-tight flex items-baseline justify-center md:justify-start">
                    {stat.value}
                  </div>
                  <div className="text-sm font-sans font-bold text-brand-blue-800 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                    {stat.description}
                  </p>
                </div>

                {/* Vertical Divider line shown on medium and above screens */}
                {idx < 2 && (
                  <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-brand-blue-100 self-center" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
