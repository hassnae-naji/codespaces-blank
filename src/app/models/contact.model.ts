export interface Contact {
  id: string; // Or number, depending on your backend
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
