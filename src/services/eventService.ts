import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Event, RSVP, EventFormData } from '../types';

const EVENTS_COLLECTION = 'events';

export const eventService = {
  async createEvent(eventData: EventFormData, userId: string): Promise<string> {
    try {
      const event = {
        ...eventData,
        date: new Date(eventData.date + 'T' + eventData.time),
        endDate: eventData.endDate && eventData.endTime 
          ? new Date(eventData.endDate + 'T' + eventData.endTime)
          : undefined,
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        rsvps: [],
      };

      const docRef = await addDoc(collection(db, EVENTS_COLLECTION), event);
      return docRef.id;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async getEvents(userId?: string): Promise<Event[]> {
    try {
      let q = query(
        collection(db, EVENTS_COLLECTION),
        orderBy('date', 'desc')
      );

      if (userId) {
        q = query(
          collection(db, EVENTS_COLLECTION),
          where('createdBy', '==', userId),
          orderBy('date', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as Event[];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async getEvent(eventId: string): Promise<Event | null> {
    try {
      const docRef = doc(db, EVENTS_COLLECTION, eventId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          date: data.date.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Event;
      }
      return null;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  },

  async updateEvent(eventId: string, updates: Partial<Event>): Promise<void> {
    try {
      const docRef = doc(db, EVENTS_COLLECTION, eventId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  async deleteEvent(eventId: string): Promise<void> {
    try {
      const docRef = doc(db, EVENTS_COLLECTION, eventId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  async updateRSVP(eventId: string, rsvp: RSVP): Promise<void> {
    try {
      const event = await this.getEvent(eventId);
      if (!event) throw new Error('Event not found');

      const existingRSVPIndex = event.rsvps.findIndex(r => r.userId === rsvp.userId);
      const updatedRSVPs = [...event.rsvps];

      if (existingRSVPIndex >= 0) {
        updatedRSVPs[existingRSVPIndex] = { ...rsvp, respondedAt: new Date() };
      } else {
        updatedRSVPs.push({ ...rsvp, respondedAt: new Date() });
      }

      await this.updateEvent(eventId, { rsvps: updatedRSVPs });
    } catch (error) {
      console.error('Error updating RSVP:', error);
      throw error;
    }
  },
};