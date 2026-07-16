import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Award, Compass, Heart, BookOpen, Sparkles } from "lucide-react";
import { StoryResponse, Era, Choice } from "../types";
import { getThemeStyles } from "./ThemeWrapper";
import pastBg from "../assets/past_bg.jpg";
import presentBg from "../assets/present_bg.jpg";
import futureBg from "../assets/future_bg.jpg";
import tigerAvatar from "../assets/images/tiger_avatar_new_1784179720318.jpg";
import bearAvatar from "../assets/images/bear_avatar_new_1784179736146.jpg";
import magpieAvatar from "../assets/images/magpie_avatar_new_1784179749685.jpg";

interface StoryScreenProps {
  story: StoryResponse;
  era: Era;
  onChoiceSelected: (sceneId: number, choice: Choice) => void;
  onCompleteStory: () => void;
}

// Background images for story scenes
const STATIC_ERA_BG: Record<Era, string> = {
  past: pastBg,
  present: presentBg,
  future: futureBg
};

const ERA_TITLES: Record<Era, string> = {
  past: "조선 판타지 • WORLD 01",
  present: "청춘 서울 2026 • WORLD 02",
  future: "K-Cyberpunk • WORLD 03"
};

export default function StoryScreen({ story, era, onChoiceSelected, onCompleteStory }: StoryScreenProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const theme = getThemeStyles(era);
  const currentScene = story.scenes[currentSceneIndex];
  const isLastScene = currentSceneIndex === story.scenes.length - 1;

  const handleSelectChoice = (choice: Choice) => {
    setSelectedChoiceId(choice.id);
    
    // Smooth delay before advancing or completing
    setTimeout(() => {
      onChoiceSelected(currentScene.id, choice);
      if (isLastScene) {
        onCompleteStory();
      } else {
        setCurrentSceneIndex((prev) => prev + 1);
        setSelectedChoiceId(null);
      }
    }, 1000);
  };

  // Human-friendly representation of the chosen spirit animal
  const animalName = story.animal === "tiger" ? "수호 호랑이" : story.animal === "bear" ? "수호 반달곰" : "길잡이 까치";
  const animalAvatar = story.animal === "tiger" ? tigerAvatar : story.animal === "bear" ? bearAvatar : magpieAvatar;

  // Dynamic color settings for text/borders based on era to ensure readable, thematic UI
  const narrativeTextColor = era === "future" ? "text-white" : era === "present" ? "text-[#2e1c3e]" : "text-[#1c1110]";
  const borderDashedClass = era === "future" ? "border-cyan-500/30" : era === "present" ? "border-[#4d3266]/30" : "border-[#4a2e1b]/30";
  const emotionBadgeClass = era === "future" 
    ? "border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff]" 
    : era === "present" 
      ? "border-[#4d3266] bg-[#4d3266]/10 text-[#4d3266]" 
      : "border-[#4a2e1b] bg-[#4a2e1b]/10 text-[#4a2e1b]";
  
  // Companion Stat card styling values
  const companionCardBorder = era === "future" ? "border-[#00f0ff]" : era === "present" ? "border-[#4d3266]" : "border-[#4a2e1b]";
  const companionCardDivider = era === "future" ? "border-[#00f0ff]/30" : era === "present" ? "border-[#4d3266]/30" : "border-[#4a2e1b]/30";
  const companionCardImageBorder = era === "future" ? "border-[#00f0ff] bg-[#00f0ff]/20" : era === "present" ? "border-[#4d3266] bg-[#4d3266]/20" : "border-[#4a2e1b] bg-[#4a2e1b]/20";
  const companionCardSubtitle = era === "future" ? "text-[#ff007f]" : era === "present" ? "text-[#d04683]" : "text-[#aa2211]";
  const companionCardName = era === "future" ? "text-white font-bold" : era === "present" ? "text-[#4d3266]" : "text-amber-900";
  const companionCardActiveBadge = era === "future" 
    ? "bg-[#ff007f] text-white border-[#00f0ff]" 
    : era === "present" 
      ? "bg-[#d04683] text-[#fff2f7] border-[#ffd1e7]" 
      : "bg-[#aa2211] text-[#fcf5e3] border-[#ecdca8]";
  const companionCardStatText = era === "future" ? "text-cyan-100" : "text-slate-700";
  const companionCardStatKey = era === "future" ? "text-[#ff007f]" : era === "present" ? "text-[#d04683]" : "text-amber-800 font-bold";
  const companionCardStatCell = era === "future" 
    ? "bg-[#00f0ff]/10 border border-[#00f0ff]/20" 
    : era === "present" 
      ? "bg-[#4d3266]/5 border border-[#4d3266]/10" 
      : "bg-[#4a2e1b]/5 border border-[#4a2e1b]/10";

  // Progress width calculation based on chosen options dynamically
  const progressWidth = `${((currentSceneIndex + (selectedChoiceId ? 1 : 0)) / story.scenes.length) * 100}%`;

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between p-6 overflow-hidden">
      {/* Background Cover Image with subtle scale */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[20s] scale-105"
        style={{ 
          backgroundImage: `url('${STATIC_ERA_BG[era]}')`,
          filter: "brightness(0.3) contrast(1.1) saturate(0.8)"
        }}
      />

      {/* Frame Border on card level for traditional vibe */}
      <div className="absolute inset-4 z-10 border-[4px] border-double border-amber-500/20 pointer-events-none" />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="story-intro-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex-1 flex flex-col justify-between h-full font-pixel"
          >
            {/* Top Meta info bar */}
            <div className="w-full max-w-md mx-auto pt-4 flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.accentText}`}>
                  {ERA_TITLES[era]}
                </span>
                <span className="text-[10px] text-amber-200 flex items-center gap-1.5 mt-0.5">
                  <img src={animalAvatar} alt={animalName} className="w-4 h-4 rounded-none border border-amber-500/20 object-cover" referrerPolicy="no-referrer" />
                  <span>{animalName}와 함께하는 시공간</span>
                </span>
              </div>
              <span className={`text-[10px] font-pixel text-amber-100 bg-black/50 border-2 px-2 py-0.5 flex items-center gap-1 ${companionCardBorder}`}>
                <Sparkles size={10} className="text-amber-400" />
                <span>시나리오 소집</span>
              </span>
            </div>

            {/* Intro Content Card */}
            <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center my-4">
              <div className={theme.bgCard}>
                {/* Book Title / Header */}
                <div className={`flex justify-between items-center mb-4 border-b border-dashed pb-3 ${borderDashedClass}`}>
                  <div className="flex items-center gap-1.5 font-bold">
                    <BookOpen size={14} className={theme.accentText} />
                    <span className={`text-sm font-pixel font-black tracking-wider ${theme.accentText}`}>
                      {story.title || "새로운 인연의 시작"}
                    </span>
                  </div>
                  <div className={`px-2 py-0.5 border text-[9px] font-bold ${emotionBadgeClass}`}>
                    감정: {story.emotion}
                  </div>
                </div>

                {/* Narrative Intro Text - high contrast text styles for visibility */}
                <p className={`text-sm leading-relaxed text-left font-sans font-bold whitespace-pre-wrap ${narrativeTextColor}`}>
                  {story.intro}
                </p>

                {/* Companion Spirit Pixel RPG Stat Card */}
                <div className={`mt-5 p-3.5 bg-black/30 border-2 rounded-none text-left space-y-2 ${companionCardBorder}`}>
                  <div className={`flex items-center gap-2.5 border-b border-dashed pb-2 ${companionCardDivider}`}>
                    <div className={`w-10 h-10 border-2 overflow-hidden shrink-0 animate-bounce ${companionCardImageBorder}`}>
                      <img src={animalAvatar} alt={animalName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-[8px] font-bold uppercase tracking-wide ${companionCardSubtitle}`}>MY COMPANION SPIRIT</div>
                      <strong className={`font-pixel text-xs block ${companionCardName}`}>{animalName}</strong>
                    </div>
                    <span className={`text-[9px] px-1.5 py-0.5 border font-pixel animate-pulse ${companionCardActiveBadge}`}>ACTIVE</span>
                  </div>
                  
                  {/* Retro Stat attributes */}
                  <div className={`grid grid-cols-2 gap-2 text-[9.5px] font-pixel font-bold ${companionCardStatText}`}>
                    <div className={`flex items-center gap-1 p-1 px-1.5 ${companionCardStatCell}`}>
                      <span className={companionCardStatKey}>LV:</span>
                      <span>99 (MAX)</span>
                    </div>
                    <div className={`flex items-center gap-1 p-1 px-1.5 ${companionCardStatCell}`}>
                      <span className={companionCardStatKey}>SYNC:</span>
                      <span>100%</span>
                    </div>
                    <div className={`flex items-center gap-1 p-1 px-1.5 col-span-2 ${companionCardStatCell}`}>
                      <span className={companionCardStatKey}>TYPE:</span>
                      <span>내면의 빛 & 무한한 지지자</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button footer */}
            <div className="w-full max-w-md mx-auto pb-6">
              <button
                id="btn-start-rehearsal"
                onClick={() => setShowIntro(false)}
                className={`w-full ${theme.buttonClass} text-xs md:text-sm cursor-pointer`}
              >
                <span>시나리오 탐험 시작하기</span>
                <ChevronRight size={14} />
              </button>
              <p className="text-center text-[9px] text-amber-100/60 mt-2">
                * 현명한 수호령과 교감하며 마음속 긴장을 풀어내는 여정이 가동됩니다.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="story-scenes-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex-1 flex flex-col justify-between h-full font-pixel"
          >
            {/* Top Meta info bar */}
            <div className="w-full max-w-md mx-auto pt-4 flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.accentText}`}>
                  {ERA_TITLES[era]}
                </span>
                <span className="text-[10px] text-amber-200 flex items-center gap-1.5 mt-0.5">
                  <img src={animalAvatar} alt={animalName} className="w-4 h-4 rounded-none border border-amber-500/20 object-cover" referrerPolicy="no-referrer" />
                  <span>{animalName}와 함께 행동하는 길</span>
                </span>
              </div>
              <span className={`text-[10px] text-amber-100 bg-black/50 border-2 px-2 py-0.5 ${companionCardBorder}`}>
                STAGE {currentSceneIndex + 1} / {story.scenes.length}
              </span>
            </div>

            {/* Story Narrative Box */}
            <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center my-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className={theme.bgCard}
                >
                  {/* Thematic Icon indicators */}
                  <div className={`flex justify-between items-center mb-3 border-b border-dashed pb-2 ${borderDashedClass}`}>
                    <div className="flex items-center gap-1.5">
                      <Compass size={14} className={theme.accentText} />
                      <span className={`text-xs font-pixel font-bold ${theme.accentText}`}>
                        퀘스트 {currentSceneIndex + 1}단계
                      </span>
                    </div>
                    <div className={`px-2 py-0.5 border text-[9px] font-bold ${emotionBadgeClass}`}>
                      정서 싱크: {story.emotion}
                    </div>
                  </div>

                  {/* Scenario description text - high contrast text styles for visibility */}
                  <p className={`text-sm leading-relaxed text-left font-sans font-bold ${narrativeTextColor}`}>
                    {currentScene.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Choice Buttons Actions & Progress */}
            <div className="w-full max-w-md mx-auto pb-6 space-y-4">
              
              {/* Progress Bar with Indicator */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[9px] text-amber-200 font-pixel px-1 font-bold">
                  <span>START</span>
                  <span className="flex items-center gap-1 text-red-500 font-bold animate-pulse">
                    <span>CLEAR</span>
                    <Heart size={10} />
                  </span>
                </div>
                <div className={`w-full h-3 p-0.5 ${theme.progressBg}`}>
                  <motion.div 
                    initial={{ width: "15%" }}
                    animate={{ width: progressWidth }}
                    transition={{ duration: 0.6 }}
                    className={`h-full ${theme.progressFill}`}
                  />
                </div>
              </div>

              {/* The Choice Buttons */}
              <div className="flex flex-col gap-3 pt-1">
                {currentScene.choices.map((choice) => {
                  const isChosen = selectedChoiceId === choice.id;
                  const isAnyChosen = selectedChoiceId !== null;
                  
                  return (
                    <motion.button
                      key={choice.id}
                      id={`btn-choice-${choice.id}`}
                      disabled={isAnyChosen}
                      onClick={() => handleSelectChoice(choice)}
                      className={`w-full text-left p-3.5 border-[3px] transition-all flex items-center justify-between font-pixel shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] cursor-pointer ${
                        isChosen
                          ? era === "future"
                            ? "bg-[#ff007f] border-[#00f0ff] text-white shadow-none translate-y-[2px]"
                            : era === "present"
                              ? "bg-[#d04683] border-[#fff2f7] text-white shadow-none translate-y-[2px]"
                              : "bg-[#aa2211] border-[#fcf5e3] text-white shadow-none translate-y-[2px]"
                          : isAnyChosen
                            ? era === "future"
                              ? "opacity-35 bg-black/20 border-[#00f0ff]/50 text-slate-500"
                              : era === "present"
                                ? "opacity-35 bg-black/20 border-[#4d3266]/50 text-slate-500"
                                : "opacity-35 bg-black/20 border-[#4a2e1b]/50 text-slate-500"
                            : era === "future"
                              ? "bg-[#0c1e30] hover:bg-[#14324f] border-[#00f0ff] text-white"
                              : era === "present"
                                ? "bg-[#fff2f7] hover:bg-[#ffd1e7] border-[#4d3266] text-[#4d3266]"
                                : "bg-[#fcf5e3] hover:bg-[#ecdca8] border-[#4a2e1b] text-[#4a2e1b]"
                      }`}
                    >
                      <div className="flex-1 pr-3">
                        <span className={`text-[8px] block uppercase tracking-wider mb-1 font-bold ${
                          isChosen 
                            ? "text-amber-200" 
                            : era === "future"
                              ? "text-[#ff007f]"
                              : era === "present"
                                ? "text-[#d04683]"
                                : "text-[#aa2211]"
                        }`}>
                          {choice.approach === "action" 
                            ? "▶ 행동적 돌파" 
                            : choice.approach === "self_regulation" 
                              ? "▶ 정서적 다독임" 
                              : "▶ 지혜의 성찰"}
                        </span>
                        <span className="text-xs font-sans font-bold leading-snug block">
                          {choice.text}
                        </span>
                      </div>
                      
                      <div className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 ${
                        isChosen 
                          ? era === "future"
                            ? "bg-white border-white text-[#ff007f]"
                            : era === "present"
                              ? "bg-white border-white text-[#d04683]"
                              : "bg-white border-white text-[#aa2211]"
                          : era === "future"
                            ? "border-[#00f0ff]/50 text-[#00f0ff]"
                            : era === "present"
                              ? "border-[#4d3266]/50 text-[#4d3266]"
                              : "border-[#4a2e1b]/50 text-[#4a2e1b]"
                      }`}>
                        <ChevronRight size={10} strokeWidth={4} className={isChosen ? "block" : "opacity-30"} />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
