'use client';

import { useState } from 'react';
import { ShieldCheckIcon, KeyIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <KeyIcon className="w-6 h-6 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Password</p>
              <p className="text-sm text-gray-500">Last changed 30 days ago</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
            Change Password
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <DevicePhoneMobileIcon className="w-6 h-6 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">
                {twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              twoFactorEnabled
                ? 'text-red-600 hover:text-red-700'
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            {twoFactorEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <ShieldCheckIcon className="w-6 h-6 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Active Sessions</p>
              <p className="text-sm text-gray-500">Manage your active sessions</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
            View Sessions
          </button>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettings;

