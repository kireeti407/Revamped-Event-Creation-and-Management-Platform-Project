import React, { useState } from 'react';
import { Upload, Mail, X, Plus } from 'lucide-react';
import { EventFormData } from '../../../types';
import { uploadToCloudinary } from '../../../services/cloudinary';
import toast from 'react-hot-toast';

interface MediaInvitesStepProps {
  formData: EventFormData;
  onChange: (updates: Partial<EventFormData>) => void;
}

const MediaInvitesStep: React.FC<MediaInvitesStepProps> = ({ formData, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const response = await uploadToCloudinary(file);
      onChange({ bannerImage: response.secure_url });
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleAddEmail = () => {
    if (newEmail && isValidEmail(newEmail) && !formData.inviteEmails.includes(newEmail)) {
      onChange({ inviteEmails: [...formData.inviteEmails, newEmail] });
      setNewEmail('');
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    onChange({ inviteEmails: formData.inviteEmails.filter(email => email !== emailToRemove) });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Media & Invitations</h2>
        <p className="text-gray-600">Add visuals and invite your guests</p>
      </div>

      <div className="space-y-8">
        {/* Banner Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Event Banner Image
          </label>
          
          {formData.bannerImage ? (
            <div className="relative">
              <img
                src={formData.bannerImage}
                alt="Event banner"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => onChange({ bannerImage: undefined })}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
                id="banner-upload"
              />
              <label
                htmlFor="banner-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {uploading ? 'Uploading...' : 'Click to upload banner image'}
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 5MB
                </p>
              </label>
            </div>
          )}
        </div>

        {/* Guest Invitations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Mail className="inline h-4 w-4 mr-1" />
            Invite Guests
          </label>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter email address"
              />
              <button
                onClick={handleAddEmail}
                disabled={!newEmail || !isValidEmail(newEmail)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {formData.inviteEmails.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  Invited guests ({formData.inviteEmails.length})
                </p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {formData.inviteEmails.map(email => (
                    <div
                      key={email}
                      className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">{email}</span>
                      <button
                        onClick={() => handleRemoveEmail(email)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Invitation Notes</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Invitations will be sent automatically after event creation</li>
                <li>• Guests can RSVP directly from their email invitation</li>
                <li>• You can add more guests later from the event dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900 mb-3">Event Summary</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>Title:</strong> {formData.title || 'Not set'}</p>
            <p><strong>Location:</strong> {formData.location || 'Not set'}</p>
            <p><strong>Date:</strong> {formData.date && formData.time ? `${formData.date} at ${formData.time}` : 'Not set'}</p>
            <p><strong>Visibility:</strong> {formData.isPublic ? 'Public' : 'Private'}</p>
            <p><strong>Invited Guests:</strong> {formData.inviteEmails.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaInvitesStep;