import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { TypeComponent } from './components/type/type.component';
import { FilterComponent } from './components/filter/filter.component';
import { CatImageComponent } from './components/cat-image/cat-image.component';

@NgModule({
  declarations: [
    AppComponent,
    ParametersComponent,
    TypeComponent,
    FilterComponent,
    CatImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
