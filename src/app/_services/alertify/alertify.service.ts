import { Injectable } from "@angular/core";
declare let alertify: any;

@Injectable({
  providedIn: "root"
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {}
    });
  }

  success(message: String) {
    alertify.success(message);
  }

  error(message: String) {
    alertify.error(message);
  }

  warning(message: String) {
    alertify.warning(message);
  }

  message(message: String) {
    alertify.message(message);
  }
}
