export interface Appointment {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  location?: string;
  color?: string;
}
