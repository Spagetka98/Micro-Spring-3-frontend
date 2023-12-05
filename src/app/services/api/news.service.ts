import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { API_DELETE_NEWS, API_GET_NEWS, API_PUT_NEWS_ADD_DISLIKE, API_PUT_NEWS_ADD_LIKE, API_PUT_NEWS_REMOVE_DISLIKE, API_PUT_NEWS_REMOVE_LIKE } from "./api.path";
import { IPageResponse } from "src/app/models/page-response.model";
import { INews } from "src/app/models/news.model";

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    private http: HttpClient = inject(HttpClient);

    public getNewsById(id: number): Observable<INews> {
        return this.http.get<INews>(API_GET_NEWS + `/${id}`);
    }

    public getNews(currentPage: number, sizeOfPage: number): Observable<IPageResponse> {
        let params = new HttpParams();
        params = params.append("page",currentPage);
        params = params.append("size",sizeOfPage);

        return this.http.get<IPageResponse>(API_GET_NEWS,{params: params});
    }

    public deleteNews(newsId: number): Observable<{}> {
        let params = new HttpParams();
        params = params.append("id",newsId);

        return this.http.delete(API_DELETE_NEWS,{params: params});
    }

    public addLike(newsId: number): Observable<{}> {
        return this.http.put(API_PUT_NEWS_ADD_LIKE.START +`${newsId}`+ API_PUT_NEWS_ADD_LIKE.END,{});
    }

    public removeLike(newsId: number): Observable<{}> {
        return this.http.put(API_PUT_NEWS_REMOVE_LIKE.START +`${newsId}`+ API_PUT_NEWS_REMOVE_LIKE.END,{});
    }

    public addDislike(newsId: number): Observable<{}> {
        return this.http.put(API_PUT_NEWS_ADD_DISLIKE.START +`${newsId}`+ API_PUT_NEWS_ADD_DISLIKE.END,{});
    }

    public removeDislike(newsId: number): Observable<{}> {
        return this.http.put(API_PUT_NEWS_REMOVE_DISLIKE.START +`${newsId}`+ API_PUT_NEWS_REMOVE_DISLIKE.END,{});
    }
}

  