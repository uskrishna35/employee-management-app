import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
// import { authInterceptor } from './app/your-interceptor-auth.interceptor';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent,  appConfig)
  .catch(err => console.error(err));
