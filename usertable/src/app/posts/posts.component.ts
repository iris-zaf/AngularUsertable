import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Post {
    id: number;
    username: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
    standalone: true,
    imports: [RouterModule,CommonModule,MatTableModule,MatInputModule,MatFormFieldModule ]
})
export class PostsComponent implements OnInit {
    posts: Post[] = [];
    displayedColumns: string[] = ['id', 'username', 'title', 'description'];
    dataSource = new MatTableDataSource<Post>(this.posts);

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.loadPosts();
    }

    loadPosts(): void {
        this.http.get<Post[]>('assets/posts.json').subscribe({
            next: (data) => {
                this.posts = data;
                this.dataSource.data = this.posts;
            },
            error: (error) => {
                console.error('Error loading posts:', error);
            }
        });
    }
    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
