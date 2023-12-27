import { Component, OnInit } from '@angular/core';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private _comunicationService:ComunicationService
  
  ){}
  ngOnInit(): void {
    this._comunicationService.cambioPortada(true);
    this._comunicationService.cambioFooter(true);
  }

}
