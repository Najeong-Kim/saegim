import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Play, Info } from "lucide-react";
import tigerAvatar from "../assets/images/tiger_avatar_new_1784179720318.jpg";
import bearAvatar from "../assets/images/bear_avatar_new_1784179736146.jpg";
import magpieAvatar from "../assets/images/magpie_avatar_new_1784179749685.jpg";

interface MainScreenProps {
  onStart: () => void;
}

export default function MainScreen({ onStart }: MainScreenProps) {
  const [showNotice, setShowNotice] = useState(false);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between p-6 overflow-hidden">
      {/* Retro Pixel Double Frame Border overlay */}
      <div className="absolute inset-4 z-10 border-[4px] border-double border-amber-500/40 pointer-events-none" />

      {/* Header element */}
      <div className="relative z-20 w-full max-w-md mx-auto text-center pt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4a2e1b]/90 border-[3px] border-[#ecdca8] text-[10px] text-amber-200 tracking-wide font-pixel shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]"
        >
          <Sparkles size={11} className="text-amber-300 animate-pulse" />
          <span>REAL-TIME CUSTOM RPG CONSOLE</span>
        </motion.div>
      </div>

      {/* Central Content */}
      <div className="relative z-20 w-full max-w-md mx-auto text-center flex-1 flex flex-col justify-center my-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          {/* Logo / Emblems */}
          <div className="flex justify-center gap-4 mb-3">
            <div className="w-16 h-16 bg-black/40 border-4 border-[#ecdca8] shadow-[2px_2px_0px_rgba(0,0,0,0.4)] animate-float overflow-hidden">
              <img src={tigerAvatar} alt="Tiger" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="w-16 h-16 bg-black/40 border-4 border-[#ecdca8] shadow-[2px_2px_0px_rgba(0,0,0,0.4)] animate-float overflow-hidden" style={{ animationDelay: "0.5s" }}>
              <img src={bearAvatar} alt="Bear" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="w-16 h-16 bg-black/40 border-4 border-[#ecdca8] shadow-[2px_2px_0px_rgba(0,0,0,0.4)] animate-float overflow-hidden" style={{ animationDelay: "1s" }}>
              <img src={magpieAvatar} alt="Magpie" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>

          <div className="bg-[#2c1b18]/90 border-[4px] border-[#ecdca8] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] mx-auto max-w-sm">
            <h1 className="text-xl md:text-2xl font-bold text-[#fbf0cf] tracking-normal leading-snug font-pixel drop-shadow-sm">
              내 고민이,<br />
              내가 주인공인 게임이 된다
            </h1>
          </div>
          
          <p className="text-[10px] text-amber-300 font-pixel tracking-widest font-semibold uppercase animate-pulse">
            - Turn your worries into a playable story -
          </p>
        </motion.div>

        {/* Mini Trigger for System Notice (Hover or Touch) */}
        <div className="relative mt-6 flex justify-center z-35">
          <button
            onMouseEnter={() => setShowNotice(true)}
            onMouseLeave={() => setShowNotice(false)}
            onClick={() => setShowNotice(!showNotice)}
            className="px-3.5 py-1.5 bg-[#1e1412]/95 border-2 border-[#ecdca8] text-amber-300 font-pixel text-[10px] flex items-center gap-1.5 hover:bg-[#2c1b18] hover:text-[#fbf0cf] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] cursor-pointer"
          >
            <Info size={11} className="text-amber-400" />
            <span>시스템 독창성 안내</span>
          </button>

          {/* Tooltip notice */}
          <AnimatePresence>
            {showNotice && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 bg-[#1e1412]/98 border-[3px] border-[#ecdca8] p-4 text-left space-y-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] z-40"
              >
                <p className="text-amber-300 font-semibold text-[10px] flex items-center gap-1">
                  <span>🎮 SYSTEM NOTICE</span>
                </p>
                <p className="text-slate-200 text-[10px] leading-relaxed font-sans font-medium">
                  기존 콘텐츠는 정해진 주인공의 여정을 감상할 뿐이었지만, 이 게임은 <strong className="text-amber-400">당신의 고민과 정서가 이야기의 갈등과 원재료</strong>가 됩니다.
                </p>
                <p className="text-amber-100 text-[9px] leading-normal border-t border-[#4a2e1b] pt-1.5 font-sans font-medium">
                  조선 판타지, 2026 청춘 서울, 또는 미래 네오서울 중 원하는 세계관을 선택하여 당신만의 K-스토리 팩을 플레이해 보세요!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Button Action footer */}
      <div className="relative z-20 w-full max-w-md mx-auto pb-8">
        <motion.button
          id="btn-start"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onClick={onStart}
          className="w-full h-14 bg-[#aa2211] hover:bg-[#c22e1c] text-[#fcf5e3] border-[4px] border-[#ecdca8] font-pixel font-bold text-base flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] cursor-pointer"
        >
          <Play size={14} className="fill-[#fcf5e3]" />
          <span>GAME START</span>
        </motion.button>
        <p className="text-center text-[9px] text-amber-200/50 font-pixel mt-3">
          본 게임은 당신의 감정을 원재료로 사용하여 고유한 해피엔딩 이야기를 설계하는 AI retro 엔터테인먼트 시뮬레이터입니다.
        </p>
      </div>
    </div>
  );
}
