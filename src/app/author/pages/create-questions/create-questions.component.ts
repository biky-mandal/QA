import { Component, OnInit } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionData, setDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Observable, of, tap } from 'rxjs';
import { ICategory, ISubCategory } from 'src/app/shared/interfaces/Category';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements OnInit {

  qid!: string;
  categories$!: Observable<any>;
  countries$!: Observable<any>;
  categoriesName: string[] = [];
  subCategoriesName: string[] = [];
  countriesName: string[] = [];
  statesName: string[] = [];
  selectedCategories: string[] = [];
  selectedSubCategories: string[] = [];
  selectedCountries: string[] = [];
  selectedStates: string[] = [];


  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder,
    private firestore: Firestore,
    private snackbarService: SnackbarService
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

    this.selectedCategories = selectedCategories;

    this.categories$.subscribe((categories: ICategory[]) => {
      categories.map((cat: ICategory) => {
        if (selectedCategories.includes(cat.name)) { // If we find the selected category in all categories
          cat.subCategories?.map((sc: ISubCategory) => {
            this.subCategoriesName.push(sc.name);
          })
        }
      })
    })

  }

  getSelectedSubCategories = (selectedSubCategories: string[]) => {
    this.selectedSubCategories = selectedSubCategories;
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

    this.selectedCountries = selectedCountries;

    this.countries$.subscribe((countries: any) => {
      countries.map((country: any) => {
        if (selectedCountries.includes(country.name)) { // If we find the selected category in all categories
          country.states?.map((state: any) => {
            this.statesName.push(state.name);
          })
        }
      })
    })
  }
  getSelectedStates = (selectedStates: string[]) => {
    this.selectedStates = selectedStates;
  }

  // FirstFormDone = () => {
  //   console.log(this.firstFormGroup.value);
  // }

  // getData = () => {
  //   console.log(this.secondFormGroup.value);
  // }




  createQuestionPaylaod = () => {
    this.qid = uuidv4(); 
    let obj: any = {
      id: this.qid,
      slug: `q-${this.qid}`,
      question: this.firstFormGroup.value['question'],
      categories: this.selectedCategories,
      subCategories: this.selectedSubCategories,
      countries: this.selectedCountries,
      states: this.selectedStates,
      eventDate: moment(this.secondFormGroup.value['eventDate']).utc().format(),
      options: [
        { key: 'A', value: this.firstFormGroup.value['A'] },
        { key: 'B', value: this.firstFormGroup.value['B'] },
        { key: 'C', value: this.firstFormGroup.value['C'] },
        { key: 'D', value: this.firstFormGroup.value['D'] },
      ],
      createdOn: moment().utc().format(),
      createdBy: localStorage.getItem('uid')
    }
    
    return obj;
  }

  createAnswerPaylaod = () => {
    let obj: any = {
      id: uuidv4(),
      qid: this.qid,
      key: this.firstFormGroup.value['correctOption'],
      description: this.firstFormGroup.value['answerDesc'],
      createdOn: moment().utc().format(),
      createdBy: localStorage.getItem('uid')
    }
    return obj;
  }

  createQuestion = () => {
    let qPayload: any = this.createQuestionPaylaod();
    let aPayload: any = this.createAnswerPaylaod();

    const questionsCollectionRef = collection(this.firestore, 'questions');
    const answersCollectionRef = collection(this.firestore, 'answers');

    setDoc(doc(questionsCollectionRef, qPayload.id), qPayload)
    .then(() => {
      setDoc(doc(answersCollectionRef, aPayload.id), aPayload)
      .then(() => {
        this.snackbarService.openSnackBar('Question Created.');
      })
      .catch(() => {
        // If Answer creation Failed! We have to roll back the question
        deleteDoc(doc(questionsCollectionRef, aPayload.id))
        .then(() => {
          this.snackbarService.openSnackBar('Question Creation Failed!');
        })
      })
    })
    .catch(() => {
      this.snackbarService.openSnackBar('Question Creation Failed!');
    })
  }
}
