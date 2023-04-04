import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter()
  form: FormGroup;
  searchText = '';
  isSubmitted = false;
  Types: string[] = ['small', 'medium', 'square', 'original'];
  Filters: string[] = ['blur', 'mono', 'sepia', 'negative', 'paint', 'pixel'];
  public localState: any = {
    typeValue: '',
    filterValue: '',
    searchField: ''
  }
  constructor(public fb: FormBuilder, public store: StoreService) {}

  ngOnInit() {
    // Получаем значения полей формы из stor'a
    let {type, filter, searchField} = this.store.getState();
    this.localState.typeValue = type;
    this.localState.filterValue = filter;
    this.localState.searchField = searchField;
    debugger;
    // Инициализируем форму
    let temp1 = `${this.Types.indexOf(this.localState.typeValue) + 1}: ${this.localState.typeValue}`
    let temp2 = `${this.Filters.indexOf(this.localState.filterValue) + 1}: ${this.localState.filterValue}`
    debugger;
    this.form = this.fb.group({
      // задаем поля формы следующим образом:
      // 1) указываем номер option'a
      // 2) задаем значение сохраненное из sessionStorage
      typeValue: [`${this.Types.indexOf(this.localState.typeValue) + 1}: ${this.localState.typeValue}`, [Validators.required]],
      filterValue: [`${this.Filters.indexOf(this.localState.filterValue) + 1}: ${this.localState.filterValue}`, [Validators.required]],
      searchField: [this.localState.searchField, [Validators.required]]
    });
  }

  changeType(e: any) {
    debugger
    this.typeValue?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeFilter(e: any) {
    this.filterValue?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Access formcontrols getter
  get typeValue() {
    return this.form.get('typeValue');
  }

  get filterValue() {
    return this.form.get('filterValue');
  }

  onSubmit(): void {
    // undefined если нет данных в поле
    let typeValue: string = this.form.get('typeValue').value?.split(' ')[1]
    let filterValue: string = this.form.get('filterValue').value?.split(' ')[1]
    let type: string = ''
    let filter: string = ''
    if(typeValue) {
      type = typeValue
    } 
    // else if(sessionStorage.getItem('type')) {
    //   type = sessionStorage.getItem('type')
    // }

    if(filterValue) {
      filter = filterValue
    } 
    // else if(sessionStorage.getItem('filter')) {
    //   filter = sessionStorage.getItem('filter')
    // }

    // let typeValue = "small" // temp data
    // let filterValue = "blur" // temp data
    let searchField: string = this.form.get('searchField').value
    console.log(this.form);
    debugger;
    this.isSubmitted = true;
    if (!this.form.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.form.value));
    }
    // this.store.setParams(typeValue, filterValue, searchField);
    this.store.getImg(typeValue, filterValue, searchField);
  }

}
