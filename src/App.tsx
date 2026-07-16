import { useState, useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import MainScreen from "./components/MainScreen";
import WorryInputScreen from "./components/WorryInputScreen";
import EraSelectScreen from "./components/EraSelectScreen";
import LoadingScreen from "./components/LoadingScreen";
import StoryScreen from "./components/StoryScreen";
import EndingScreen from "./components/EndingScreen";
import { Era, Choice, StoryResponse } from "./types";
import pixelBg from "./assets/images/k_fantasy_pixel_bg_1784177016101.jpg";

type Step = "main" | "input" | "era" | "loading" | "story" | "ending";

export default function App() {
  const [step, setStep] = useState<Step>("main");
  
  // User Inputs
  const [worry, setWorry] = useState<string>("");
  const [selectedEra, setSelectedEra] = useState<Era>("present");

  // Game States
  const [story, setStory] = useState<StoryResponse | null>(null);
  const [choices, setChoices] = useState<Record<number, Choice>>({});
  
  // API Flow States
  const [storyLoading, setStoryLoading] = useState<boolean>(false);
  const [storyError, setStoryError] = useState<string | null>(null);

  // Image Generation States
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Trigger story generation when entering the 'loading' step
  useEffect(() => {
    if (step !== "loading") return;

    let isMounted = true;
    const generateStory = async () => {
      setStoryLoading(true);
      setStoryError(null);
      
      try {
        const response = await fetch("/api/story", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ worry, era: selectedEra }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data: StoryResponse = await response.json();
        
        if (isMounted) {
          setStory(data);
          setStep("story");
        }
      } catch (err: any) {
        console.error("Error generating story:", err);
        if (isMounted) {
          setStoryError(err.message || "이야기를 구성하는 과정에서 서버 에러가 발생했습니다.");
        }
      } finally {
        if (isMounted) {
          setStoryLoading(false);
        }
      }
    };

    generateStory();

    return () => {
      isMounted = false;
    };
  }, [step, worry, selectedEra]);

  // Trigger Image generation when moving to 'ending'
  const generateEndingImage = async (storyData: StoryResponse) => {
    setImageLoading(true);
    setImageError(null);
    setImageUrl(null);

    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          era: selectedEra,
          animal: storyData.animal,
          imageScene: storyData.imageScene,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (err: any) {
      console.error("Error generating image:", err);
      setImageError(err.message || "이미지를 생성하는 동안 에러가 발생했습니다.");
    } finally {
      setImageLoading(false);
    }
  };

  const handleCompleteStory = () => {
    if (!story) return;
    setStep("ending");
    generateEndingImage(story);
  };

  const handleChoiceSelected = (sceneId: number, choice: Choice) => {
    setChoices((prev) => ({
      ...prev,
      [sceneId]: choice,
    }));
  };

  const handleRestart = () => {
    setWorry("");
    setSelectedEra("present");
    setStory(null);
    setChoices({});
    setImageUrl(null);
    setImageError(null);
    setStep("main");
  };

  return (
    <main className="min-h-[100dvh] w-full max-w-[620px] mx-auto bg-[#131116] relative shadow-2xl overflow-x-hidden">
      {/* Background Image layer with subtle saturation and glow */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-35 filter saturate-110 contrast-105 pointer-events-none"
        style={{ backgroundImage: `url(${pixelBg})` }}
      />
      
      {/* Scanline pattern overlay */}
      <div className="absolute inset-0 retro-scanlines z-10 pointer-events-none opacity-20" />
      
      {/* Background container layout */}
      <div className="min-h-[100dvh] flex flex-col w-full relative z-20">
        
        {/* Story Error Screen fallback inside Loading */}
        {step === "loading" && storyError && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center space-y-6">
            <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full flex items-center justify-center text-3xl animate-bounce">
              <AlertCircle size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-serif text-white">동해물과 백두산이...</h3>
              <p className="text-sm text-slate-400 font-sans max-w-sm leading-relaxed">
                {storyError}
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-xs pt-4">
              <button
                onClick={() => setStep("loading")}
                className="h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-serif font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-950/20"
              >
                <RotateCcw size={14} />
                <span>이야기 다시 요청하기</span>
              </button>
              <button
                onClick={() => setStep("era")}
                className="h-12 bg-slate-800 hover:bg-slate-700 text-slate-300 font-sans rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/5"
              >
                <span>이전 단계로 돌아가기</span>
              </button>
            </div>
          </div>
        )}

        {/* Regular Steps Routing */}
        {step === "main" && (
          <MainScreen onStart={() => setStep("input")} />
        )}

        {step === "input" && (
          <WorryInputScreen
            worry={worry}
            onChangeWorry={setWorry}
            onNext={() => setStep("era")}
            onBack={() => setStep("main")}
          />
        )}

        {step === "era" && (
          <EraSelectScreen
            selectedEra={selectedEra}
            onSelectEra={setSelectedEra}
            onNext={() => setStep("loading")}
            onBack={() => setStep("input")}
          />
        )}

        {step === "loading" && !storyError && (
          <LoadingScreen era={selectedEra} />
        )}

        {step === "story" && story && (
          <StoryScreen
            story={story}
            era={selectedEra}
            onChoiceSelected={handleChoiceSelected}
            onCompleteStory={handleCompleteStory}
          />
        )}

        {step === "ending" && story && (
          <EndingScreen
            story={story}
            era={selectedEra}
            choices={choices}
            imageUrl={imageUrl}
            imageLoading={imageLoading}
            imageError={imageError}
            worry={worry}
            onRestart={handleRestart}
            onRetryImage={() => generateEndingImage(story)}
          />
        )}
      </div>
    </main>
  );
}

