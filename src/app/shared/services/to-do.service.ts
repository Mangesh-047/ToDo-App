import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  updateDate$ = new Subject<any>()

  constructor(
    private _http: HttpClient
  ) { }


  getAllTodoItem(): Observable<any> {
    return this._http.get<any>(`${environment.fireBaseDB}todo.json`)
      .pipe(
        // tap(res => console.log(res)),
        map(res => {
          let arr = []
          for (let key in res) {
            let obj = {
              todoItem: res[key].todoItem,
              id: key
            }
            // console.log(obj);
            arr.unshift(obj)
          }
          return arr
        })
      )
  }

  addToDoItem(item: any): Observable<any> {
    return this._http.post<any>(`${environment.fireBaseDB}todo.json`, item)
  }

  updateToDoItem(id: string, td: any): Observable<any> {
    return this._http.patch<any>(`${environment.fireBaseDB}todo/${id}/.json`, td)
  }

  DeleteTodoItem(id: string): Observable<any> {
    return this._http.delete<any>(`${environment.fireBaseDB}todo/${id}/.json`)
  }
}
