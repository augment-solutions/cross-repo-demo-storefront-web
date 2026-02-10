import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Checkout',
  description: 'Complete your purchase',
};

export default function CheckoutPage() {
  // Redirect to the first step of checkout
  redirect('/checkout/shipping');
}

