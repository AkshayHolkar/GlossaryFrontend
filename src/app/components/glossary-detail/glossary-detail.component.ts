import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IGlossary } from 'src/app/models/Glossary';
import { ActivatedRoute, Router } from '@angular/router';
import { GlossaryService } from 'src/app/service/glossary.service';

@Component({
  selector: 'app-glossary-detail',
  templateUrl: './glossary-detail.component.html',
  styleUrls: ['./glossary-detail.component.css']
})
export class GlossaryDetailComponent implements OnInit {

  glossaryDetail: IGlossary = {
    id: 0,
    term: '',
    definition: ''
  }

  glossaryId = 0;

  constructor(private _location: Location, private route: ActivatedRoute, private glossaryService: GlossaryService, private router: Router) { }

  ngOnInit(): void {
    this.getGlossary();

    if (this.glossaryDetail.id == undefined) {
      this.fetchGlossaryDetail();
    }
  }

  getGlossary() {
    var data: any = this._location.getState();
    this.glossaryDetail = data;
  }

  fetchGlossaryDetail() {
    this.route.params.subscribe(
      (params) => {
        this.glossaryId = params['id'];
      });

    this.glossaryService.getGlossary(this.glossaryId).subscribe(
      (data) => {
        this.glossaryDetail = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteGlossary() {
    this.glossaryService.deleteGlossary(this.glossaryDetail.id).subscribe(
      result => {
        this.router.navigateByUrl('');
            },
      err => {
        console.log(err);
      }
    );
  }

  glossaryEdit(glossary: IGlossary) {
    this.router.navigateByUrl('edit/'+glossary.id, { state: glossary })
  }

  backClicked() {
    this._location.back();
  }
}
