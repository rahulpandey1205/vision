import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideHttpClient } from '@angular/common/http';

// ✅ Import these
import { importProvidersFrom } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ <-- added this

// ✅ Create tokenGetter function
export function tokenGetter() {
  return localStorage.getItem('visitor_management_token');
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    // ✅ JWT and Reactive Forms support
    importProvidersFrom(
      ReactiveFormsModule, // ✅ <-- added this
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter
        }
      })
    )
  ]
}).catch(err => console.error(err));
