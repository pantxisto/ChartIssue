import { Component, OnInit, Input, ElementRef } from "@angular/core";

@Component({
  selector: "app-chartContainer",
  templateUrl: "./chartContainer.component.html",
  styleUrls: ["./chartContainer.component.css"]
})
export class ChartContainerComponent implements OnInit {
  @Input() chartToPaint: ElementRef<any>;

  constructor() {}

  ngOnInit(): void {}
}
