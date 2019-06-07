import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as Highcharts from "highcharts/highstock";
declare var require: any;
require("highcharts/modules/export-data");
require("highcharts/modules/exporting");

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit, AfterViewInit {
  chart: Highcharts.Chart;
  serie1: any;
  serie2: any;

  constructor() {
    this.chart = undefined;
  }

  ngAfterViewInit(): void {
    this.chart = Highcharts.stockChart("container", {
      chart: {
        width: null,
        height: null
      },
      rangeSelector: {
        selected: 4
      },
      yAxis: {},
      plotOptions: {
        series: {
          compare: "percent",
          showInNavigator: true
        }
      },
      series: []
    });

    const seriesPart1: any = {
      name: "serie1",
      data: [new Date().getTime(), parseFloat(50)]
    };
    this.chart.addSeries(seriesPart1, true);

    const seriesPart2: any = {
      name: "serie2",
      data: [new Date().getTime(), parseFloat(20)]
    };
    this.chart.addSeries(seriesPart2, true);
  }

  generateData() {
    this.serie1 = this.chart.series.filter(srie => srie.name === "serie1")[0];
    this.serie2 = this.chart.series.filter(srie => srie.name === "serie2")[0];

    setInterval(() => {
      const timestamp = new Date().getTime();
      const value1 = Math.random() * (250 - 150) + 150;
      const value2 = Math.random() * (250 - 150) + 150;
      this.serie1.addPoint([timestamp, parseFloat(value1.toString())], true);
      this.serie2.addPoint([timestamp, parseFloat(value2.toString())], true);
    }, 500);
  }
}
