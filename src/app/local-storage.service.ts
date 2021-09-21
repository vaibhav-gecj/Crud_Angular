import { Injectable } from '@angular/core';import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})export class LocalStorageService {
constructor() { }
itemRefresh:Subject<any>=new Subject();
updateData:Subject<any>=new Subject()
}