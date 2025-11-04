import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { BusinessLogin } from './business-login';

interface ManageYourListingProps {
  onBack: () => void;
  onLogin: () => void;
  defaultTab?: 'login' | 'signup';
}

export function ManageYourListing({ onBack, onLogin, defaultTab }: ManageYourListingProps) {
  return <BusinessLogin onBack={onBack} onLogin={onLogin} defaultTab={defaultTab} />;
}