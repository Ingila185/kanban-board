import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideStore, StoreModule } from '@ngrx/store';
import { AllItemStore, reducers } from './SignalStore/all-items.store';
import { ToDosReducer } from './Item/item.reducers';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),  provideStore({item : ToDosReducer}) , 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimationsAsync(),
    AllItemStore
  
  
  ]
};


