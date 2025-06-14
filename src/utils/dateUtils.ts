import { format, isToday, isTomorrow, isThisWeek, isThisYear } from 'date-fns';

export const formatEventDate = (date: Date): string => {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isThisWeek(date)) return format(date, 'EEEE');
  if (isThisYear(date)) return format(date, 'MMM d');
  return format(date, 'MMM d, yyyy');
};

export const formatEventTime = (date: Date): string => {
  return format(date, 'h:mm a');
};

export const formatFullDateTime = (date: Date): string => {
  return format(date, 'EEEE, MMMM d, yyyy \'at\' h:mm a');
};

export const getTimeUntilEvent = (date: Date): string => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} away`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} away`;
  return 'Starting soon';
};