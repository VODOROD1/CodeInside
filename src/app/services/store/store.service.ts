import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';

interface IimgArr {
  imgBase64: string | ArrayBuffer;
  url: string
}

interface ICurrentImgBase64 {
  key: number;
  value: string | ArrayBuffer
}

export class IState {
  type: string;
  filter: string;
  searchField: string;
  currentImgBase64?: ICurrentImgBase64;
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
    this.state.type = typeValue;
    this.state.filter = filterValue;
    this.state.searchField = searchField;
  }

  getGif() {
    this.serverService.getGif().then(async (image) => {
      const imageBlog = await image.blob();
      let reader = new FileReader();
      reader.readAsDataURL(imageBlog); // конвертирует Blob в base64 и вызывает onload
      reader.onload = () => {
        // Помещаем новый элемент в конец коллекции
        this.state.imgArr.set(this.state.imgArr.size + 1, {
          imgBase64: reader.result,
          url: image.url
        });
        this.state.currentImgBase64.key = this.state.imgArr.size;
        this.state.currentImgBase64.value = reader.result;
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
      this.serverService.getImgWithTypeFilter(typeValue, filterValue, searchField).then(
        async (image) => {
          const imageBlog = await image.blob();
          let reader = new FileReader();
          reader.readAsDataURL(imageBlog); // конвертирует Blob в base64 и вызывает onload
          reader.onload = () => {
            this.state.imgArr.set(this.state.imgArr.size + 1, {
              imgBase64: reader.result,
              url: image.url
            });
            this.state.currentImgBase64.key = this.state.imgArr.size;
            this.state.currentImgBase64.value = reader.result;
            // Сохраняем тип и фильтр в sessionStorage
            this.saveToSessionStorage(typeValue, filterValue);
          };
        },
        (err) => {
        }
      );
    } else {
      this.serverService.getImg(searchField).then(async (image) => {
        const imageBlog = await image.blob();
        let reader = new FileReader();
        reader.readAsDataURL(imageBlog); // конвертирует Blob в base64 и вызывает onload
        reader.onload = () => {
          this.state.imgArr.set(this.state.imgArr.size + 1, {
            imgBase64: reader.result,
            url: image.url
          });
          this.state.currentImgBase64.key = this.state.imgArr.size;
          this.state.currentImgBase64.value = reader.result;
          // Сохраняем тип и фильтр в sessionStorage
          this.saveToSessionStorage(typeValue, filterValue);
        };
      });
    }
  }

  public saveToSessionStorage(type: string, filter: string) {
    sessionStorage.setItem('type', type);
    sessionStorage.setItem('filter', filter);
  }

  switchCurrentImgBase64(direction: string) {
    let currentKey: number = this.state.currentImgBase64.key;
    if(direction === 'back') {
      // Отступаем на один элемент назад в коллекции
      this.state.currentImgBase64.key = currentKey - 1
      this.state.currentImgBase64.value = this.state.imgArr.get(currentKey-1).imgBase64;
    } else if(direction === 'forward') {
      // Наступаем на один элемент вперед в коллекции
      this.state.currentImgBase64.key = currentKey + 1
      this.state.currentImgBase64.value = this.state.imgArr.get(currentKey+1).imgBase64;
    }
  }

  refreshImg() {
    // Указал для очевидности
    // Присваиваем ключ той картинки, которую перезагружаем
    let keyRefreshedImg = this.state.currentImgBase64.key;
    this.serverService.downloadImage(this.state.imgArr.get(keyRefreshedImg).url)
    .then(async (image) => {
      const imageBlog = await image.blob();
      let reader = new FileReader();
      reader.readAsDataURL(imageBlog); // конвертирует Blob в base64 и вызывает onload
      reader.onload = () => {
        // Помещаем новый элемент в конец коллекции
        this.state.imgArr.set(keyRefreshedImg, {
          imgBase64: reader.result,
          url: image.url
        });
        this.state.currentImgBase64.key = keyRefreshedImg;
        this.state.currentImgBase64.value = reader.result;
      };
    });
  }
}
