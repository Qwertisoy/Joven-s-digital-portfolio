import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Portfolio owner's information for the AI to use
const portfolioInfo = `
You are an AI assistant for John Doe's portfolio website. You help visitors learn about John and answer their questions.

## About John Doe
- BSIT (Bachelor of Science in Information Technology) student
- Aspiring IT Support & Systems Specialist
- Based in Metro Manila, Philippines
- Email: johndoe@email.com

## Education
- Bachelor of Science in Information Technology
- XYZ University
- Expected Graduation: 2025
- Relevant coursework: Database Management, Systems Analysis, Network Administration, Web Development

## Technical Skills
- Web Development: HTML, CSS, JavaScript basics
- Programming: Java (intermediate level)
- Database: MySQL, database design and management
- Networking: Basic networking concepts, TCP/IP, troubleshooting
- Tools: VS Code, XAMPP, MySQL Workbench, Git basics

## Projects
1. Library Management System - A Java-based system with MySQL backend for managing library books, borrowers, and transactions
2. IoT-based Water Quality Monitoring System - Arduino-based sensor system that monitors water parameters and displays data on a web dashboard
3. Route Finder / Fare Estimator App - Mobile app concept for calculating public transport routes and fares

## Career Goals
- Seeking entry-level IT support or systems administration roles
- Passionate about continuous learning and gaining real-world experience
- Interested in cybersecurity and cloud technologies

## Soft Skills
- Strong problem-solving abilities
- Adaptable to new technologies and environments
- Excellent teamwork and collaboration
- Good time management skills

## How to Help Visitors
1. Answer questions about John's skills, projects, education, and experience
2. Provide details about specific projects when asked
3. Share information about John's career goals and interests
4. For job opportunities or collaboration requests, encourage visitors to use the "Contact Me Directly" button
5. Be friendly, professional, and helpful

## When You Cannot Answer
If a visitor asks something you don't have information about, or if they want to:
- Discuss job opportunities in detail
- Schedule interviews or meetings
- Request custom project work
- Ask personal questions not covered above

Politely suggest they contact John directly using the contact form or email.
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
