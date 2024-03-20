import { Component } from '@angular/core';
import { Firestore, collection, collectionData, limit, orderBy, query, startAfter, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { ICategory, ISubCategory } from '../shared/interfaces/Category';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-practice-dashboard',
  templateUrl: './practice-dashboard.component.html',
  styleUrls: ['./practice-dashboard.component.css']
})
export class PracticeDashboardComponent {

  WIN: Window = window;
  filterToggle: boolean = false;
  latestDoc: any = null;
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
    this.getRandomQuestions();

    this.filterToggle = window.innerWidth <= 820 ? false : true;
    this.position = window.innerWidth <= 820 ? 'BOTTOM' : 'SIDE';
  }

  toggleFilter = () => {
    this.filterToggle = !this.filterToggle;
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

  getRandomQuestions = () => {
    const questionCollectionRef = collection(this.firestore, 'questions');
    const qry = query(questionCollectionRef, orderBy('createdOn', 'asc'), startAfter(this.latestDoc ? this.latestDoc.createdOn : this.latestDoc), limit(5));

    this.getDataAcrToQuery(qry);
    this.filterData();
  }


  fetchQuestions = (type: 'CAT' | 'SCAT' | 'COUNTRY' | 'STATE' | 'DATE') => {

    const questionCollectionRef = collection(this.firestore, 'questions');

    let qry!: any;

    switch (type) {
      case 'CAT':
        qry = query(questionCollectionRef, where('categories', 'array-contains-any', this.sCategoriesName), orderBy('createdOn', 'desc'), startAfter(this.latestDoc ? this.latestDoc.createdOn : this.latestDoc), limit(5));
        break;
      case 'SCAT':
        qry = query(questionCollectionRef, where('subCategories', 'array-contains-any', this.sSubCategoriesName), orderBy('createdOn', 'desc'), startAfter(this.latestDoc ? this.latestDoc.createdOn : this.latestDoc), limit(5));
        break;
      case 'COUNTRY':
        qry = query(questionCollectionRef, where('countries', 'array-contains-any', this.sCountries), orderBy('createdOn', 'desc'), startAfter(this.latestDoc ? this.latestDoc.createdOn : this.latestDoc), limit(5));
        break;
      case 'STATE':
        qry = query(questionCollectionRef, where('states', 'array-contains-any', this.sStates), orderBy('createdOn', 'desc'), startAfter(this.latestDoc ? this.latestDoc.createdOn : this.latestDoc), limit(5));
        break;
      default:
        qry = query(questionCollectionRef, where('eventDate', '<=', this.endDate), where('eventDate', '>=', this.startDate), orderBy('createdOn', 'desc'), startAfter(this.latestDoc ? this.latestDoc.createdOn : this.latestDoc), limit(5));
        break;
    }


    this.getDataAcrToQuery(qry);
    this.filterData();
  };

  shallowEqualityCheck(obj1: any, obj2: any) {

    // console.log(obj1);
    // console.log(obj2);

    // const keys1 = Object.keys(obj1);
    // const keys2 = Object.keys(obj2);
    // if (keys1.length !== keys2.length) {
    //   return false;
    // }
    // for (const key of keys1) {
    //   if (obj1[key] !== obj2[key]) {
    //     return false;
    //   }
    // }
    // return true;
    if(obj1.id === obj2.id) return true;
    else return false;
  }

  filterData() {
    this.questions$.subscribe((d: any) => {
      let filteredData: any[] = [];
      d.map((data: any) => {
        if (!this.finalData.some((existingData: any) => this.shallowEqualityCheck(existingData, data))) {
          filteredData.push(data);
        }
      })
      if (filteredData.length) {
        this.finalData = [...this.finalData, ...filteredData];
      }
      this.latestDoc = this.finalData[this.finalData.length - 1];
    })

  }

  getDataAcrToQuery = (query: any) => {
    this.questions$ = (collectionData(query)).pipe(
      map((actions) => {
        return actions.map((data: any) => {
          return data;
        });
      })
    );
  }

  handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && this.finalData.length) {
      this.getRandomQuestions()
    }
  }
}
