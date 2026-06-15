import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Api } from '../Service/api';
import {RouterLink} from '@angular/router'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  users: any[]= [];
  loading: boolean = false;

  constructor(
    private api: Api,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  // GET PROFILE
 getProfile() {
  this.loading = true;

  this.api.getProfile().subscribe({
    next: (res: any) => {
      console.log(res);

      this.users = res; // full array store cheyyuka
      this.loading = false;
    },
    error: (err) => {
      console.log(err);
      this.loading = false;
    }
  });
}

  // DELETE
  deleteProfile(id: string) {
  this.api.deleteProfile(id).subscribe({
    next: () => {
      this.getProfile();
    }
  });
}

editProfile(id: string) {
  this.router.navigate(['/update', id]);
}
}