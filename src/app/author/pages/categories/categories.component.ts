import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CreateCategoryDialogComponent } from '../../components/create-category-dialog/create-category-dialog.component';
import { Firestore, collection, collectionData, doc, docData, updateDoc, CollectionReference, query, where, QuerySnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';

interface ICategoryL {
  name: string;
  id: string;
  subCategories?: ICategoryL[];
}

interface ICategoriesFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: string;
}


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  dialogWidth: string = '50%';
  dataChange: BehaviorSubject<ICategoryL[]> = new BehaviorSubject<ICategoryL[]>([]);
  categories$!: Observable<any>;

  private _transformer = (node: ICategoryL, level: number) => {
    return {
      expandable: !!node.subCategories,
      name: node.name,
      level: level,
      id: node.id
    };
  };

  treeControl = new FlatTreeControl<ICategoriesFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.subCategories,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    public dialog: MatDialog,
    private firestore: Firestore,
  ) {
    this.dataChange.subscribe(data => this.dataSource.data = data);
    this.fetchData();
  }
  ngOnInit(): void {
    this.dialogWidth = window.innerWidth <= 820 ? '100%' : '50%';
  }


  fetchData = () => {
    const catCollectionRef = collection(this.firestore, 'categories');
    this.categories$ = collectionData(catCollectionRef);

    // const subCatCollectionRef = collection(this.firestore, 'subcategories');

    this.categories$.subscribe((data: any) => {
      this.setData(data);
      // let tableData: ICategoryL[] = [];
      // data.map((d: any) => {
      //   let obj: any = {};
      //   obj['name'] = d.name;
      //   obj['id'] = d.id;

      //   const appQuery = query(subCatCollectionRef, where('categoryId', '==', d.id));
      //   this.getDataAcrToQuery(appQuery);

      //   this.subCategories$.subscribe((d: any) => {
      //     obj['subCategories'] = d;
      //     tableData.push(obj);
      //     this.setData(tableData);
      //   })
      // })
    })
  }

  // getDataAcrToQuery = (query: any) => {
  //   this.subCategories$ = (collectionData(query)).pipe(
  //     map((actions) => {
  //       return actions.map((a) => {
  //         const data = a as any;
  //         const { id, name } = data;
  //         return { id, name };
  //       });
  //     })
  //   );
  // }

  hasChild = (_: number, node: ICategoriesFlatNode) => {
    return node.expandable
  };


  setData = (data: ICategoryL[]) => {
    this.dataChange.next(data);
  }

  openDialog(type: string, node: any): void {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      data: {
        type: type,
        node: node
      },
      width: this.dialogWidth,
      minHeight: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
