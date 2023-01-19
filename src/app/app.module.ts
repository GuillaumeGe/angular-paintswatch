import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PaintSwatchComponent } from './paintswatch.component';
import { ImaginColorsService } from './imagin.colors.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, ImaginColorsService],
  declarations: [AppComponent, PaintSwatchComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
