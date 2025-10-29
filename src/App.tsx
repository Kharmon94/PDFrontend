import { useState } from 'react';
import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { DirectoryPage } from './components/directory-page';
import { BecomePartner } from './components/become-partner';
import { BusinessDashboard } from './components/business-dashboard';
import { DistributionPartner } from './components/distribution-partner';
import { ListingDetail } from './components/listing-detail';
import { UserAuth } from './components/user-auth';
import { SavedDeals } from './components/saved-deals';
import { UserDashboard } from './components/user-dashboard';
import { TermsOfService } from './components/terms-of-service';
import { PrivacyPolicy } from './components/privacy-policy';
import { CookiePolicy } from './components/cookie-policy';
import { AboutUs } from './components/about-us';
import { HelpCenter } from './components/help-center';
import { PricingPlans } from './components/pricing-plans';
import { CookieConsent } from './components/cookie-consent';
import { Settings } from './components/settings';
import { mockBusinesses } from './components/mock-data';
import { Toaster } from './components/ui/sonner';

type Page = 'directory' | 'become-partner' | 'dashboard' | 'distribution-partner' | 'listing-detail' | 'login' | 'saved-deals' | 'user-dashboard' | 'terms' | 'privacy' | 'cookies' | 'about' | 'help' | 'pricing' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('directory');
  const [isBusinessLoggedIn, setIsBusinessLoggedIn] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);
  
  // User account state
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [savedDeals, setSavedDeals] = useState<string[]>([]);
  const [userType, setUserType] = useState<'user' | 'partner' | 'distribution' | 'admin'>('user');
  
  // Listing detail state
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  
  // Category navigation state
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  
  // Cookie consent state
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleBusinessSignup = (id: string) => {
    setBusinessId(id);
    setIsBusinessLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleUserLogin = (email: string, name: string, userType: string) => {
    setUserEmail(email);
    setUserName(name);
    setUserType(userType as 'user' | 'partner' | 'distribution' | 'admin');
    setIsUserLoggedIn(true);
    setCurrentPage('directory');
  };

  const handleUserLogout = () => {
    setIsUserLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setSavedDeals([]);
    setCurrentPage('directory');
  };

  const handleViewListing = (businessId: string) => {
    setSelectedBusinessId(businessId);
    setCurrentPage('listing-detail');
  };

  const handleToggleSaveDeal = (businessId: string) => {
    setSavedDeals(prev => {
      if (prev.includes(businessId)) {
        return prev.filter(id => id !== businessId);
      } else {
        return [...prev, businessId];
      }
    });
  };

  const handleLoginRequired = () => {
    setCurrentPage('login');
  };

  const handleNavigate = (page: Page, category?: string) => {
    setCurrentPage(page);
    if (page === 'directory') {
      setSelectedCategory(category);
    }
  };

  const handleCookieAccept = () => {
    setShowCookieConsent(false);
    // Cookie accepted logic
  };

  const handleCookieDecline = () => {
    setShowCookieConsent(false);
    // Cookie declined logic
  };

  const handleDashboardTypeChange = (type: 'user' | 'partner' | 'distribution' | 'admin') => {
    setUserType(type);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen bg-background flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        isLoggedIn={isBusinessLoggedIn}
        isUserLoggedIn={isUserLoggedIn}
        userName={userName}
        onLogout={handleUserLogout}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />
      
      {currentPage === 'directory' && (
        <DirectoryPage onViewListing={handleViewListing} initialCategory={selectedCategory} />
      )}
      {currentPage === 'become-partner' && (
        <BecomePartner 
          onSignupComplete={handleBusinessSignup}
          onBack={isUserLoggedIn && userType === 'partner' ? () => setCurrentPage('user-dashboard') : undefined}
        />
      )}
      {currentPage === 'dashboard' && (
        <BusinessDashboard businessId={businessId} />
      )}
      {currentPage === 'distribution-partner' && <DistributionPartner />}
      {currentPage === 'listing-detail' && selectedBusinessId && (
        <ListingDetail
          businessId={selectedBusinessId}
          businesses={mockBusinesses}
          onBack={() => setCurrentPage('directory')}
          isUserLoggedIn={isUserLoggedIn}
          onLoginRequired={handleLoginRequired}
          savedDeals={savedDeals}
          onToggleSave={handleToggleSaveDeal}
        />
      )}
      {currentPage === 'login' && (
        <UserAuth
          onLogin={handleUserLogin}
          onCancel={() => setCurrentPage('directory')}
        />
      )}
      {currentPage === 'saved-deals' && (
        <SavedDeals
          savedDealIds={savedDeals}
          businesses={mockBusinesses}
          onRemoveDeal={handleToggleSaveDeal}
          onViewListing={handleViewListing}
        />
      )}
      {currentPage === 'user-dashboard' && (
        <UserDashboard
          userType={userType}
          userName={userName}
          savedDeals={savedDeals}
          onNavigate={handleNavigate}
          onDashboardTypeChange={handleDashboardTypeChange}
        />
      )}
      {currentPage === 'settings' && (
        <Settings
          onBack={() => setCurrentPage('user-dashboard')}
          userName={userName}
          userEmail={userEmail}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
        />
      )}
      {currentPage === 'terms' && (
        <TermsOfService onBack={() => setCurrentPage('directory')} />
      )}
      {currentPage === 'privacy' && (
        <PrivacyPolicy onBack={() => setCurrentPage('directory')} />
      )}
      {currentPage === 'cookies' && (
        <CookiePolicy onBack={() => setCurrentPage('directory')} />
      )}
      {currentPage === 'about' && (
        <AboutUs onBack={() => setCurrentPage('directory')} />
      )}
      {currentPage === 'help' && (
        <HelpCenter onBack={() => setCurrentPage('directory')} />
      )}
      {currentPage === 'pricing' && (
        <PricingPlans onBack={() => setCurrentPage('directory')} />
      )}
      
      <Footer onNavigate={(page) => handleNavigate(page)} isDarkMode={isDarkMode} />
      <Toaster />
      {showCookieConsent && (
        <CookieConsent 
          onAccept={handleCookieAccept} 
          onDecline={handleCookieDecline}
          onViewPolicy={() => handleNavigate('cookies')}
        />
      )}
    </div>
  );
}
