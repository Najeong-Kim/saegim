import { useState } from "react";
import { motion } from "motion/react";
import { Download, RotateCcw, Heart, Award, Info, AlertTriangle, ChevronRight } from "lucide-react";
import { StoryResponse, Era, Choice } from "../types";
import { getThemeStyles } from "./ThemeWrapper";
import tigerAvatar from "../assets/images/tiger_avatar_new_1784179720318.jpg";
import bearAvatar from "../assets/images/bear_avatar_new_1784179736146.jpg";
import magpieAvatar from "../assets/images/magpie_avatar_new_1784179749685.jpg";

interface EndingScreenProps {
  story: StoryResponse;
  era: Era;
  choices: Record<number, Choice>;
  imageUrl: string | null;
  imageLoading: boolean;
  imageError: string | null;
  worry: string;
  onRestart: () => void;
  onRetryImage: () => void;
}

export default function EndingScreen({
  story,
  era,
  choices,
  imageUrl,
  imageLoading,
  imageError,
  worry,
  onRestart,
  onRetryImage
}: EndingScreenProps) {
  const theme = getThemeStyles(era);

  // Analyze choice tendencies for a fun personality highlight
  const selectedChoices = Object.values(choices);
  const actionCount = selectedChoices.filter((c) => c.approach === "action").length;
  const selfRegulationCount = selectedChoices.filter((c) => c.approach === "self_regulation").length;

  let personalityTitle = "지혜와 조화의 수호 정령";
  let personalityDesc = "당신은 행동해야 할 때 과감히 한 발 나아가고, 마음이 혼란스러울 때는 영혼의 정령과 호흡을 맞출 줄 아는 가장 유연하고 강인한 구원자입니다.";
  let personalityLabel = "마음의 균형 수호 정령";

  if (actionCount > selfRegulationCount) {
    personalityTitle = "용감한 행동의 전사";
    personalityDesc = "두려움 속에서도 한 발 나아가는 용기를 보여주었습니다. 당신은 현실의 시련 앞에서도 직접 발을 내딛어 극복할 용사입니다.";
    personalityLabel = "돌파의 구원자";
  } else if (selfRegulationCount > actionCount) {
    personalityTitle = "고요한 지혜의 현자";
    personalityDesc = "성급히 흔들리지 않고 깊게 숨을 고르며 마음의 균형을 유지했습니다. 수많은 시련도 침착하게 물리치는 고결한 지혜를 지녔습니다.";
    personalityLabel = "평온의 인도 정령";
  }

  const animalAvatar = story.animal === "tiger" ? tigerAvatar : story.animal === "bear" ? bearAvatar : magpieAvatar;
  const animalKorean = story.animal === "tiger" ? "수호 호랑이" : story.animal === "bear" ? "수호 반달곰" : "길잡이 까치";

  // Handle image download natively if data URL is ready
  const handleDownloadImage = () => {
    if (!imageUrl) return;
    try {
      const link = document.createElement("a");
      link.href = imageUrl;
      // Clean up filename
      const cleanTitle = story.title.replace(/\s+/g, "_");
      link.download = `rehearsal_${era}_${story.animal}_${cleanTitle}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Download failed:", e);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between p-6 overflow-y-auto font-pixel pb-10">
      {/* Retro Double Frame Border overlay */}
      <div className="absolute inset-4 z-10 border-[4px] border-double border-amber-500/30 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md mx-auto space-y-5 py-4 font-pixel">
        
        {/* Intro Congratulation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <div className="inline-block bg-amber-500/10 border-2 border-[#4a2e1b] px-3 py-1 text-[10px] text-amber-300 tracking-wider font-bold">
            🏆 QUEST COMPLETE • HAPPY ENDING
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#fbf0cf] drop-shadow-md">
            {story.title}
          </h1>
          <p className="text-[10px] text-amber-200/90 font-sans font-bold">
            현실의 마음속 장벽을 완벽히 무너뜨린 영광의 순간입니다.
          </p>
        </motion.div>

        {/* User's Original Worry Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="bg-[#211412]/95 border-[4px] border-[#4a2e1b] p-3.5 text-left space-y-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-amber-400">
            <span>💬 나를 흔들었던 현실 고민</span>
          </div>
          <p className="text-xs text-amber-100 font-sans font-bold leading-relaxed bg-black/40 p-2.5 border border-[#4a2e1b]">
            "{worry}"
          </p>
        </motion.div>

        {/* Realtime Generated Image Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#1c1110]/95 border-[4px] border-[#4a2e1b] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] flex flex-col relative"
        >
          {/* Top image container with 1:1 aspect ratio */}
          <div className="relative aspect-square w-full bg-[#0a0808] flex flex-col justify-center items-center overflow-hidden border-b-4 border-[#4a2e1b]">
            {imageLoading ? (
              <div className="text-center p-6 space-y-4">
                {/* Custom Retro 8-bit blink pixel loader */}
                <div className="flex justify-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i} 
                      className="w-3 h-3 bg-[#aa2211] border-2 border-white animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <div className="space-y-1 font-pixel">
                  <p className="text-xs text-amber-300 tracking-widest uppercase animate-pulse">
                    [RENDERING_PIXELS...]
                  </p>
                  <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                    당신의 멋진 고민 돌파 결말 시나리오를 고화질 16비트 도트 이미지로 제작하고 있습니다...
                  </p>
                </div>
              </div>
            ) : imageError ? (
              <div className="text-center p-6 space-y-3 font-pixel">
                <AlertTriangle size={24} className="text-[#aa2211] mx-auto animate-bounce" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-rose-300">
                    그림 생성 지연 발생
                  </p>
                  <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                    서버 화가가 지금 다른 세계관을 그리는 중이라 조금 늦어지고 있네요. 다시 그려볼까요?
                  </p>
                </div>
                <button
                  onClick={onRetryImage}
                  className="px-3 py-1 bg-[#aa2211] border-2 border-[#ecdca8] text-[10px] text-[#fcf5e3] font-bold cursor-pointer hover:bg-[#c22e1c]"
                >
                  이미지 재연산하기
                </button>
              </div>
            ) : imageUrl ? (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                src={imageUrl}
                alt={story.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
              />
            ) : (
              <div className="text-center p-6 space-y-3 font-pixel">
                <Info size={24} className="text-slate-400 mx-auto" />
                <p className="text-[10px] text-slate-400">
                  생성된 엔딩 이미지가 유실되었습니다.
                </p>
                <button
                  onClick={onRetryImage}
                  className="px-3 py-1 bg-[#aa2211] border-2 border-[#ecdca8] text-[10px] text-[#fcf5e3] font-bold cursor-pointer hover:bg-[#c22e1c]"
                >
                  새로 렌더링하기
                </button>
              </div>
            )}

            {/* Float Badge overlay for character type */}
            {!imageLoading && !imageError && (
              <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 border-2 border-[#4a2e1b] text-[9px] text-amber-200 flex items-center gap-1.5">
                <img src={animalAvatar} alt={animalKorean} className="w-4 h-4 rounded-none object-cover border border-amber-500/20" referrerPolicy="no-referrer" />
                <span>{animalKorean}</span>
              </div>
            )}
          </div>

          {/* Core Story resolution description - styled for high text contrast */}
          <div className="p-5 bg-[#fcf5e3] text-[#4a2e1b] text-left space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-pixel font-bold text-[#aa2211] tracking-wider block">
                ▶ 리허설 최종 성공 결말 (HAPPY ENDING)
              </span>
              <p className="text-sm font-sans font-bold leading-relaxed text-[#1c1110]">
                {story.ending}
              </p>
            </div>

            {/* Reflection from choices */}
            <div className="pt-3 border-t border-[#4a2e1b]/20 space-y-1.5">
              <div className="flex items-center gap-1">
                <span>📜</span>
                <span className="text-[10px] font-pixel font-bold text-amber-900">당신의 잠재 감정 디버깅 기록</span>
              </div>
              <p className="text-xs font-sans font-bold text-slate-800 leading-relaxed italic bg-black/5 p-3 border border-[#4a2e1b]/10">
                “{story.reflection}”
              </p>
            </div>
          </div>
        </motion.div>

        {/* Personality Tendency 분석 카드 (영화 포스터/도트게임 느낌) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1e1412]/95 border-[4px] border-[#4a2e1b] p-4 text-left flex items-start gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
        >
          <div className="bg-[#fcf5e3] border-2 border-[#4a2e1b] p-1.5 text-lg shrink-0">
            👑
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[9px] text-amber-300 font-bold">나의 극복 성격</span>
              <span className="text-[9px] text-slate-500">•</span>
              <span className="text-[11px] font-bold text-white">{personalityTitle}</span>
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed font-light font-sans font-medium">
              {personalityDesc}
            </p>
            <div className="flex gap-2 pt-1">
              <span className="text-[8px] bg-black/40 border border-[#4a2e1b] px-1.5 py-0.5 text-amber-200">
                행동 돌파 {actionCount}회
              </span>
              <span className="text-[8px] bg-black/40 border border-[#4a2e1b] px-1.5 py-0.5 text-amber-200">
                정서 조율 {selfRegulationCount}회
              </span>
            </div>
          </div>
        </motion.div>

        {/* Informative Disclaimer Alert */}
        <p className="text-[9px] text-amber-200/50 text-center leading-normal max-w-xs mx-auto">
          * 이 게임을 통해 도출해낸 지혜는 마음속 도전을 긍정적인 현실로 변화시킬 큰 용기가 될 것입니다. *
        </p>

        {/* Button Actions Block */}
        <div className="space-y-3 pt-2 font-pixel">
          {/* Download Button */}
          <button
            id="btn-save"
            onClick={handleDownloadImage}
            disabled={!imageUrl || imageLoading}
            className="w-full h-12 bg-[#aa2211] hover:bg-[#c22e1c] disabled:opacity-30 disabled:hover:bg-[#aa2211] text-[#fcf5e3] border-[3px] border-[#ecdca8] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] cursor-pointer"
          >
            <Download size={12} strokeWidth={3} />
            <span>도트 포스터 저장</span>
          </button>

          {/* Reset Button */}
          <button
            id="btn-restart"
            onClick={onRestart}
            className="w-full h-12 bg-[#1c1110] hover:bg-[#2e1c1a] text-amber-200/90 border-[3px] border-[#4a2e1b] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] cursor-pointer"
          >
            <RotateCcw size={11} />
            <span>새 고민 들고 다음 게임 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
