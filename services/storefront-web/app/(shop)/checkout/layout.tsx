import { CheckoutProgress } from '@/components/checkout/CheckoutProgress';

const checkoutSteps = [
  { id: 'cart', name: 'Cart', href: '/cart' },
  { id: 'shipping', name: 'Shipping', href: '/checkout/shipping' },
  { id: 'payment', name: 'Payment', href: '/checkout/payment' },
  { id: 'confirmation', name: 'Confirmation', href: '/checkout/confirmation' },
];

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-secondary-900">Checkout</h1>

      <div className="mt-6 mb-8">
        <CheckoutProgress steps={checkoutSteps} currentStep="shipping" />
      </div>

      <div>{children}</div>
    </div>
  );
}

