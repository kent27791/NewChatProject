import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AppConfig } from './app.config';
import { TokenInterceptor } from './shared/auths/token.interceptor';
import { AuthService } from './shared/services/auth.service';
import { HttpClient } from '@angular/common/http/src/client';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: AppConfig,
      useValue: (http: HttpClient) => new AppConfig(http)
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfig) => () => config.load(),
      deps: [AppConfig], 
      multi: true
    },
    {
      provide: AuthService,
      useFactory: (config: AppConfig) => new AuthService(config),
      deps: [AppConfig],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      useFactory: (auth: AuthService, router: Router) => new TokenInterceptor(auth, router),
      deps: [AuthService, Router],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
