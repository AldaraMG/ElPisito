import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  url:string=GLOBAL.url_media;

  constructor(
    private _http:HttpClient
  ) { }



}
