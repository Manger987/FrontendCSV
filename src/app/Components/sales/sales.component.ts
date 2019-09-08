import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { salesInterface } from 'src/app/Models/sales'
import { itemInterface } from 'src/app/Models/items'
import { userInterface } from 'src/app/Models/users';
import { DataSaleService } from 'src/app/Services/data-sale.service'
import { DataItemService } from './../../Services/data-item.service';
import { map } from 'rxjs/operators';
import { DataLoginService } from './../../Services/data-login.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(
    private saleService: DataSaleService,
    private itemService:DataItemService,
    private loginService: DataLoginService
  ) { }
  private sales:salesInterface[]; 
  private soldQuantities: number[] = [];
  private chart: any[];
  private items:itemInterface[];
  public userLogged:userInterface;

  @ViewChild('lineCanvas',{static:true}) lineCanvas;
   lineChart;
   @ViewChild('lineCanvasByItem',{static:true}) lineCanvasByItem;
   lineChartByItem; 
   @ViewChild('lineCanvasUltimas',{static:true}) lineCanvasUltimas;
   lineChartUltimas; 
  ngOnInit() {
    this.userLogged = this.loginService.getUserLoggedIn();
    this.saleService.getAllSalles(this.userLogged.usuario).subscribe(sales => {
      this.sales = sales;
      let fechas = sales.map(res => res.fecha)
      let invoicedAmount = sales.map(res => res.invoicedAmount)
      let cantidad = sales.map(res => res.cantidad)

    this.lineChart =  new Chart(this.lineCanvas.nativeElement, {
      type: 'bar',
      data: {
          datasets: [{
              label: 'cantidad vendidas',
              data: cantidad,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              type: 'bar'
          }, {
              label: 'total vendidos',
              data: invoicedAmount,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              type: 'bar'
          }],
          labels: fechas
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    })  
  });

  this.getItems();
  }

  getItems(){
    this.itemService.getAllItems().subscribe(items => {
      this.items = items
    })
  }
  onChargeChartItem(item){
    this.itemService.getItemById(this.userLogged.usuario,item).subscribe(salesItem => {
      let fechas = salesItem.map(res => res.fecha)
      let invoicedAmount = salesItem.map(res => res.invoicedAmount)
      let cantidad = salesItem.map(res => res.cantidad)
      this.lineChartByItem = new Chart(this.lineCanvasByItem.nativeElement, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'cantidad vendidas',
                data: cantidad,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                type: 'line'
            }, {
                label: 'total vendidos',
                data: invoicedAmount,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                type: 'bar'
            }],
            labels: fechas
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
      })  
    })
  }

  onChargeChartUltimas(){
    this.itemService.getLastSales().subscribe(sales => {
      let fechas = sales.map(res => res.fecha)
      let invoicedAmount = sales.map(res => this.calculateValues(res.item_id.precio , res.cantidad))
      let cantidad = sales.map(res => res.cantidad)
      this.lineChartUltimas = new Chart(this.lineCanvasUltimas.nativeElement, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'cantidad vendidas',
                data: cantidad,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                type: 'line'
            }, {
                label: 'total vendidos',
                data: invoicedAmount,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                type: 'bar'
            }],
            labels: fechas
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
      })  
    })
  }

  calculateValues(precio,cantidad){
    return (parseInt(precio) * parseInt(cantidad))
  } 
 
}
