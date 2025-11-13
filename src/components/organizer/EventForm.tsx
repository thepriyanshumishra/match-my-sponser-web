'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { GlassButton } from '@/components/shared/GlassButton';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { EventCategory } from '@/types/event';

interface EventFormData {
  name: string;
  category: EventCategory | '';
  location: string;
  audienceSize: string;
  date: string;
  description: string;
  sponsorshipRequirements: string;
  banner?: File;
}

interface EventFormErrors {
  name?: string;
  category?: string;
  location?: string;
  audienceSize?: string;
  date?: string;
  description?: string;
  sponsorshipRequirements?: string;
}

interface EventFormProps {
  onSubmit: (data: EventFormData) => Promise<void>;
  onCancel?: () => void;
}

const categoryOptions = [
  { value: '', label: 'Select a category' },
  { value: 'college-fest', label: 'College Fest' },
  { value: 'competition', label: 'Competition' },
  { value: 'sports', label: 'Sports' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'workshop', label: 'Workshop' },
];

export function EventForm({ onSubmit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    category: '',
    location: '',
    audienceSize: '',
    date: '',
    description: '',
    sponsorshipRequirements: '',
  });

  const [errors, setErrors] = useState<EventFormErrors>({});
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof EventFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, banner: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBanner = () => {
    setFormData((prev) => ({ ...prev, banner: undefined }));
    setBannerPreview(null);
  };

  const validateForm = (): boolean => {
    const newErrors: EventFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.audienceSize) {
      newErrors.audienceSize = 'Audience size is required';
    } else if (parseInt(formData.audienceSize) <= 0) {
      newErrors.audienceSize = 'Audience size must be a positive number';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Event date must be in the future';
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.sponsorshipRequirements.trim()) {
      newErrors.sponsorshipRequirements = 'Sponsorship requirements are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <GlassCard padding="lg">
        <div className="space-y-8">
          {/* Form Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Details</h2>
            <p className="text-gray-600">Fill in the information about your event</p>
          </div>

          {/* Basic Information Section */}
          <div className="space-y-6">
            <div className="border-b border-white/30 pb-2">
              <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
            </div>

            <Input
              label="Event Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Tech Innovation Summit 2024"
              error={errors.name}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={categoryOptions}
                error={errors.category}
                required
              />

              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., San Francisco, CA"
                error={errors.location}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Expected Audience Size"
                name="audienceSize"
                type="number"
                value={formData.audienceSize}
                onChange={handleInputChange}
                placeholder="e.g., 500"
                error={errors.audienceSize}
                min="1"
                required
              />

              <Input
                label="Event Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                error={errors.date}
                required
              />
            </div>
          </div>

          {/* Event Description Section */}
          <div className="space-y-6">
            <div className="border-b border-white/30 pb-2">
              <h3 className="text-lg font-semibold text-gray-800">Event Description</h3>
            </div>

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your event, its purpose, and what makes it unique..."
              error={errors.description}
              rows={5}
              required
            />

            <Textarea
              label="Sponsorship Requirements"
              name="sponsorshipRequirements"
              value={formData.sponsorshipRequirements}
              onChange={handleInputChange}
              placeholder="What are you looking for in a sponsor? What benefits can you offer?"
              error={errors.sponsorshipRequirements}
              rows={4}
              required
            />
          </div>

          {/* Event Banner Section */}
          <div className="space-y-6">
            <div className="border-b border-white/30 pb-2">
              <h3 className="text-lg font-semibold text-gray-800">Event Banner (Optional)</h3>
            </div>

            {bannerPreview ? (
              <div className="relative">
                <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <button
                  type="button"
                  onClick={removeBanner}
                  className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <label className="block">
                <div className="border-2 border-dashed border-white/40 rounded-2xl p-12 text-center cursor-pointer hover:border-[#667eea]/50 hover:bg-white/10 transition-all">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-700 font-medium mb-2">
                    Click to upload event banner
                  </p>
                  <p className="text-sm text-gray-600">
                    PNG, JPG up to 10MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/30">
            {onCancel && (
              <GlassButton
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </GlassButton>
            )}
            <GlassButton
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Event...' : 'Create Event'}
            </GlassButton>
          </div>
        </div>
      </GlassCard>
    </form>
  );
}
