'use client';

import ConfirmationForm from '@/components/ConfirmationForm';
import GiftSelector from '@/components/GiftSelector';
import LandingPage from '@/components/LandingPage';
import ThankYouPage from '@/components/ThankYouPage';
import { giftCategories } from '@/data/gifts';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Gift } from './types';

type Step = 'landing' | 'confirmation' | 'gifts' | 'thanks';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [guestName, setGuestName] = useState('');
  const [selectedGifts, setSelectedGifts] = useState<Gift[]>([]);

  const handleLandingContinue = () => {
    setCurrentStep('confirmation');
  };

  const handleConfirmation = (name: string) => {
    setGuestName(name);
    setCurrentStep('gifts');
  };

  const handleGiftSelection = async (gifts: Gift[]) => {
    setSelectedGifts(gifts);
    
    try {
      // Envia para a API
      const response = await fetch('/api/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: guestName,
          selectedGifts: gifts.map(g => g.id),
          giftNames: gifts.map(g => g.name),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Confirmação enviada com sucesso!');
        setCurrentStep('thanks');
      } else {
        toast.error('Erro ao confirmar presença. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao confirmar:', error);
      toast.error('Erro ao confirmar presença. Tente novamente.');
    }
  };

  const handleBack = () => {
    if (currentStep === 'confirmation') {
      setCurrentStep('landing');
    } else if (currentStep === 'gifts') {
      setCurrentStep('confirmation');
    }
  };

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'glass-strong',
          style: {
            border: '1px solid rgba(255, 255, 255, 0.4)',
            padding: '16px',
            color: '#2d2d2d',
          },
        }}
      />
      
      {currentStep === 'landing' && (
        <LandingPage onContinue={handleLandingContinue} />
      )}
      
      {currentStep === 'confirmation' && (
        <ConfirmationForm 
          onConfirm={handleConfirmation}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 'gifts' && (
        <GiftSelector
          categories={giftCategories}
          onSubmit={handleGiftSelection}
          onBack={handleBack}
          guestName={guestName}
        />
      )}
      
      {currentStep === 'thanks' && (
        <ThankYouPage
          guestName={guestName}
          selectedGiftsCount={selectedGifts.length}
          selectedGiftNames={selectedGifts.map(g => g.name)}
        />
      )}
    </>
  );
}
