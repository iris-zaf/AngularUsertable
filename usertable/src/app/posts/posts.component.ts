import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator'; // Import paginator
import { ViewChild } from '@angular/core'; // Import ViewChild to access paginator
import { MatPaginator } from '@angular/material/paginator'; // Import MatPaginator

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    username?: string; // Optional isws argotera
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
    standalone: true,
    imports: [RouterModule, CommonModule, MatTableModule, MatInputModule, MatFormFieldModule,MatPaginatorModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule]
})
export class PostsComponent implements OnInit {
    posts: Post[] = [];
    users: User[] = [];
    loading: boolean = true;
    displayedColumns: string[] = ['id', 'username', 'title', 'body', 'delete'];
    dataSource = new MatTableDataSource<Post>(this.posts);
@ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.loading = true;
        this.loadUsersAndPosts(); // Load users and posts together
    }

    loadUsersAndPosts(): void {
        forkJoin({
            users: this.http.get<User[]>('http://jsonplaceholder.typicode.com/users'),
            posts: this.http.get<Post[]>('http://jsonplaceholder.typicode.com/posts')
        }).subscribe({
            next: ({ users, posts }) => {
                this.users = users; // Store user data
                // Combine posts with usernames
                this.posts = posts.map(post => ({
                    ...post,
                    username: this.users.find(user => user.id === post.userId)?.username // Access username property
                }));
                this.dataSource.data = this.posts; // Update data source
                this.loading = false; // Loading finished
            },
            error: (error) => {
                console.error('Error loading data:', error);
                this.loading = false; // Stop loading on error
            }
        });
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deletePost(id: number): void {
        this.posts = this.posts.filter(post => post.id !== id);
        this.dataSource.data = this.posts;
    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator; // Link paginator to data source
  }
}
