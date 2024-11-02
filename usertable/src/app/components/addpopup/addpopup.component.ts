import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../posts/posts.component';
@Component({
  selector: 'app-addpopup',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatSelectModule,MatDialogModule],
  template: `
   <h2 mat-dialog-title>Add A New Post</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="title" required />
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Body</mat-label>
        <textarea matInput [(ngModel)]="body" required></textarea>
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Select User</mat-label>
        <mat-select [(ngModel)]="userId" required>
          <mat-option *ngFor="let user of users" [value]="user.id">
            {{ user.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button color="primary" (click)="onSave()" [disabled]="!isFormValid()">Save</button>
    </mat-dialog-actions>
  `,
  styleUrl: './addpopup.component.css'
})
export class AddpopupComponent {
  title: string = '';
  body: string = '';
  userId: number | null = null;
  users: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { users: User[] }
  ) {
    this.users = data.users;
  }

  isFormValid(): boolean {
    return !!this.title && !!this.body && this.userId !== null;
  }

  onSave(): void {
    if (this.isFormValid()) {
      this.dialogRef.close({ title: this.title, body: this.body, userId: this.userId });
    }
  }
}
