import { useState, useEffect, useCallback } from 'react';
import { Medicine } from '@/types/medicine';
import { toast } from 'sonner';

const STORAGE_KEY = 'medicine-reminders';

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Get today's date as string
const getTodayDate = () => new Date().toISOString().split('T')[0];

export function useMedicineReminder() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  // Load medicines from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: Medicine[] = JSON.parse(stored);
      // Reset 'taken' status if it's a new day
      const today = getTodayDate();
      const updated = parsed.map((med) => ({
        ...med,
        taken: med.lastTakenDate === today ? med.taken : false,
      }));
      setMedicines(updated);
    }
  }, []);

  // Save medicines to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
  }, [medicines]);

  // Add a new medicine
  const addMedicine = useCallback((name: string, dosage: string, time: string) => {
    const newMedicine: Medicine = {
      id: generateId(),
      name,
      dosage,
      time,
      taken: false,
      lastTakenDate: null,
    };
    setMedicines((prev) => [...prev, newMedicine]);
    toast.success(`${name} added to your reminders!`);
  }, []);

  // Remove a medicine
  const removeMedicine = useCallback((id: string) => {
    setMedicines((prev) => {
      const medicine = prev.find((m) => m.id === id);
      if (medicine) {
        toast.info(`${medicine.name} removed from reminders`);
      }
      return prev.filter((m) => m.id !== id);
    });
  }, []);

  // Mark medicine as taken
  const markAsTaken = useCallback((id: string) => {
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === id
          ? { ...med, taken: true, lastTakenDate: getTodayDate() }
          : med
      )
    );
    const medicine = medicines.find((m) => m.id === id);
    if (medicine) {
      toast.success(`Great! You've taken ${medicine.name} ✓`);
    }
  }, [medicines]);

  // Check for reminders - called every minute
  const checkReminders = useCallback(() => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    medicines.forEach((medicine) => {
      if (medicine.time === currentTime && !medicine.taken) {
        // Simulated notification using toast
        toast.warning(`⏰ Time to take ${medicine.name} (${medicine.dosage})`, {
          duration: 10000,
          action: {
            label: 'Mark as Taken',
            onClick: () => markAsTaken(medicine.id),
          },
        });
      }
    });
  }, [medicines, markAsTaken]);

  // Set up interval to check reminders every minute
  useEffect(() => {
    const interval = setInterval(checkReminders, 60000); // Check every minute
    // Also check immediately on mount
    checkReminders();
    return () => clearInterval(interval);
  }, [checkReminders]);

  return {
    medicines,
    addMedicine,
    removeMedicine,
    markAsTaken,
  };
}
