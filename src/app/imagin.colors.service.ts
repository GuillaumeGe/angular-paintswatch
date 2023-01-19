import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ImaginColorsService {
  availableColorCodes = ["", ""];
  constructor(private http: HttpClient) {

  }

  getPaintSwatches(makeName: string): Observable<any> {
    return undefined;
  }
}
