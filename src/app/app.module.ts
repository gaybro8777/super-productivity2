import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdToolbarModule} from '@angular/material';
import {DragulaModule} from 'ng2-dragula';

import {AppComponent} from './app.component';

import {TaskReducer} from './tasks/task.reducer';
import {TaskEffects} from './tasks/task.effects';
import {TaskService} from './tasks/task.service';
import {WorkViewComponent} from './work-view/work-view.component';
import {TaskListComponent} from './tasks/task-list.component';
import {EditOnClickComponent} from './edit-on-click/edit-on-click.component';
import {TaskComponent} from './tasks/task.component';
import {FilterPipeModule} from 'ngx-filter-pipe';


export const appRoutes: Routes = [
  {path: 'work-view', component: WorkViewComponent},
  // {path: 'hero/:id', component: HeroDetailComponent},
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: {title: 'Heroes List'}
  // },
  // {
  //   path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  {path: '**', component: WorkViewComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    WorkViewComponent,
    TaskListComponent,
    EditOnClickComponent,
    TaskComponent
  ],
  imports: [
    // base
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),

    // material2
    MdToolbarModule,
    MdButtonModule,
    MdCheckboxModule,

    // store stuff
    StoreModule.forRoot({TaskReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    EffectsModule.forRoot([TaskEffects]),

    // other
    FilterPipeModule,
    DragulaModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
