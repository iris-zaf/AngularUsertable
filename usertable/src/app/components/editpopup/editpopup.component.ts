import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Post, User } from '../../posts/posts.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-edit-post-dialog',
  template: `
    <h2 mat-dialog-title>Επεξεργασία Post</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="data.title" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Body</mat-label>
        <textarea matInput [(ngModel)]="data.body"></textarea>
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Select User</mat-label>
        <mat-select [(ngModel)]="data.userId" required>
          <mat-option *ngFor="let user of users" [value]="user.id">
            {{ user.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button color="primary" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ],
})
export class EditPopUpComponent {

  users: User[] = [];
  constructor(
    public dialogRef: MatDialogRef<EditPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post & { users: User[]}
  ) {

    this.users = data.users;
  }


  isFormValid(): boolean {
    return (
      !!this.data.title &&         // Ensures title is a non-empty string
      !!this.data.body &&
      this.data.userId !== undefined
    );
  }
  onSave(): void {
    if (this.isFormValid()) {
      this.dialogRef.close(this.data);
    }
  }
}
