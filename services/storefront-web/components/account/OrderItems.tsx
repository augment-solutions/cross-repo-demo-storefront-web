'use client';

import Image from 'next/image';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderItemsProps {
  items: OrderItem[];
}

export function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="relative w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
            {item.image ? (
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
            <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderItems;

