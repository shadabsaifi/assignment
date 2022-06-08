import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService

var baseUrl = environment.baseurl;

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  constructor(private http: HttpClient, private NgxUiLoaderService:NgxUiLoaderService) { }
  
  getAll(query:string) {
    return this.http.get(baseUrl + query);
  }
  get(id:any) {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data:any) {
    return this.http.post(baseUrl, data);
  }
  update(id:any, data:any) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id:any) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll() {
    return this.http.delete(baseUrl);
  }
  findByTitle(title:any) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }

  startLoader(){
    this.NgxUiLoaderService.start()
  }

  stopLoader(){
    this.NgxUiLoaderService.stop()
  }

}