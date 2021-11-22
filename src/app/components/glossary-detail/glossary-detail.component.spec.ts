import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GLOSSARIES } from 'src/app/service/db-data';
import { GlossaryService } from 'src/app/service/glossary.service';
import { GlossaryDetailComponent } from './glossary-detail.component';

describe('GlossaryDetailComponent', () => {
  let component: GlossaryDetailComponent;
  let fixture: ComponentFixture<GlossaryDetailComponent>;
  const glossaries = GLOSSARIES;
  const router = jasmine.createSpyObj('Router', ['navigate']);
  const location = jasmine.createSpyObj('Location', ['navigate']);

  const mockGlossaryService = jasmine.createSpyObj('GlossaryService', {
    getGlossaries: of(glossaries)
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlossaryDetailComponent],
      providers: [{ provide: GlossaryService, useValue: mockGlossaryService },
      { provide: ActivatedRoute, useValue: { params: of({id:1})  }},
      { provide: Location, useValue: of({})},
      { provide: Router, useValue: router }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlossaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
