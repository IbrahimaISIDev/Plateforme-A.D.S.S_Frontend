

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FadeIn } from '@/components/ui/transitions';
import { Building } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClubInfoStepProps {
  formData: {
    clubName: string;
    clubAddress: string;
    clubCity: string;
    clubPhone: string;
    clubEmail: string;
    clubType: 'new' | 'existing';
    existingClubId?: string;
  };
  errors: Partial<{
    clubName: string;
    clubAddress: string;
    clubCity: string;
    clubPhone: string;
    clubEmail: string;
    existingClubId?: string;
  }>;
  onChange: (updates: any) => void;
}

export function ClubInfoStep({ formData, errors, onChange }: ClubInfoStepProps) {
  return (
    <FadeIn duration={0.6}>
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Building className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-on-surface">Informations du club</h2>
            <p className="text-muted-foreground">Renseignez les informations de base de votre club</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Type de club *</label>
              <Select
                value={formData.clubType}
                onValueChange={(value) => onChange({ clubType: value as 'new' | 'existing' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Nouveau club</SelectItem>
                  <SelectItem value="existing">Club existant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Nom du club *</label>
              <Input
                placeholder="Nom officiel du club"
                value={formData.clubName}
                onChange={(e) => onChange({ clubName: e.target.value })}
                className={cn(errors.clubName && "border-red-500")}
              />
              {errors.clubName && (
                <p className="text-xs text-red-500">{errors.clubName}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Adresse *</label>
              <Input
                placeholder="Adresse complète du club"
                value={formData.clubAddress}
                onChange={(e) => onChange({ clubAddress: e.target.value })}
                className={cn(errors.clubAddress && "border-red-500")}
              />
              {errors.clubAddress && (
                <p className="text-xs text-red-500">{errors.clubAddress}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Ville *</label>
              <Input
                placeholder="Ville"
                value={formData.clubCity}
                onChange={(e) => onChange({ clubCity: e.target.value })}
                className={cn(errors.clubCity && "border-red-500")}
              />
              {errors.clubCity && (
                <p className="text-xs text-red-500">{errors.clubCity}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Téléphone *</label>
                <Input
                  placeholder="+221 XX XXX XX XX"
                  value={formData.clubPhone}
                  onChange={(e) => onChange({ clubPhone: e.target.value })}
                  className={cn(errors.clubPhone && "border-red-500")}
                />
                {errors.clubPhone && (
                  <p className="text-xs text-red-500">{errors.clubPhone}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Email *</label>
                <Input
                  type="email"
                  placeholder="email@club.com"
                  value={formData.clubEmail}
                  onChange={(e) => onChange({ clubEmail: e.target.value })}
                  className={cn(errors.clubEmail && "border-red-500")}
                />
                {errors.clubEmail && (
                  <p className="text-xs text-red-500">{errors.clubEmail}</p>
                )}
              </div>
            </div>
          </div>

          {formData.clubType === 'existing' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">ID du club existant *</label>
                <Input
                  placeholder="ID du club existant"
                  value={formData.existingClubId}
                  onChange={(e) => onChange({ existingClubId: e.target.value })}
                  className={cn(errors.existingClubId && "border-red-500")}
                />
                {errors.existingClubId && (
                  <p className="text-xs text-red-500">{errors.existingClubId}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}
