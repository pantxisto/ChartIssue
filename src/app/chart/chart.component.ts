import { Component, OnInit } from "@angular/core";
import * as Highcharts from 'highcharts/highstock';
declare var require: any;
require('highcharts/modules/export-data');
require('highcharts/modules/exporting');

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit{
  
  chart: Highcharts.Chart;
  actualSerie: any;

  constructor() {
      this.chart = undefined;
    }

  ngOnInit(): void {
    this.chart = Highcharts.stockChart('container', {

      chart: {
        width: null,
        height: null
      },
      rangeSelector: {
        selected: 4
      },
      yAxis: {
        
      },
      plotOptions: {
        series: {
          compare: 'percent',
          showInNavigator: true
        }
      },
      series: [],
    });

    const seriesPart: any = {
      name: 'serie1',
      data: [new Date().getTime(), parseFloat(50)]
    };
    this.chart.addSeries(seriesPart, true);  }

  generateData() {
    this.actualSerie = this.chart.series.filter(srie => srie.name === 'serie1')[0];
    setInterval(() => {
      const timestamp = new Date().getTime();
      const value = Math.floor(Math.random() * 250) + 150 
      this.actualSerie.addPoint([timestamp, parseFloat(value.toString())], true);
    }, 500);
  }
  
}
