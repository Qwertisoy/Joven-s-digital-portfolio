import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Send, Mail, MapPin, Github, Linkedin, MessageCircle, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-chat`;
const YOUR_EMAIL = "johndoe@email.com"; // Replace with your actual email

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm John's AI assistant. Ask me anything about his skills, projects, or experience. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Direct contact form state
  const [isDirectContactOpen, setIsDirectContactOpen] = useState(true);
  const [directForm, setDirectForm] = useState({ name: "", email: "", message: "" });
  const [isSendingDirect, setIsSendingDirect] = useState(false);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const streamChat = useCallback(async (userMessages: Message[], onDelta: (text: string) => void, onDone: () => void) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok || !resp.body) {
      throw new Error("Failed to start stream");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    onDone();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    scrollToBottom();

    let assistantSoFar = "";
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
      scrollToBottom();
    };

    try {
      await streamChat(
        [...messages, userMsg],
        (chunk) => upsertAssistant(chunk),
        () => setIsLoading(false)
      );
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again or contact John directly via email." }]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDirectContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!directForm.name.trim() || !directForm.email.trim() || !directForm.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(directForm.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSendingDirect(true);

    // Open Gmail compose with pre-filled content
    const subject = encodeURIComponent(`Portfolio Contact from ${directForm.name}`);
    const body = encodeURIComponent(
      `Name: ${directForm.name}\nEmail: ${directForm.email}\n\nMessage:\n${directForm.message}`
    );
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${YOUR_EMAIL}&su=${subject}&body=${body}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, "_blank");
    
    toast.success("Gmail opened! Please send the email to complete your message.");
    setDirectForm({ name: "", email: "", message: "" });
    setIsSendingDirect(false);
    setIsDirectContactOpen(false);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-4 max-w-4xl mx-auto">
            <span className="text-primary font-mono text-sm">05.</span>
            <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
            <div className="flex-1 h-px bg-border ml-4" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-center mb-12"
          >
            Chat with my AI assistant to learn more about me, or reach out directly!
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Left Column - AI Chatbox */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl overflow-hidden flex flex-col min-h-[500px]"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Bot size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">John's AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Ask me anything about John!</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === "user" ? "bg-primary" : "bg-secondary"
                      }`}>
                        {msg.role === "user" ? (
                          <User size={14} className="text-primary-foreground" />
                        ) : (
                          <Bot size={14} className="text-primary" />
                        )}
                      </div>
                      <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                        msg.role === "user" 
                          ? "bg-primary text-primary-foreground rounded-tr-sm" 
                          : "bg-secondary rounded-tl-sm"
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <Bot size={14} className="text-primary" />
                      </div>
                      <div className="bg-secondary p-3 rounded-xl rounded-tl-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about skills, projects..."
                    className="bg-secondary border-border focus:border-primary"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSend} 
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Info & Direct Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-col h-full"
            >
              <div className="glass p-4 rounded-xl mb-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-primary" />
                    <a
                      href={`mailto:${YOUR_EMAIL}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {YOUR_EMAIL}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Metro Manila, Philippines</span>
                  </div>
                  <div className="flex gap-2">
                    <motion.a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin size={18} />
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Direct Contact - Always expanded to match chatbox height */}
              <div className="glass rounded-xl overflow-hidden flex-1 flex flex-col">
                <div className="p-4 border-b border-border bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={18} className="text-primary" />
                    <h3 className="font-semibold">Send Direct Message</h3>
                  </div>
                </div>
                
                <form onSubmit={handleDirectContactSubmit} className="p-4 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4">
                    Fill out the form below and it will open Gmail with your message ready to send.
                  </p>
                  
                  <div className="space-y-4 flex-1">
                    <div>
                      <label htmlFor="direct-name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <Input
                        id="direct-name"
                        value={directForm.name}
                        onChange={(e) => setDirectForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Smith"
                        className="bg-secondary border-border focus:border-primary"
                        maxLength={100}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="direct-email" className="block text-sm font-medium mb-2">
                        Your Email
                      </label>
                      <Input
                        id="direct-email"
                        type="email"
                        value={directForm.email}
                        onChange={(e) => setDirectForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@gmail.com"
                        className="bg-secondary border-border focus:border-primary"
                        maxLength={255}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label htmlFor="direct-message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="direct-message"
                        value={directForm.message}
                        onChange={(e) => setDirectForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Your message here..."
                        className="bg-secondary border-border focus:border-primary min-h-[120px]"
                        maxLength={1000}
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSendingDirect}
                    className="w-full bg-gradient-primary hover:opacity-90 mt-4"
                  >
                    {isSendingDirect ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Opening Gmail...
                      </>
                    ) : (
                      <>
                        <Mail size={16} className="mr-2" />
                        Send via Gmail
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
