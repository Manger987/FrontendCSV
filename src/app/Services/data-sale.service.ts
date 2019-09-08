import { Injectable, Component, OnInit, OnDestroy  } from '@angular/core';
import { salesInterface } from 'src/app/Models/sales'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataSaleService {

  constructor(private http: HttpClient) { }
  private sales: Observable<salesInterface[]>;

  getAllSalles(usuario): Observable<salesInterface[]> {
    return this.http.get<salesInterface[]>('https://backendcsv.herokuapp.com/ventas/'+usuario)
  }

}
