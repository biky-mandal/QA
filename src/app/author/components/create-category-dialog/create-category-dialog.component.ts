import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, collectionData, setDoc, doc, docData, DocumentReference, CollectionReference, arrayUnion, updateDoc } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { ISubCategory, ICategory } from 'src/app/shared/interfaces/Category';
import * as moment from 'moment';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.css']
})
export class CreateCategoryDialogComponent {

  value: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private snackbarService: SnackbarService
  ) { }

  create = () => {

    const categoryCollectionRef: CollectionReference = collection(this.firestore, 'categories');
    let payload = this.createPayload();

    // To add the category
    if (this.data.type === 'CAT') {
      setDoc(doc(categoryCollectionRef, payload.id), payload)
        .then((res: any) => {
          this.snackbarService.openSnackBar('Category Created!');
          this.onNoClick();
        }).catch((err: any) => {
          this.snackbarService.openSnackBar('Failed!');
          this.onNoClick();
        })
    }
    // To add the sub category
    else {
      updateDoc(doc(categoryCollectionRef, this.data.node.id), { subCategories: arrayUnion(payload) })
        .then((res: any) => {
          this.snackbarService.openSnackBar('Sub Category Added!');
          this.onNoClick();
        }).catch((err: any) => {
          this.snackbarService.openSnackBar('Failed!');
          this.onNoClick();
        })
    }
  }

  createPayload = () => {
    let obj: ICategory = {
      id: uuidv4(),
      slug: this.value.split(' ').join('_').toLowerCase(),
      name: this.value,
      created_on: moment().utc().format(),
      updated_on: moment().utc().format(),
    }
    if (this.data.type === 'CAT') obj['subCategories'] = [];

    return obj;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
