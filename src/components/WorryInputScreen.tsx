import { useState } from "react";
import { motion } from "motion/react";
import { HelpCircle, ChevronRight, CornerDownLeft } from "lucide-react";

interface WorryInputScreenProps {
  worry: string;
  onChangeWorry: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const TEMPLATE_WORRIES = [
  "발표가 너무 떨려요",
  "회사에서 일하는 게 너무 힘들어요",
  "새로운 도전을 시작하기가 무서워요"
];

export default function WorryInputScreen({ worry, onChangeWorry, onNext, onBack }: WorryInputScreenProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!worry.trim()) {
      setError("고민을 한 문장이라도 꼭 작성해 주세요.");
      return;
    }
    if (worry.trim().length < 5) {
      setError("이야기 구성을 위해 조금 더 상세히 작성해 주세요 (최소 5자).");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between p-6 overflow-hidden">
      {/* Retro Double Border Frame */}
      <div className="absolute inset-4 z-10 border-[4px] border-double border-amber-500/30 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 w-full max-w-md mx-auto pt-4 flex items-center justify-between font-pixel">
        <button 
          onClick={onBack}
          className="text-xs text-amber-100 hover:text-white bg-[#4a2e1b] border-[3px] border-[#ecdca8] py-1 px-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] cursor-pointer hover:bg-[#c22e1c]"
        >
          돌아가기
        </button>
        <span className="text-xs font-pixel text-amber-200">WORLD LOAD 1/3</span>
      </div>

      {/* Body Content */}
      <div className="relative z-10 w-full max-w-md mx-auto flex-1 flex flex-col justify-center my-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* RPG Style Dialogue Panel for instruction */}
          <div className="bg-[#1e1412]/95 border-[4px] border-[#4a2e1b] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] font-pixel text-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
              <span>▶ [시나리오 원재료 튜토리얼]</span>
            </div>
            <h2 className="text-sm font-bold text-[#fbf0cf] leading-snug">
              이야기의 갈등이 될 현실의 고민을 작성해줘!
            </h2>
            <p className="text-[11px] text-slate-300 leading-relaxed font-light">
              네가 입력하는 마음속 걱정과 불안이, 이 세계관 속에서 수호 정령과 함께 돌파해낼 멋진 게임 시나리오로 즉석 가공된단다.
            </p>
          </div>

          {/* Text Area Card styled like a retro terminal input */}
          <div className="bg-[#1c1110]/95 border-[4px] border-[#4a2e1b] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] font-pixel space-y-3">
            <div className="flex justify-between items-center text-[10px] text-amber-200/70 border-b border-[#4a2e1b] pb-2">
              <span>INPUT_TERMINAL_01 //</span>
              <span className="animate-pulse text-[#00ffcc]">● ONLINE</span>
            </div>
            
            <textarea
              id="textarea-worry"
              value={worry}
              onChange={(e) => {
                onChangeWorry(e.target.value);
                if (error) setError("");
              }}
              rows={4}
              maxLength={200}
              placeholder="예: 사람들 앞에서 발표가 예정되어 있는데, 머릿속이 하얘지고 망칠까 봐 너무 무섭고 도망치고 싶어요..."
              className="w-full p-2 bg-black/60 border-2 border-[#4a2e1b] text-amber-200 text-xs focus:outline-none focus:border-[#aa2211] placeholder-slate-600 resize-none font-pixel leading-relaxed"
            />
            
            <div className="flex justify-between items-center">
              {error ? (
                <span className="text-[#ff007f] text-[10px] font-bold animate-pulse">{error}</span>
              ) : (
                <span className="text-slate-500 text-[9px] flex items-center gap-1">
                  <CornerDownLeft size={10} /> ENTER TO CONFIRM
                </span>
              )}
              <span className="text-amber-200/60 text-[9px]">{worry.length}/200</span>
            </div>
          </div>

          {/* Template Suggestions as choice inventory */}
          <div className="space-y-2 font-pixel">
            <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-300 uppercase tracking-wider">
              <HelpCircle size={11} className="text-amber-300" />
              <span>[ 추천 고민 팩 장착하기 ]</span>
            </div>
            <div className="flex flex-col gap-2">
              {TEMPLATE_WORRIES.map((suggestion, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01, backgroundColor: "#ecdca8", color: "#2a1708" }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    onChangeWorry(suggestion);
                    setError("");
                  }}
                  className="w-full text-left p-3 border-[3px] border-[#4a2e1b] bg-[#fcf5e3] text-xs text-[#4a2e1b] font-pixel font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>{suggestion}</span>
                  <ChevronRight size={14} className="opacity-60" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Next Button Action footer */}
      <div className="relative z-10 w-full max-w-md mx-auto pb-8 font-pixel">
        <motion.button
          id="btn-input-next"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 1 }}
          onClick={handleNext}
          className="w-full h-14 bg-[#aa2211] hover:bg-[#c22e1c] text-[#fcf5e3] border-[4px] border-[#ecdca8] font-pixel font-bold text-base flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] cursor-pointer"
        >
          <span>WORLD MAP SELECT</span>
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}
