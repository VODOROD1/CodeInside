import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { TypeComponent } from './components/type/type.component';
import { FilterComponent } from './components/filter/filter.component';
import { CatImageComponent } from './components/cat-image/cat-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { HttpClientModule } from '@angular/common/http';
import { GifButtonComponent } from './components/gif-button/gif-button.component';
import { BackForwardButtonComponent } from './components/back-forward-button/back-forward-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ParametersComponent,
    TypeComponent,
    FilterComponent,
    CatImageComponent,
    FilterPipe,
    HighlightDirective,
    GifButtonComponent,
    BackForwardButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
