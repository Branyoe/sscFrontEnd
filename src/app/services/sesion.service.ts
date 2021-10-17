import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private Ruta: Router) { }
  sesionVerify() {
    let token = localStorage.getItem("token");
    if(token){
      if(token != "" && token.length > 50){
        this.Ruta.navigateByUrl("home");
      }else{
        this.Ruta.navigateByUrl("auth");
      }
    }else{
      this.Ruta.navigateByUrl("auth");
    }
  }
}
