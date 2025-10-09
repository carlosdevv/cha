'use client';

import { CheckCircleIcon, HeartIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/solid';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ThankYouPageProps {
  guestName: string;
  selectedGiftsCount: number;
  selectedGiftNames: string[];
}

export default function ThankYouPage({ guestName, selectedGiftsCount, selectedGiftNames }: ThankYouPageProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Efeito de confetti quando a página carrega - mais sutil
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 30 * (timeLeft / duration);
      
      confetti({
        particleCount,
        startVelocity: 20,
        spread: 360,
        ticks: 50,
        zIndex: 0,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      setEmailError('Por favor, digite seu e-mail');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('E-mail inválido');
      return;
    }

    setIsSendingEmail(true);
    setEmailError('');

    try {
      // Importa dinamicamente para evitar problemas no SSR
      const { sendConfirmationEmail } = await import('@/lib/emailService');
      
      const result = await sendConfirmationEmail(
        guestName,
        email,
        selectedGiftNames
      );

      if (result.success) {
        setEmailSent(true);
        setTimeout(() => {
          setShowEmailModal(false);
        }, 2000);
      } else {
        setEmailError(result.error || 'Erro ao enviar e-mail. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setEmailError('Erro ao enviar e-mail. Tente novamente.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos animados - mais sutis */}
      <motion.div
        className="absolute top-20 left-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <SparklesIcon className="w-16 h-16 opacity-20" style={{ color: 'var(--terracota)' }} />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <HeartIcon className="w-20 h-20 opacity-20" style={{ color: 'var(--terracota-light)' }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="max-w-2xl w-full"
      >
        <div className="glass-strong rounded-3xl p-8 md:p-12 shadow-2xl text-center">
          {/* Ícone principal animado - mais sutil e profissional */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 15 }}
            className="mb-6 relative inline-block"
          >
            <CheckCircleIcon 
              className="w-20 h-20 mx-auto" 
              style={{ color: 'var(--terracota)' }} 
            />
          </motion.div>

          {/* Mensagem principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--black)' }}>
              Confirmado com Sucesso!
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 mb-8"
          >
            <p className="text-xl" style={{ color: 'var(--black-soft)' }}>
              Obrigado, <span className="font-bold" style={{ color: 'var(--terracota)' }}>{guestName}</span>!
            </p>
            
            <p className="text-lg" style={{ color: 'var(--gray)' }}>
              Você selecionou{' '}
              <span className="font-semibold" style={{ color: 'var(--terracota)' }}>
                {selectedGiftsCount} {selectedGiftsCount === 1 ? 'presente' : 'presentes'}
              </span>{' '}
              para nós! 💝
            </p>

            <div className="glass rounded-2xl p-6 my-6">
              <p style={{ color: 'var(--black-soft)' }} className="leading-relaxed">
                Sua generosidade nos deixa muito felizes! Cada presente escolhido com carinho nos ajudará a construir 
                nosso lar cheio de amor e memórias especiais.
              </p>
            </div>

            <p style={{ color: 'var(--gray)' }}>
              Não vemos a hora de celebrar este momento com você no dia{' '}
              <span className="font-semibold" style={{ color: 'var(--terracota)' }}>07 de Dezembro</span>!
            </p>
          </motion.div>

          {/* Seção de PIX */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <div className="glass-strong rounded-2xl p-8 text-center border-2" style={{ borderColor: 'var(--terracota-light)' }}>
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--black)' }}>
                Prefere enviar um PIX?
              </h3>
              <p className="text-base mb-4" style={{ color: 'var(--black-soft)' }}>
                Se preferir, pode nos ajudar enviando um PIX! 💝
              </p>
              <p className="text-sm mb-6" style={{ color: 'var(--gray)' }}>
                Qualquer valor será muito bem-vindo e nos ajudará a montar nosso cantinho com amor!
              </p>

              <div className="glass-subtle rounded-xl p-4 mb-6">
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--gray)' }}>
                  Chave PIX
                </p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-lg font-bold" style={{ color: 'var(--terracota)' }}>
                    carloslopessf@gmail.com
                  </p>
                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText('carloslopessf@gmail.com');
                      alert('Chave PIX copiada! 📋');
                    }}
                    className="p-2 glass rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Copiar chave PIX"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--terracota)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-transparent via-[var(--cream)] to-transparent h-px mb-4"></div>

              <p className="text-sm font-semibold" style={{ color: 'var(--black-soft)' }}>
                ⚠️ Importante!
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--gray)' }}>
                Não esqueça de colocar seu <strong>nome</strong> e os <strong>presentes escolhidos</strong> na mensagem do PIX, por favor! 🙏
              </p>
            </div>
          </motion.div>

          {/* Pergunta sobre email */}
          {!emailSent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-8"
            >
              <div className="glass rounded-2xl p-6">
                <p className="text-lg font-semibold mb-4" style={{ color: 'var(--black)' }}>
                  Deseja receber por e-mail as informações?
                </p>
                <p className="text-sm mb-4" style={{ color: 'var(--gray)' }}>
                  Enviaremos um resumo da sua confirmação e dos presentes escolhidos
                </p>
                <motion.button
                  onClick={() => setShowEmailModal(true)}
                  className="px-8 py-3 rounded-full font-semibold text-white"
                  style={{ background: 'var(--terracota)' }}
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 40px 0 rgba(200, 121, 65, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sim, quero receber! 📧
                </motion.button>
              </div>
            </motion.div>
          )}

          {emailSent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="glass-strong rounded-2xl p-6" style={{ border: '2px solid var(--terracota)' }}>
                <p className="text-lg font-semibold" style={{ color: 'var(--terracota)' }}>
                  ✓ E-mail enviado com sucesso!
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--gray)' }}>
                  Verifique sua caixa de entrada
                </p>
              </div>
            </motion.div>
          )}

          {/* Card de informação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-y-3 mb-8"
          >
            <div className="glass-subtle rounded-xl p-4">
              <p className="text-sm" style={{ color: 'var(--gray)' }}>
                📍 Casa de Vidro Cerimonial às 13:00h
              </p>
            </div>
          </motion.div>

          {/* Mensagem final */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="space-y-4"
          >
            <div className="glass-strong rounded-2xl p-6 mb-6">
              <p className="text-2xl font-bold mb-2" style={{ color: 'var(--black)' }}>
                Com muito carinho,
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--terracota)' }}>
                Tiko & Julia
              </p>
            </div>

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <p className="text-4xl">💕</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal de Email */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 z-50"
            onClick={() => !isSendingEmail && setShowEmailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => !isSendingEmail && setShowEmailModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full glass hover:glass-strong transition-all"
                disabled={isSendingEmail}
              >
                <XMarkIcon className="w-5 h-5" style={{ color: 'var(--gray)' }} />
              </button>

              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--black)' }}>
                Receber por E-mail
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--gray)' }}>
                Digite seu e-mail para receber a confirmação
              </p>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--black-soft)' }}>
                  Seu E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  className="w-full px-4 py-3 glass rounded-xl border-2 border-transparent focus:outline-none transition-all"
                  style={{
                    color: 'var(--black)',
                    borderColor: emailError ? '#ef4444' : 'transparent'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--terracota)'}
                  onBlur={(e) => e.target.style.borderColor = emailError ? '#ef4444' : 'transparent'}
                  placeholder="seu@email.com"
                  disabled={isSendingEmail}
                  autoFocus
                />
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {emailError}
                  </motion.p>
                )}
              </div>

              <motion.button
                onClick={handleEmailSubmit}
                disabled={isSendingEmail}
                className="w-full py-4 rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'var(--terracota)' }}
                whileHover={!isSendingEmail ? { scale: 1.02 } : {}}
                whileTap={!isSendingEmail ? { scale: 0.98 } : {}}
              >
                {isSendingEmail ? 'Enviando...' : 'Enviar'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
