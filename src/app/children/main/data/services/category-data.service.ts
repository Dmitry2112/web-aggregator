import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category.model';
import { ICategoryResponseModel } from '../response-models/category.response-model.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoryDataService {
    public categories$: BehaviorSubject<CategoryModel[]> = new BehaviorSubject<CategoryModel[]>([]);

    constructor(private _http: HttpClient) {}

    public getAllCategories(): Observable<CategoryModel[]> {
        return this._http.get<ICategoryResponseModel[]>('categories')
            .pipe(
                map((categories: ICategoryResponseModel[]) => {
                    return categories.map((category: ICategoryResponseModel) => {
                        const categoryModel: CategoryModel = new CategoryModel();
                        categoryModel.fromDto(category);

                        return categoryModel;
                    });
                }),
                tap((categories: CategoryModel[]) => {
                    this.categories$.next(categories);
                })
            );
    }
}
