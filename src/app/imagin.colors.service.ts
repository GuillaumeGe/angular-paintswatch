import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, Observable, throwError, switchMap, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Paintswatch } from './paintswatch.type';

interface ImaginGetPaintsResponse
  extends Readonly<{
    paintData: Readonly<{
      make: string;
      target: string;
      paintCombinations: Object;
    }>;
  }> {}

interface ImaginMap
  extends Readonly<{
    mapped: Object;
    paintSwatch: Object;
  }> {}

interface ImaginPaintSwatchColor
  extends Readonly<{
    lowLight: string;
    midLight?: string;
    highLight: string;
    colourCluster: string;
    paintType: string;
  }> {}

@Injectable()
export class ImaginColorsService {
  availableColorCodes = ['', ''];
  constructor(private http: HttpClient) {}

  toArray = (data: Object) => {
    return Object.keys(data).map((key) => data[key]);
  };

  getAllPaintSwatches(makeName: string): Observable<Object[]> {
    const url = `https://cdn.imagin.studio/getPaints?customer=sofico&target=make&make=${makeName}`;
    return this.http.get<ImaginGetPaintsResponse>(url).pipe(
      filter((res) => res.paintData.make === makeName),
      map((r) => this.toArray(r.paintData.paintCombinations) as ImaginMap[]),
      map((x) => x.map((c) => this.toArray(c.mapped)))
    );
  }

  getPaintSwatch(makeName: string, id: string): Observable<Object> {
    return undefined;
  }

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
