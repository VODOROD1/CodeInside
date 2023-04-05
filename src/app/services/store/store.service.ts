import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';

interface IimgArr {
  imgBase64: string | ArrayBuffer;
  url: string
}

export class IState {
  type: string;
  filter: string;
  searchField: string;
  currentImgBase64?: {
    key: number;
    value: string | ArrayBuffer
  };
  // imgArr: Map<number, string | ArrayBuffer>;
  imgArr: Map<number, IimgArr>;

  constructor(
    type: string,
    filter: string,
    searchField: string,
    imgArr: Map<number, IimgArr>
  ) {
    this.type = type;
    this.filter = filter;
    this.searchField = searchField;
    this.imgArr = imgArr;
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
    let typeValue = sessionStorage.getItem('type')
      ? sessionStorage.getItem('type')
      : '';
    let filterValue = sessionStorage.getItem('filter')
      ? sessionStorage.getItem('filter')
      : '';
    debugger;
    this.state = {
      type: typeValue,
      filter: filterValue,
      searchField: '',
      currentImgBase64: {
        key: 0,
        value: ''
      },
      imgArr: new Map(),
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
    this.serverService.getGif().then(async (image) => {
      debugger;
      const imageBlog = await image.blob();
      let reader = new FileReader();
      reader.readAsDataURL(imageBlog); // конвертирует Blob в base64 и вызывает onload
      reader.onload = () => {
        // Помещаем новый элемент в конец коллекции
        // this.state.imgArr.set(this.state.imgArr.size + 1, reader.result);
        this.state.imgArr.set(this.state.imgArr.size + 1, {
          imgBase64: reader.result,
          url: image.url
        });
        this.state.currentImgBase64.key = this.state.imgArr.size;
        this.state.currentImgBase64.value = reader.result;
        debugger;
      };
    });
  }

  // Получить элементы
  getImg(
    typeValue: string = '',
    filterValue: string = '',
    searchField: string = ''
  ): any {
    let errorMessage: string = '';
    if (typeValue !== '' || filterValue !== '') {
      this.serverService.getImgWithTypeFilter(typeValue, filterValue).then(
        async (image) => {
          const imageBlog = await image.blob();
          let reader = new FileReader();
          reader.readAsDataURL(imageBlog); // конвертирует Blob в base64 и вызывает onload
          reader.onload = () => {
            debugger;
            // this.state.imgArr.set(this.state.imgArr.size + 1, reader.result);
            this.state.imgArr.set(this.state.imgArr.size + 1, {
              imgBase64: reader.result,
              url: image.url
            });
            // this.state.currentImgBase64.clear();
            // this.state.currentImgBase64.set(this.state.imgArr.size+1, reader.result);
            this.state.currentImgBase64.key = this.state.imgArr.size;
            this.state.currentImgBase64.value = reader.result;
            // Сохраняем тип и фильтр в sessionStorage
            this.saveToSessionStorage(typeValue, filterValue);
          };
        },
        (err) => {
          debugger;
        }
      );
    } else {
      this.serverService.getImg().then(async (image) => {
        const imageBlog = await image.blob();
        let reader = new FileReader();
        reader.readAsDataURL(imageBlog); // конвертирует Blob в base64 и вызывает onload
        reader.onload = () => {
          // this.state.imgArr.push(reader.result);
          this.state.imgArr.set(this.state.imgArr.size + 1, {
            imgBase64: reader.result,
            url: image.url
          });
          // this.state.currentImgBase64.clear();
          // this.state.currentImgBase64.set(this.state.imgArr.size+1, reader.result);
          this.state.currentImgBase64.key = this.state.imgArr.size;
          this.state.currentImgBase64.value = reader.result;
          // Сохраняем тип и фильтр в sessionStorage
          this.saveToSessionStorage(typeValue, filterValue);
        };
      });
      // .subscribe({
      //   next: (v) => {
      //     console.log(v);
      //     debugger;
      //   },
      //   error: (e) => {
      //     console.log(e);
      //     debugger;
      //     if (e.status === 200)
      //       [this.setParams(typeValue, filterValue, searchField)];
      //   },
      //   complete: () => {
      //     console.info('complete');
      //     debugger;
      //   },
      // });
    }
    // )
  }

  public saveToSessionStorage(type: string, filter: string) {
    sessionStorage.setItem('type', type);
    sessionStorage.setItem('filter', filter);
  }

  switchCurrentImgBase64(direction: string) {
    let currentKey: number = this.state.currentImgBase64.key;
    if(direction === 'back') {
      debugger;
      // Отступаем на один элемент назад в коллекции
      this.state.currentImgBase64.key = currentKey - 1
      this.state.currentImgBase64.value = this.state.imgArr.get(currentKey-1).imgBase64;
    } else if(direction === 'forward') {
      // Наступаем на один элемент вперед в коллекции
      this.state.currentImgBase64.key = currentKey + 1
      this.state.currentImgBase64.value = this.state.imgArr.get(currentKey+1).imgBase64;
    }
  }
}
