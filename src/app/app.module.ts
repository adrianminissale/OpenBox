import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoxesComponent } from './components/boxes/boxes.component';
import { BoxComponent } from './components/box/box.component';
import { OpenBoxComponent } from './components/open-box/open-box.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxesComponent,
    BoxComponent,
    OpenBoxComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [Apollo],
  bootstrap: [AppComponent],
})
export class AppModule {}
