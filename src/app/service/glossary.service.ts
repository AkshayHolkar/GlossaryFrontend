import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGlossary } from '../models/Glossary';

@Injectable({
  providedIn: 'root'
})
export class GlossaryService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "http://localhost:5000/api/v1";

  getGlossaries(): Observable<IGlossary[]> {
    return this.http.get<IGlossary[]>(this.baseURI + "/Glossaries");
  }

  getGlossary(id: number): Observable<IGlossary> {
    return this.http.get<IGlossary>(this.baseURI + "/Glossaries/" + id);
  }

  createGlossary(formData: any) {
    return this.http.post(this.baseURI + '/Glossaries', formData);
  }

  updateGlossary(formData: any) {
    return this.http.put(this.baseURI + '/Glossaries', formData);
  }

  deleteGlossary(id: number) {
    return this.http.delete(this.baseURI + '/Glossaries/' + id);
  }
}
