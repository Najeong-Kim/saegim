import { motion } from "motion/react";
import { Compass, Check } from "lucide-react";
import { Era } from "../types";
import pastBg from "../assets/past_bg.jpg";
import presentBg from "../assets/present_bg.jpg";
import futureBg from "../assets/future_bg.jpg";

interface EraSelectScreenProps {
  selectedEra: Era;
  onSelectEra: (era: Era) => void;
  onNext: () => void;
  onBack: () => void;
}

interface EraOption {
  id: Era;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  badge: string;
  badgeColor: string;
}

const ERA_OPTIONS: EraOption[] = [
  {
    id: "past",
    title: "조선 판타지",
    subtitle: "WORLD 01",
    description: "한옥과 단청, 도깨비불과 신비로운 산수가 숨쉬는 조선 설화 속 모험.",
    imageUrl: pastBg,
    badge: "조선 시대",
    badgeColor: "bg-[#aa2211] text-white border-2 border-[#fcf5e3]"
  },
  {
    id: "present",
    title: "청춘 서울 2026",
    subtitle: "WORLD 02",
    description: "벚꽃 흩날리는 따뜻한 서울 도심 속, 빛나는 한 편의 청춘 드라마.",
    imageUrl: presentBg,
    badge: "현대 서울",
    badgeColor: "bg-[#d04683] text-white border-2 border-[#fff2f7]"
  },
  {
    id: "future",
    title: "K-Cyberpunk",
    subtitle: "WORLD 03",
    description: "홀로그램 전통 문양과 네온사인이 결합된, 첨단 기술의 찬란한 미래 도시.",
    imageUrl: futureBg,
    badge: "네오 서울",
    badgeColor: "bg-[#ff007f] text-white border-2 border-[#00f0ff]"
  }
];

export default function EraSelectScreen({ selectedEra, onSelectEra, onNext, onBack }: EraSelectScreenProps) {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between p-6 overflow-hidden">
      {/* Retro Double Frame Border overlay */}
      <div className="absolute inset-4 z-10 border-[4px] border-double border-amber-500/30 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 w-full max-w-md mx-auto pt-4 flex items-center justify-between font-pixel">
        <button 
          onClick={onBack}
          className="text-xs text-amber-100 hover:text-white bg-[#4a2e1b] border-[3px] border-[#ecdca8] py-1 px-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] cursor-pointer hover:bg-[#c22e1c]"
        >
          돌아가기
        </button>
        <span className="text-xs font-pixel text-amber-200">WORLD LOAD 2/3</span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto flex-1 flex flex-col justify-start pt-2 pb-4 my-4 overflow-y-auto scrollbar-none font-pixel">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="bg-[#1e1412]/95 border-[4px] border-[#4a2e1b] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] space-y-2">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
              <Compass size={12} className="animate-spin" style={{ animationDuration: "12s" }} />
              <span>▶ [세계관 무대 선택]</span>
            </div>
            <h2 className="text-sm font-bold text-[#fbf0cf] leading-snug">
              어느 시공간으로 탐험을 떠날까?
            </h2>
            <p className="text-[11px] text-slate-300 font-light leading-relaxed">
              네 고민을 치유하고 게임을 전개해나갈 특별한 차원의 배경이야. 수호령들이 너를 기다리고 있단다!
            </p>
          </div>

          {/* Cards Stack */}
          <div className="space-y-3 pt-1">
            {ERA_OPTIONS.map((era) => {
              const isSelected = selectedEra === era.id;
              return (
                <motion.div
                  key={era.id}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onSelectEra(era.id)}
                  className={`relative h-28 w-full overflow-hidden cursor-pointer border-[4px] transition-all flex items-center p-4 ${
                    isSelected 
                      ? "border-[#aa2211] bg-[#fbf0cf]/95 text-[#4a2e1b] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]" 
                      : "border-[#4a2e1b] hover:border-[#6b4226] bg-[#1c1110]/95 text-slate-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                  }`}
                >
                  {/* Card Background image with overlay filter */}
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700"
                    style={{ 
                      backgroundImage: `url('${era.imageUrl}')`,
                      filter: isSelected ? "brightness(0.25) saturate(1.2)" : "brightness(0.12) grayscale(0.5)"
                    }}
                  />
                  
                  {/* Inner text details */}
                  <div className="relative z-10 flex-1 space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] px-2 py-0.5 font-pixel font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] ${era.badgeColor}`}>
                        {era.badge}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <h3 className={`text-sm md:text-base font-bold font-pixel ${isSelected ? "text-[#fcf5e3]" : "text-white"}`}>{era.title}</h3>
                      <span className="text-[9px] text-amber-300/80 font-pixel tracking-wider">{era.subtitle}</span>
                    </div>
                    <p className={`text-[10px] leading-relaxed line-clamp-2 pr-4 ${isSelected ? "text-amber-100" : "text-slate-400"}`}>
                      {era.description}
                    </p>
                  </div>

                  {/* Checked indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="relative z-10 w-6 h-6 bg-[#aa2211] border-2 border-[#fcf5e3] flex items-center justify-center text-white shadow-md"
                    >
                      <Check size={12} strokeWidth={3} />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Footer trigger button */}
      <div className="relative z-10 w-full max-w-md mx-auto pb-8 font-pixel">
        <motion.button
          id="btn-era-next"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 1 }}
          onClick={onNext}
          className="w-full h-14 bg-[#aa2211] hover:bg-[#c22e1c] text-[#fcf5e3] border-[4px] border-[#ecdca8] font-pixel font-bold text-base flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] cursor-pointer"
        >
          <span>BUILD SCENARIO</span>
        </motion.button>
      </div>
    </div>
  );
}
