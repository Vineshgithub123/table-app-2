// Framework Imports;
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Rxjs Imports
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/internal/Observable';
// User Defined Imports
import { TableData } from 'src/app/core/interfaces/table.interface';

@Injectable({ providedIn: 'root' })
export class TableDataStore {
  private http: HttpClient = inject(HttpClient);
  private tableData = new BehaviorSubject<TableData[]>([]);
  private dataUrl = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';

  /**
   * Retrieves all table data;
   *  If the data is already loaded, it returns the cached data. otherwise, returns the data fetched from the url.
   * @returns Observable emitting array of data of type TableData interface
   */
  getAllData(): Observable<TableData[]> {
    if (this.tableData.getValue().length > 0) {
      return this.tableData.asObservable();
    }
    return this.http.get<any[]>(this.dataUrl).pipe(
      tap((data: any[]) => {
        this.tableData.next(data);
      })
    );
  }

  /**
   * Updates a specific item in the table data at the given index with new data.
   * The updated data replaces the existing data at the specified index.
   * @param index - The index of the item in the table data array to update.
   * @param newData - The new data to replace the existing item at the specified index.
   */
  updateData(index: number, newData: TableData) {
    const currentData = this.tableData.getValue();
    const updatedData = [...currentData];
    updatedData[index] = newData;
    this.tableData.next(updatedData);
  }
}

