'use client';

import { SparklesIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ConfirmationFormProps {
  onConfirm: (name: string) => void;
  onBack: () => void;
}

export default function ConfirmationForm({ onConfirm, onBack }: ConfirmationFormProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Por favor, digite seu nome');
      return;
    }

    if (name.trim().length < 2) {
      setError('Nome muito curto');
      return;
    }

    onConfirm(name.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <SparklesIcon className="w-full h-full opacity-20" style={{ color: 'var(--terracota)' }} />
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-10 w-24 h-24"
        animate={{
          rotate: -360,
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <SparklesIcon className="w-full h-full opacity-20" style={{ color: 'var(--cream-dark)' }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="glass-strong rounded-3xl p-8 md:p-10 shadow-2xl">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              className="inline-block mb-4 text-7xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎉
            </motion.div>
            
            <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--black)' }}>
              Que alegria ter você aqui!
            </h2>
            <p style={{ color: 'var(--gray)' }}>
              Para confirmar sua presença, precisamos saber quem você é 😊
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: 'var(--black-soft)' }}>
                Seu Nome Completo
              </label>
              <motion.input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 glass rounded-xl border-2 border-transparent focus:outline-none transition-all"
                style={{
                  color: 'var(--black)',
                  borderColor: error ? '#ef4444' : 'transparent'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--terracota)'}
                onBlur={(e) => e.target.style.borderColor = error ? '#ef4444' : 'transparent'}
                placeholder="Digite seu nome aqui..."
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <div className="space-y-3">
              <motion.button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-white relative overflow-hidden"
                style={{ background: 'var(--terracota)' }}
                whileHover={{ scale: 1.02, boxShadow: "0 12px 40px 0 rgba(200, 121, 65, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Continuar
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={onBack}
                className="w-full glass py-3 rounded-xl font-medium"
                style={{ color: 'var(--gray)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ← Voltar
              </motion.button>
            </div>
          </motion.form>

          {/* Decoração */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-xs" style={{ color: 'var(--gray)', opacity: 0.7 }}>
              Seus dados são seguros e serão usados apenas para este evento 🔒
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

