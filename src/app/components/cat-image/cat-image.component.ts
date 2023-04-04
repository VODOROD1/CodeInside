import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';

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
  public localState: IlocalState = {
    srcString: ''
  }

  constructor(public store: StoreService) {
    // let {type, filter, searchField, imgArr} = this.store.getState()
    // this.localState.srcString = `https://cataas.com/cat?type=${type}&filter=${filter}`
    let currentImgBLOB = this.store.getState().currentImgBLOB
    this.localState.srcString = currentImgBLOB
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
