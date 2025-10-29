import { LayoutDashboard, Menu, Heart, LogIn, LogOut, User, Star, UtensilsCrossed, Heart as HeartWellness, Sparkles, Film, Wrench, UserCircle, Settings as SettingsIcon, Moon, Sun, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import logoImage from 'figma:asset/dd3bfa837dfa92a5643677141b8779a2931011b6.png';
import logoDarkImage from 'figma:asset/086e1f0668410f07828122542aa5c045739f737a.png';

type Page = 'directory' | 'become-partner' | 'dashboard' | 'distribution-partner' | 'saved-deals' | 'login' | 'user-dashboard' | 'settings';

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

export function Navigation({ currentPage, onNavigate, isLoggedIn, isUserLoggedIn, userName, onLogout, isDarkMode, onToggleTheme }: NavigationProps) {
  const categoryItems = [
    { label: 'Featured', icon: Star, category: 'featured' },
    { label: 'Dining', icon: UtensilsCrossed, category: 'Restaurant' },
    { label: 'Health', icon: HeartWellness, category: 'Healthcare' },
    { label: 'Beauty', icon: Sparkles, category: 'Beauty' },
    { label: 'Entertainment', icon: Film, category: 'Entertainment' },
    { label: 'Services', icon: Wrench, category: 'Services' },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between lg:justify-start items-center h-16">
          {/* Mobile Menu Button - Left */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation menu
              </SheetDescription>
              <div className="flex flex-col gap-1 mt-6">
                <h3 className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider">Browse</h3>
                {categoryItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.category}
                      onClick={() => onNavigate('directory', item.category)}
                      className="flex items-center gap-3 px-3 py-3 rounded-md transition-colors hover:bg-accent"
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                {(isUserLoggedIn || isLoggedIn) && (
                  <>
                    <div className="h-px bg-border my-3" />
                    <h3 className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider">Account</h3>
                    {isUserLoggedIn && (
                      <>
                        <button
                          onClick={() => onNavigate('user-dashboard')}
                          className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                            currentPage === 'user-dashboard'
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent'
                          }`}
                        >
                          <UserCircle className="w-5 h-5 flex-shrink-0" />
                          <span>My Dashboard</span>
                        </button>
                        <button
                          onClick={() => onNavigate('saved-deals')}
                          className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                            currentPage === 'saved-deals'
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent'
                          }`}
                        >
                          <Heart className="w-5 h-5 flex-shrink-0" />
                          <span>Saved Deals</span>
                        </button>
                        <button
                          onClick={() => onNavigate('settings')}
                          className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                            currentPage === 'settings'
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent'
                          }`}
                        >
                          <SettingsIcon className="w-5 h-5 flex-shrink-0" />
                          <span>Settings</span>
                        </button>
                      </>
                    )}
                    {isLoggedIn && (
                      <button
                        onClick={() => onNavigate('dashboard')}
                        className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                          currentPage === 'dashboard'
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                        }`}
                      >
                        <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
                        <span>Business Dashboard</span>
                      </button>
                    )}
                  </>
                )}
                <div className="h-px bg-border my-3" />
                <Button 
                  variant="ghost" 
                  onClick={onToggleTheme} 
                  className="justify-start px-3 py-3 w-full"
                >
                  {isDarkMode ? <Sun className="w-5 h-5 mr-3 flex-shrink-0" /> : <Moon className="w-5 h-5 mr-3 flex-shrink-0" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <div className="h-px bg-border my-3" />
                {isUserLoggedIn ? (
                  <>
                    <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-3">
                      <User className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate">{userName}</span>
                    </div>
                    <Button variant="ghost" onClick={onLogout} className="justify-start px-3 py-3 w-full">
                      <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button variant="default" onClick={() => onNavigate('login')} className="mx-3 mt-2">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo - Centered on Mobile, Left on Desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none lg:mr-6">
            <button onClick={() => onNavigate('directory')} className="flex items-center">
              <img src={isDarkMode ? logoDarkImage : logoImage} alt="Preferred Deals" className="h-10 sm:h-12" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {/* Category Navigation */}
            {categoryItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.category}
                  onClick={() => onNavigate('directory', item.category)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors hover:bg-accent text-sm text-foreground"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}

            {/* Spacer to push user items to the right */}
            <div className="flex-1" />

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={onToggleTheme}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* User Menu */}
            {isUserLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="max-w-[100px] truncate">{userName}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onNavigate('user-dashboard')}>
                    <UserCircle className="w-4 h-4 mr-2" />
                    My Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('saved-deals')}>
                    <Heart className="w-4 h-4 mr-2" />
                    Saved Deals
                  </DropdownMenuItem>
                  {isLoggedIn && (
                    <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Business Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => onNavigate('settings')}>
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" onClick={() => onNavigate('login')}>
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Invisible spacer for mobile to balance centered logo */}
          <div className="lg:hidden w-10"></div>
        </div>
      </div>
    </nav>
  );
}
