import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { chatService } from '@/lib/chat';
export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};
type VibeCodeState = {
  messages: Message[];
  code: string;
  previewHtml: string;
  isSplit: boolean;
  isLoading: boolean;
};
type VibeCodeActions = {
  addMessage: (message: Message) => void;
  setCode: (code: string) => void;
  setPreviewHtml: (html: string) => void;
  setSplit: (isSplit: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  submitPrompt: (prompt: string) => Promise<void>;
};
const useVibeCodeStore = create<VibeCodeState & VibeCodeActions>()(
  immer((set) => ({
    messages: [
      {
        id: '1',
        role: 'assistant',
        content: "I'm VibeCode, your UI copilot. Describe a component, and I'll build it.",
      },
    ],
    code: `// Your code will appear here\n\nfunction HelloWorld() {\n  return <h1>Hello, VibeCode!</h1>;\n}`,
    previewHtml: '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:sans-serif;color:#777;">Preview will appear here for Pro users.</div>',
    isSplit: false,
    isLoading: false,
    addMessage: (message) =>
      set((state) => {
        state.messages.push(message);
      }),
    setCode: (code) =>
      set((state) => {
        state.code = code;
      }),
    setPreviewHtml: (html) =>
      set((state) => {
        state.previewHtml = html;
      }),
    setSplit: (isSplit) =>
      set((state) => {
        state.isSplit = isSplit;
      }),
    setIsLoading: (isLoading) =>
      set((state) => {
        state.isLoading = isLoading;
      }),
    submitPrompt: async (prompt) => {
      set((state) => {
        state.messages.push({ id: crypto.randomUUID(), role: 'user', content: prompt });
        state.isLoading = true;
      });
      const response = await chatService.sendMessage(prompt);
      set((state) => {
        if (response.success && response.data) {
          const { assistant, code, preview_html, ui } = response.data;
          state.messages.push({
            id: crypto.randomUUID(),
            role: 'assistant',
            content: assistant.message,
          });
          state.code = code;
          if (preview_html) {
            state.previewHtml = preview_html;
          }
          state.isSplit = ui.split;
        } else {
          state.messages.push({
            id: crypto.randomUUID(),
            role: 'assistant',
            content: `Sorry, I encountered an error: ${response.error || 'Unknown issue.'}`,
          });
        }
        state.isLoading = false;
      });
    },
  })),
);
export default useVibeCodeStore;