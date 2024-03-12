import { Component } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ICategory, ISubCategory } from '../shared/interfaces/Category';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-practice-dashboard',
  templateUrl: './practice-dashboard.component.html',
  styleUrls: ['./practice-dashboard.component.css']
})
export class PracticeDashboardComponent {

  position: 'SIDE' | 'BOTTOM' = 'SIDE';
  categoriesData$!: Observable<any>;
  countriesData$!: Observable<any>;
  questions$!: Observable<any>;
  categoriesName: string[] = [];
  subCategoriesName: string[] = []
  countries: string[] = [];
  states: string[] = []

  sCategoriesName: string[] = [];
  sSubCategoriesName: string[] = []
  sCountries: string[] = [];
  sStates: string[] = [];

  range!: FormGroup;
  startDate: any;
  endDate: any;
  finalData: any[] = [];


  constructor(
    private router: Router,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    // Default Route
    this.router.navigate(['/practice/questions']);
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });

    this.getallFilterData();

    this.position = window.innerWidth <= 820 ? 'BOTTOM' : 'SIDE';
  }

  getallFilterData = () => {
    const catCollectionRef = collection(this.firestore, 'categories');
    const countriesCollectionRef = collection(this.firestore, 'countries');

    this.categoriesData$ = collectionData(catCollectionRef);
    this.countriesData$ = collectionData(countriesCollectionRef);


    this.categoriesData$.subscribe((categories: any[]) => {
      categories.map((cat: any) => {
        this.categoriesName.push(cat.name);
      })
    })

    this.countriesData$.subscribe((countries: any) => {
      countries.map((country: any) => {
        this.countries.push(country.name);
      })
    })
  }

  getSelectedCategories = (selectedCategories: string[]) => {

    this.subCategoriesName = []; // Reseting sub categories
    this.sCategoriesName = selectedCategories;

    this.categoriesData$.subscribe((categories: ICategory[]) => {
      categories.map((cat: ICategory) => {
        if (selectedCategories.includes(cat.name)) {
          cat.subCategories?.map((sc: ISubCategory) => {
            this.subCategoriesName.push(sc.name);
          })
        }
      })
    })

    if (this.sCategoriesName.length) this.fetchQuestions('CAT');
  }



  getSelectedSubCategories = (selectedSubCategories: string[]) => {
    this.sSubCategoriesName = selectedSubCategories;

    if (this.sSubCategoriesName.length) this.fetchQuestions('SCAT');
  }


  getSelectedCountires = (selectedCountires: string[]) => {

    this.states = [];
    this.sCountries = selectedCountires;

    this.countriesData$.subscribe((countries: any) => {
      countries.map((country: any) => {
        if (selectedCountires.includes(country.name)) {
          country.states?.map((s: any) => {
            this.states.push(s.name);
          })
        }
      })
    })

    if (this.sCountries.length) this.fetchQuestions('COUNTRY');
  }


  getSelectedStates = (selectedStates: string[]) => {
    this.sStates = selectedStates;

    if (this.sStates.length) this.fetchQuestions('STATE');
  }

  dateChangeHandler = () => {
    this.startDate = moment(this.range.value['start']).utc().format();
    this.endDate = moment(this.range.value['end']).utc().format();
  }


  fetchQuestions = (type: 'CAT' | 'SCAT' | 'COUNTRY' | 'STATE' | 'DATE') => {

    const questionCollectionRef = collection(this.firestore, 'questions');

    let query!: any;

    switch (type) {
      case 'CAT': {
        query = query(questionCollectionRef, where('categories', 'array-contains-any', this.sCategoriesName));
        break;
      }
      case 'SCAT':
        query = query(questionCollectionRef, where('subSategories', 'array-contains-any', this.sSubCategoriesName));
        break;
      case 'COUNTRY':
        query = query(questionCollectionRef, where('countries', 'array-contains-any', this.sCountries));
        break;
      case 'STATE':
        query = query(questionCollectionRef, where('states', 'array-contains-any', this.sStates));
        break;
      default:
        query = query(questionCollectionRef, where('eventDate', '<=', this.endDate), where('eventDate', '>=', this.startDate));
        break;
    }


    this.getDataAcrToQuery(query);

    this.filterData();
  };

  shallowEqualityCheck(obj1: any, obj2: any) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  filterData() {
    this.questions$.subscribe((d: any) => {
      d.map((data: any) => {
        if (this.finalData.length) {
          if (!this.finalData.some((existingData: any) => this.shallowEqualityCheck(existingData, data))) {
            this.finalData.push(data);
          }
        } else {
          this.finalData = [...data];
        }
      })
    })

    console.log(this.finalData);
  }

  getDataAcrToQuery = (query: any) => {
    this.questions$ = (collectionData(query)).pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a as any;
          // const { id, name } = data;
          return data;
        });
      })
    );
  }

}
