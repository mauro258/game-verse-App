// Importaciones de Angular y Angular Material necesarias para el componente
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table'
import { GameService } from '../../services/game.service'; // Servicio para gestionar los juegos
import { Game } from '../../Models/Game'; // Importación de la interfaz Game
import { Router } from '@angular/router'; // Servicio para la navegación entre componentes
import { NavBarComponent } from '../../Components/nav-bar/nav-bar.component'; // Componente de barra de navegación

@Component({
  selector: 'app-home', // Selector del componente
  standalone: true, // Indica que este componente no tiene dependencias de otros componentes externos
  imports: [MatCardModule, MatIconModule, MatButtonModule,MatTableModule,NavBarComponent], // Importaciones de módulos necesarios para el componente
  templateUrl: './home.component.html', // Ruta de la plantilla HTML del componente
  styleUrl: './home.component.css', // Ruta del archivo de estilos del componente
})
export class HomeComponent {
  private gameService = inject(GameService); // Servicio para interactuar con la lógica de negocio relacionada con los juegos
  public listGames: Game[] = []; // Lista de juegos
  public displayedColumns: string[] = ['name','description','imgUrl']; // Columnas a mostrar en la tabla

  // Método para obtener la lista de juegos
  getGames() {
    this.gameService.getGames().subscribe({
      next: (data) => {
        if (data.data.length > 0) {
          this.listGames = data.data; // Se asigna la lista de juegos obtenida del servicio
        }
      },
      error: (err) => {
        console.log(err); // Manejo de errores
      },
    });
  }

  constructor(private router: Router) {
    this.getGames(); // Se llama al método getGames al inicializar el componente para obtener la lista de juegos
  }

  // Método para agregar un nuevo juego
  add() {
    this.router.navigate(['/game', 0]); // Navega a la ruta para agregar un nuevo juego
  }

  // Método para editar un juego existente
  edit(objeto: Game) {
    this.router.navigate(['/game', objeto.id]); // Navega a la ruta para editar el juego con el id proporcionado
  }

  // Método para eliminar un juego
  delete(objeto: Game) {
    if (confirm('Desea eliminar el juego' + objeto.name)) {
      // Se muestra un mensaje de confirmación antes de eliminar el juego
      this.gameService.deleteGame(objeto.id).subscribe({
        next: (data) => {
          if (data.ok) {
            this.getGames(); // Se actualiza la lista de juegos después de eliminar uno
          } else {
            alert('No se pudo eliminar el juego'); // Alerta en caso de error
          }
        },
        error: (err) => {
          console.log(err); // Manejo de errores
        },
      });
    }
  }
}
