import { Injectable } from "@angular/core"; 
import { HttpEvent, 
HttpHandler, 
HttpInterceptor, 
HttpRequest, 
HttpErrorResponse } from "@angular/common/http"; 


import { Observable } from "rxjs"; 

@Injectable() 
export class ApiInterceptor implements HttpInterceptor{ 

reqFinal: Observable<HttpEvent<any>>; 

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 


this.reqFinal = next.handle(req);
return this.reqFinal;

} 



}
