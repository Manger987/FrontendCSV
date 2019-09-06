import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { salesInterface } from 'src/app/Models/sales'
import { itemInterface } from 'src/app/Models/items'
import { DataSaleService } from 'src/app/Services/data-sale.service'
import { DataItemService } from './../../Services/data-item.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(
    private saleService: DataSaleService,
    private itemService:DataItemService
  ) { }
  private sales:salesInterface[]; 
  private soldQuantities: number[] = [];
  private chart: any[];
  private items:itemInterface[];
  @ViewChild('lineCanvas',{static:true}) lineCanvas;
   lineChart;
   @ViewChild('lineCanvasByItem',{static:true}) lineCanvasByItem;
   lineChartByItem; 
  ngOnInit() {

    this.saleService.getAllSalles().subscribe(sales => {
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
    this.itemService.getItemById(item).subscribe(salesItem => {
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
 
}
