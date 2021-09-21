import { Component, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() childata:any;
  filterData:any
  @Output() updata:any;
  itemarray:any=[];
  constructor(
    private commonService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.commonService.itemRefresh.subscribe(res=>{
      if(res){
        this.getData();
      }
    })
   this.getData();
  }
  getData(){
    this.itemarray=localStorage.getItem("profile");
    // console.log(localStorage.getItem("profile"));
    // console.log(this.itemarray);
    this.itemarray=JSON.parse(this.itemarray);
    // console.log(this.itemarray);
  }
  deleteRow(id:any){
  //  console.log(id)
   this.itemarray.splice(id,1)
   localStorage.setItem('profile',JSON.stringify(this.itemarray))
  //  console.log(this.itemarray)
}

updateRow(id:any)
{
  // this.formValue.value
  console.log(id)
  console.log(this.itemarray[id].name)
  console.log(this.itemarray[id].email)
  console.log(this.itemarray[id].address)
  console.log(this.itemarray[id].gender)
  this.commonService.updateData.next(id)
}

}
