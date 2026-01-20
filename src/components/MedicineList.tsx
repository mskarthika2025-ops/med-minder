import { Medicine } from '@/types/medicine';
import { MedicineCard } from './MedicineCard';
import { Pill } from 'lucide-react';

interface MedicineListProps {
  medicines: Medicine[];
  onMarkTaken: (id: string) => void;
  onRemove: (id: string) => void;
}

export function MedicineList({ medicines, onMarkTaken, onRemove }: MedicineListProps) {
  // Sort medicines: untaken first, then by time
  const sortedMedicines = [...medicines].sort((a, b) => {
    if (a.taken !== b.taken) return a.taken ? 1 : -1;
    return a.time.localeCompare(b.time);
  });

  if (medicines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Pill className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">No medicines added yet</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Add your first medicine reminder above to start tracking your medication schedule.
        </p>
      </div>
    );
  }

  const takenCount = medicines.filter((m) => m.taken).length;
  const totalCount = medicines.length;

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Today's Schedule</h2>
        <span className="text-sm text-muted-foreground">
          {takenCount} of {totalCount} taken
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-success transition-all duration-500"
          style={{ width: `${(takenCount / totalCount) * 100}%` }}
        />
      </div>

      {/* Medicine Cards */}
      <div className="grid gap-3">
        {sortedMedicines.map((medicine) => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            onMarkTaken={onMarkTaken}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
