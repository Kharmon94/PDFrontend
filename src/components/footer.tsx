import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Users, Handshake } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import logoImage from 'figma:asset/dd3bfa837dfa92a5643677141b8779a2931011b6.png';
import logoDarkImage from 'figma:asset/086e1f0668410f07828122542aa5c045739f737a.png';

type Page = 'directory' | 'become-partner' | 'dashboard' | 'distribution-partner' | 'about' | 'pricing' | 'help' | 'terms' | 'privacy' | 'cookies';

interface FooterProps {
  onNavigate: (page: Page) => void;
  isDarkMode?: boolean;
}

export function Footer({ onNavigate, isDarkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[rgb(2,2,2)] dark:bg-card text-gray-300 dark:text-card-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Partner CTAs */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-muted dark:to-accent rounded-lg p-8 mb-12 border border-gray-700 dark:border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6" />
                <h3 className="text-white dark:text-foreground text-lg">Business Partners</h3>
              </div>
              <p className="text-sm">
                Join our network and reach thousands of local customers. List your business and start growing today.
              </p>
              <Button 
                onClick={() => onNavigate('become-partner')} 
                className="bg-white hover:bg-gray-100 text-black dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground"
              >
                <Users className="w-4 h-4 mr-2" />
                Become a Partner
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Handshake className="w-6 h-6" />
                <h3 className="text-white dark:text-foreground text-lg">Distribution Partners</h3>
              </div>
              <p className="text-sm">
                Help us expand our reach in your community. Partner with us to bring local deals to more people.
              </p>
              <Button 
                onClick={() => onNavigate('distribution-partner')} 
                className="bg-white hover:bg-gray-100 text-black dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground"
              >
                <Handshake className="w-4 h-4 mr-2" />
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={isDarkMode ? logoDarkImage : logoImage} alt="Preferred Deals" className={`h-10 ${!isDarkMode ? 'brightness-0 invert' : ''}`} />
            <p className="text-sm">
              Connecting local businesses with their communities. Discover the best deals and services in your area.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white dark:text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('directory')}
                  className="hover:text-foreground transition-colors"
                >
                  Browse Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('become-partner')}
                  className="hover:text-foreground transition-colors"
                >
                  Become a Partner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('distribution-partner')}
                  className="hover:text-foreground transition-colors"
                >
                  Distribution Partners
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Business Resources */}
          <div>
            <h3 className="text-white dark:text-foreground mb-4">For Businesses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-foreground transition-colors"
                >
                  Pricing Plans
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Marketing Resources
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('help')}
                  className="hover:text-foreground transition-colors"
                >
                  Help Center
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white dark:text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Business Ave, Suite 100<br />City, State 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-foreground transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@preferreddeals.com" className="hover:text-foreground transition-colors">
                  info@preferreddeals.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700 dark:bg-border" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {currentYear} Preferred Deals. All rights reserved.</p>
          <div className="flex gap-6">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onNavigate('cookies')}
              className="hover:text-foreground transition-colors"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
