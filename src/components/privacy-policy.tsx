import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          <p className="text-sm text-gray-500">Last updated: October 25, 2025</p>
        </CardHeader>
        <CardContent className="prose max-w-none space-y-6">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Preferred Deals ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you use our business directory platform.
            </p>
          </section>

          <Separator />

          <section>
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you provide to us, including:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Business information (for business partners)</li>
              <li>Account credentials (username and password)</li>
              <li>Payment information (processed securely through third-party processors)</li>
              <li>Communication preferences</li>
            </ul>

            <h3>2.2 Usage Data</h3>
            <p>We automatically collect certain information when you use our Service:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage patterns (pages viewed, time spent, features used)</li>
              <li>Location data (with your permission)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for various purposes:</p>
            <ul>
              <li>To provide, maintain, and improve our Service</li>
              <li>To process transactions and send related information</li>
              <li>To send you updates, promotional materials, and other information</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To monitor and analyze usage patterns and trends</li>
              <li>To detect, prevent, and address technical issues and security threats</li>
              <li>To personalize your experience and deliver relevant content</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2>4. Information Sharing and Disclosure</h2>
            
            <h3>4.1 Business Partners</h3>
            <p>
              Business information you provide may be displayed publicly on our platform to help users discover and 
              connect with local businesses.
            </p>

            <h3>4.2 Service Providers</h3>
            <p>
              We may share your information with third-party service providers who perform services on our behalf, 
              such as payment processing, data analysis, email delivery, and customer service.
            </p>

            <h3>4.3 Legal Requirements</h3>
            <p>
              We may disclose your information if required to do so by law or in response to valid requests by 
              public authorities.
            </p>

            <h3>4.4 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred to the 
              acquiring entity.
            </p>
          </section>

          <Separator />

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
              over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <Separator />

          <section>
            <h2>6. Your Rights and Choices</h2>
            <p>You have certain rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> You can request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> You can update or correct your information through your account settings</li>
              <li><strong>Deletion:</strong> You can request deletion of your personal information</li>
              <li><strong>Opt-out:</strong> You can opt-out of marketing communications at any time</li>
              <li><strong>Data Portability:</strong> You can request a copy of your data in a portable format</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. 
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
              if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
            <p>
              For more information about our use of cookies, please see our Cookie Policy.
            </p>
          </section>

          <Separator />

          <section>
            <h2>8. Third-Party Links</h2>
            <p>
              Our Service may contain links to third-party websites. We are not responsible for the privacy practices 
              or content of these third-party sites. We encourage you to read the privacy policies of any third-party 
              sites you visit.
            </p>
          </section>

          <Separator />

          <section>
            <h2>9. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under the age of 13. We do not knowingly collect personal 
              information from children under 13. If you become aware that a child has provided us with personal 
              information, please contact us.
            </p>
          </section>

          <Separator />

          <section>
            <h2>10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and maintained on computers located outside of your state, province, 
              country, or other governmental jurisdiction where data protection laws may differ. We will take all steps 
              reasonably necessary to ensure that your data is treated securely.
            </p>
          </section>

          <Separator />

          <section>
            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <Separator />

          <section>
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
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
