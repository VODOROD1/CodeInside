import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IState, StoreService } from 'src/app/services/store/store.service';

interface IlocalState {
  srcString: string
}

@Component({
  selector: 'app-cat-image',
  templateUrl: './cat-image.component.html',
  styleUrls: ['./cat-image.component.scss']
})

export class CatImageComponent implements OnInit {
  public srcString: string;
  // public localState: IlocalState = {
  //   srcString: ''
  // }
  public localState: IState;

  constructor(public store: StoreService) {
    this.localState = this.store.getState();
  }

  ngOnInit() {

  }

  clickSubmit(value: any) {
    
  }
}
