import {
  Component,
  OnInit,
  AfterViewInit,
  KeyValueDiffers
} from "@angular/core";
import * as Highcharts from "highcharts/highstock";
declare var require: any;
require("highcharts/modules/export-data");
require("highcharts/modules/exporting");

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit, AfterViewInit, DoCheck {
  chart: Highcharts.Chart;
  serie1: any;
  serie2: any;
  _inputPayloads: any[];
  objDiffer: Object;

  constructor(private differs: KeyValueDiffers) {
    this.chart = undefined;
    this.objDiffer = {};
    this._inputPayloads = [];
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

    // const seriesPart1: any = {
    //   name: "serie1",
    //   data: [new Date().getTime(), parseFloat(50)]
    // };
    // this.chart.addSeries(seriesPart1, true);

    // const seriesPart2: any = {
    //   name: "serie2",
    //   data: [new Date().getTime(), parseFloat(20)]
    // };
    // this.chart.addSeries(seriesPart2, true);
    this._inputPayloads.push(
      {
        cookieWidget: "1",
        serieName: "serie1",
        value: "50",
        timestamp: new Date().getTime()
      },
      {
        cookieWidget: "2",
        serieName: "serie2",
        value: "20",
        timestamp: new Date().getTime()
      }
    );
    this.generateData();
    //this.generateData();
  }

  ngDoCheck() {
    this._inputPayloads.forEach(elt => {
      if (this.objDiffer[elt.cookieWidget] === undefined) {
        this.objDiffer[elt.cookieWidget] = this.differs
          .find(elt)
          .create<null, null>();
      } else {
        const objChanges = this.objDiffer[elt.cookieWidget].diff(elt);
        if (objChanges !== null) {
          const serieName = elt.serieName;
          const serie = this.chart.series.filter(
            srie => srie.name === serieName
          )[0];
          if (serie !== undefined) {
            serie.addPoint([elt.timestamp, parseFloat(elt.value)], true);
          } else {
            const seriesPart: any = {
              name: serieName,
              data: [elt.timestamp, parseFloat(elt.value)]
            };
            this.chart.addSeries(seriesPart, true);
          }
        }
      }
    });
  }

  generateData() {
    setInterval(() => {
      const timestamp = new Date().getTime();
      const value1 = Math.random() * (250 - 150) + 150;
      const value2 = Math.random() * (250 - 150) + 150;
      this._inputPayloads[0].value = value1.toString();
      this._inputPayloads[0].timestamp = timestamp;
      this._inputPayloads[1].value = value2.toString();
      this._inputPayloads[1].timestamp = timestamp;
    }, 500);
  }
}
