import { useState } from 'react';
import { useToast } from '@/components/ui/notifications';

export interface AffiliationFormData {
  clubName: string;
  clubAddress: string;
  clubCity: string;
  clubPhone: string;
  clubEmail: string;
  clubType: 'new' | 'existing';
  existingClubId?: string;
  schedules: Array<{
    day: string;
    startTime: string;
    endTime: string;
    level: string;
    programType: string;
  }>;
  masterName: string;
  masterEmail: string;
  masterPhone: string;
  masterRank: string;
  masterCertification: string;
  masterExperience: string;
  masterBiography: string;
  documents: Array<{
    type: string;
    name: string;
    file: File;
    uploaded: boolean;
    size: string;
  }>;
  termsAccepted: boolean;
  dataProcessingAccepted: boolean;
  contactPreference: 'email' | 'phone' | 'both';
  additionalInfo: string;
}

const initialFormData: AffiliationFormData = {
  clubName: '',
  clubAddress: '',
  clubCity: '',
  clubPhone: '',
  clubEmail: '',
  clubType: 'new',
  schedules: [],
  masterName: '',
  masterEmail: '',
  masterPhone: '',
  masterRank: '',
  masterCertification: '',
  masterExperience: '',
  masterBiography: '',
  documents: [],
  termsAccepted: false,
  dataProcessingAccepted: false,
  contactPreference: 'email',
  additionalInfo: ''
};

export interface AffiliationFormProps {
  onSubmit?: (data: AffiliationFormData) => Promise<void>;
  onCancel?: () => void;
  initialStep?: number;
}

export function useAffiliationForm(props: AffiliationFormProps) {
  const { success, error, warning } = useToast();
  const [currentStep, setCurrentStep] = useState(props.initialStep || 1);
  const [formData, setFormData] = useState<AffiliationFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string | boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string | boolean> = {};

    switch (step) {
      case 1:
        if (!formData.clubName.trim()) newErrors.clubName = 'Le nom du club est requis';
        if (!formData.clubAddress.trim()) newErrors.clubAddress = 'L\'adresse est requise';
        if (!formData.clubCity.trim()) newErrors.clubCity = 'La ville est requise';
        if (!formData.clubPhone.trim()) newErrors.clubPhone = 'Le téléphone est requis';
        if (!formData.clubEmail.trim()) newErrors.clubEmail = 'L\'email est requis';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clubEmail)) {
          newErrors.clubEmail = 'Email invalide';
        }
        break;

      case 2:
        if (formData.schedules.length === 0) {
          newErrors.schedules = 'Au moins un horaire est requis';
        }
        break;

      case 3:
        if (!formData.masterName.trim()) newErrors.masterName = 'Le nom du maître est requis';
        if (!formData.masterEmail.trim()) newErrors.masterEmail = 'L\'email du maître est requis';
        if (!formData.masterPhone.trim()) newErrors.masterPhone = 'Le téléphone du maître est requis';
        if (!formData.masterRank) newErrors.masterRank = 'Le grade du maître est requis';
        if (!formData.masterCertification) newErrors.masterCertification = 'La certification est requise';
        if (!formData.masterExperience.trim()) newErrors.masterExperience = 'L\'expérience est requise';
        break;

      case 4:
        // Validation documents
        break;

      case 5:
        if (!formData.termsAccepted) newErrors.termsAccepted = true;
        if (!formData.dataProcessingAccepted) newErrors.dataProcessingAccepted = true;
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      warning('Formulaire incomplet', 'Veuillez corriger les erreurs avant de continuer.');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      warning('Formulaire incomplet', 'Veuillez corriger les erreurs avant de soumettre.');
      return;
    }

    setIsSubmitting(true);

    try {
      await props.onSubmit?.(formData);
      success('Demande soumise avec succès !', 'Votre demande d\'affiliation a été enregistrée.');

      // Reset form
      setFormData(initialFormData);
      setCurrentStep(1);

    } catch (err) {
      error('Erreur de soumission', 'Une erreur est survenue lors de la soumission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (updates: Partial<AffiliationFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addSchedule = () => {
    const newSchedule = {
      day: 'Lundi',
      startTime: '18:00',
      endTime: '20:00',
      level: 'Tous niveaux',
      programType: 'Kung Fu Traditionnel'
    };
    setFormData(prev => ({
      ...prev,
      schedules: [...prev.schedules, newSchedule]
    }));
  };

  const removeSchedule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index)
    }));
  };

  const updateSchedule = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      schedules: prev.schedules.map((schedule, i) =>
        i === index ? { ...schedule, [field]: value } : schedule
      )
    }));
  };

  return {
    currentStep,
    formData,
    errors,
    isSubmitting,
    handleNext,
    handlePrevious,
    handleSubmit,
    updateFormData,
    addSchedule,
    removeSchedule,
    updateSchedule,
    setCurrentStep
  };
}
