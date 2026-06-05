import type { Metadata } from 'next';
import { User } from 'lucide-react';
import Placeholder from '@/components/ui/Placeholder';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Your Savya account — orders, consultations and saved pieces.',
};

export default function AccountPage() {
  return (
    <Placeholder
      icon={User}
      eyebrow="Members"
      title="Your Account"
      body="Order tracking, saved projects and consultation history will live here. Client accounts are being finalised — for anything you need now, the studio is one message away."
    />
  );
}
