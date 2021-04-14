import { Component, OnInit } from '@angular/core';
import {NoteService } from 'src/app/services/note.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service:NoteService) {
    this.getList();
    this.getTrash();
   }
  ngOnInit(): void {
  }
  public noteItem:any;
  public trashItem:any;
  public title:string='';
  public id!: number;
  public description:string='';
  public hide:boolean=true;
  public newTitle:string='';
  public newDescription:string='';

  getList(){
    this.service.getList().subscribe(data=>{
      this.noteItem=data;
    });
  }

  add(){
    let item={
      "title":this.title,
      "description":this.description
    }
      this.service.addToList(item).subscribe(data=>{
        this.getList();
      });
  }

  editNote(item:any)
  {
    console.log(item.title);
    console.log(item.id);
    this.title=item.title;
    this.description=item.description;
    this.id=item.id;
  }
  save(){
    let updateditem={
      "title":this.title,
      "description":this.description
    }
    this.service.updateNote(this.id,updateditem).subscribe(data=>{
      this.getList();
    })
  }

  getTrash(){
    this.service.getTrashList().subscribe(data=>{
      this.trashItem=data;
    })
  }

  addToTrash(item:any)
  {
    console.log(item);
    this.service.addToTrash(item).subscribe(data=>{
       this.getTrash();
    })
    this.service.removeFromList(item.id).subscribe(data=>{
      this.getList();
    })
  }

  removeTrash(item:any){
    this.service.removeFromTrash(item.id).subscribe(data=>{
    this.getTrash();
    })
  }
  restoreTrash(item:any)
  {

    this.service.addToList(item).subscribe(data=>{
      this.getList();
    });
    this.service.removeFromTrash(item.id).subscribe(data=>{
      this.getTrash();
      })
  }
}
