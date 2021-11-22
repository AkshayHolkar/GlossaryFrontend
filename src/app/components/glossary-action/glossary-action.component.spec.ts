import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossaryActionComponent } from './glossary-action.component';

describe('GlossaryActionComponent', () => {
  let component: GlossaryActionComponent;
  let fixture: ComponentFixture<GlossaryActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlossaryActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlossaryActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
