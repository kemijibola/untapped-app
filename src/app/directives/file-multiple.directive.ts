import { Directive, OnInit, HostBinding, Renderer2, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromShared from '../shared/shared.reducers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
    selector: '[appFileInput]'
})

export class AppFileInputDirective implements OnInit {
ngDestroyed = new Subject();
multiple: boolean;
accept: string;
operationType: string;
state: boolean;
constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private store: Store<fromShared.SharedState>
    ) {}

ngOnInit() {
    this.store
      .pipe(
        select('shared'),
        takeUntil(this.ngDestroyed)
      )
      .subscribe(val => {
          console.log(val);
          if (val['upload']['fileInput']['state']) {
            this.multiple = val['upload']['fileInput']['multiple'];
            this.accept = val['upload']['fileInput']['accept'];
            this.operationType = val['upload']['fileInput']['process'];
            this.state = val['upload']['fileInput']['process'];
            if (this.state) {
              this.renderer.setProperty(this.elRef.nativeElement, 'multiple', this.multiple);
              this.renderer.setProperty(this.elRef.nativeElement, 'accept', this.accept);
              const event = new MouseEvent('click');
              this.renderer.(
                  this.fileInput.nativeElement, 'dispatchEvent', [event]);
            }
          }
      });
}

}
