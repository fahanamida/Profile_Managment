import { Routes } from '@angular/router';
import { Home } from './home/home';
import {CreateProfile} from './create-profile/create-profile'
import { UpdateProfile } from './update-profile/update-profile';

export const routes: Routes = [
    {path:'',component:Home,title:'Home'},
    {path:'create',component:CreateProfile,title:'Create'},
    {path:'update/:id',component:UpdateProfile,title:'Update'}
];
