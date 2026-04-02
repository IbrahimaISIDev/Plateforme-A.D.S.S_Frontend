import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, CheckCircle, Clock, User } from 'lucide-react';
import { FadeIn, StaggerChildren } from '@/components/ui/transitions';
import { useToast } from '@/components/ui/notifications';
import { useAsyncState } from '@/hooks/useAsyncState';
import { cn } from '@/lib/utils';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'general' | 'club' | 'license' | 'technical' | 'partnership';
}

export default function Contact() {
  const { success, error, warning } = useToast();

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const { execute: sendContact, loading } = useAsyncState(
    async () => {
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simuler une erreur aléatoire pour démo
      if (Math.random() > 0.8) {
        throw new Error('Erreur technique temporaire. Veuillez réessayer.');
      }

      return { success: true, id: Math.random().toString(36).substr(2, 9) };
    },
    {
      onSuccess: () => {
        success('Message envoyé avec succès !', 'Nous vous répondrons sous 24h.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          type: 'general'
        });
      },
      onError: (err: Error) => {
        error('Erreur d\'envoi', err.message);
      }
    }
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[+]?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      warning('Formulaire incomplet', 'Veuillez corriger les erreurs.');
      return;
    }

    try {
      await sendContact();
    } catch (err) {
      // L'erreur est déjà gérée par le hook
    }
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const contactTypes = [
    { value: 'general', label: 'Question générale', icon: MessageSquare, color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { value: 'club', label: 'Demande de club', icon: User, color: 'bg-green-50 text-green-600 border-green-200' },
    { value: 'license', label: 'Licence sportive', icon: CheckCircle, color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { value: 'technical', label: 'Support technique', icon: Globe, color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { value: 'partnership', label: 'Partenariat', icon: Send, color: 'bg-pink-50 text-pink-600 border-pink-200' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="space-y-0">
        {/* Contact Hero */}
        <section className="pt-32 pb-20 px-6 sm:px-12 bg-surface-container-low/30">
          <FadeIn duration={0.8}>
            <div className="max-w-7xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100/50">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Contactez-nous</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-on-surface tracking-tighter leading-[0.9] max-w-4xl mx-auto">
                Une question ? Notre équipe est <span className="text-blue-600">à votre écoute.</span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                Que vous soyez un club, un maître ou un futur licencié, nous répondons à toutes vos questions sous 24h.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Contact Grid */}
        <section className="py-16 sm:py-24 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left Column: Info Cards */}
            <div className="space-y-8">
              <StaggerChildren staggerDelay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                  <Card className="group hover:shadow-lg transition-all duration-500">
                    <CardContent className="p-6 sm:p-8 space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <MapPin className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Notre Siège</p>
                        <p className="text-lg font-bold text-on-surface leading-tight">
                          Cité Keur Gorgui, Immeuble ADSS<br />Dakar, Sénégal
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-500">
                    <CardContent className="p-6 sm:p-8 space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                        <Phone className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Téléphone</p>
                        <p className="text-lg font-bold text-on-surface leading-tight">
                          +221 33 123 45 67<br />+221 77 987 65 43
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-500">
                    <CardContent className="p-6 sm:p-8 space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                        <Mail className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Email</p>
                        <p className="text-lg font-bold text-on-surface leading-tight">
                          contact@adss.sn<br />support@adss.sn
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </StaggerChildren>

              {/* Hours Card */}
              <FadeIn duration={0.8} delay={0.4}>
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
                  <CardContent className="p-6 sm:p-8 space-y-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-black text-on-surface">Heures d'ouverture</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Lundi - Vendredi</span>
                        <span className="text-sm font-bold text-on-surface">8h - 18h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Samedi</span>
                        <span className="text-sm font-bold text-on-surface">9h - 15h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Dimanche</span>
                        <span className="text-sm font-bold text-on-surface">Fermé</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-blue-100">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Réponse sous 24h garantie
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-2">
              <FadeIn duration={0.8} delay={0.2}>
                <Card className="border-none shadow-lg">
                  <CardHeader className="p-6 sm:p-8 pb-0">
                    <h2 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight">
                      Envoyez-nous un message
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                    </p>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Contact Type Selection */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground">Type de demande</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                          {contactTypes.map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => handleInputChange('type', type.value as ContactForm['type'])}
                              className={cn(
                                "p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-1",
                                formData.type === type.value
                                  ? type.color + " border-current"
                                  : "bg-surface-container-low/50 border-transparent hover:bg-surface-container"
                              )}
                            >
                              <type.icon className="w-4 h-4" />
                              <span className="text-xs font-medium">{type.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name and Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Nom complet *</label>
                          <Input
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={cn(errors.name && "border-red-500")}
                          />
                          {errors.name && (
                            <p className="text-xs text-red-500">{errors.name}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Email *</label>
                          <Input
                            type="email"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={cn(errors.email && "border-red-500")}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Téléphone *</label>
                        <Input
                          placeholder="+221 XX XXX XX XX"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={cn(errors.phone && "border-red-500")}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500">{errors.phone}</p>
                        )}
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Sujet *</label>
                        <Input
                          placeholder="Objet de votre message"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className={cn(errors.subject && "border-red-500")}
                        />
                        {errors.subject && (
                          <p className="text-xs text-red-500">{errors.subject}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Message *</label>
                        <Textarea
                          placeholder="Décrivez votre demande en détail..."
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          rows={6}
                          className={cn(errors.message && "border-red-500")}
                        />
                        {errors.message && (
                          <p className="text-xs text-red-500">{errors.message}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formData.message.length}/500 caractères
                        </p>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full h-12 text-lg font-bold"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>

                      {/* Privacy Note */}
                      <p className="text-xs text-muted-foreground text-center">
                        En envoyant ce message, vous acceptez notre politique de confidentialité.
                        Vos données sont protégées et ne seront jamais partagées.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
