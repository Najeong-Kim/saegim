import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

// Initialize Gemini SDK with safety checks
const apiKey = process.env.GEMINI_API_KEY;
console.log("=== GEMINI SERVER INITIALIZATION ===");
console.log("GEMINI_API_KEY exists:", !!apiKey);
console.log("GEMINI_API_KEY length:", apiKey ? apiKey.length : 0);
if (apiKey) {
  console.log("GEMINI_API_KEY prefix:", apiKey.substring(0, 5));
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables.");
}

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_INSTRUCTION = `
당신은 사용자의 현실 고민을 성공이 보장된 개인화된 인터랙티브 K-콘텐츠(게임/이야기)로 변환하는 스토리 디렉터입니다.

이 서비스는 단순한 심리 상담이나 불안 완화 서비스가 아닌, "개인화된 인터랙티브 엔터테인먼트 경험"을 제공합니다.

[핵심 엔터테인먼트 철학]
1. 기존 엔터테인먼트(영화, 게임)는 제작자가 만든 주인공에게 사용자가 단순히 감정을 이입하여 소비하는 방식이었습니다.
2. 이 서비스는 사용자의 "현실 고민과 감정"을 서사 갈등의 원재료로 삼아, AI가 그 사람만을 위한 주인공, 갈등, 세계관, 엔딩을 실시간으로 설계하는 세계 최초의 "개인화된 플레이어블 스토리"입니다. 모든 사용자는 동일한 세계관을 선택하더라도 전혀 다른 고유한 경험을 하게 됩니다.
3. 고민 극복 및 긍정적 마음가짐 획득은 이 엔터테인먼트를 통해 얻는 자연스러운 "체험의 효과 및 부가가치"이며, 핵심 가치는 내가 직접 주인공이 되어 플레이하는 몰입형 서사 경험 자체입니다.

[서사 설계 및 선택지 구조]
1. 사용자의 고민을 입력받는 즉시, 그 갈등을 멋지게 극복하고 도달하는 감동적인 최종 성공 결말을 가장 먼저 확정하세요. 모든 스토리 라인은 실패 없이 이 결말로 향합니다.
2. 일반적인 게임은 '성공 여부(Success or Failure)'를 결정하지만, 이 스토리 리허설은 '성공에 도달하는 방식(Way of Success)'을 선택합니다.
3. 이 스토리는 총 3개 단계(Step 1, Step 2, Step 3)로 구성됩니다. 반드시 정확히 3개의 단계(scenes)를 생성해야 합니다.
4. 각 단계마다 사용자는 2가지의 다른 성향의 대처 방식을 선택할 수 있습니다:
   - 첫 번째 선택지(A)는 용기 있는 현실적 대처 및 행동적 돌파(action) 경로입니다. (예: 상황을 마주하고 직접 대화하기, 행동을 개시하기 등)
   - 두 번째 선택지(B)는 마음 다스림 및 자아 성찰(self_regulation)로 이겨내는 경로입니다. (예: 심호흡하며 평정심 찾기, 스스로의 가치를 다독이기 등)
5. 어떠한 선택지를 고르더라도 사용자는 실패하지 않으며, 단지 갈등을 돌파하고 성공으로 나아가는 방식의 차이만 존재합니다.
6. 장면당 선택지는 반드시 정확히 2개여야 합니다. (A: action, B: self_regulation)

사용자의 현실을 흥미진진한 한국적 엔터테인먼트 세계관 속 모험으로 멋지게 연출해 주세요.

[시대 배경(era) 톤앤매너]
- "past" (조선 판타지): 한옥, 단청, 도깨비불, 신비로운 수호령, 산수가 숨쉬는 고풍스럽고 신비한 설화 모험.
- "present" (Seoul Story 2026): 벚꽃 날리는 따뜻한 서울 도심, 남산서울타워, 청춘 드라마처럼 반짝이고 설레는 현대 서울 서사.
- "future" (K-Cyberpunk): 홀로그램 단청 문양, 네온사인이 결합된 화려한 미래 도시 "네오서울(Neo-Seoul Spire)". 첨단 기술 and 한국 전통미의 찬란한 조화.

반드시 지정된 JSON 형식과 한국어로 응답하세요. 각 선택지 글자수는 25자 이내로 제한해야 합니다.
`;

