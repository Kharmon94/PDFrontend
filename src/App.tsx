import { useState, useEffect } from 'react';
import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { HomePage } from './components/home-page';
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
import { ContactUs } from './components/contact-us';
import { ListYourBusiness } from './components/list-your-business';
import { ManageYourListing } from './components/manage-your-listing';
import { PartnerDashboardLogin } from './components/partner-dashboard-login';
import { WhiteLabelPlatformSettings } from './components/white-label-platform-settings';
import { Toaster } from './components/ui/sonner';
import { apiService } from './services/api';
import { User, UserType } from './types';

type Page = 'home' | 'directory' | 'become-partner' | 'dashboard' | 'distribution-partner' | 'listing-detail' | 'login' | 'saved-deals' | 'user-dashboard' | 'terms' | 'privacy' | 'cookies' | 'about' | 'help' | 'pricing' | 'settings' | 'contact-us' | 'list-your-business' | 'manage-your-listing' | 'partner-dashboard-login' | 'white-label-settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isBusinessLoggedIn, setIsBusinessLoggedIn] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);
  
  // User account state
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState<UserType>('user');
  const [isInitializing, setIsInitializing] = useState(true);
  const [savedDeals, setSavedDeals] = useState<string[]>([]);
  
  // Listing detail state
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  
  // Category navigation state
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  
  // Location navigation state
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
  
  // Cookie consent state
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  
  // Business login default tab state
  const [businessLoginTab, setBusinessLoginTab] = useState<'login' | 'signup'>('login');
  
  // Partner login default tab state
  const [partnerLoginTab, setPartnerLoginTab] = useState<'login' | 'signup'>('login');
  
  // Track previous page for back navigation
  const [previousPage, setPreviousPage] = useState<Page>('home');
  
  // Theme state - removed, no longer using dark mode

  // Initialize user session on app load
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const response = await apiService.getCurrentUser();
        if (response.user) {
          setCurrentUser(response.user);
          setUserName(response.user.name);
          setUserEmail(response.user.email);
          setUserType(response.user.user_type);
          setIsUserLoggedIn(true);
          
          // Load saved deals
          try {
            const savedDealsData = await apiService.getSavedDeals();
            setSavedDeals(savedDealsData.map((deal: any) => String(deal.id)));
          } catch (error) {
            // Saved deals might not be available
            console.log('Could not load saved deals');
          }
        }
      } catch (error) {
        // User not authenticated, that's fine
        console.log('No active session');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeUser();
  }, []);

  const handleBusinessSignup = (id: string) => {
    setBusinessId(id);
    setIsBusinessLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleUserLogin = (user: User) => {
    setCurrentUser(user);
    setUserEmail(user.email);
    setUserName(user.name);
    setUserType(user.user_type);
    setIsUserLoggedIn(true);
    setCurrentPage('directory');
  };

  const handleUserLogout = () => {
    apiService.logout();
    setIsUserLoggedIn(false);
    setCurrentUser(null);
    setUserName('');
    setUserEmail('');
    setSavedDeals([]);
    setCurrentPage('directory');
  };

  const handleViewListing = (businessId: string) => {
    setSelectedBusinessId(businessId);
    setCurrentPage('listing-detail');
  };

  const handleToggleSaveDeal = async (businessId: string) => {
    if (!isUserLoggedIn) {
      handleLoginRequired();
      return;
    }

    try {
      await apiService.toggleSavedDeal(businessId);
      setSavedDeals(prev => {
        if (prev.includes(businessId)) {
          return prev.filter(id => id !== businessId);
        } else {
          return [...prev, businessId];
        }
      });
    } catch (error: any) {
      console.error('Failed to toggle saved deal:', error);
    }
  };

  const handleLoginRequired = () => {
    setCurrentPage('login');
  };

  const handleNavigate = (page: Page, category?: string, location?: string) => {
    setCurrentPage(page);
    if (page === 'directory') {
      setSelectedCategory(category);
      setSelectedLocation(location);
    }
    // Reset business login tab to login when navigating to manage-your-listing from footer/other places
    if (page === 'manage-your-listing') {
      setBusinessLoginTab('login');
    }
    // Reset partner login tab to login when navigating to partner-dashboard-login from footer (Partner Dashboard button)
    if (page === 'partner-dashboard-login') {
      setPartnerLoginTab('login');
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
    // No longer using dark mode
  };

  // Show loading screen while initializing
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        isLoggedIn={isBusinessLoggedIn}
        isUserLoggedIn={isUserLoggedIn}
        userName={userName}
        onLogout={handleUserLogout}
        isDarkMode={false}
        onToggleTheme={handleToggleTheme}
      />
      
      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} onViewListing={handleViewListing} />
      )}
      {currentPage === 'directory' && (
        <DirectoryPage onViewListing={handleViewListing} initialCategory={selectedCategory} initialLocation={selectedLocation} />
      )}
      {currentPage === 'become-partner' && (
        <BecomePartner 
          onSignupComplete={handleBusinessSignup}
          onBack={isUserLoggedIn && userType === 'partner' ? () => setCurrentPage('user-dashboard') : undefined}
        />
      )}
      {currentPage === 'dashboard' && (
        <BusinessDashboard 
          businessId={businessId}
          onNavigate={(page) => {
            setPreviousPage('dashboard');
            handleNavigate(page as Page);
          }}
        />
      )}
      {currentPage === 'distribution-partner' && (
        <DistributionPartner onGetStarted={() => {
          setPartnerLoginTab('signup');
          setCurrentPage('partner-dashboard-login');
        }} />
      )}
      {currentPage === 'listing-detail' && selectedBusinessId && (
        <ListingDetail
          businessId={selectedBusinessId}
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
          businessLoginTab={businessLoginTab}
          setBusinessLoginTab={setBusinessLoginTab}
        />
      )}
      {currentPage === 'saved-deals' && (
        <SavedDeals
          savedDealIds={savedDeals}
          onRemoveDeal={handleToggleSaveDeal}
          onViewListing={handleViewListing}
          onBack={() => setCurrentPage('user-dashboard')}
        />
      )}
      {currentPage === 'user-dashboard' && (
        <UserDashboard
          userType={userType}
          userName={userName}
          savedDeals={savedDeals}
          onNavigate={handleNavigate}
          onDashboardTypeChange={handleDashboardTypeChange}
          isUserLoggedIn={isUserLoggedIn}
          onToggleSave={handleToggleSaveDeal}
        />
      )}
      {currentPage === 'settings' && (
        <Settings
          onBack={() => setCurrentPage('user-dashboard')}
          userName={userName}
          userEmail={userEmail}
          isDarkMode={false}
          onToggleTheme={handleToggleTheme}
          userType={userType === 'distribution' ? 'distribution' : userType === 'partner' ? 'business' : 'regular'}
          hasWhiteLabel={userType === 'distribution'}
        />
      )}
      {currentPage === 'terms' && (
        <TermsOfService onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'privacy' && (
        <PrivacyPolicy onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'cookies' && (
        <CookiePolicy onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'about' && (
        <AboutUs onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'help' && (
        <HelpCenter onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'pricing' && (
        <PricingPlans onBack={() => setCurrentPage(previousPage)} />
      )}
      {currentPage === 'contact-us' && (
        <ContactUs onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'list-your-business' && (
        <ListYourBusiness 
          onBack={() => setCurrentPage('home')} 
          onGetStarted={() => {
            setBusinessLoginTab('signup');
            setCurrentPage('manage-your-listing');
          }}
        />
      )}
      {currentPage === 'manage-your-listing' && (
        <ManageYourListing 
          onBack={() => setCurrentPage('directory')} 
          onLogin={() => {
            setUserType('partner');
            setIsBusinessLoggedIn(true);
            setUserName('Business Partner');
            setIsUserLoggedIn(true);
            setCurrentPage('user-dashboard');
          }}
          defaultTab={businessLoginTab}
        />
      )}
      {currentPage === 'partner-dashboard-login' && (
        <PartnerDashboardLogin 
          onBack={() => setCurrentPage('directory')} 
          onDistributionLogin={() => {
            setUserType('distribution');
            setUserName('Distribution Partner');
            setIsUserLoggedIn(true);
            setCurrentPage('user-dashboard');
          }}
          defaultTab={partnerLoginTab}
        />
      )}
      {currentPage === 'white-label-settings' && (
        <WhiteLabelPlatformSettings 
          onBack={() => setCurrentPage('user-dashboard')}
          partnerName={userName}
        />
      )}
      
      <Footer onNavigate={(page) => handleNavigate(page)} />
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