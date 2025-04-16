import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environment';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  console.log(' Interceptor is running!');

  const platformId = inject(PLATFORM_ID);
  
  let token: string = ''; // Ensure token is always a string

  
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token') ?? ''; 
  }

  const OrgId = environment?.OrgId ?? '';


  const clonedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}), 
      ...(OrgId ? { OrgId: OrgId } : {}) 
    }
  });

  // ✅ Debugging logs
  console.log(' Authorization Header:', clonedRequest.headers.get('Authorization'));
  console.log(' OrgId Header:', clonedRequest.headers.get('OrgId'));

  return next(clonedRequest);
};
