import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getGif() {
    debugger;
    let srcPath = `https://cataas.com/cat/gif`
    return this.downloadImage(srcPath)
  }

  getImg(searchField: string) {
    debugger;
    let srcPath = searchField !== '' ? `https://cataas.com/cat/says/${searchField}` : "https://cataas.com/cat"
    // return this.http.get(`https://cataas.com/cat`)
    return this.downloadImage(srcPath)
  }

  getImgWithTypeFilter(typeValue: string, filterValue: string, searchField: string) {
    debugger;
    let srcPath = searchField !== '' ? `https://cataas.com/cat/says/${searchField}?type=${typeValue}&filter=${filterValue}` : `https://cataas.com/cat?type=${typeValue}&filter=${filterValue}`
    // let srcPath = `https://cataas.com/cat?type=${typeValue}&filter=${filterValue}`
    
    return this.downloadImage(srcPath)
    // fetchObj.then((res) => {
    //   debugger;
    // }, (err) => {
    //   debugger;
    // })

    // let httpObj = this.http.get(srcPath)
    // httpObj.subscribe(
    //   {
    //     next: (v) => {
    //       console.log(v);
    //       debugger;
    //     },
    //     error: (e) => {
    //       console.log(e);
    //       debugger;
    //     },
    //     complete: () => {
    //       console.info('complete');
    //       debugger;
    //     },
    //   }
    // )
    // return this.http.get(srcPath)
  }

  async downloadImage(srcPath: string) {
    debugger
    return fetch(srcPath)
    // const image = await fetch(srcPath)
    // debugger
    // const imageBlog = await image.blob()
    // debugger
    // const imageURL = URL.createObjectURL(imageBlog)
    // debugger
    // return fetch(srcPath)

    // const link = document.createElement('a')
    // link.href = imageURL
    // link.download = 'image file name here'
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
  }
}
