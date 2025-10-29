import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface CookiePolicyProps {
  onBack: () => void;
}

export function CookiePolicy({ onBack }: CookiePolicyProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Cookie Policy</CardTitle>
          <p className="text-sm text-gray-500">Last updated: October 25, 2025</p>
        </CardHeader>
        <CardContent className="prose max-w-none space-y-6">
          <section>
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used 
              to make websites work more efficiently and provide information to the owners of the site.
            </p>
          </section>

          <Separator />

          <section>
            <h2>2. How We Use Cookies</h2>
            <p>
              Preferred Deals uses cookies to enhance your experience on our platform. We use cookies for the following purposes:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Deliver personalized advertisements and content</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2>3. Types of Cookies We Use</h2>
            
            <h3>3.1 Essential Cookies</h3>
            <p>These cookies are necessary for the website to function and cannot be switched off in our systems:</p>
            <ul>
              <li>Session cookies to maintain your logged-in state</li>
              <li>Security cookies to authenticate users and prevent fraud</li>
              <li>Load balancing cookies to ensure even distribution of requests</li>
            </ul>

            <h3>3.2 Analytics Cookies</h3>
            <p>These cookies allow us to count visits and traffic sources to measure and improve site performance:</p>
            <ul>
              <li>Google Analytics cookies to track user behavior</li>
              <li>Session recording to understand user experience</li>
              <li>Heat mapping to optimize page layouts</li>
            </ul>

            <h3>3.3 Functional Cookies</h3>
            <p>These cookies enable enhanced functionality and personalization:</p>
            <ul>
              <li>Preference cookies to remember your settings</li>
              <li>Language preference cookies</li>
              <li>Location cookies for local content</li>
            </ul>

            <h3>3.4 Advertising Cookies</h3>
            <p>These cookies may be set through our site by advertising partners:</p>
            <ul>
              <li>Targeting cookies to show relevant ads</li>
              <li>Retargeting cookies to show ads on other sites</li>
              <li>Conversion tracking cookies to measure ad effectiveness</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2>4. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics 
              and deliver advertisements:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> Web analytics service</li>
              <li><strong>Facebook Pixel:</strong> Advertising and analytics</li>
              <li><strong>LinkedIn Insight Tag:</strong> Conversion tracking</li>
              <li><strong>Payment Processors:</strong> Secure transaction processing</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2>5. Cookie Duration</h2>
            
            <h3>Session Cookies</h3>
            <p>
              These are temporary cookies that expire when you close your browser. They help us maintain your session 
              as you navigate through our website.
            </p>

            <h3>Persistent Cookies</h3>
            <p>
              These cookies remain on your device for a set period or until you delete them. They help us remember your 
              preferences and settings for future visits.
            </p>
          </section>

          <Separator />

          <section>
            <h2>6. Managing Cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences 
              by adjusting your browser settings:
            </p>

            <h3>Browser Controls</h3>
            <p>Most browsers allow you to:</p>
            <ul>
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies</li>
              <li>Delete all cookies when you close the browser</li>
            </ul>

            <h3>Browser-Specific Instructions</h3>
            <ul>
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies</li>
            </ul>

            <p className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <strong>Note:</strong> If you choose to block cookies, some features of our website may not function properly, 
              and your experience may be degraded.
            </p>
          </section>

          <Separator />

          <section>
            <h2>7. Do Not Track Signals</h2>
            <p>
              Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want 
              to have your online activity tracked. Currently, there is no industry standard for how to respond to DNT signals. 
              At this time, we do not respond to DNT signals.
            </p>
          </section>

          <Separator />

          <section>
            <h2>8. Cookie Consent</h2>
            <p>
              When you first visit our website, we will ask for your consent to use cookies. You can change your cookie 
              preferences at any time by adjusting your browser settings or using our cookie preference center.
            </p>
          </section>

          <Separator />

          <section>
            <h2>9. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our 
              business operations. We will notify you of any significant changes by posting a notice on our website.
            </p>
          </section>

          <Separator />

          <section>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us:
            </p>
            <p>
              Email: privacy@preferreddeals.com<br />
              Phone: (555) 123-4567<br />
              Address: 123 Business Ave, Suite 100, City, State 12345
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
