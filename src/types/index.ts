export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  date: Date;
  endDate?: Date;
  bannerImage?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  maxAttendees?: number;
  tags: string[];
  rsvps: RSVP[];
}

export interface RSVP {
  userId: string;
  userName: string;
  userEmail: string;
  userPhoto?: string;
  status: 'attending' | 'maybe' | 'not-attending' | 'pending';
  respondedAt?: Date;
  notes?: string;
}

export interface EventFormData {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  endDate?: string;
  endTime?: string;
  isPublic: boolean;
  maxAttendees?: number;
  tags: string[];
  inviteEmails: string[];
}

export interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}