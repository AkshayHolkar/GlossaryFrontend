import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { GLOSSARIES } from 'src/app/service/db-data';
import { GlossaryService } from 'src/app/service/glossary.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const glossaries = GLOSSARIES;

  const mockGlossaryService = jasmine.createSpyObj('GlossaryService', {
    getGlossaries: of(glossaries)
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [HomeComponent],
      providers: [{ provide: GlossaryService, useValue: mockGlossaryService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all glossary data', () => {
    //arrange
    spyOn(component, 'getSortedGlossaries');

    //act
    fixture.detectChanges();

    //assert
    fixture.whenStable().then(() => {
      expect(component.getSortedGlossaries).toHaveBeenCalled();
    });
    expect(component.glossaries.length).toBe(3);
  });

  it('should provide alphabetically sorted by term glossaries list', () => {
    //arrange

    //act
    fixture.detectChanges();

    //assert
    fixture.whenStable().then(() => {
      expect(component.sortGlossaries).toHaveBeenCalled();
    });
    expect(component.glossaries[0].term).toBe("abyssal plain");
    expect(component.glossaries[1].term).toBe("accrete");
    expect(component.glossaries[2].term).toBe("alkaline");
  });

  it('should call glossaryDetail method on detail button click', () => {
    //arrange
    spyOn(component, 'glossaryDetail');
    fixture.detectChanges();


    //act
    let detailButton: DebugElement = fixture.debugElement.query(By.css('#detail'));
    detailButton.triggerEventHandler('click', glossaries[0]);
    fixture.detectChanges();


    //assert
    fixture.whenStable().then(() => {
      expect(component.glossaryDetail).toHaveBeenCalled();
    });
  });
});
