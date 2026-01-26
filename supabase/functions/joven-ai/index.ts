// This function uses the standard Deno.serve (no imports required)
// to avoid "deno.land" errors in your editor.

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const portfolioInfo = `
You are an AI assistant for Jovenpbenagua@email.com's portfolio.
Name: Joven
Education: BSIT (Expected 2026)
Skills: Java, JavaScript, MySQL, Networking.
Goals: IT Support / Systems Specialist.
`

Deno.serve(async (req) => {
    // 1. Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { messages } = await req.json()
        const apiKey = Deno.env.get('GEMINI_API_KEY')

        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'GEMINI_API_KEY not set' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        // 2. Call Gemini API (OpenAI-compatible endpoint)
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gemini-1.5-flash', // Using 1.5 flash for stability
                messages: [
                    { role: 'system', content: portfolioInfo },
                    ...messages,
                ],
                stream: true,
            }),
        })

        // 3. Forward the stream
        return new Response(response.body, {
            headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
