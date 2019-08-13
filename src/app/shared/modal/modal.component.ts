import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
// TODO:: Make app modal resuable
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    const modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function(e: any) {
      if (e.target.className === 'modal__overlay modal__overlay--toggle') {
        modal.close();
      }
    });

    this.element.addEventListener('click', function(e: any) {
      if (
        e.target.className === 'model-close-btn' ||
        e.target.className === 'close-image'
      ) {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  open(): void {
    this.element.style.display = 'block';
  }

  close(): void {
    this.element.style.display = 'none';
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }
}
