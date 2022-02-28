import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { Collaborators } from '../../Models/models'
import { API_ENDPOINTS } from 'src/app/_util/global';
import { CreateUpdateCollaborator } from 'src/app/shared/interface/collaborator.interface';


@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private getAllData = "https://fitstar-backend.herokuapp.com/app/v1/collaborators/get";
  private createUrl = "https://fitstar-backend.herokuapp.com/app/v1/collaborators/create";
  private deleteCollaborator = "https://fitstar-backend.herokuapp.com/app/v1/collaborators/delete";

  constructor(private http: HttpClient) { }

  CreateNewUser(CollaboratorsData: CreateUpdateCollaborator) {
    return this.http.post<CreateUpdateCollaborator>(API_ENDPOINTS.collaboratorsCreate, CollaboratorsData).pipe(map((res: any) => {
      return res
    }), retry(1),
      catchError(this.handleError))

  }

  getCollaboratorApiList() {
    return this.http.get<any[]>(API_ENDPOINTS.collaboratorsList).pipe(map((res: any) => {
      return res
    }), retry(1),
      catchError(this.handleError))
  }

  getSearchResult(searchText: string) {
    return this.http.get<any[]>(API_ENDPOINTS.collaboratorsSearch + searchText).pipe(map((res: any) => {
      return res
    }), retry(1),
      catchError(this.handleError))
  }


  updateCollaborator(data: CreateUpdateCollaborator) {
    return this.http.put<any[]>(API_ENDPOINTS.collaboratorsUpdate + data._id, data).pipe(map((res: any) => {
      return res
    }), retry(1),
      catchError(this.handleError))
  }



  //getting all data
  getAllCollaborator(limit: number, offset: number): Observable<Collaborators[]> {
    console.log(API_ENDPOINTS.collaboratorsList)
    return this.http.get<Collaborators[]>(API_ENDPOINTS.collaboratorsList + `${limit}/${offset}`);
  }
  //getting User data of Specfic Id
  // getUserById(_id: any): Observable<Collaborators[]> {
  //   return this.http.get<Collaborators[]>(`${this.createUrl}/${_id}`);
  // }

  //getting User data of Specfic Id
  deleteUser(_id: any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.deleteCollaborator}/${_id}`);
  }

  //Update User data
  // UpdateUser(_id: any): Observable<addUsers[]> {
  //   return this.http.put<addUsers[]>(`${this.createUrl}/${_id}`);
  // }


  // UpdateUser(_id: any, data: any): Observable<any> {
  //   return this.http.put<Collaborators[]>(`${this.createUrl}/${_id}`, data);
  // }



  // Error Handling Funcation
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(` Error From Handeler: ${errorMessage}`);

    return throwError(errorMessage);
  }





}
