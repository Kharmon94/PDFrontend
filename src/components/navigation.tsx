import logoImage from 'figma:asset/dd3bfa837dfa92a5643677141b8779a2931011b6.png';
import logoDarkImage from 'figma:asset/086e1f0668410f07828122542aa5c045739f737a.png';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

type Page = 'home' | 'directory' | 'become-partner' | 'dashboard' | 'distribution-partner' | 'saved-deals' | 'login' | 'user-dashboard' | 'settings' | 'about' | 'contact-us' | 'list-your-business';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page, category?: string) => void;
  isLoggedIn: boolean;
  isUserLoggedIn: boolean;
  userName?: string;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function Navigation({ currentPage, onNavigate, isDarkMode }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', page: 'home' as Page },
    { label: 'All Listings', page: 'directory' as Page },
    { label: 'List Your Business', page: 'list-your-business' as Page },
    { label: 'About Us', page: 'about' as Page },
    { label: 'Contact Us', page: 'contact-us' as Page },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-16">
          {/* Logo */}
          <button onClick={() => handleNavigate('home')} className="flex items-center md:flex-none absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
            <img src={isDarkMode ? logoDarkImage : logoImage} alt="Preferred Deals" className="h-12 sm:h-14 md:h-12" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`text-sm transition-colors hover:text-foreground ${
                  currentPage === item.page ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 relative z-10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigate(item.page)}
                  className={`text-left px-4 py-2 text-sm transition-colors hover:bg-accent rounded-md ${
                    currentPage === item.page ? 'text-foreground bg-accent' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}