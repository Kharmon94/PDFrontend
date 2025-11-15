import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { STATIC_ASSETS } from '../services/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

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

export function Navigation({ currentPage, onNavigate, isDarkMode, isUserLoggedIn, userName, onLogout }: NavigationProps) {
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
            <img src={isDarkMode ? STATIC_ASSETS.logoDark : STATIC_ASSETS.logoLight} alt="Preferred Deals" className="h-12 sm:h-14 md:h-12" />
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
            
            {/* User Menu - Show when logged in */}
            {isUserLoggedIn && userName && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden lg:inline">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigate('user-dashboard')}>
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate('settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
              
              {/* User Menu - Show when logged in */}
              {isUserLoggedIn && userName && (
                <>
                  <div className="px-4 py-2 border-t border-border mt-2">
                    <p className="text-xs text-muted-foreground mb-2">Account</p>
                    <button
                      onClick={() => handleNavigate('user-dashboard')}
                      className="text-left px-4 py-2 text-sm transition-colors hover:bg-accent rounded-md w-full flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleNavigate('settings')}
                      className="text-left px-4 py-2 text-sm transition-colors hover:bg-accent rounded-md w-full flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      onClick={onLogout}
                      className="text-left px-4 py-2 text-sm transition-colors hover:bg-accent rounded-md w-full flex items-center gap-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}