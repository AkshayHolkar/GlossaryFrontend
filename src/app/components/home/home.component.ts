import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGlossary } from 'src/app/models/Glossary';
import { GlossaryService } from 'src/app/service/glossary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  glossaries: IGlossary[] = [];
  constructor(private glossaryService: GlossaryService, private router: Router) { }

  async ngOnInit() {
    this.getSortedGlossaries();
  }

  getSortedGlossaries() {
    this.glossaryService.getGlossaries().subscribe(
      (glossaries) => {
        this.glossaries = glossaries;
        this.sortGlossaries();
      },
      err => {
        console.log(err);
      }
    );
  }

  sortGlossaries() {
    this.glossaries.sort((a, b) => a.term.localeCompare(b.term));
  }

  glossaryDetail(glossary: IGlossary) {
    this.router.navigateByUrl('detail/' + glossary.id, { state: glossary })
  }
}
