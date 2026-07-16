import { Era } from "../types";

export interface ThemeStyles {
  fontTitle: string;
  fontBody: string;
  fontBadge: string;
  bgPage: string;
  bgCard: string;
  borderColor: string;
  accentText: string;
  accentBg: string;
  buttonClass: string;
  buttonActive: string;
  badgeBg: string;
  badgeText: string;
  progressBg: string;
  progressFill: string;
}

export const getThemeStyles = (era: Era): ThemeStyles => {
  switch (era) {
    case "past":
      return {
        fontTitle: "font-pixel font-bold text-[#2a1708] tracking-normal text-xl md:text-2xl",
        fontBody: "font-pixel text-[#3c2512] leading-relaxed text-xs md:text-sm",
        fontBadge: "font-pixel text-[10px] font-bold",
        bgPage: "bg-transparent",
        bgCard: "bg-[#fcf5e3]/95 border-[4px] border-[#4a2e1b] shadow-[4px_4px_0px_0px_#4a2e1b] rounded-none text-[#4a2e1b] p-5",
        borderColor: "border-[#4a2e1b]",
        accentText: "text-[#aa2211] font-bold",
        accentBg: "bg-[#aa2211]",
        buttonClass: "border-[4px] border-[#4a2e1b] bg-[#fbf0cf] hover:bg-[#ebd38e] text-[#4a2e1b] font-pixel font-bold px-4 py-3 transition-all active:translate-y-1 active:shadow-none rounded-none shadow-[4px_4px_0px_0px_#4a2e1b] text-center flex items-center justify-center gap-1.5",
        buttonActive: "bg-[#aa2211] text-[#fcf5e3]",
        badgeBg: "bg-[#aa2211]/10 border-2 border-[#aa2211]/30",
        badgeText: "text-[#aa2211]",
        progressBg: "bg-[#ecdca8] border-2 border-[#4a2e1b]",
        progressFill: "bg-[#aa2211]"
      };
    case "present":
      return {
        fontTitle: "font-pixel font-bold text-[#322340] tracking-normal text-xl md:text-2xl",
        fontBody: "font-pixel text-[#4e3962] leading-relaxed text-xs md:text-sm",
        fontBadge: "font-pixel text-[10px] font-bold",
        bgPage: "bg-transparent",
        bgCard: "bg-[#fff2f7]/95 border-[4px] border-[#4d3266] shadow-[4px_4px_0px_0px_#4d3266] rounded-none text-[#4d3266] p-5",
        borderColor: "border-[#4d3266]",
        accentText: "text-[#d04683] font-bold",
        accentBg: "bg-[#d04683]",
        buttonClass: "border-[4px] border-[#4d3266] bg-[#ffe4f0] hover:bg-[#ffd1e7] text-[#4d3266] font-pixel font-bold px-4 py-3 transition-all active:translate-y-1 active:shadow-none rounded-none shadow-[4px_4px_0px_0px_#4d3266] text-center flex items-center justify-center gap-1.5",
        buttonActive: "bg-[#d04683] text-[#fff2f7]",
        badgeBg: "bg-[#d04683]/10 border-2 border-[#d04683]/30",
        badgeText: "text-[#d04683]",
        progressBg: "bg-[#e9d6ef] border-2 border-[#4d3266]",
        progressFill: "bg-[#d04683]"
      };
    case "future":
      return {
        fontTitle: "font-pixel font-bold text-[#00ffcc] tracking-normal text-xl md:text-2xl neon-text-cyan",
        fontBody: "font-pixel text-cyan-200 leading-relaxed text-xs md:text-sm",
        fontBadge: "font-pixel text-[10px] font-bold",
        bgPage: "bg-transparent",
        bgCard: "bg-[#0b1021]/95 border-[4px] border-[#00f0ff] shadow-[4px_4px_0px_0px_#00f0ff] rounded-none text-cyan-100 p-5",
        borderColor: "border-[#00f0ff]",
        accentText: "text-[#ff007f] font-bold neon-text-magenta",
        accentBg: "bg-[#ff007f]",
        buttonClass: "border-[4px] border-[#00f0ff] bg-[#0c1e30] hover:bg-[#14324f] text-[#00f0ff] font-pixel font-bold px-4 py-3 transition-all active:translate-y-1 active:shadow-none rounded-none shadow-[4px_4px_0px_0px_#00f0ff] text-center flex items-center justify-center gap-1.5",
        buttonActive: "bg-[#ff007f] text-white border-[#ff007f] shadow-[4px_4px_0px_0px_#ff007f]",
        badgeBg: "bg-[#00f0ff]/10 border-2 border-[#00f0ff]/30",
        badgeText: "text-[#00f0ff]",
        progressBg: "bg-[#071926] border-2 border-[#00f0ff]",
        progressFill: "bg-[#00f0ff]"
      };
  }
};
