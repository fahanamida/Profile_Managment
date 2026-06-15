import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Api } from '../Service/api'
import { Router } from '@angular/router';
import {RouterLink} from '@angular/router'
@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './create-profile.html',
  styleUrl: './create-profile.css',
})

export class CreateProfile {

  constructor(private api: Api,
    private router: Router
  ) { }

  isEditMode = false;
  selectedIndex: number | null = null;

  users: any[] = [];

  formUser = {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    image: ''
  };

  selectedFile: any;

  // ADD
  addProfile() {

    const formData = new FormData();

    formData.append('name', this.formUser.name);
    formData.append('email', this.formUser.email);
    formData.append('phoneNumber', this.formUser.phoneNumber);
    formData.append('address', this.formUser.address);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.api.addProfile(formData).subscribe({
      next: (res: any) => {

        alert('Profile Added Successfully');

        this.router.navigate(['/']); // Home page-lek pokum

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  // UPDATE
  updateProfile() {
    if (this.selectedIndex !== null) {
      this.users[this.selectedIndex] = { ...this.formUser };
      this.openAdd();
    }
  }

  // EDIT
  editProfile(i: number) {
    this.isEditMode = true;
    this.selectedIndex = i;
    this.formUser = { ...this.users[i] };
  }

  // DELETE
  deleteProfile(i: number) {
    this.users.splice(i, 1);
  }

  // RESET
  openAdd() {
    this.isEditMode = false;
    this.selectedIndex = null;

    this.formUser = {
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      image: ''
    };
  }

  // IMAGE
  onImageChange(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.formUser.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}