export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  time: string; // HH:MM format
  taken: boolean;
  lastTakenDate: string | null;
}
