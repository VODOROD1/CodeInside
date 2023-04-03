import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent {
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
  constructor(public fb: FormBuilder) {}
  form: FormGroup = this.fb.group({
    cityName: ['', [Validators.required]],
    typeValue: ['', [Validators.required]],
    filterValue: ['', [Validators.required]],
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
    debugger;
    console.log(this.form);
    this.isSubmitted = true;
    if (!this.form.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.form.value));
    }
  }

}
