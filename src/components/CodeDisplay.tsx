import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clipboard, Eye, Star } from 'lucide-react';
import { toast } from 'sonner';
import useAuthStore from '@/hooks/useAuthStore';
import useVibeCodeStore from '@/hooks/useVibeCodeStore';
const CodeDisplay = memo(() => {
  const navigate = useNavigate();
  const code = useVibeCodeStore((s) => s.code);
  const previewHtml = useVibeCodeStore((s) => s.previewHtml);
  const subscriptionStatus = useAuthStore((s) => s.subscriptionStatus);
  const isPro = subscriptionStatus === 'pro';
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Copied to clipboard!', {
      description: 'The code has been copied successfully.',
    });
  };
  const UpgradePrompt = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-gray-900/50 rounded-b-lg">
      <Star className="w-12 h-12 text-orange-400 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">Unlock Live Previews</h3>
      <p className="text-sm text-gray-400 mb-6 max-w-xs">
        Subscribe to Pro to see a live preview of your generated components right here.
      </p>
      <Button onClick={() => navigate('/pricing')} className="bg-orange-600 hover:bg-orange-700">
        Upgrade to Pro
      </Button>
    </div>
  );
  return (
    <Card className="h-full flex flex-col bg-gray-900/50 border-orange-500/20">
      <Tabs defaultValue="code" className="w-full flex flex-col flex-1">
        <CardHeader className="p-2 border-b border-orange-500/20">
          <div className="flex items-center justify-between px-2">
            <TabsList className="bg-transparent border-none p-0">
              <TabsTrigger
                value="code"
                className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 border-none text-gray-400"
              >
                Code
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 border-none text-gray-400 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
                {!isPro && <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />}
              </TabsTrigger>
            </TabsList>
            <Button variant="ghost" size="icon" onClick={handleCopy} className="text-gray-400 hover:text-white hover:bg-orange-500/20">
              <Clipboard className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <TabsContent value="code" className="p-0 flex-1 overflow-auto m-0">
          <SyntaxHighlighter
            language="jsx"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              height: '100%',
              backgroundColor: 'transparent',
              fontSize: '14px',
            }}
            codeTagProps={{
              style: {
                fontFamily: "var(--font-mono), monospace",
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        </TabsContent>
        <TabsContent value="preview" className="flex-1 m-0">
          {isPro ? (
            <iframe
              srcDoc={previewHtml}
              title="Component Preview"
              sandbox="allow-scripts"
              className="w-full h-full border-0 bg-white"
            />
          ) : (
            <UpgradePrompt />
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
});
export default CodeDisplay;