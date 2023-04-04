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
    // let {type, filter, searchField, imgArr} = this.store.getState()
    // this.localState.srcString = `https://cataas.com/cat?type=${type}&filter=${filter}`
    
    // let currentImgBase64 = this.store.getState().currentImgBase64
    // this.localState.srcString = currentImgBase64
    this.localState = this.store.getState();

    const stream = new Observable((observer) => {
      // if(this.localState.currentImgBase64 !== '') {
      //   debugger;
      setTimeout(() => {
        observer.next(this.localState.currentImgBase64)
      },5000)
      // }
    })

    stream.subscribe({
      next: (v) => {
        debugger;
      },
      error: (e) => {
        debugger;
      }
    })
  }

  ngOnInit() {
    // setTimeout(() => {
    //   let {type, filter, searchField, imgArr} = this.store.getState()
    //   this.localState.srcString = `https://cataas.com/cat?type=${type}&filter=${filter}`
    //   // let flag =  
    //   debugger;
    // }, 5000)
  }
}
