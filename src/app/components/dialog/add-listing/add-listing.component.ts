import { NgIf, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DbService } from '../../../services/db.service';
import { Observable } from 'rxjs';
import { State } from '../../../model/state';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgIf,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.scss',
})
export class AddListingComponent implements OnInit {
  db: DbService = inject(DbService);

  states$: Observable<State[] | undefined>;

  addListingForm: FormGroup = new FormGroup({
    price: new FormControl('200000', [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
    street: new FormControl('987 Place St.', [
      Validators.required,
      Validators.pattern('[\\w. ]+'),
    ]),
    city: new FormControl('Jacksonville', [
      Validators.required,
      Validators.pattern('[\\w. ]+'),
    ]),
    state: new FormControl('Florida', [Validators.required]),
    bed: new FormControl('2', [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
    bath: new FormControl('2', [
      Validators.required,
      Validators.pattern('[0-9]*(.5){0,1}'),
    ]),
    sqFt: new FormControl('1500', [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
    name: new FormControl('John Smith', [
      Validators.required,
      Validators.pattern('[\\w. ]+'),
    ]),
    phone: new FormControl('555-789-1234', [
      Validators.required,
      Validators.pattern('[0-9]{3}-?[0-9]{3}-?[0-9]{4}'),
    ]),
  });

  constructor(public dialogRef: MatDialogRef<AddListingComponent>) {
    this.states$ = this.db.fetchStates();
  }

  ngOnInit(): void {
    this.db.loadStates();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
