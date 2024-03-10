import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-multiselect-chips',
  templateUrl: './multiselect-chips.component.html',
  styleUrls: ['./multiselect-chips.component.css']
})
export class MultiselectChipsComponent implements OnInit{

  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() allInputData!: string[];
  @Output() selectedData = new EventEmitter<string[]>();
  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  dataCtrl = new FormControl('');
  filteredData: Observable<string[]>;
  data: string[] = [];
  allData: string[] = [];

  @ViewChild('dataInput') dataInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredData = this.dataCtrl.valueChanges.pipe(
      startWith(null),
      map((d: string | null) => (d ? this._filter(d) : this.allData?.slice())),
    );
  }

  ngOnInit(): void {
    this.allData = this.allInputData;
  }

  emitData = (values: string[]) => {
    this.selectedData.emit(values);
  }

  remove(data: string): void {
    const index = this.data.indexOf(data);

    if (index >= 0) {
      this.data.splice(index, 1);
      this.emitData(this.data);
      this.announcer.announce(`Removed ${data}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.data.includes(event.option.viewValue)){
      this.data.push(event.option.viewValue);
      this.emitData(this.data);
    }
    this.dataInput.nativeElement.value = '';
    this.dataCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allData.filter(data => data.toLowerCase().includes(filterValue));
  }
}
