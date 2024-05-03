// Importaciones necesarias para el servicio
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsetings'; // Importación de la configuración de la aplicación
import { Game } from '../Models/Game'; // Importación del modelo Game
import { ResponseAPI } from '../Models/ResponseAPI'; // Importación del modelo ResponseAPI
import { Observable } from 'rxjs'; // Importación de Observable de RxJS

@Injectable({
  providedIn: 'root' // Indica que este servicio está disponible en el ámbito raíz de la aplicación
})
export class GameService {

  private https = inject(HttpClient); // Cliente HTTP para realizar peticiones al servidor
  private apiUrl:string = appsettings.apiUrl + "Games"; // URL base para las operaciones relacionadas con los juegos

  // Método para obtener la lista de juegos
  getGames(): Observable<any> {
    return this.https.get<Game[]>(this.apiUrl); // Realiza una petición GET para obtener la lista de juegos
  }

  // Método para obtener un juego por su ID
  getGamesById(id:number): Observable<any> {
    return this.https.get<Game>(`${this.apiUrl}/${id}`); // Realiza una petición GET para obtener un juego por su ID
  }

  // Método para crear un nuevo juego
  createGame(objeto:Game): Observable<any> {
    return this.https.post<ResponseAPI>(this.apiUrl, objeto); // Realiza una petición POST para crear un nuevo juego
  }

  // Método para actualizar un juego existente
  updateGame(objeto: Game): Observable<any> {
    return this.https.put<ResponseAPI>(`${appsettings.apiUrl}Games/${objeto.id}`, objeto); // Realiza una petición PUT para actualizar un juego existente
  }

  // Método para eliminar un juego por su ID
  deleteGame(id:number): Observable<any> {
    return this.https.delete<ResponseAPI>(`${this.apiUrl}/${id}`); // Realiza una petición DELETE para eliminar un juego por su ID
  }

  constructor() { } // Constructor del servicio
}
