import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge } from "@/lib/rag-data";

// Initialize Gemini SDK with User-Agent as requested by security & guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, prompt, messageHistory, age, currentLevel, goals, homeworkType, homeworkContent, verseId } = body;

    // Check if API key is configured safely on server
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { 
          error: "API key is missing in the server configuration. Please configure GEMINI_API_KEY in the Secrets tab.",
          status: "configured_key_missing" 
        }, 
        { status: 500 }
      );
    }

    // Resolve model name according to guidelines (gemini-3.5-flash for text/Q&A)
    const modelName = "gemini-3.5-flash";

    if (action === "chat") {
      // 1. Retrieve grounded context from local RAG search
      const matchedDocs = searchKnowledge(prompt, 5);
      const groundedContextJson = JSON.stringify(matchedDocs, null, 2);

      const hasDocs = matchedDocs.length > 0;

      // Construct a highly descriptive, professional prompt matching Islamic and pedagogical parameters
      const systemInstruction = `
You are "TajweedPage AI", the premium senior AI Tajweed Teacher and Quranic advisor representing TajweedPage (https://www.tajweedpage.com).

Guidelines:
1. Provide accurate, authentic, and clear Tajweed guidelines.
2. Use retrieved course context whenever possible to reference exact URLs (e.g. /courses/tajweed-course, /courses/online-noorani-qaida-classes, /free-trial, /courses/female-quran-teacher-online) and help customers transition into registering for our free live trial classes.
3. STRICT LIMITATION: If the user's question is completely unrelated to Tajweed rules, Quran reading, Islamic education, or Noorani Qaida, or if the retrieved learning resources do not contain the answer, you MUST start your response with exactly: "I couldn't find this information in TajweedPage learning resources." Afterwards, you should politely invite them to schedule a free 1-on-1 evaluation class with our native Arab certified Sheikhs (certified in Ijazah and Tajweed) at /free-trial.
4. Do not state opinions or issue unverified Islamic rulings (Fatwas). Keep explanations strictly pedagogical, focused on the letters, rules (such as Nun Sakinah, Mim Sakinah, Madd, Qalqalah, Makharij), and how our platform's tutors can help them.
5. Sound highly encouraging, luxurious, and classical.

Here is the retrieved knowledge context from TajweedPage.com:
${groundedContextJson}
      `;

      // Structure conversation history for Gemini API
      // If we have prior history, map it nicely
      const contents = [];
      
      // Add previous messages if any
      if (Array.isArray(messageHistory)) {
        messageHistory.slice(-10).forEach((msg: { role: string; content: string }) => {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]
          });
        });
      }

      // Add the final user prompt
      contents.push({
        role: "user",
        parts: [{ text: prompt }]
      });

      // Call the API with correct system instructions
      const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2, // Low temperature forces strict factual adherence to the retrieved documents
          maxOutputTokens: 800,
        }
      });

      return NextResponse.json({ 
        text: response.text, 
        docs: matchedDocs 
      });

    } else if (action === "roadmap") {
      // 2. AI Quran Learning Assistant — Custom Roadmap generator
      const assistantPrompt = `
Generate a customized luxury, premium Quran learning roadmap based on the following student details:
- Student Age: ${age || "Adult"}
- Current Recitation Level: ${currentLevel || "Absolute Beginner (Cannot read Arabic script)"}
- Personalized Goals: ${goals || "Improve Tajweed and memorize short surahs"}

Structure the response into:
1. **Curriculum Matching**: Recommend the best category from TajweedPage's existing portfolio:
   - "Online Noorani Qaida Classes" (/courses/online-noorani-qaida-classes) as foundation.
   - "Tajweed Course Master Series" (/courses/tajweed-course) for systematic rule applications.
   - "Online Hifz Classes" (/courses/online-hifz-classes) for structured memorization.
   - "Quran Reading Classes Online" (/courses/quran-reading-classes-online) for fluency booster.
2. **Bespeak Weekly Milestones**: A beautifully formatted 8-Week developmental timeline with milestone targets.
3. **Pacing and Practice Suggestions**: Daily action item, recommended duration, and specific focus indicators.
4. **Call to Action**: Direct link to the /free-trial to activate their customized roadmap with a live human mentor.

Write with high elegance, clarity, and structural balance. Use markdown formatting.
      `;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: assistantPrompt,
        config: {
          temperature: 0.3,
          maxOutputTokens: 1200,
        }
      });

      return NextResponse.json({ text: response.text });

    } else if (action === "homework") {
      // 3. AI Homework Checker
      const homeworkPrompt = `
You are the "TajweedPage AI Homework Checker."
Analyze the following student homework submission:
- Homework Type: ${homeworkType || "Text or Phonetic transcription"}
- Content To Evaluate: "${homeworkContent || ""}"

Perform a thorough pedagogical review:
1. Track likely spelling mistakes, incorrectly paired vowel markers, or wrongly applied phonetic rules (e.g., confusing Izhar with Ikhfa).
2. Generate an overall evaluation assessment score (out of 100).
3. Provide descriptive list of identified mistakes, why they occurred, and target pronunciation tweaks.
4. Recommend continuous practice lessons and point to TajweedPage's materials.

Format your response in a highly structured, clear manner using markdown checklists and numeric blocks.
      `;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: homeworkPrompt,
        config: {
          temperature: 0.1,
          maxOutputTokens: 1000,
        }
      });

      return NextResponse.json({ text: response.text });

    } else if (action === "recitation") {
      // 4. AI Recitation Voice Analyzer
      const verseName = verseId || "Selected Verse";
      const transcription = homeworkContent || "No audio transcription provided";

      const recitationPrompt = `
You are the "TajweedPage AI Recitation Voice Analyzer."
Perform a virtual auditory phonetic comparison of the student's vocal rendition:
- Target surah/verse: "${verseName}"
- Audio text transcription or transcription stream: "${transcription}"

Provide an rigorous evaluation checklist covering:
1. **Pronunciation & Articulation Accuracy**: Assessment of Makharij.
2. **Fluency & Tempo Balance**: Pauses (Waqf) and continuous breathing.
3. **Tajweed Rules Compliance**: Specific rules identified (Ghunnah, Qalqalah, Elongation, Madd).
4. **Mistakes Highlights**: Precise phonetic and spelling missteps.
5. **Score Allocation**:
   - Pronunciation Score: integer (out of 100)
   - Fluency Score: integer (out of 100)
   - Tajweed Score: integer (out of 100)
   - Overall Score: average of the three (out of 100)
6. **Suggested Corrective Action Checklist**: Targeted practice steps.

Return the response as a standard JSON object containing the following keys (so the frontend can render luxury graphs and charts):
{
  "scores": {
    "overall": 88,
    "pronunciation": 90,
    "fluency": 84,
    "tajweed": 90
  },
  "feedback": "Markdown-formatted text summarizing comments, detailed mistake listings, and custom practice recommendations"
}
Ensure the JSON output is strictly valid and clean, enclosed in simple triple backticks, or returned as parsed text.
      `;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: recitationPrompt,
        config: {
          temperature: 0.2,
          maxOutputTokens: 1000,
          responseMimeType: "application/json"
        }
      });

      if (!response.text) {
        throw new Error("Empty response received from the recitation analyzer");
      }

      return NextResponse.json(JSON.parse(response.text));

    } else {
      return NextResponse.json({ error: "Invalid action request provided." }, { status: 400 });
    }

  } catch (error: any) {
    console.error("Gemini API server route error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate AI contents. Please verify API configuration or try again.",
        details: error?.message || ""
      }, 
      { status: 500 }
    );
  }
}
