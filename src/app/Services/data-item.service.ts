import { Injectable } from '@angular/core';
import { itemInterface } from 'src/app/Models/items'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataItemService {

  constructor(private http: HttpClient) { }
  private items: Observable<itemInterface[]>;

  getAllItems(): Observable<itemInterface[]> {
    return this.http.get<itemInterface[]>('https://backendcsv.herokuapp.com/items/')
  }

  getItemById(usuario,item): any {
    return this.http.get<itemInterface[]>(`https://backendcsv.herokuapp.com/ventas/${usuario}/getSalesByItem/${item}`)//add option user 
  }

  getLastSales(): any {
    return this.http.get<itemInterface[]>(`https://backendcsv.herokuapp.com/ventas/`)//add option user 
  }
}
