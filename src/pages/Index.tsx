import { useMedicineReminder } from '@/hooks/useMedicineReminder';
import { AddMedicineForm } from '@/components/AddMedicineForm';
import { MedicineList } from '@/components/MedicineList';
import { Pill, Bell } from 'lucide-react';

const Index = () => {
  const { medicines, addMedicine, removeMedicine, markAsTaken } = useMedicineReminder();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Pill className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MedRemind</h1>
              <p className="text-xs text-muted-foreground">Your health companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
            <Bell className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {medicines.filter((m) => !m.taken).length} pending
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Add Medicine Form */}
          <AddMedicineForm onAdd={addMedicine} />

          {/* Medicine List */}
          <MedicineList
            medicines={medicines}
            onMarkTaken={markAsTaken}
            onRemove={removeMedicine}
          />

          {/* Info Card */}
          <div className="rounded-xl bg-primary/5 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              💡 <strong>How it works:</strong> Add your medicines with scheduled times. 
              Reminders will appear as notifications when it's time to take your medication.
              Keep this tab open to receive reminders!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
