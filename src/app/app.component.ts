import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { GetGamesComponent } from './components/get-games/get-games.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GamesApp';
}
