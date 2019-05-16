import { AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

export class ValidateEmailNotTaken {
  static createValidator(authService: AuthService) {
    return (control: AbstractControl) => {
      return authService.findUserByEmail(control.value).map(res => {
        return console.log(res.data[0] ? { emailTaken: true } : null);
      });
    };
  }
}
