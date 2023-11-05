import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_GET_NEWS } from "./api.path";
import { IPage } from "src/app/models/page.model";
import { IPageResponse } from "src/app/models/page-response.model";

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    constructor(private _http: HttpClient) {}

    public getNews(currentPage: number, sizeOfPage: number): Observable<IPageResponse> {
        let params = new HttpParams();
        params = params.append("page",currentPage);
        params = params.append("size",sizeOfPage);

        return this._http.get<IPageResponse>(API_GET_NEWS,{params: params});
    }
}

  