import { Component, input, output } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Appointment } from '../models';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-appointment-list',
  imports: [CdkDropList, CdkDrag, DatePipe, MatCardModule, MatIconModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
})
export class AppointmentListComponent {
  appointments = input<Appointment[]>([]);
  deleteAppointmentEvent = output<Appointment>();

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.appointments(),
      event.previousIndex,
      event.currentIndex
    );
  }

  trackByAppointment(index: number, appointment: Appointment): string {
    return appointment.id;
  }

  deleteAppointment(appointment: Appointment): void {
    this.deleteAppointmentEvent.emit(appointment);
  }
}
