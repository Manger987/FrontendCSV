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

  getAllSalles(): Observable<salesInterface[]> {
    return this.http.get<salesInterface[]>('http://localhost:2000/ventas/getSalesBySeller/abustos')
  }

}
