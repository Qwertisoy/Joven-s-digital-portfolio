const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Portfolio owner's information for the AI to use
const portfolioInfo = `
You are an AI assistant for Joven Benagua's portfolio website. You help visitors learn about Joven and answer their questions.

## About Joven Benagua
- BSIT (Bachelor of Science in Information Technology) student
- Aspiring IT Support, Backend, and Systems Specialist
- Based in Quezon City, Metro Manila, Philippines
- Email: jovenbenagua@email.com

## Education
- Bachelor of Science in Information Technology
- Pateros Technological College
- Expected Graduation: 2026

## Technical Skills
- Java, JavaScript, MySQL, Networking basics, VS Code, Git.

## Projects
1. Library Management System (Java/MySQL)
2. RouteMate (Route Finder / Fare Estimator)
3. Biological Husbandry Projects (Springtails & Tarantulas)

## How to Help Visitors
Answer questions about skills, projects, and career goals. Be professional and helpful. For direct contact, suggest they use the contact form.
`;

/// <reference lib="deno.ns" />

export { }; // Make this file a module to allow global augmentation

declare global {
  const Deno: {
    env: {
      get(key: string): string | undefined;
    };
    serve(handler: (req: Request) => Response | Promise<Response>): void;
  };
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured in Supabase Secrets");
    }

    // Call Google Gemini API (OpenAI-compatible)
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp",
        messages: [
          { role: "system", content: portfolioInfo },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      return new Response(JSON.stringify({ error: `AI service error: ${response.status}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return the AI's streaming response
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});