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
  // title = 'angular-text-search-highlight';
  // characters = [
  //   'Ant-Man',
  //   'Aquaman',
  //   'Asterix',
  //   'The Atom',
  //   'The Avengers',
  //   'Batgirl',
  //   'Batman',
  //   'Batwoman',
  // ]
  searchText = '';
  isSubmitted = false;
  // City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];
  Types: string[] = ['small', 'medium', 'square', 'original'];
  Filters: string[] = ['blur', 'mono', 'sepia', 'negative', 'paint', 'pixel'];
  constructor(public fb: FormBuilder, public store: StoreService) {}

  ngOnInit() {
    let typeValue = ''
    let filterValue = ''
    let searchField = ''
    this.store.setParams(typeValue, filterValue, searchField)
  }

  form: FormGroup = this.fb.group({
    // cityName: ['', [Validators.required]],
    typeValue: ['', [Validators.required]],
    filterValue: ['', [Validators.required]],
    searchField: ['', [Validators.required]]
  });

  changeType(e: any) {
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
    // let typeValue: string = this.form.get('typeValue').value?.split(' ')[1]
    // let filterValue: string = this.form.get('filterValue').value?.split(' ')[1]
    let typeValue = "small" // temp data
    let filterValue = "blur" // temp data
    let searchField: string = this.form.get('searchField').value
    console.log(this.form);
    debugger;
    this.isSubmitted = true;
    if (!this.form.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.form.value));
    }
    this.store.setParams(typeValue, filterValue, searchField);
    this.store.getImg(typeValue, filterValue, searchField);
  }

}
