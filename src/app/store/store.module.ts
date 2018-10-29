import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';

import {rootReducer} from "./store.reducers";
import {IAppState, storeInit} from "./store.state";


@NgModule({
  imports: [
    CommonModule,
    NgReduxModule,
    NgReduxRouterModule,
  ],
  declarations: [],
})
export class StoreModule {
  constructor(public store: NgRedux<IAppState>,
              private devTools: DevToolsExtension,
              ngReduxRouter: NgReduxRouter) {

    store.configureStore(
      rootReducer,
      storeInit,
      [],
      devTools.isEnabled() ? [ devTools.enhancer() ] : []);

    // Enable syncing of Angular router state with our Redux store.
    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }
  }
}
