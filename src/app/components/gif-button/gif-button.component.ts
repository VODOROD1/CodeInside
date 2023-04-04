import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-gif-button',
  templateUrl: './gif-button.component.html',
  styleUrls: ['./gif-button.component.scss']
})
export class GifButtonComponent {

  constructor(public store: StoreService) {

  }

  clickSubmit() {
    this.store.getGif()
  }
}
