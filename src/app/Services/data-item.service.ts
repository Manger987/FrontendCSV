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
    return this.http.get<itemInterface[]>('http://localhost:2000/items/getItems')
  }

  getItemById(item): any {
    return this.http.get<itemInterface[]>(`http://localhost:2000/ventas/abustos/getSalesByItem/${item}`)//add option user 
  }
}
