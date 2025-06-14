import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Image, 
  FileText,
  Check
} from 'lucide-react';
import BasicDetails from './steps/BasicDetails';
import DateTime from './steps/DateTime';
import Location from './steps/Location';
import Attendees from './steps/Attendees';
import Media from './steps/Media';
import Review from './steps/Review';

const EventWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    date: null,
    time: null,
    endDate: null,
    endTime: null,
    location: {
      type: 'physical',
      address: '',
      coordinates: null,
      venue: '',
      onlineLink: ''
    },
    capacity: '',
    ticketType: 'free',
    ticketPrice: '',
    images: [],
    privacy: 'public',
    allowGuests: true,
    requireApproval: false
  });

  const steps = [
    { 
      id: 'basic', 
      title: 'Basic Details', 
      icon: FileText,
      component: BasicDetails 
    },
    { 
      id: 'datetime', 
      title: 'Date & Time', 
      icon: Calendar,
      component: DateTime 
    },
    { 
      id: 'location', 
      title: 'Location', 
      icon: MapPin,
      component: Location 
    },
    { 
      id: 'attendees', 
      title: 'Attendees', 
      icon: Users,
      component: Attendees 
    },
    { 
      id: 'media', 
      title: 'Media & Images', 
      icon: Image,
      component: Media 
    },
    { 
      id: 'review', 
      title: 'Review & Publish', 
      icon: Check,
      component: Review 
    }
  ];

  const updateEventData = (stepData) => {
    setEventData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Here you would save to Firebase
      console.log('Event data:', eventData);
      
      // Mock success - navigate to event details
      navigate('/my-events', { 
        state: { message: 'Event created successfully!' } 
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-gray-600 mt-2">
            Follow the steps to create your perfect event
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 ${
                    index < steps.length - 1 ? 'flex-1' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p
                        className={`text-sm font-medium ${
                          isActive ? 'text-blue-600' : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div
                        className={`h-1 rounded-full ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="text-center text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <CurrentStepComponent
            data={eventData}
            updateData={updateEventData}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Create Event</span>
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventWizard;