import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }
  getList(){
    return this.http.get("http://localhost:3000/notes");
  }
  addToList(item:any){
    return this.http.post("http://localhost:3000/notes",item);
  }
  removeFromList(id:number){
    return this.http.delete(`http://localhost:3000/notes/${id}`)
  }
  getNote(id:number){
    return this.http.get("http://localhost:3000/notes/${id}");
  }
  updateNote(id:number, item:any){
    return this.http.put(`http://localhost:3000/notes/${id}`,item)
  }

  getTrashList(){
    return this.http.get("http://localhost:3000/trash");
  }
  removeFromTrash(id:number){
    return this.http.delete(`http://localhost:3000/trash/${id}`)
  }
  addToTrash(item:any){
    return this.http.post("http://localhost:3000/trash",item)
  }
}
