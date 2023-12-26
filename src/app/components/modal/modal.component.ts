import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string;
  @Input() message: string;

  constructor(public bsModalRef: BsModalRef) {}

  close(): void {
    this.bsModalRef.hide();
  }

}
