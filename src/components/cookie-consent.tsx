import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
  onViewPolicy?: () => void;
}

export function CookieConsent({ onAccept, onDecline, onViewPolicy }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show popup after a brief delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-md">
      <Card className="p-6 shadow-xl border-2">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Cookie className="w-6 h-6 text-gray-900" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="mb-1">Cookie Consent</h3>
              <p className="text-sm text-gray-600">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleAccept} className="flex-1">
                Accept All
              </Button>
              <Button onClick={handleDecline} variant="outline" className="flex-1">
                Decline
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Read our{' '}
              <button 
                onClick={onViewPolicy}
                className="text-gray-900 hover:underline"
              >
                Cookie Policy
              </button>
              {' '}for more information.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
