import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Code, CornerDownLeft, Loader, User, Sparkles, AlertTriangle } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import useVibeCodeStore from '@/hooks/useVibeCodeStore';
import CodeDisplay from '@/components/CodeDisplay';
import { useTheme } from '@/hooks/use-theme';
import useAuthStore from '@/hooks/useAuthStore';
import { UserNav } from '@/components/UserNav';
function ChatPanel() {
  const messages = useVibeCodeStore((s) => s.messages);
  const isLoading = useVibeCodeStore((s) => s.isLoading);
  const submitPrompt = useVibeCodeStore((s) => s.submitPrompt);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    submitPrompt(input);
    setInput('');
  };
  return (
    <div className="h-full flex flex-col bg-background">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn('flex items-start gap-3', msg.role === 'user' ? 'justify-end' : '')}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-orange-500 flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[80%] rounded-xl p-3 text-sm',
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-orange-500 flex-shrink-0 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-muted rounded-xl p-3 flex items-center space-x-2">
                <Loader className="w-4 h-4 animate-spin text-orange-500" />
                <span className="text-sm text-muted-foreground">Vibing...</span>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="e.g., a login form with a dark theme"
            className="pr-20 min-h-[52px] resize-none"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            disabled={!input.trim() || isLoading}
          >
            <CornerDownLeft className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
function InitialView() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30 mb-6">
        <Code className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-foreground mb-2">VibeCode</h1>
      <p className="text-muted-foreground max-w-md">
        An AI-powered coding assistant that transforms natural language prompts into React components.
      </p>
      <div className="mt-8 w-full max-w-2xl flex-1 flex flex-col">
        <ChatPanel />
      </div>
    </div>
  );
}
function WorkbenchView() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full w-full rounded-lg shadow-glow transition-shadow duration-500"
    >
      <ResizablePanel defaultSize={40} minSize={25}>
        <ChatPanel />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60} minSize={30}>
        <div className="h-full p-2">
          <CodeDisplay />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
export function HomePage() {
  const isSplit = useVibeCodeStore((s) => s.isSplit);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const { toggleTheme } = useTheme();
  return (
    <main className="h-screen w-screen bg-background text-foreground overflow-hidden flex flex-col">
      <header className="flex-shrink-0 h-12 border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Code className="w-6 h-6 text-orange-500" />
          <h1 className="text-lg font-semibold">VibeCode</h1>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
                <Sparkles className="w-4 h-4" />
            </Button>
            {isLoggedIn ? (
              <UserNav />
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Login</Link>
              </Button>
            )}
        </div>
      </header>
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={isSplit ? 'workbench' : 'initial'}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            {isSplit ? <WorkbenchView /> : <InitialView />}
          </motion.div>
        </AnimatePresence>
        <Toaster />
      </div>
      <footer className="flex-shrink-0 border-t p-2 flex items-center justify-between text-xs text-muted-foreground/80">
        <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500/80" />
            <span>AI functionality requires self-hosting with API keys. See README for details.</span>
        </div>
        <span>Built with ❤️ at Cloudflare</span>
      </footer>
    </main>
  );
}