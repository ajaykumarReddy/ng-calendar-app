import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-appointment-dialog',
  imports: [
    MatDialogModule,
    DatePipe,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.scss',
})
export class AppointmentDialogComponent implements OnInit {
  appointmentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date },
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.appointmentForm.valid) {
      const appointment = {
        ...this.appointmentForm.value,
        startDate: this.data.date,
        endDate: this.data.date,
      };
      this.dialogRef.close(appointment);
    }
  }
}
