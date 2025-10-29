import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Terms of Service</CardTitle>
          <p className="text-sm text-gray-500">Last updated: October 25, 2025</p>
        </CardHeader>
        <CardContent className="prose max-w-none space-y-6">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Preferred Deals ("the Service"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </p>
          </section>

          <Separator />

          <section>
            <h2>2. Description of Service</h2>
            <p>
              Preferred Deals is a business directory platform that connects local businesses with consumers. 
              We provide a platform for businesses to list their services, offers, and deals, and for users to 
              discover and save local businesses and promotions.
            </p>
          </section>

          <Separator />

          <section>
            <h2>3. User Accounts</h2>
            <p>
              To access certain features of the Service, you may be required to create an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept all responsibility for activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2>4. Business Partner Terms</h2>
            <p>
              If you register as a business partner, you additionally agree to:
            </p>
            <ul>
              <li>Provide accurate and truthful information about your business</li>
              <li>Keep your business information up to date</li>
              <li>Honor any deals or promotions you advertise on the platform</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in fraudulent or deceptive practices</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2>5. User Conduct</h2>
            <p>
              You agree not to use the Service to:
            </p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Post false, misleading, or defamatory content</li>
              <li>Transmit spam, viruses, or malicious code</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with or disrupt the Service</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2>6. Content and Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by Preferred Deals and are 
              protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p>
              You retain rights to any content you submit, post, or display on the Service. By submitting content, 
              you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display 
              such content in connection with the Service.
            </p>
          </section>

          <Separator />

          <section>
            <h2>7. Payment and Fees</h2>
            <p>
              Certain features of the Service may require payment of fees. You agree to pay all applicable fees as 
              described in our pricing plans. All fees are non-refundable unless otherwise stated.
            </p>
          </section>

          <Separator />

          <section>
            <h2>8. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice or 
              liability, for any reason, including if you breach these Terms of Service.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. All provisions of the Terms 
              which by their nature should survive termination shall survive.
            </p>
          </section>

          <Separator />

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              In no event shall Preferred Deals, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or 
              inability to access or use the Service.
            </p>
          </section>

          <Separator />

          <section>
            <h2>10. Disclaimer</h2>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, 
              regarding the Service's operation or the information, content, or materials included on the Service.
            </p>
          </section>

          <Separator />

          <section>
            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will provide notice of any material 
              changes by posting the new Terms on this page and updating the "Last updated" date.
            </p>
          </section>

          <Separator />

          <section>
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: legal@preferreddeals.com<br />
              Phone: (555) 123-4567<br />
              Address: 123 Business Ave, Suite 100, City, State 12345
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
