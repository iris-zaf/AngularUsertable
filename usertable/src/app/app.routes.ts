import { Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component'; // Adjust the path if necessary

export const routes: Routes = [
    { path: '', redirectTo: '/posts', pathMatch: 'full' },
    { path: 'posts', component: PostsComponent },
    // You can add more routes as needed
];

