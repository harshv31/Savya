import type { Metadata } from 'next';
import { Heart } from 'lucide-react';
import Placeholder from '@/components/ui/Placeholder';

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Save the Savya pieces you love.',
};

export default function WishlistPage() {
  return (
    <Placeholder
      icon={Heart}
      eyebrow="Your Edit"
      title="Your Wishlist"
      body="Tap the heart on any piece to save it here. Personal wishlists that follow you across devices are arriving soon — in the meantime, your designer can hold a private edit for you."
    />
  );
}
