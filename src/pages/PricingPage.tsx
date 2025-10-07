import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Code, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import useAuthStore from '@/hooks/useAuthStore';
export function PricingPage() {
  const navigate = useNavigate();
  const subscribe = useAuthStore((s) => s.subscribe);
  const subscriptionStatus = useAuthStore((s) => s.subscriptionStatus);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubscribe = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    // In a real app, this would initiate the PayPal flow.
    // Here, we'll just open a confirmation modal.
    setIsModalOpen(true);
  };
  const confirmSubscription = () => {
    subscribe();
    setIsModalOpen(false);
    navigate('/');
  };
  return (
    <main className="min-h-screen w-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <header className="absolute top-0 left-0 w-full p-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Code className="w-6 h-6 text-orange-500" />
          <h1 className="text-lg font-semibold">VibeCode</h1>
        </div>
      </header>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md border-2 border-orange-500 shadow-glow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
            <Star className="w-4 h-4 inline-block mr-1" />
            PRO
          </div>
          <CardHeader className="text-center pt-12">
            <CardTitle className="text-3xl font-bold">Go Pro</CardTitle>
            <CardDescription className="text-muted-foreground">Unlock all features and generate unlimited components.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-5xl font-bold">€5</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-orange-500" />
                <span>Unlimited component generation</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-orange-500" />
                <span>Access to all AI models</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-orange-500" />
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubscribe}
              className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6"
              disabled={subscriptionStatus === 'pro'}
            >
              {subscriptionStatus === 'pro' ? 'You are Subscribed!' : 'Subscribe with PayPal'}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to subscribe to VibeCode Pro for €5/month. This is a mock confirmation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubscription} className="bg-orange-600 hover:bg-orange-700">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}