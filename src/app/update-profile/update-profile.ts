import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../Service/api';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.css'
})
export class UpdateProfile implements OnInit {

  id: string = '';
  selectedFile: any;

  user: any = {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    image: ''
  };

  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

  this.id = this.route.snapshot.params['id'];

  this.api.getSingleProfile(this.id).subscribe({
    next: (res: any) => {
      console.log(res);

      // API response user object aanenkil
      this.user = res;
    },
    error: (err) => {
      console.log(err);
    }
  });

}

  onImageChange(event: any) {

    if (event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];

      const reader = new FileReader();

      reader.onload = () => {
        this.user.image = reader.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  updateProfile() {

    const formData = new FormData();

    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('phoneNumber', this.user.phoneNumber);
    formData.append('address', this.user.address);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.api.updateProfile(this.id, formData).subscribe({
      next: (res: any) => {
        alert('Profile Updated Successfully');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
}