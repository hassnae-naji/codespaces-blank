import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  isEditMode = false;
  contactId: string | null = null;
  isLoading = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.contactId;
    this.initForm();

    if (this.isEditMode && this.contactId) {
      this.loadContactData(this.contactId);
    }
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      company: ['']
    });
  }

  loadContactData(id: string): void {
    this.isLoading = true;
    this.contactService.getContact(id).subscribe({
      next: (contact) => {
        if (contact) {
          this.contactForm.patchValue(contact);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading contact:', err);
        this.error = 'Failed to load contact details.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      this.contactForm.markAllAsTouched(); // Mark fields as touched to show errors
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.successMessage = null;
    const contactData = this.contactForm.value;

    if (this.isEditMode && this.contactId) {
      this.contactService.updateContact(this.contactId, contactData).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Contact updated successfully!';
          setTimeout(() => this.router.navigate(['/contacts']), 1500);
        },
        error: (err) => {
          console.error('Error updating contact:', err);
          this.error = 'Failed to update contact.';
          this.isLoading = false;
        }
      });
    } else {
      this.contactService.addContact(contactData).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Contact added successfully!';
          this.contactForm.reset();
          setTimeout(() => this.router.navigate(['/contacts']), 1500);
        },
        error: (err) => {
          console.error('Error adding contact:', err);
          this.error = 'Failed to add contact.';
          this.isLoading = false;
        }
      });
    }
  }

  get f() { return this.contactForm.controls; }
}
