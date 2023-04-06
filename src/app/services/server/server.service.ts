import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getGif() {
    let srcPath = `https://cataas.com/cat/gif`
    return this.downloadImage(srcPath)
  }

  getImg(searchField: string) {
    let srcPath = searchField !== '' ? `https://cataas.com/cat/says/${searchField}` : "https://cataas.com/cat"
    return this.downloadImage(srcPath)
  }

  getImgWithTypeFilter(typeValue: string, filterValue: string, searchField: string) {
    let srcPath = searchField !== '' ? `https://cataas.com/cat/says/${searchField}?type=${typeValue}&filter=${filterValue}` : `https://cataas.com/cat?type=${typeValue}&filter=${filterValue}`
    
    return this.downloadImage(srcPath)
  }

  async downloadImage(srcPath: string) {
    return fetch(srcPath)
  }
}
