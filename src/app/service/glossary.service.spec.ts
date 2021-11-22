import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { GlossaryService } from './glossary.service';
import { GLOSSARIES } from './db-data';
import { IGlossary } from '../models/Glossary';
import { HttpErrorResponse } from '@angular/common/http';

describe('GlossaryService', () => {
  let service: GlossaryService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GlossaryService
      ]
    });
    service = TestBed.inject(GlossaryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all glossaries', () => {
    service.getGlossaries()
      .subscribe(glossaries => {
        expect(glossaries).toBeTruthy('No glossaries returned');
        expect(glossaries.length).toBe(3, "incorrect number of glossaries");

        const glossary = glossaries.find(glossary => glossary.id == 1);

        expect(glossary?.term).toBe("abyssal plain");
      });

    const req = httpTestingController.expectOne('http://localhost:5000/api/v1/Glossaries');

    expect(req.request.method).toEqual("GET");

    req.flush(GLOSSARIES);
  });

  it('should find a glossary by id', () => {

    service.getGlossary(1)
      .subscribe(glossary => {
        expect(glossary).toBeTruthy();
        expect(glossary.id).toBe(1);
      });

    const req = httpTestingController.expectOne('http://localhost:5000/api/v1/Glossaries/1');

    expect(req.request.method).toEqual("GET");

    req.flush(GLOSSARIES[0]);
  });

  it('should add a glossary', () => {

    const glossaryToAdd: IGlossary = {id: 0, term:'Add test', definition:'test definition'}
    service.createGlossary(glossaryToAdd)
    .subscribe(result => {}
    );

    const req = httpTestingController.expectOne('http://localhost:5000/api/v1/Glossaries');
    expect(req.request.method).toEqual("POST");
    expect(req.request.body.term)
    .toEqual(glossaryToAdd.term);
  });

  it('should give error if glossary add fail', () => {

    const glossaryToAdd: IGlossary = {id: 0, term:'Add test', definition:'test definition'}
    service.createGlossary(glossaryToAdd)
    .subscribe(()=> fail(),
    (error: HttpErrorResponse) => {
      expect(error.status).toBe(500);
    }
    );

    const req = httpTestingController.expectOne('http://localhost:5000/api/v1/Glossaries');
    expect(req.request.method).toEqual("POST");
    req.flush('Add glossary failed', {status: 500, statusText:'Internal Server Error'});
  });

  it('should update a glossary', () => {

    const glossaryToUpdate: IGlossary = {id: 3, term:'update test', definition:'test definition'}
    service.updateGlossary(glossaryToUpdate)
    .subscribe(result => {
      expect(result).toBe(3);
    }
    );

    const req = httpTestingController.expectOne('http://localhost:5000/api/v1/Glossaries');
    expect(req.request.method).toEqual("PUT");
    expect(req.request.body)
    .toEqual(glossaryToUpdate);
  });

  it('should give error if glossary update fail', () => {

    const glossaryToUpdate: IGlossary = {id: 3, term:'update test', definition:'test definition'}
    service.updateGlossary(glossaryToUpdate)
    .subscribe(()=> fail(),
    (error: HttpErrorResponse) => {
      expect(error.status).toBe(500);
    }
    );

    const req = httpTestingController.expectOne('http://localhost:5000/api/v1/Glossaries');
    expect(req.request.method).toEqual("PUT");

    req.flush('Update glossary failed', {status: 500, statusText:'Internal Server Error'});
  });

  it('should delete a glossary', () => {

    service.deleteGlossary(3)
    .subscribe(result => {
      expect(result).toBe(3);
    }
    );

    const req = httpTestingController.expectOne('http://localhost:5000/api/v1/Glossaries/3');
    expect(req.request.method).toEqual("DELETE");
    req.flush(3);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
