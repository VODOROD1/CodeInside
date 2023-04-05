import { Component } from '@angular/core';
import { IState, StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-back-forward-button',
  templateUrl: './back-forward-button.component.html',
  styleUrls: ['./back-forward-button.component.scss'],
})
export class BackForwardButtonComponent {
  public localState: IState;

  constructor(public store: StoreService) {
    this.localState = this.store.getState();
  }

  clickBackSubmit() {
    debugger;
    this.store.switchCurrentImgBase64('back');
  }

  clickForwardSubmit() {
    this.store.switchCurrentImgBase64('forward');
  }
}
