import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface AddMedicineFormProps {
  onAdd: (name: string, dosage: string, time: string) => void;
}

export function AddMedicineForm({ onAdd }: AddMedicineFormProps) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && dosage.trim() && time) {
      onAdd(name.trim(), dosage.trim(), time);
      setName('');
      setDosage('');
      setTime('');
    }
  };

  return (
    <Card className="border-2 border-dashed border-primary/30 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Plus className="h-4 w-4 text-primary" />
          </div>
          Add New Medicine
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                Medicine Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Aspirin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosage" className="text-sm font-medium text-muted-foreground">
                Dosage
              </Label>
              <Input
                id="dosage"
                placeholder="e.g., 100mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="bg-background/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium text-muted-foreground">
                Reminder Time
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-background/50"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Reminder
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
