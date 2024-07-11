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
  selector: 'app-edit-layout',
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
  templateUrl: './edit-layout.component.html',
  styleUrl: './edit-layout.component.scss',
})
export class EditLayoutComponent {
  layoutForm: FormGroup = new FormGroup({
    bed: new FormControl(this.dialogData.bed, [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
    bath: new FormControl(this.dialogData.bath, [
      Validators.required,
      Validators.pattern('[0-9]*(.5){0,1}'),
    ]),
    sqFt: new FormControl(this.dialogData.sqFt, [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<EditLayoutComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogInput
  ) {}
}

interface DialogInput {
  bed: number;
  bath: number;
  sqFt: number;
}
