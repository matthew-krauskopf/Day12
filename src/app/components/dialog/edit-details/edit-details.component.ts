import { Component, Inject, inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'; // <-- NgModel lives here
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { DbService } from '../../../services/db.service';
import { State } from '../../../model/state';

@Component({
  selector: 'app-edit-details',
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
  ],
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.scss',
})
export class EditDetailsComponent {
  db: DbService = inject(DbService);
  states: State[] = [];

  detailsForm: FormGroup = new FormGroup({
    price: new FormControl(this.dialogData.price, [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
    street: new FormControl(this.dialogData.address.street, [
      Validators.required,
    ]),
    city: new FormControl(this.dialogData.address.city, [Validators.required]),
    state: new FormControl(this.dialogData.address.state, [
      Validators.required,
    ]),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<EditDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogInput
  ) {
    this.db.fetchStates().subscribe((s) => (this.states = s));
  }
}

interface DialogInput {
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
  };
}
