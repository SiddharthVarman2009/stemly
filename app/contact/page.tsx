'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const roleOptions = [
  'Nonprofit Organization',
  'Community Organization',
  'Library',
  'Volunteer',
  'Donor',
  'Parent/Guardian',
  'Teacher/Educator',
  'Business/Corporate Sponsor',
  'Student',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ fullName: '', email: '', phone: '', organization: '', role: '', message: '' });
      toast.success("Message sent! We’ll get back to you soon.");
    }, 800);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-stemly-teal mb-3">
          Work With Us
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Partner with STEMLY</h1>
        <p className="text-zinc-600 text-lg leading-relaxed mb-10">
          We&apos;re always looking to collaborate with schools, nonprofits, libraries, churches,
          community centers, youth organizations, and businesses that share our mission of increasing
          children&apos;s exposure to STEM. Whether you&apos;re interested in distributing kits,
          hosting a workshop, or partnering on a community initiative, we&apos;d love to hear from
          you.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Jane Smith"
              required
              className="text-lg py-4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
              className="text-lg py-4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="(610) 000-0000"
              className="text-lg py-4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization Name (Optional)</Label>
            <Input
              id="organization"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              placeholder="West Chester Library"
              className="text-lg py-4"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="role">I am a...</Label>
            <Select
              value={form.role}
              onValueChange={(val) => setForm((prev) => ({ ...prev, role: val ?? '' }))}
            >
              <SelectTrigger id="role" className="text-lg py-3" />
              <SelectContent>
                {roleOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your organization and how you'd like to partner..."
              rows={7}
              required
              className="text-lg py-6"
            />
          </div>

          <div className="sm:col-span-2">
            <Button
              type="submit"
              disabled={submitting}
              className="bg-stemly-teal hover:bg-stemly-teal/90 text-white px-12 py-4 rounded-full font-semibold text-lg"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
