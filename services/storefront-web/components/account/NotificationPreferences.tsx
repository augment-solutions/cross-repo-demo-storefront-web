'use client';

import { useState } from 'react';

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    { id: 'order_updates', label: 'Order Updates', description: 'Get notified about order status changes', enabled: true },
    { id: 'promotions', label: 'Promotions', description: 'Receive promotional offers and discounts', enabled: false },
    { id: 'newsletter', label: 'Newsletter', description: 'Weekly newsletter with new products', enabled: true },
    { id: 'price_alerts', label: 'Price Alerts', description: 'Get notified when items in your wishlist go on sale', enabled: true },
  ]);

  const togglePreference = (id: string) => {
    setPreferences(prev =>
      prev.map(pref =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
      <div className="space-y-4">
        {preferences.map(pref => (
          <div key={pref.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{pref.label}</p>
              <p className="text-sm text-gray-500">{pref.description}</p>
            </div>
            <button
              onClick={() => togglePreference(pref.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                pref.enabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pref.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPreferences;

