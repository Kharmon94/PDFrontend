import { useState } from 'react';
import { Users, MapPin, Mail, Phone, Building, FileText, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

export function DistributionPartner() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    communitySize: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast('Success! Your application has been submitted.', {
      description: 'Our team will review your application and get back to you soon.',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardContent className="pt-12 pb-12">
            <CheckCircle className="w-16 h-16 text-gray-900 mx-auto mb-4" />
            <h2 className="mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in becoming a distribution partner. Our team will
              review your application and contact you within 3-5 business days.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Submit Another Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="mb-2">Become a Distribution Partner</h1>
        <p className="text-gray-600">
          Help businesses in your community connect with customers
        </p>
      </div>

      {/* Benefits Section */}
      <div className="mb-8">
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300">
          <CardHeader>
            <CardTitle>Why Partner With Us?</CardTitle>
            <CardDescription>
              Join our network of community leaders and organizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm">Support Local Businesses</h3>
                <p className="text-sm text-gray-600">
                  Help businesses in your community grow and thrive
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-2">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm">Revenue Sharing</h3>
                <p className="text-sm text-gray-600">
                  Earn commission on every business that signs up through your community
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-2">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm">Exclusive Territory</h3>
                <p className="text-sm text-gray-600">
                  Get exclusive rights to represent us in your area
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Form */}
      <Card>
        <CardHeader>
          <CardTitle>Partner Application</CardTitle>
          <CardDescription>
            Tell us about your organization and community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Name */}
            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name *</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="organizationName"
                  placeholder="Your organization or community name"
                  value={formData.organizationName}
                  onChange={(e) => handleChange('organizationName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Organization Type */}
            <div className="space-y-2">
              <Label htmlFor="organizationType">Organization Type *</Label>
              <Select
                value={formData.organizationType}
                onValueChange={(value) => handleChange('organizationType', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chamber">Chamber of Commerce</SelectItem>
                  <SelectItem value="community">Community Organization</SelectItem>
                  <SelectItem value="business">Business Association</SelectItem>
                  <SelectItem value="municipality">Municipality/City</SelectItem>
                  <SelectItem value="nonprofit">Non-Profit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contact Name */}
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name *</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="contactName"
                  placeholder="Primary contact person"
                  value={formData.contactName}
                  onChange={(e) => handleChange('contactName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@organization.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Service Area/Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="address"
                  placeholder="City, State or Region"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Community Size */}
            <div className="space-y-2">
              <Label htmlFor="communitySize">Estimated Community/Member Size *</Label>
              <Select
                value={formData.communitySize}
                onValueChange={(value) => handleChange('communitySize', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select community size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Under 50 businesses</SelectItem>
                  <SelectItem value="medium">50-200 businesses</SelectItem>
                  <SelectItem value="large">200-500 businesses</SelectItem>
                  <SelectItem value="xlarge">500+ businesses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Tell Us About Your Organization and Why You Want to Partner *
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <Textarea
                  id="description"
                  placeholder="Describe your organization, community, and goals..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="pl-10 min-h-32"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-1">What are the requirements to become a partner?</h3>
            <p className="text-sm text-gray-600">
              We look for organizations with an established presence in their community and
              connections to local businesses. This can include chambers of commerce, business
              associations, community organizations, and municipalities.
            </p>
          </div>
          <div>
            <h3 className="mb-1">How does the revenue sharing work?</h3>
            <p className="text-sm text-gray-600">
              Partners earn a percentage of subscription fees from businesses they refer to our
              platform. The exact commission structure will be discussed during the onboarding
              process.
            </p>
          </div>
          <div>
            <h3 className="mb-1">What support do you provide to partners?</h3>
            <p className="text-sm text-gray-600">
              We provide marketing materials, training, dedicated partner support, and access to
              our partner portal where you can track referrals and commissions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
