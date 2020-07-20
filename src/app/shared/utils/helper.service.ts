import { Injectable } from "@angular/core";
import { AES, enc, mode, pad } from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor() {}

  set(keys, value): string {
    var key = enc.Utf8.parse(keys);
    var iv = enc.Utf8.parse(keys);
    var encrypted = AES.encrypt(enc.Utf8.parse(value.toString()), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });
    return encrypted.toString();
  }

  get(keys, value): string {
    var key = enc.Utf8.parse(keys);
    var iv = enc.Utf8.parse(keys);
    var decrypted = AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });

    return decrypted.toString(enc.Utf8);
  }
}
