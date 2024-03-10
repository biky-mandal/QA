import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';
import { ICategory, ISubCategory } from 'src/app/shared/interfaces/Category';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements OnInit {

  categories$!: Observable<any>;
  countries$!: Observable<any>;
  categoriesName: string[] = [];
  subCategoriesName: string[] = [];
  countriesName: string[] = [];
  statesName: string[] = [];
 

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder,
    private firestore: Firestore,
  ) { }

  ngOnInit(): void {

    this.fetchCategoryData();
    this.fetchCountriesData();

    this.firstFormGroup = this._formBuilder.group({
      question: ['', Validators.required],
      A: ['', Validators.required],
      B: ['', Validators.required],
      C: ['', Validators.required],
      D: ['', Validators.required],
      correctOption: ['', Validators.required],
      answerDesc: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      eventDate: ['', Validators.required],
    });
  }

  fetchCategoryData = () => {
    const catCollectionRef = collection(this.firestore, 'categories');
    this.categories$ = collectionData(catCollectionRef);

    this.categories$.subscribe((categories: ICategory[]) => {
      this.categoriesName = [];
      categories.map((cat: ICategory) => {
        this.categoriesName.push(cat.name);
      })
    })
  }

  getSelectedCategories = (selectedCategories: string[]) => {

    this.subCategoriesName = []; // Resetting sub category
    
    this.categories$.subscribe((categories: ICategory[]) => {
      categories.map((cat: ICategory) => {
        if(selectedCategories.includes(cat.name)){ // If we find the selected category in all categories
          cat.subCategories?.map((sc: ISubCategory) => {
            this.subCategoriesName.push(sc.name);
          })
        }
      })
    })

  }

  getSelectedSubCategories = (selectedSubCategories: string[]) => {
    console.log(selectedSubCategories);
  }


  fetchCountriesData = () => {
    const countriesCollectionRef = collection(this.firestore, 'countries');
    this.countries$ = collectionData(countriesCollectionRef);

    this.countries$.subscribe((countries: any) => {
      this.countriesName = [];
      countries.map((countr: any) => {
        this.countriesName.push(countr.name);
      })
    })
  }

  getSelectedCountries = (selectedCountries: string[]) => {
    this.statesName = []; // Resetting sub category
    
    this.countries$.subscribe((countries: any) => {
      countries.map((country: any) => {
        if(selectedCountries.includes(country.name)){ // If we find the selected category in all categories
          country.states?.map((state: any) => {
            this.statesName.push(state.name);
          })
        }
      })
    })
  }
  getSelectedStates = (selectedStates: string[]) => {
    console.log(selectedStates);
  }






  FirstFormDone = () => {
    console.log(this.firstFormGroup.value);
  }

  getData = () => {
    console.log(this.secondFormGroup.value);
  }
}
