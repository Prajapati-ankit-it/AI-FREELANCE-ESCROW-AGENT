'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProfileFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  bio: string;
}

export default function ProfileSettings() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      bio: '',
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Profile data:', { ...data, profileImage });
      alert('Profile updated successfully!');
      // Optionally reset form on success
      // reset();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Profile Settings</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-2xl">👤</span>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profile-image-upload"
              />
              <label
                htmlFor="profile-image-upload"
                className="cursor-pointer bg-[#C89B6D] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Upload Photo
              </label>
              <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max 5MB.</p>
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            {...register('fullName', { required: 'Full name is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            {...register('phoneNumber', { 
              pattern: {
                value: /^[+]?[\d\s\-\(\)]+$/,
                message: 'Invalid phone number'
              }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all"
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            {...register('bio', { maxLength: 500 })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent outline-none transition-all resize-none"
            placeholder="Tell us about yourself..."
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            500 characters maximum
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#C89B6D] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
