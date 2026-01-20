import { Medicine } from '@/types/medicine';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, Pill, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MedicineCardProps {
  medicine: Medicine;
  onMarkTaken: (id: string) => void;
  onRemove: (id: string) => void;
}

// Format time from 24h to 12h format
function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function MedicineCard({ medicine, onMarkTaken, onRemove }: MedicineCardProps) {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 hover:shadow-lg',
        medicine.taken
          ? 'border-success/40 bg-success/5'
          : 'border-border bg-card hover:border-primary/40'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {/* Pill Icon */}
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors',
                medicine.taken ? 'bg-success/20' : 'bg-primary/10'
              )}
            >
              <Pill
                className={cn(
                  'h-6 w-6',
                  medicine.taken ? 'text-success' : 'text-primary'
                )}
              />
            </div>
            
            {/* Medicine Info */}
            <div className="space-y-1">
              <h3
                className={cn(
                  'font-semibold text-foreground',
                  medicine.taken && 'line-through opacity-60'
                )}
              >
                {medicine.name}
              </h3>
              <p className="text-sm text-muted-foreground">{medicine.dosage}</p>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatTime(medicine.time)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {!medicine.taken && (
              <Button
                size="sm"
                onClick={() => onMarkTaken(medicine.id)}
                className="bg-success hover:bg-success/90"
              >
                <Check className="mr-1.5 h-4 w-4" />
                Take
              </Button>
            )}
            {medicine.taken && (
              <span className="flex items-center gap-1.5 rounded-full bg-success/20 px-3 py-1.5 text-xs font-medium text-success">
                <Check className="h-3.5 w-3.5" />
                Taken
              </span>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onRemove(medicine.id)}
              className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
