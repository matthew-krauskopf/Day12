import { Component, Inject } from '@angular/core';

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
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

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
  ],
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.scss',
})
export class EditDetailsComponent {
  detailsForm: FormGroup = new FormGroup({
    price: new FormControl(this.dialogData.price, [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
    street: new FormControl(this.dialogData.address.street, [
      Validators.required,
      Validators.pattern(''),
    ]),
    city: new FormControl(this.dialogData.address.city, [
      Validators.required,
      Validators.pattern(''),
    ]),
    state: new FormControl(this.dialogData.address.state, [
      Validators.required,
      Validators.pattern(''),
    ]),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<EditDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogInput
  ) {}
}

interface DialogInput {
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
  };
}
