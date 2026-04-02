

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FadeIn } from '@/components/ui/transitions';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MasterInstructorStepProps {
  formData: {
    masterName: string;
    masterEmail: string;
    masterPhone: string;
    masterRank: string;
    masterCertification: string;
    masterExperience: string;
    masterBiography: string;
  };
  errors: Partial<{
    masterName: string;
    masterEmail: string;
    masterPhone: string;
    masterRank: string;
    masterCertification: string;
    masterExperience: string;
  }>;
  onChange: (updates: any) => void;
}

const rankOptions = [
  'Ceinture Blanche',
  'Ceinture Jaune 1er Dan',
  'Ceinture Orange 2ème Dan',
  'Ceinture Verte 3ème Dan',
  'Ceinture Bleue 4ème Dan',
  'Ceinture Rouge 5ème Dan',
  'Ceinture Noire 6ème Dan et plus'
];

const certifications = [
  'Certificat Fédéral Kung Fu',
  'Certificat International',
  'Diplôme d\'État',
  'Formation Pédagogique',
  'Certificat de Maître',
  'Maître Instructeur Senior'
];

export function MasterInstructorStep({ formData, errors, onChange }: MasterInstructorStepProps) {
  return (
    <FadeIn duration={0.6}>
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-on-surface">Maître instructeur</h2>
            <p className="text-muted-foreground">Informations sur le maître instructeur principal</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Nom du maître *</label>
              <Input
                placeholder="Nom complet"
                value={formData.masterName}
                onChange={(e) => onChange({ masterName: e.target.value })}
                className={cn(errors.masterName && "border-red-500")}
              />
              {errors.masterName && (
                <p className="text-xs text-red-500">{errors.masterName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Email *</label>
              <Input
                type="email"
                placeholder="master@club.com"
                value={formData.masterEmail}
                onChange={(e) => onChange({ masterEmail: e.target.value })}
                className={cn(errors.masterEmail && "border-red-500")}
              />
              {errors.masterEmail && (
                <p className="text-xs text-red-500">{errors.masterEmail}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Téléphone *</label>
              <Input
                placeholder="+221 XX XXX XX XX"
                value={formData.masterPhone}
                onChange={(e) => onChange({ masterPhone: e.target.value })}
                className={cn(errors.masterPhone && "border-red-500")}
              />
              {errors.masterPhone && (
                <p className="text-xs text-red-500">{errors.masterPhone}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Grade *</label>
              <Select value={formData.masterRank} onValueChange={(value) => onChange({ masterRank: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le grade" />
                </SelectTrigger>
                <SelectContent>
                  {rankOptions.map(rank => (
                    <SelectItem key={rank} value={rank}>{rank}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Certification *</label>
              <Select value={formData.masterCertification} onValueChange={(value) => onChange({ masterCertification: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Ex: Certificat Fédéral Kung Fu" />
                </SelectTrigger>
                <SelectContent>
                  {certifications.map(cert => (
                    <SelectItem key={cert} value={cert}>{cert}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Années d'expérience *</label>
              <Input
                placeholder="Nombre d'années d'expérience"
                value={formData.masterExperience}
                onChange={(e) => onChange({ masterExperience: e.target.value })}
                className={cn(errors.masterExperience && "border-red-500")}
              />
              {errors.masterExperience && (
                <p className="text-xs text-red-500">{errors.masterExperience}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">Biographie</label>
            <Textarea
              placeholder="Décrivez l'expérience et la philosophie du maître..."
              value={formData.masterBiography}
              onChange={(e) => onChange({ masterBiography: e.target.value })}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
