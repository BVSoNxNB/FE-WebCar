import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const localData =  localStorage.getItem('token');
    if (localData == null) {
      const confirmation = window.confirm("Bạn cần đăng nhập trước. Bạn có muốn đăng nhập ngay bây giờ không?");
      if (confirmation) {
        router.navigateByUrl('/login');
      }
      return false;
    }
  };
  return true;

};
