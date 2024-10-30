import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Post } from '../../posts/posts.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-edit-post-dialog',
  template: `
    <h2 mat-dialog-title>Edit Post</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="data.title" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Body</mat-label>
        <textarea matInput [(ngModel)]="data.body"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button color="primary" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatInputModule
  ],
})
export class EditPostDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post
  ) {}

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
