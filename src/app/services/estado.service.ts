import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private baseUrl = 'http://localhost:8080/estados';

  constructor(private httpClient: HttpClient) { }

  getEstados(): Observable<Estado[]> {
    return this.httpClient.get<Estado[]>(this.baseUrl);
  }

  buscarPorId(id: string): Observable<Estado> {
    return this.httpClient.get<Estado>(`${this.baseUrl}/${id}`);
  }

  incluir(estado: any): Observable<Estado> {
    return this.httpClient.post<Estado>(this.baseUrl, estado);
  }

  alterar(estado: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${estado.id}`, estado);
  }

  excluir(estado: Estado): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${estado.id}`);
  }

}
