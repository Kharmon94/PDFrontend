import { ArrowLeft, Mail, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface ContactUsProps {
  onBack: () => void;
}

export function ContactUs({ onBack }: ContactUsProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Form */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you shortly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Email Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <CardTitle>Email Us</CardTitle>
              </div>
              <CardDescription>
                Send us an email and we'll respond within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a 
                href="mailto:info@preferred.deals" 
                className="text-primary hover:underline"
              >
                info@preferred.deals
              </a>
            </CardContent>
          </Card>

          {/* Support Hours Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="w-6 h-6" />
                </div>
                <CardTitle>Support Hours</CardTitle>
              </div>
              <CardDescription>
                Our team is available to assist you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Monday - Friday</p>
              <p className="text-muted-foreground">8:00 AM - 5:00 PM Mountain Time</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs Section */}
        <div className="mt-12">
          <h2 className="mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I list my business?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visit our "List Your Business" page or "Become a Partner" section in the footer. 
                  Follow the simple signup process to get your business listed on Preferred Deals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a cost to browse deals?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No! Preferred Deals is completely free for users. Browse and discover local deals 
                  without any fees or subscription required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I manage my business listing?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you're a business partner, visit the "Manage Your Listing" page to log in to 
                  your business dashboard where you can update your information, deals, and photos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are distribution partners?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Distribution partners are community organizations that help expand Preferred Deals 
                  in their local area. They can manage their own white-label platform and approve 
                  local businesses. Learn more on our "Become a Partner" page.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
