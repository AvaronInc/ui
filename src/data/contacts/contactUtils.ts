
import { Contact, ContactsFilter, ContactCategory } from '@/types/contacts';

// Helper function to filter contacts
export const filterContacts = (contacts: Contact[], filters: any): Contact[] => {
  return contacts.filter(contact => {
    // Filter by search query
    if (filters.search && !contact.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Filter by categories
    if (filters.categories && filters.categories.length > 0 && !filters.categories.includes(contact.category)) {
      return false;
    }
    
    // Filter by favorites
    if (filters.favorites && !contact.isFavorite) {
      return false;
    }
    
    // Filter by warranty status (for tech-support contacts)
    if (filters.warrantyStatus && filters.warrantyStatus.length > 0 && contact.category === 'tech-support') {
      const techContact = contact as any;
      if (!techContact.warrantyStatus || !filters.warrantyStatus.includes(techContact.warrantyStatus)) {
        return false;
      }
    }
    
    // Filter by department (for internal contacts)
    if (filters.departments && filters.departments.length > 0) {
      if (contact.category === 'internal') {
        const internalContact = contact as any;
        if (!filters.departments.includes(internalContact.department)) {
          return false;
        }
      } else if (contact.category === 'emergency') {
        const emergencyContact = contact as any;
        if (emergencyContact.department && !filters.departments.includes(emergencyContact.department)) {
          return false;
        }
      } else {
        return false;
      }
    }
    
    // Filter by service type (for ISP contacts)
    if (filters.serviceTypes && filters.serviceTypes.length > 0 && contact.category === 'isp') {
      const ispContact = contact as any;
      if (!filters.serviceTypes.includes(ispContact.serviceType)) {
        return false;
      }
    }
    
    return true;
  });
};

// Get recent contacts (last 5 accessed)
export const getRecentContacts = (contacts: Contact[]): Contact[] => {
  return [...contacts]
    .filter(contact => contact.lastAccessed)
    .sort((a, b) => {
      if (!a.lastAccessed || !b.lastAccessed) return 0;
      return b.lastAccessed.getTime() - a.lastAccessed.getTime();
    })
    .slice(0, 5);
};

// Get favorite contacts
export const getFavoriteContacts = (contacts: Contact[]): Contact[] => {
  return contacts.filter(contact => contact.isFavorite);
};

// Get contacts by category
export const getContactsByCategory = (contacts: Contact[], category: ContactCategory): Contact[] => {
  return contacts.filter(contact => contact.category === category);
};

// Generate random date in the last 2 years
export const randomDate = () => {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 2);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate random future date within next 3 years
export const randomFutureDate = () => {
  const start = new Date();
  const end = new Date();
  end.setFullYear(end.getFullYear() + 3);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
