import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostsComponent,MatToolbarModule,MatIconModule,ThemeToggleComponent,MatTooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
