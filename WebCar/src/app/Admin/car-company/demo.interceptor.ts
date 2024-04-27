import { HttpInterceptorFn } from '@angular/common/http';

export const demoInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const authToken = localStorage.getItem("token");
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    // Pass the cloned request with the updated header to the next handler
    return next(authReq);
  }

  // Clone the request and add the authorization header
  return next(req);
};
