import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formData:any=[];
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public input: any;
  public constructor(){
    this.input={
      "name":""
    }
  }
  sendData(data:any){
    console.log(data)
    this.formData=data;
  }


}
