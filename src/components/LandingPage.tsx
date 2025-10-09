"use client";

import Hero from "@/assets/hero.jpeg";
import {
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

interface LandingPageProps {
  onContinue: () => void;
}

export default function LandingPage({ onContinue }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos flutuantes - tons neutros */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,220,200,0.3) 0%, rgba(232,220,200,0) 70%)",
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,121,65,0.15) 0%, rgba(200,121,65,0) 70%)",
        }}
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,196,168,0.25) 0%, rgba(212,196,168,0) 70%)",
        }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full"
      >
        {/* Card principal com glassmorphism */}
        <div className="glass-strong rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-center mb-4"
            style={{ color: "var(--black)" }}
          >
            Chá de Casa Nova
          </motion.h1>

          {/* Nomes do casal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <h2
              className="text-3xl md:text-4xl font-semibold mb-2"
              style={{ color: "var(--terracota)" }}
            >
              Tiko & Julia
            </h2>
            <div
              className="flex items-center justify-center gap-2"
              style={{ color: "var(--gray)" }}
            >
              <HomeIcon className="w-5 h-5" />
              <p className="text-lg">Estamos construindo nosso lar!</p>
            </div>
          </motion.div>

          {/* Foto do casal - PLACEHOLDER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8 flex justify-center"
          >
            <div className="glass rounded-2xl p-4 hover-lift">
              <Image
                src={Hero}
                alt="Tiko e Julia"
                className="object-cover h-96 w-full rounded-xl"
              />
              {/* <div className="w-full max-w-md aspect-[4/3] bg-gradient-to-br from-cream via-cream-light to-cream-dark rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center p-8">
                  <p className="font-medium text-lg" style={{ color: 'var(--gray)' }}>📸</p>
                  <p className="text-sm mt-2" style={{ color: 'var(--gray)' }}>
                    Substitua esta área pela foto do casal
                  </p>
                  <p className="text-xs mt-1 opacity-60" style={{ color: 'var(--gray)' }}>
                    src/components/LandingPage.tsx
                  </p>
                </div>
              </div> */}
            </div>
          </motion.div>

          {/* Copywriting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-8 text-center space-y-4"
          >
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--black-soft)" }}
            >
              Depois de tantos momentos especiais juntos, chegou a hora de dar
              um dos passos mais importantes das nossas vidas:
              <span
                className="font-semibold"
                style={{ color: "var(--terracota)" }}
              >
                {" "}
                criar nosso primeiro lar!
              </span>
            </p>
            <p
              className="text-base md:text-lg"
              style={{ color: "var(--gray)" }}
            >
              E não queremos celebrar essa conquista de outra forma se não com
              quem amamos! Por isso, convidamos você para fazer parte deste
              momento tão especial. Sua presença é o que mais importa para nós,
              mas se quiser nos presentear com algo para nossa casinha,
              <span
                className="font-semibold"
                style={{ color: "var(--terracota)" }}
              >
                {" "}
                ficaremos imensamente gratos! ❤️
              </span>
            </p>
          </motion.div>

          {/* Informações do evento - melhorado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="glass-strong rounded-3xl p-8 mb-8 space-y-6"
          >
            <h3
              className="text-3xl font-bold text-center mb-6"
              style={{ color: "var(--black)" }}
            >
              Detalhes do Evento
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="relative overflow-hidden glass rounded-2xl p-6 border-l-4"
                style={{ borderColor: "var(--terracota)" }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 12px 40px 0 rgba(26, 26, 26, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 glass-subtle rounded-xl">
                    <CalendarIcon
                      className="w-7 h-7"
                      style={{ color: "var(--terracota)" }}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-sm font-medium mb-1"
                      style={{ color: "var(--gray)" }}
                    >
                      Data
                    </p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: "var(--black)" }}
                    >
                      Domingo
                    </p>
                    <p
                      className="text-base"
                      style={{ color: "var(--terracota)" }}
                    >
                      07 de Dezembro de 2025
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative overflow-hidden glass rounded-2xl p-6 border-l-4"
                style={{ borderColor: "var(--terracota-light)" }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 12px 40px 0 rgba(26, 26, 26, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 glass-subtle rounded-xl">
                    <ClockIcon
                      className="w-7 h-7"
                      style={{ color: "var(--terracota-light)" }}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-sm font-medium mb-1"
                      style={{ color: "var(--gray)" }}
                    >
                      Horário
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "var(--black)" }}
                    >
                      13:00h
                    </p>
                    <p className="text-sm" style={{ color: "var(--gray)" }}>
                      Não se atrase! 😊
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative overflow-hidden glass rounded-2xl p-6 border-l-4"
              style={{ borderColor: "var(--terracota)" }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 12px 40px 0 rgba(26, 26, 26, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="p-3 glass-subtle rounded-xl">
                  <MapPinIcon
                    className="w-7 h-7"
                    style={{ color: "var(--terracota)" }}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "var(--gray)" }}
                  >
                    Local
                  </p>
                  <p
                    className="text-xl font-semibold mb-2"
                    style={{ color: "var(--black)" }}
                  >
                    Casa de Vidro Cerimonial
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Casa+de+Vidro+Cerimonial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 glass-subtle rounded-lg font-medium hover:glass transition-all"
                    style={{ color: "var(--terracota)" }}
                  >
                    <MapPinIcon className="w-4 h-4" />
                    Ver no Google Maps
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={onContinue}
              className="px-12 py-5 rounded-full text-lg font-bold relative overflow-hidden"
              style={{
                background: "var(--terracota)",
                color: "white",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 40px 0 rgba(200, 121, 65, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2 cursor-pointer">
                Confirmar Presença
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          {/* Mensagem final */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-6 italic"
            style={{ color: "var(--gray)" }}
          >
            Mal podemos esperar para celebrar com você! 💕
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
