import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, Observable, throwError, switchMap, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Paintswatch } from './paintswatch.type';



@Injectable()
export class ImaginColorsService {
  availableColorCodes = ['', ''];
  constructor(private http: HttpClient) {}

  toArray = (data: Object) => {
    return Object.keys(data).map((key) => data[key]);
  };

  getPaintSwatches(makeName: string, ids: string[]): Observable<Paintswatch[]> {
    const val = ids.join(',');
    const url = `https://cdn.imagin.studio/getPaintSwatches?make=${makeName}&paints=${val}`;

    interface GetPaintSwatchesResponse {
      make: string;
      paints: Object;
    }
    return this.http.get<GetPaintSwatchesResponse>(url).pipe(
      filter((x) => x.make === makeName),
      switchMap((response) =>
        of(Object.keys(response.paints)).pipe(
          map((imaginIDs) =>
            imaginIDs.map(
              (imaginID) =>
                ({
                  colors: [
                    {
                      baseColorRGBCode:
                        response.paints[imaginID]['primarySprayCan'][
                          'primarySprayCanLowLightRGB'
                        ] ?? '',
                      highLightColorRGBCode:
                        response.paints[imaginID]['primarySprayCan'][
                          'primarySprayCanHighLightRGB'
                        ] ?? '',
                    },
                  ],
                  manufacturerNames: [imaginID],
                } as Paintswatch)
            )
          )
        )
      )
    );
  }
}
