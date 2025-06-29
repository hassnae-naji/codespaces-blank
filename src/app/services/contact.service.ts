import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      company: 'Example Corp',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '098-765-4321',
      company: 'Test Inc',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor() { }

  getContacts(): Observable<Contact[]> {
    return of(this.contacts).pipe(delay(500)); // Simulate API call
  }

  getContact(id: string): Observable<Contact | undefined> {
    const contact = this.contacts.find(c => c.id === id);
    return of(contact).pipe(delay(500)); // Simulate API call
  }

  addContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Observable<Contact> {
    const newContact: Contact = {
      ...contact,
      id: Math.random().toString(36).substring(2),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.contacts.push(newContact);
    return of(newContact).pipe(delay(500)); // Simulate API call
  }

  updateContact(id: string, updatedContact: Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>>): Observable<Contact | undefined> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contacts[index] = { ...this.contacts[index], ...updatedContact, updatedAt: new Date() };
      return of(this.contacts[index]).pipe(delay(500)); // Simulate API call
    }
    return of(undefined).pipe(delay(500));
  }

  deleteContact(id: string): Observable<boolean> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      return of(true).pipe(delay(500)); // Simulate API call
    }
    return of(false).pipe(delay(500));
  }
}
