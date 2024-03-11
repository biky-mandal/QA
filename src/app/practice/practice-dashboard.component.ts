import { Component } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ICategory, ISubCategory } from '../shared/interfaces/Category';
import { FormControl, FormGroup } from '@angular/forms';

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

    this.fetchQuestions();
  }



  getSelectedSubCategories = (selectedSubCategories: string[]) => {
    this.sSubCategoriesName = selectedSubCategories;
    this.fetchQuestions();
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

    this.fetchQuestions();
  }


  getSelectedStates = (selectedStates: string[]) => {
    this.sStates = selectedStates;
    this.fetchQuestions();
  }

  generatePayload = () => {
    let obj: any = {

    }
    return obj;
  }

  fetchQuestions = () => {
    // let payload: any = this.generatePayload();

    // console.log(payload);

    const questionCollectionRef = collection(this.firestore, 'questions');
    const appQuery = query(questionCollectionRef,
      where('categories', 'in', this.sCategoriesName),
      where('subCategories', 'in', this.sSubCategoriesName),
      where('countries', 'in', this.sCountries),
      where('states', 'in', this.sStates),
      where('eventDate', '>=', this.range.value.start),
      where('eventDate', '<=', this.range.value.end),
    );

    this.getDataAcrToQuery(appQuery);

    this.questions$.subscribe((d: any) => {
      console.log(d);
    })

  };

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
