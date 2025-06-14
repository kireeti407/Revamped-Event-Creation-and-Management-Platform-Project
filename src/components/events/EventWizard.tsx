import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { EventFormData } from '../../types';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../contexts/AuthContext';
import BasicDetailsStep from './steps/BasicDetailsStep';
import LocationDateStep from './steps/LocationDateStep';
import MediaInvitesStep from './steps/MediaInvitesStep';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const EventWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    endDate: '',
    endTime: '',
    isPublic: true,
    maxAttendees: undefined,
    tags: [],
    inviteEmails: [],
  });

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Basic Details', description: 'Event name and description' },
    { id: 2, title: 'Location & Date', description: 'When and where' },
    { id: 3, title: 'Media & Invites', description: 'Images and guest list' },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormDataChange = (updates: Partial<EventFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to create an event');
      return;
    }

    // Validation
    if (!formData.title || !formData.description || !formData.location || !formData.date || !formData.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const eventId = await eventService.createEvent(formData, currentUser.id);
      toast.success('Event created successfully!');
      navigate(`/event/${eventId}`);
    } catch (error) {
      toast.error('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicDetailsStep
            formData={formData}
            onChange={handleFormDataChange}
          />
        );
      case 2:
        return (
          <LocationDateStep
            formData={formData}
            onChange={handleFormDataChange}
          />
        );
      case 3:
        return (
          <MediaInvitesStep
            formData={formData}
            onChange={handleFormDataChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-gray-600 mt-1">Follow the steps to create your perfect event</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-200
                      ${currentStep >= step.id
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 text-gray-500'
                      }
                    `}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div
                    className={`
                      flex-1 h-0.5 mx-6 transition-colors duration-200
                      ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous
          </button>

          <div className="flex space-x-3">
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Next
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? 'Creating...' : 'Create Event'}
                <Check className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventWizard;