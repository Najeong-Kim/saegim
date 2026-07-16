import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Era } from "../types";
import tigerAvatar from "../assets/images/tiger_avatar_new_1784179720318.jpg";
import bearAvatar from "../assets/images/bear_avatar_new_1784179736146.jpg";
import magpieAvatar from "../assets/images/magpie_avatar_new_1784179749685.jpg";

interface LoadingScreenProps {
  era: Era;
}

const LOADING_TEXT = {
  past: "동양 판타지 시공간 불러오는 중…",
  present: "청춘 서울 세트장 꾸미는 중…",
  future: "네오 서울 홀로그램 연산 중…"
};

const SUB_TEXT_OPTIONS = {
  past: [
    "도깨비불이 신비한 붓글씨를 밝히고 있습니다.",
    "백두산 산신령에게 지혜의 길을 묻는 중입니다.",
    "수호령들의 기상을 비단 책자에 기록 중입니다."
  ],
  present: [
    "흩날리는 벚꽃 정류장에서 한 편의 대본을 쓰는 중입니다.",
    "남산타워 전광판에 당신의 주연 명단을 등록하고 있습니다.",
    "청춘 서울 무대의 감동적인 배경음을 재생 중입니다."
  ],
  future: [
    "네온 홀로그램 그리드에 고민 매핑 알고리즘 구동 중.",
    "디지털 단청 코어가 양자 가상 시뮬레이션을 가동합니다.",
    "사이버 수호 정령 모듈이 마인드 버퍼를 싱크하고 있습니다."
  ]
};

export default function LoadingScreen({ era }: LoadingScreenProps) {
  const [subTextIndex, setSubTextIndex] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setSubTextIndex((prev) => (prev + 1) % SUB_TEXT_OPTIONS[era].length);
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        const inc = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + inc, 95);
      });
    }, 500);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [era]);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center p-6 overflow-hidden">
      {/* Retro Double Frame Border overlay */}
      <div className="absolute inset-4 z-10 border-[4px] border-double border-amber-500/30 pointer-events-none" />

      {/* Main loading content block */}
      <div className="relative z-10 text-center space-y-8 max-w-sm mx-auto font-pixel">
        
        {/* Animated Pixel Game Style Badge */}
        <div className="flex justify-center relative py-4">
          <div 
            className={`w-16 h-16 border-[4px] flex items-center justify-center overflow-hidden ${
              era === "past" 
                ? "border-[#aa2211] bg-[#fbf0cf]" 
                : era === "present" 
                  ? "border-[#d04683] bg-[#ffe4f0]" 
                  : "border-[#00f0ff] bg-[#0c1e30]"
            }`}
          >
            <img 
              src={era === "past" ? tigerAvatar : era === "present" ? bearAvatar : magpieAvatar} 
              alt={era === "past" ? "Tiger" : era === "present" ? "Bear" : "Magpie"} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 pointer-events-none">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-none opacity-20 border-[4px] ${
              era === "past" ? "border-[#aa2211]" : era === "present" ? "border-[#d04683]" : "border-[#00f0ff]"
            }`}></span>
          </span>
        </div>

        {/* Loading Core Texts */}
        <div className="space-y-4">
          <div className="inline-block bg-black/40 border-2 border-[#4a2e1b] px-3 py-1 text-[10px] text-amber-300 tracking-widest uppercase animate-pulse">
            LOADING STORY PACK... {progress}%
          </div>
          
          <h3 className={`text-base font-bold leading-normal ${
            era === "past" 
              ? "text-amber-100" 
              : era === "present" 
                ? "text-white" 
                : "text-[#00f0ff]"
          }`}>
            {LOADING_TEXT[era]}
          </h3>

          <div className="h-12 flex items-center justify-center bg-[#1e1412]/80 border-2 border-[#4a2e1b] p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]">
            <AnimatePresence mode="wait">
              <motion.p
                key={subTextIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] text-slate-300 max-w-xs mx-auto leading-relaxed"
              >
                {SUB_TEXT_OPTIONS[era][subTextIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Custom 8-bit Style Progress Bar */}
        <div className="w-full max-w-[200px] mx-auto p-1 bg-black/60 border-2 border-[#4a2e1b]">
          <motion.div 
            initial={{ width: "10%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className={`h-3 ${
              era === "past" 
                ? "bg-[#aa2211]" 
                : era === "present" 
                  ? "bg-[#d04683]" 
                  : "bg-[#00f0ff]"
            }`}
          />
        </div>

        <p className="text-[9px] text-amber-200/40">
          * 시나리오 가상 칩을 부팅하고 있습니다. 잠시만 기다려 주세요. *
        </p>
      </div>
    </div>
  );
}
