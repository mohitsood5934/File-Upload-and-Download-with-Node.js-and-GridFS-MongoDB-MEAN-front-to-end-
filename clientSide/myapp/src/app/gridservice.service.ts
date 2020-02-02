import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GridserviceService {

  constructor(private http: HttpClient) { }
  //getting all files
  getFiles() {
    console.log("Inside service")
    return this.http.get("http://localhost:3000/api/files")
      .toPromise()
  }
  //download a file by its id
  download(id) {
    return this.http.get("http://localhost:3000/api/download/" + id, { responseType: 'arraybuffer' })
      .toPromise()
  }
  // deleting a file by its id
  delete(id, name): Observable<any> {
    console.log(id)
    return this.http.delete("http://localhost:3000/api/delete/" + id + "/" + name)
  }

}