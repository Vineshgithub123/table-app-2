// Frameworks Imports
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
// Rxjs Imports
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
// User Defined Imports
import { PascalCasePipe } from 'src/app/core/pipes/pascal-case.pipe';
import { TableDataStore } from 'src/app/core/services/table-data.store';
import { TableData } from 'src/app/core/interfaces/table.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    PascalCasePipe,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public detailsForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    bio: new FormControl(''),
    language: new FormControl(''),
    version: new FormControl(''),
    id: new FormControl(''),
  });
  itemId!: number;
  totalData!: TableData[];
  item?: TableData;

  private destroy$: Subject<void> = new Subject<void>();

  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private dataService: TableDataStore = inject(TableDataStore);

  /**
   * Initializes the component and fetches the data based on the ID from the route parameters.
   */
  ngOnInit(): void {
    this.getDataById();
  }

  /**
   * Retrieves the data item by ID from the TableDataStore service and initializes the form with the item's details.
   * Uses the ID from the route parameters to find the specific item in the data set.
   */
  getDataById(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getAllData().pipe(
      tap((data: TableData[]) => {
        this.totalData = data;
        this.item = data.find((item: TableData) => item.id === id);
        console.log(this.item);
        if (this.item) {
          this.detailsForm.patchValue({
            name: this.item.name,
            version: this.item.version,
            bio: this.item.bio,
            language: this.item.language,
            id: this.item.id,
          });
        }
      }),
      takeUntil(this.destroy$),
      catchError((err: Error) => {
        console.error('Error loading data', err);
        return [];
      })
    ).subscribe();
  }

  /**
   * Submits the form data and updates the corresponding item in the TableDataStore.
   * Navigates back to the home page after updating the data.
   */
  onSubmit(): void {
    const index = this.item ? this.totalData.indexOf(this.item) : 0;
    this.dataService.updateData(index, this.detailsForm.value);
    this.router.navigate(['/']);
  }

  /**
   * Returns an array of keys from the given TableData item.
   * Used for iterating over the properties of the item in the template.
   * @param item - The TableData item whose keys are to be returned.
   * @returns An array of strings representing the keys of the item.
   */
  objectKeys(item: TableData): string[] {
    return Object.keys(item);
  }

  /**
   * Cleans up resources when the component is destroyed.
   * Completes the destroy subject to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
