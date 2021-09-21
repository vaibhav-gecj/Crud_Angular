import { Component, OnInit, Output, Type, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscriber } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { TabledataService } from '../tabledata.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formValue!: FormGroup;
  isUpdate: boolean = false;
  image:any
  @Output() sendData = new EventEmitter();
  // constructor() { }
  public input: any;
  public constructor(
    private _commonService: LocalStorageService,
    private formbuilder: FormBuilder
  ) {}
  id: any;
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      image: new FormControl(null, [Validators.required])
    });
    this._commonService.updateData.subscribe((res) => {
      this.updateRecord(res);
      this.id = res;
    });
  }
  filechange(event:any){
    console.log(event);
    const reader=new FileReader()
    reader.onload=(e)=>{
      this.image=reader.result
      this.formValue.controls.image.setValue(this.image)
    }
    reader.readAsDataURL(event.target.files[0])
    

  }


  onSubmit() {
    if (!this.isUpdate) {
      let array: any = [];
      let n: any[] = [];
      let ab: any = localStorage.getItem('profile');
      // let ab:any=JSON.parse(localStorage.getItem("profile"));
      // console.log();
      ab = JSON.parse(ab);
      console.log(ab);
      if (ab) {
        array = ab;
        console.log(array);
        //  n=array
      }
      array.push(this.formValue.value);

      localStorage.setItem('profile', JSON.stringify(array));
      this._commonService.itemRefresh.next('Updated');
      // console.log(this.formValue);

      this.sendData.emit(this.formValue);
      this.formValue.reset('');
    } else {
      const array: any = JSON.parse(localStorage.getItem('profile') || '[]');
      array[this.id] = this.formValue.value;
      localStorage.setItem('profile', JSON.stringify(array));
      this.isUpdate=false
      this.formValue.reset('')
      this._commonService.itemRefresh.next('Updated');
    }
  }

  updateRecord(id: any) {
    const array: any = JSON.parse(localStorage.getItem('profile') || '[]');
    this.isUpdate=true;
    array.forEach((element: any, index: any) => {
      if (index == id) {
        console.log(element);
        this.formValue.patchValue({
          name: element.name,
          email: element.email,
          address: element.address,
          gender: element.gender,
        });
      }
    });
  }
}
