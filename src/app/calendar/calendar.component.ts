import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Appointment } from '../shared/models';
import { AppointmentDialogComponent } from '../shared/appointment-dialog/appointment-dialog.component';
import { AppointmentListComponent } from '../shared/appointment-list/appointment-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    AppointmentListComponent,
    MatDatepickerModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  year = signal<number>(this.currentDate.getFullYear());
  month = signal<number>(this.currentDate.getMonth());
  weekDays = signal(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  calendarDays = signal<Date[]>([]);
  appointments = signal<Appointment[]>([
    {
      id: '1',
      title: 'Meeting',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: '2',
      title: 'Lunch',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: '3',
      title: 'Dinner',
      startDate: new Date(),
      endDate: new Date(),
    },
  ]); //new BehaviorSubject<Appointment[]>([]);

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.generateCalendarDays();
  }

  generateCalendarDays() {
    this.year.set(this.currentDate.getFullYear());
    this.month.set(this.currentDate.getMonth());

    const firstDayOfMonth = new Date(this.year(), this.month(), 1);
    // const lastDayOfMonth = new Date(this.year(), this.month() + 1, 0);

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    this.calendarDays.set([]);

    for (let i = 0; i < 42; i++) {
      this.calendarDays.update((calendarDays) => [
        ...calendarDays,
        new Date(startDate),
      ]);
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendarDays();
  }

  isSameMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  hasAppointments(date: Date): boolean {
    return this.getAppointmentsForDate(date).length > 0;
  }

  getAppointmentsForDate(date: Date): Appointment[] {
    return this.appointments().filter((appointment) => {
      const appointmentDate = new Date(appointment.startDate);
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      );
    });
  }

  openAppointmentDialog(date: Date) {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '400px',
      data: { date },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addAppointment(result);
      }
    });
  }

  addAppointment(appointment: Appointment) {
    this.appointments.update((appointments) => [...appointments, appointment]);
  }

  deleteAppointment(appointment: Appointment) {
    this.appointments.update((appointments) =>
      appointments.filter((a) => a.id !== appointment.id)
    );
  }
}
