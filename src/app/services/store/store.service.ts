import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';

export class IState{
  type: string;
  filter: string;
  searchField: string;
  imgArr: Array<string | ArrayBuffer>;
  currentImgBase64?: string | ArrayBuffer;

  constructor(
    type: string,
    filter: string,
    searchField: string,
    imgArr: Array<string | ArrayBuffer>,
  ) {
    this.type = type
    this.filter = filter
    this.searchField = searchField
    this.imgArr = imgArr
  }
}

// interface IState {
//   type: string;
//   filter: string;
//   searchField: string;
//   imgArr: string[];
// }

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private state: IState;

  constructor(private serverService: ServerService) {
    let typeValue = sessionStorage.getItem('type') ? sessionStorage.getItem('type') : '';
    let filterValue = sessionStorage.getItem('filter') ? sessionStorage.getItem('filter') : '';
    debugger;
    this.state = {
      type: typeValue,
      filter: filterValue,
      searchField: '',
      currentImgBase64: '',
      imgArr: [],
    };
  }

  public getState(): IState {
    return this.state;
  }

  setParams(typeValue: string, filterValue: string, searchField: string) {
    // let temp1 = this.state.type;
    this.state.type = typeValue;
    this.state.filter = filterValue;
    this.state.searchField = searchField;
  }

  getGif() {
    this.serverService
  }

  // Получить элементы
  getImg(
    typeValue: string = '',
    filterValue: string = '',
    searchField: string = ''
  ): any {
    let errorMessage: string = '';
    if (typeValue !== '' || filterValue !== '') {
      this.serverService
        .getImgWithTypeFilter(typeValue, filterValue)
        .then(async (image) => {
          debugger
          const imageBlog = await image.blob()
          debugger
          // const imageURL = URL.createObjectURL(imageBlog)
          // debugger
          // this.state.currentImgBase64 = imageURL
          let reader = new FileReader();
          reader.readAsDataURL(imageBlog); // конвертирует Blob в base64 и вызывает onload

          reader.onload = () => {
            // link.href = reader.result; // url с данными
            // link.click();
            this.state.currentImgBase64 = reader.result
            this.state.imgArr.push(reader.result)
            this.saveToSessionStorage(typeValue, filterValue)
          };
          debugger
        }, (err) => {
          debugger
        })
        // .subscribe({
        //   next: (v) => {
        //     console.log(v);
        //     debugger;
        //   },
        //   error: (e) => {
        //     console.log(e);
        //     debugger;
        //     if (e.status === 200) {
        //       this.setParams(typeValue, filterValue, searchField)
        //     }
        //   },
        //   complete: () => {
        //     console.info('complete');
        //     debugger;
        //   },
        // });
    } else {
      this.serverService.getImg().subscribe({
        next: (v) => {
          console.log(v);
          debugger;
        },
        error: (e) => {
          console.log(e);
          debugger;
          if (e.status === 200)
            [this.setParams(typeValue, filterValue, searchField)];
        },
        complete: () => {
          console.info('complete');
          debugger;
        },
      });
    }
    // )
  }

  public saveToSessionStorage(type: string, filter: string) {
    sessionStorage.setItem('type', type);
    sessionStorage.setItem('filter', filter);
  }
}
