// Importaciones de Angular y Angular Material necesarias para el componente
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service'; // Servicio para gestionar los juegos
import { error } from 'console'; // Importación del objeto error de la consola estándar de JavaScript
import { Game } from '../../Models/Game'; // Importación de la interfaz Game
import { Router } from '@angular/router'; // Servicio para la navegación entre componentes

@Component({
  selector: 'app-game', // Selector del componente
  standalone: true, // Indica que este componente no tiene dependencias de otros componentes externos
  imports: [ // Importaciones de módulos necesarios para el componente
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './game.component.html', // Ruta de la plantilla HTML del componente
  styleUrl: './game.component.css', // Ruta del archivo de estilos del componente
})
export class GameComponent implements OnInit {
  @Input('id') id!: number; // Propiedad de entrada para el identificador del juego

  private gameService = inject(GameService); // Servicio para interactuar con la lógica de negocio relacionada con los juegos
  public formBuild = inject(FormBuilder); // Construye formularios reactivos
  
  // Formulario reactivo para la creación o edición de un juego
  public formGame: FormGroup = this.formBuild.group({
    name: [''], // Campo para el nombre del juego
    description: [''], // Campo para la descripción del juego
    imgUrl: [''], // Campo para la URL de la imagen del juego
  });

  constructor(private router: Router) {} // Constructor del componente con inyección del servicio Router

  ngOnInit(): void {
    // Método del ciclo de vida que se ejecuta después de que Angular haya inicializado las propiedades del componente
    // Se verifica si el id es diferente de cero para cargar los datos del juego correspondiente en el formulario
    if (this.id != 0) {
      this.gameService.getGamesById(this.id).subscribe({
        next: (data) => {
          // Se llenan los campos del formulario con los datos del juego
          this.formGame.patchValue({
            name: data.data.name,
            description: data.data.description,
            imgUrl: data.data.imgUrl,
          });
        },
        error: (err) => {
          console.log(err.message); // Manejo de errores
        },
      });
    }
  }

  save() {
    // Método para guardar un juego
    console.log(this.id);
    const objeto: Game = { // Se crea un objeto de tipo Game con los datos del formulario
      id: this.id,
      name: this.formGame.value.name,
      description: this.formGame.value.description,
      imgUrl: this.formGame.value.imgUrl,
    };
    if (this.id == 0) {
      // Si el id es cero, se crea un nuevo juego
      this.gameService.createGame(objeto).subscribe({
        next: (data) => {
          // Manejo de la respuesta del servicio
          if (data.ok) {
            this.router.navigate(['/']); // Navegación a la página principal
          } else {
            alert('Error al crear el juego'); // Alerta en caso de error
          }
        },
        error: (err) => {
          console.log(err.message); // Manejo de errores
        },
      });
    } else {
      // Si el id no es cero, se actualiza un juego existente
      this.gameService.updateGame(objeto).subscribe({
        next: (data) => {
          // Manejo de la respuesta del servicio
          if (data.ok) {
            this.router.navigate(['/']); // Navegación a la página principal
          } else {
            alert('Error al editar el juego'); // Alerta en caso de error
          }
        },
        error: (err) => {
          console.log(err.message); // Manejo de errores
        },
      });
    }
  }

  back() {
    // Método para navegar de regreso a la página principal
    this.router.navigate(['/']);
  }
}
