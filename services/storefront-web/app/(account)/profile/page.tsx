'use client';

import { useCallback } from 'react';
import { ProfileForm } from '@/components/account/ProfileForm';
import { PasswordChangeForm } from '@/components/account/PasswordChangeForm';
import { NotificationPreferences } from '@/components/account/NotificationPreferences';
import { Skeleton } from '@/components/common/Skeleton';
import { useUser } from '@/hooks/useUser';
import type { UpdateProfileData } from '@/types/user';

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useUser();

  const handleUpdateProfile = useCallback(async (data: UpdateProfileData): Promise<void> => {
    await updateProfile(data);
  }, [updateProfile]);

  if (!user) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">My Profile</h1>
          <p className="mt-1 text-secondary-600">
            Manage your personal information and preferences
          </p>
        </div>
        <Skeleton className="h-64" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">My Profile</h1>
        <p className="mt-1 text-secondary-600">
          Manage your personal information and preferences
        </p>
      </div>

      <section className="rounded-lg border border-secondary-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-secondary-900">
          Personal Information
        </h2>
        <div className="mt-6">
          <ProfileForm user={user} onSubmit={handleUpdateProfile} isLoading={isLoading} />
        </div>
      </section>

      <section className="rounded-lg border border-secondary-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-secondary-900">
          Change Password
        </h2>
        <div className="mt-6">
          <PasswordChangeForm />
        </div>
      </section>

      <section className="rounded-lg border border-secondary-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-secondary-900">
          Notification Preferences
        </h2>
        <div className="mt-6">
          <NotificationPreferences />
        </div>
      </section>
    </div>
  );
}

