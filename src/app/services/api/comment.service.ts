import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { API_GET_NEWS_COMMENTS } from "./api.path";
import { IPageResponse } from "src/app/models/page-response.model";

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http: HttpClient = inject(HttpClient);

  public getComments(newsId: number, currentPage: number, sizeOfPage: number): Observable<IPageResponse> {
    let params = new HttpParams();
    params = params.append("page",currentPage);
    params = params.append("size",sizeOfPage);

    return this.http.get<IPageResponse>(API_GET_NEWS_COMMENTS.START + `${newsId}` + API_GET_NEWS_COMMENTS.END,{params: params});
  }
}