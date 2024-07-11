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
  selector: 'app-edit-seller',
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
  templateUrl: './edit-seller.component.html',
  styleUrl: './edit-seller.component.scss',
})
export class EditSellerComponent {
  sellerForm: FormGroup = new FormGroup({
    name: new FormControl(this.dialogData.name, [
      Validators.required,
      Validators.pattern('[\\w ]+'),
    ]),
    phone: new FormControl(this.dialogData.phone, [
      Validators.required,
      Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'),
    ]),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<EditSellerComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogInput
  ) {}
}

interface DialogInput {
  name: string;
  phone: string;
}
