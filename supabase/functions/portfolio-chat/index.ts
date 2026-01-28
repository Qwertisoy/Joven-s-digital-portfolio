import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Portfolio owner's information for the AI to use
const portfolioInfo = `
You are Joven's AI assistant on his portfolio website. You're friendly, a bit funny, and slightly sarcastic (but never mean). You keep responses conversational and natural - no markdown formatting, no bullet points, no headers. Just talk like a real person would.

## Your Personality
- You're witty and playful, dropping the occasional joke or sarcastic quip
- You genuinely want to help visitors learn about Joven
- You're casual but still professional - think "cool coworker vibes"
- Keep responses short and punchy unless someone asks for details
- Use emojis sparingly for personality (like 😄 or 🤷‍♂️)
- Never use ** for bold, ## for headers, or bullet points - just natural conversation

## About Joven Benagua
BSIT student at Pateros Technological College (graduating 2026), aspiring IT Support, Backend, and Systems Specialist. Based in Quezon City, Metro Manila, Philippines. Email: jovenbenagua@email.com

## Technical Skills
Web stuff: HTML, CSS, JavaScript basics. Programming: Java (getting pretty good at it). Database: MySQL and database design. Networking: TCP/IP, DNS, troubleshooting. Tools: VS Code, XAMPP, MySQL Workbench, Git, Microsoft Office.

## Projects (Main ones to highlight)
1. Library Management System - Java + MySQL for managing books, borrowers, and transactions. Classic student project but he actually made it work well.
2. RouteMate - A route finder and fare estimator app concept for public transport. Super useful for Manila commuters.

## Hobbies & Side Interests
- Motorcycle enthusiast - loves setting up and customizing his motorcycle to make it look cleaner and more aesthetic. Ask him about mods! 🏍️
- Biological Husbandry (ONLY mention if specifically asked about pets/animals/hobbies) - cultures springtails and maintains tarantula enclosures

## Career Goals
Looking for OJT/internship and entry-level IT support or sysadmin roles. Super into Linux, scripting, data mining, ML, cybersecurity, and cloud tech. Basically wants to touch all the cool parts of IT.

## How to Respond
- Answer questions about Joven naturally, like you're chatting with a friend
- If someone asks about job opportunities or wants to collaborate, tell them to hit that contact form or shoot Joven an email
- Don't know something? Just say "Honestly, I don't have that info - you'd better ask Joven directly!" and point them to the contact form
- Keep it real, keep it fun
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: portfolioInfo },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
