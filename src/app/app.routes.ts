// Importación del módulo de rutas de Angular
import { Routes } from '@angular/router';
// Importación de los componentes HomeComponent y GameComponent
import { HomeComponent } from './Pages/home/home.component';
import { GameComponent } from './Pages/game/game.component';

// Definición de las rutas de la aplicación
export const routes: Routes = [
    // Ruta por defecto, muestra el componente HomeComponent
    { path: "", component: HomeComponent },
    // Ruta para el componente HomeComponent
    { path: "home", component: HomeComponent },
    // Ruta para el componente GameComponent, con un parámetro de ruta ":id" para identificar el juego
    { path: "game/:id", component: GameComponent },
];
