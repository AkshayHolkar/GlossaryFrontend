import { Component, OnInit } from '@angular/core';
import { IGlossary } from 'src/app/models/Glossary';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlossaryService } from 'src/app/service/glossary.service';

@Component({
  selector: 'app-glossary-action',
  templateUrl: './glossary-action.component.html',
  styleUrls: ['./glossary-action.component.css']
})
export class GlossaryActionComponent implements OnInit {

  glossaryForm = new FormGroup({
    term: new FormControl('', Validators.required),
    definition: new FormControl('', Validators.required),
  });

  glossaryDetail: IGlossary = {
    id: 0,
    term: '',
    definition: ''
  };

  isEditTerm = false;
  glossaryId = 0;

  constructor(private location: Location, private route: ActivatedRoute, private glossaryService: GlossaryService, private router: Router) { }

  ngOnInit() {

    this.CheckActionType();

    if (this.isEditTerm) {
      this.getGlossaryDetail();
      this.setFormValue();
    }
  }

  CheckActionType() {
    this.route.params.subscribe(
      (params) => {
        this.glossaryId = params['id'];
        this.isEditTerm = (this.glossaryId == undefined) ? false : true;
      });
  }

  getGlossaryDetail() {
    var data: any = this.location.getState();
    this.glossaryDetail = data;
    if (this.glossaryDetail.id == undefined) {
      this.fetchGlossaryDetail();
    }
  }

  fetchGlossaryDetail() {
    this.glossaryService.getGlossary(this.glossaryId).subscribe(
      (data) => {
        this.glossaryDetail = data;
        this.setFormValue();
      },
      err => {
        console.log(err);
      }
    );
  }

  setFormValue() {
    this.glossaryForm.controls['term'].setValue(this.glossaryDetail.term);
    this.glossaryForm.controls['definition'].setValue(this.glossaryDetail.definition);
  }

  onSubmit() {
    this.glossaryDetail.term = this.glossaryForm.controls['term'].value;
    this.glossaryDetail.definition = this.glossaryForm.controls['definition'].value;

    if (this.isEditTerm) {
      this.updateGlossary();
    } else {
      this.addGlossary();
    }
  }

  updateGlossary() {
    this.glossaryService.updateGlossary(this.glossaryDetail).subscribe(
      (result) => {
        this.router.navigateByUrl('detail/'+this.glossaryDetail.id, { state: this.glossaryDetail })
      },
      err => {
        console.log(err);
      }
    );
  }

  addGlossary(){
    this.glossaryService.createGlossary(this.glossaryDetail).subscribe(
      (data: any) => {
        this.glossaryId = data;
        this.router.navigateByUrl('detail/'+this.glossaryId, { state: this.glossaryDetail })
      },
      err => {
        console.log(err);
      }
    );
  }
}
