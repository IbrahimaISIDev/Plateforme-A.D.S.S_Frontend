
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FadeIn } from '@/components/ui/transitions';
import { Calendar, Plus, Trash2 } from 'lucide-react';


interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
  level: string;
  programType: string;
}

interface SchedulesStepProps {
  schedules: Schedule[];
  onChange: (schedules: Schedule[]) => void;
  errors?: Partial<{ schedules: string }>;
}

const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const programTypes = [
  'Kung Fu Traditionnel',
  'Tai Chi',
  'Self-Défense',
  'Enfants (6-12 ans)',
  'Adolescents (13-17 ans)',
  'Adultes (18+ ans)',
  'Compétition'
];

const levels = ['Tous niveaux', 'Débutants', 'Intermédiaire', 'Avancé'];

export function SchedulesStep({ schedules, onChange, errors }: SchedulesStepProps) {
  const addSchedule = () => {
    const newSchedule: Schedule = {
      day: 'Lundi',
      startTime: '18:00',
      endTime: '20:00',
      level: 'Tous niveaux',
      programType: 'Kung Fu Traditionnel'
    };
    onChange([...schedules, newSchedule]);
  };

  const removeSchedule = (index: number) => {
    onChange(schedules.filter((_, i) => i !== index));
  };

  const updateSchedule = (index: number, field: string, value: string) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index] = { ...updatedSchedules[index], [field]: value };
    onChange(updatedSchedules);
  };

  return (
    <FadeIn duration={0.6}>
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-on-surface">Horaires et programmes</h2>
            <p className="text-muted-foreground">Définissez les horaires d'entraînement et les programmes proposés</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-on-surface">Programmes hebdomadaires</h3>
            <Button onClick={addSchedule} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un horaire
            </Button>
          </div>

          {schedules.map((schedule, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <Select
                  value={schedule.day}
                  onValueChange={(value) => updateSchedule(index, 'day', value || '')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <Input
                    type="time"
                    value={schedule.startTime}
                    onChange={(e) => updateSchedule(index, 'startTime', e.target.value)}
                    placeholder="Début"
                  />
                  <span className="text-sm text-muted-foreground">à</span>
                  <Input
                    type="time"
                    value={schedule.endTime}
                    onChange={(e) => updateSchedule(index, 'endTime', e.target.value)}
                    placeholder="Fin"
                  />
                </div>

                <Select
                  value={schedule.level}
                  onValueChange={(value) => updateSchedule(index, 'level', value || '')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={schedule.programType}
                  onValueChange={(value) => updateSchedule(index, 'programType', value || '')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {programTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeSchedule(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {schedules.length === 0 && (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucun horaire défini</p>
            <p className="text-sm">Ajoutez au moins un programme pour continuer</p>
          </div>
        )}

        {errors?.schedules && (
          <div className="text-center text-red-500 text-sm p-4 border border-red-200 rounded-lg bg-red-50">
            {errors.schedules}
          </div>
        )}
      </div>
    </FadeIn>
  );
}
