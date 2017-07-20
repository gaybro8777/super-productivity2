import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {taskReducer, TasksModule} from './tasks';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdToolbarModule} from '@angular/material';
import {AppComponent} from './app.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'tasks'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    RouterModule.forRoot(routes, {useHash: true}),
    StoreModule.forRoot({
      tasks: taskReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    TasksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
