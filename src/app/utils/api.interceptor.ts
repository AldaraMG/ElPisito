import { Injectable } from "@angular/core"; 
import { HttpEvent, 
HttpHandler, 
HttpInterceptor, 
HttpRequest, 
HttpErrorResponse } from "@angular/common/http"; 


import { Observable } from "rxjs"; 
import { AuthService } from "../services/auth.service";

@Injectable() 
export class ApiInterceptor implements HttpInterceptor{ 

    requestCloned:any;
    requestFinal:Observable<HttpEvent<any>>;
constructor(

    private _authService:AuthService
) { }


intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 

    const token = this._authService.getToken();
    if(token){
        this.requestCloned = req.clone({
            headers:req.headers 
                .set("Authorization","Bearer" + token) 
            
        });
        this.requestFinal = next.handle(this.requestCloned);
    }else(
        this.requestFinal = next.handle(req)
    )
   


    return this.requestFinal;

} 



}
