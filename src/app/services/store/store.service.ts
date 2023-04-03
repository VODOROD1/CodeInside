import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';

interface IState {
  type: string;
  filter: string;
  searchField: string;
  imgArr: string[];
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public state: IState;

  constructor(private serverService: ServerService) {
    this.state = {
      type: '',
      filter: '',
      searchField: '',
      imgArr: []
    };
  }

  // Получить элементы
  getImg(): any {
    this.serverService.getRandomImg().subscribe((res: any) => {
      debugger;
      
    })
  }
}
