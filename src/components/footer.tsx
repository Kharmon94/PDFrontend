import { Building2, Mail, Facebook, Twitter, Instagram, Linkedin, Users, Handshake, Clock } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import logoImage from 'figma:asset/dd3bfa837dfa92a5643677141b8779a2931011b6.png';

type Page = 'home' | 'directory' | 'list-your-business' | 'manage-your-listing' | 'become-partner' | 'distribution-partner' | 'partner-dashboard-login' | 'about' | 'contact-us' | 'terms' | 'privacy' | 'cookies';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavigate = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate(page);
  };

  return (
    <footer className="bg-[rgb(2,2,2)] text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <button onClick={() => handleNavigate('home')} className="flex items-center">
              <img src={logoImage} alt="Preferred Deals" className="h-10 brightness-0 invert" />
            </button>
            <p className="text-sm">
              Connecting local businesses with their communities. Discover the best deals and services in your area.
            </p>
          </div>

          {/* For Businesses */}
          <div>
            <h3 className="text-white mb-4">For Businesses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigate('list-your-business')}
                  className="hover:text-white transition-colors"
                >
                  List Your Business
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('manage-your-listing')}
                  className="hover:text-white transition-colors"
                >
                  Manage Your Listing
                </button>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h3 className="text-white mb-4">For Partners</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigate('distribution-partner')}
                  className="hover:text-white transition-colors"
                >
                  Become a Partner
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('partner-dashboard-login')}
                  className="hover:text-white transition-colors"
                >
                  Partner Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => handleNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('contact-us')}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href="mailto:info@preferred.deals" className="hover:text-white transition-colors">
                    info@preferred.deals
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-xs">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Support Hours</p>
                  <p>Mon-Fri: 8am-5pm MT</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {currentYear} Preferred Deals. All rights reserved.</p>
          <div className="flex gap-6">
            <button
              onClick={() => handleNavigate('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNavigate('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => handleNavigate('cookies')}
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}