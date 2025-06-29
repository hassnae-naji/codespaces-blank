import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.isLoading = true;
    this.error = null;
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching contacts:', err);
        this.error = 'Failed to load contacts. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  deleteContact(id: string): void {
    // Later, this will show a confirmation dialog
    if (confirm('Are you sure you want to delete this contact?')) { // Placeholder confirmation
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          this.loadContacts(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting contact:', err);
          this.error = 'Failed to delete contact.'; // Show error to user
        }
      });
    }
  }
}