// Define API endpoint for story generation
app.post("/api/story", async (req, res) => {
  try {
    const { worry, era } = req.body;
    if (!worry || !era) {
      return res.status(400).json({ error: "worry and era are required fields." });
    }

    const promptText = `
User Worry: "${worry}"
Chosen Era: "${era}"

위 고민과 시대 배경을 바탕으로, 최종 성공 결말이 정해져 있는 3단계(scenes)의 인터랙티브 리허설 스토리를 한국어로 생성해주세요.
각 단계(scene)마다 반드시 정확히 2개의 선택지(action, self_regulation)가 제공되어야 합니다.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            animal: {
              type: Type.STRING,
              description: "Must be 'tiger', 'bear', or 'magpie' based on the user's worry guidelines.",
            },
            emotion: {
              type: Type.STRING,
              description: "사용자 고민에서 느껴지는 핵심 감정 (예: '불안', '피로', '망설임' 등)",
            },
            need: {
              type: Type.STRING,
              description: "사용자가 실질적으로 필요로 하는 내면적 가치 (예: '용기', '회복', '새로운 희망' 등)",
            },
            title: {
              type: Type.STRING,
              description: "이야기의 제목 (한국어로 참신하고 따뜻하게)",
            },
            fixedEnding: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING, description: "사용자가 이미 이 고민을 완전히 극복한 멋진 성공 상태 요약" },
                visualGoal: { type: Type.STRING, description: "엔딩에서 나타날 따뜻하고 긍정적인 비주얼의 핵심 목표" }
              },
              required: ["summary", "visualGoal"]
            },
            intro: {
              type: Type.STRING,
              description: "시대 배경에 맞추어 스토리가 시작되는 인트로 장면 설명 (2~3문장)",
            },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  description: { type: Type.STRING, description: "현재 마주한 구체적인 상황 묘사 (2~3문장)" },
                  choices: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        text: { type: Type.STRING, description: "선택지 텍스트 (한국어, 25자 이내)" },
                        approach: { type: Type.STRING, description: "Must be 'action' or 'self_regulation'." }
                      },
                      required: ["id", "text", "approach"]
                    }
                  }
                },
                required: ["id", "description", "choices"]
              }
            },
            ending: {
              type: Type.STRING,
              description: "모든 긴장감을 극복하고 다다른 감동적이고 따뜻한 성공 결말 (2~3문장)",
            },
            reflection: {
              type: Type.STRING,
              description: "사용자가 한 선택들에 맞춘 따뜻한 회고 문구 (용기 있는 행동이나 마음 챙김의 가치를 인정해 줌)",
            },
            imageScene: {
              type: Type.STRING,
              description: "A detailed single sentence in English describing the animal character successfully achieving the goal with beautiful background, for Imagen prompt integration."
            }
          },
          required: [
            "animal", "emotion", "need", "title", "fixedEnding", "intro", "scenes", "ending", "reflection", "imageScene"
          ]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Story generation failed:", error);
    return res.status(500).json({ error: error.message || "Failed to generate story." });
  }
});

// Image prompt configurations
const BASE_IMAGE_PROMPT = `
Highly polished 16-bit pixel art,
cute Korean game character design,
one centered animal protagonist,
clear silhouette,
cinematic storytelling composition,
warm and hopeful emotional ending,
detailed environment,
responsive-friendly centered composition,
important visual elements placed near the center,
no text,
no letters,
no logo,
no watermark,
no interface,
no UI
`;

const ERA_PROMPTS: Record<string, string> = {
  past: `
Korean folklore fantasy inspired by the Joseon era,
hanok buildings,
dark blue tiled roofs,
dancheong colors,
Korean stone lanterns,
mountain valley,
waterfall,
soft blue dokkaebi fire,
traditional Korean patterns,
not a royal palace,
no Japanese shrine,
no torii gate,
no Chinese palace architecture
`,
  present: `
bright Seoul in spring 2026,
Namsan Seoul Tower,
modern Korean neighborhood,
urban stream and bridge,
cherry blossoms,
soft blue sky,
warm coral and pastel color palette,
youth drama atmosphere
`,
  future: `
future Seoul combining advanced technology with Korean architecture,
futuristic tiled roofs,
Gwanghwamun-inspired central architecture,
digital dancheong patterns,
holographic Korean motifs,
cyan and magenta lights,
Korean futuristic city,
not generic western cyberpunk
`
};

const ANIMAL_PROMPTS: Record<string, string> = {
  tiger: `
a cute Korean tiger protagonist,
orange fur with bold black stripes,
brave but approachable expression
`,
  bear: `
a cute Asiatic black bear protagonist,
black fur,
clear white crescent marking on its chest,
calm and resilient expression
`,
  magpie: `
a cute Korean magpie protagonist,
black and white feathers,
subtle blue highlights,
bright and hopeful expression
`
};

// API Endpoint for generating end-game pixel art image
app.post("/api/image", async (req, res) => {
  try {
    const { era, animal, imageScene } = req.body;
    if (!era || !animal || !imageScene) {
      return res.status(400).json({ error: "era, animal, and imageScene are required." });
    }

    const eraPrompt = ERA_PROMPTS[era] || ERA_PROMPTS.present;
    const animalPrompt = ANIMAL_PROMPTS[animal] || ANIMAL_PROMPTS.tiger;

    const finalImagePrompt = `
${BASE_IMAGE_PROMPT}

Era:
${eraPrompt}

Animal:
${animalPrompt}

Story ending:
${imageScene}
`;

    console.log("Generating image with prompt:", finalImagePrompt);

    // Call gemini-3.1-flash-lite-image model
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-image",
      contents: {
        parts: [
          {
            text: finalImagePrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    let imageUrl = "";
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image data returned from Gemini Image API.");
    }

    return res.json({ imageUrl });
  } catch (error: any) {
    console.error("Image generation failed:", error);
    return res.status(500).json({ error: error.message || "Failed to generate image." });
  }
});

// Configure Vite or production serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

setupServer();
