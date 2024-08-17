// Framework Imports;
import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
// Rxjs Imports;
import { Subscription } from 'rxjs/internal/Subscription';
import { tap } from 'rxjs/internal/operators/tap';
import { delay } from 'rxjs/internal/operators/delay';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { of } from 'rxjs/internal/observable/of';
// User defined Imports;
import { TableDataStore } from 'src/app/core/services/table-data.store';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { PascalCasePipe } from 'src/app/core/pipes/pascal-case.pipe';
import { HighlightOnHoverDirective } from 'src/app/core/directives/highlight-directive';
import { TableData } from 'src/app/core/interfaces/table.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    PaginationComponent,
    PascalCasePipe,
    HighlightOnHoverDirective
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  private data: TableData[] = [];
  public originalData: TableData[] = [];
  public filteredData: TableData[] = [];
  public headers: string[] = [];
  public itemsPerPage: number = 5;
  public searchText: string = '';
  public currentPage: number = 1;
  public isEditing: { [id: number | string]: boolean } = {};
  public isLoader: boolean = false;

  private dataSubscription: Subscription = new Subscription();
  private destroy$: Subject<void> = new Subject<void>();
  
  private dataService = inject(TableDataStore);
  private router: Router = inject(Router);

  @ViewChild('bioTextarea', { static: false }) bioTextarea!: ElementRef;

  get haveData(): boolean {
    return !!this.filteredData.length;
  }

  /**
   * Returns the currently paginated data based on the current page and items per page.
   * @returns An array of TableData items for the current page.
   */
  get paginatedData(): TableData[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }

  /**
   * Returns the full filtered data set.
   * @returns An array of TableData items that have been filtered according to the search criteria.
   */
  get totalData(): TableData[] {
    return this.filteredData;
  }

  /**
   * Initializes the component by fetching data from the service.
   */
  ngOnInit(): void {
    this.getData();
  }

  /**
   * Fetches data from the TableDataStore service and initializes the component's data properties.
   * Sets loading state and handles any errors that occur during data fetching.
   */
  getData(): void {
    this.isLoader = true;
    this.dataSubscription = this.dataService
      .getAllData()
      .pipe(
        tap((data) => {
          this.data = data;
          this.originalData = data;
          this.filteredData = data;
          this.headers = Object.keys(data[0] || {});
          this.currentPage = 1;
        }),
        delay(100),
        tap(() => (this.isLoader = false))
      )
      .subscribe({
        error: (err: Error) => {
          console.error(err);
        },
      });
  }

  /**
   * Navigates to the details page of the specified item.
   * @param itemId - The ID of the item to view details for.
   */
  navigateToDetails(itemId: string): void {
    this.router.navigate(['/details', itemId]);
  }

  /**
   * Enables editing mode for a specific cell in the table.
   * Focuses the textarea if the cell being edited is the 'bio' field.
   * @param item - The TableData item whose cell is being edited.
   * @param header - The header of the column being edited.
   */
  editCell(item: TableData, header: string): void {
    if (header === 'bio') {
      this.isEditing[item.id] = true;
      of(true).pipe(
        delay(0),
        tap(() => {
          if (this.bioTextarea && this.bioTextarea.nativeElement) {
            this.bioTextarea.nativeElement.focus();
          }
        }),
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }

  /**
   * Saves changes made to a specific cell and updates the data in the store.
   * Exits editing mode after saving the changes.
   * @param item - The TableData item with changes to be saved.
   * @param header - The header of the column being edited.
   * @param event - The event that triggered the save action, used to get the new value.
   */
  saveChanges(item: TableData, header: string, event: Event): void {
    const index = this.data.indexOf(item);
    const target = event.target as HTMLInputElement;
    if(header === 'bio') {
      item.bio = target.value;
    }
    this.cancelEdit(item);
    this.dataService.updateData(index, { ...item });
  }

  /**
   * Cancels the editing mode for a specific cell.
   * @param item - The TableData item for which editing mode is being canceled.
   */
  cancelEdit(item: TableData): void {
    this.isEditing[item.id] = false;
  }

  /**
   * Updates the current page number.
   * @param page - The new page number to set.
   */
  changePage(page: number): void {
    this.currentPage = page;
  }

  /**
   * Filters the table data based on the search input.
   * Updates the filteredData and resets the current page to 1.
   * @param event - The event triggered by the search input, used to get the search term.
   */
  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();
    if (searchTerm) {
      this.filteredData = this.originalData.filter((item: TableData) =>
        item.name.toLowerCase().includes(searchTerm) || item.language.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredData = [...this.originalData];
    }
    this.currentPage = 1;
  }

  /**
   * Cleans up subscriptions and other resources when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
