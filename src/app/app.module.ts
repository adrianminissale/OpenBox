import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';
import { UserState } from 'src/app/state';

import { MaterialModule } from './material.module';
import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoxesComponent } from './components/boxes/boxes.component';
import { BoxComponent } from './components/box/box.component';
import { OpenBoxComponent } from './components/open-box/open-box.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxesComponent,
    BoxComponent,
    OpenBoxComponent,
    ToolbarComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ? [] : NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([UserState], { developmentMode: true }),
    BrowserAnimationsModule,
  ],
  providers: [Apollo],
  bootstrap: [AppComponent],
})
export class AppModule {}
