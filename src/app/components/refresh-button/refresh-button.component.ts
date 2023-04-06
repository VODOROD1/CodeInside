import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-refresh-button',
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.scss']
})
export class RefreshButtonComponent {

  constructor(public store: StoreService) {

  }

  refreshSubmit() {
    this.store.refreshImg()
  }
}
