import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ChartComponent } from "./chart/chart.component";
import { ChartContainerComponent } from "./chartContainer/chartContainer.component";

@NgModule({
  declarations: [AppComponent, ChartComponent, ChartContainerComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
