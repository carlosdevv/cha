'use client';

import { Gift, GiftCategory } from '@/app/types';
import { getGiftsSelectionData } from '@/lib/firebaseService';
import { CheckCircleIcon, ExclamationCircleIcon, GiftIcon, ShoppingBagIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface GiftSelectorProps {
  categories: GiftCategory[];
  onSubmit: (selectedGifts: Gift[]) => void;
  onBack: () => void;
  guestName: string;
}

interface GiftPreview {
  title: string;
  description: string;
  image: string | null;
}

export default function GiftSelector({ categories, onSubmit, onBack, guestName }: GiftSelectorProps) {
  const [selectedGifts, setSelectedGifts] = useState<Set<string>>(new Set());
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [giftPreviews, setGiftPreviews] = useState<Map<string, GiftPreview>>(new Map());
  const [showAlreadySelectedWarning, setShowAlreadySelectedWarning] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showBaianoModal, setShowBaianoModal] = useState(false);
  const [mergedCategories, setMergedCategories] = useState<GiftCategory[]>(categories);

  // Busca dados do Firebase ao montar o componente
  useEffect(() => {
    const loadFirebaseData = async () => {
      try {
        const selectionData = await getGiftsSelectionData();
        
        // Mescla dados do Firebase com os presentes locais
        const updatedCategories = categories.map(category => ({
          ...category,
          gifts: category.gifts.map(gift => {
            const firebaseSelectedBy = selectionData.get(gift.id) || [];
            return {
              ...gift,
              selectedBy: firebaseSelectedBy
            };
          })
        }));
        
        setMergedCategories(updatedCategories);
      } catch (error) {
        console.error('Erro ao carregar dados do Firebase:', error);
        setMergedCategories(categories);
      }
    };
    
    loadFirebaseData();
  }, [categories]);

  const fetchGiftPreview = useCallback(async (giftId: string, url: string) => {
    try {
      const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setGiftPreviews(prev => new Map(prev).set(giftId, data.data));
      }
    } catch (error) {
      console.error('Erro ao carregar preview:', error);
    }
  }, []);

  // Carrega preview do produto quando hover no link
  useEffect(() => {
    if (hoveredLink) {
      const gift = mergedCategories
        .flatMap(cat => cat.gifts)
        .find(g => g.id === hoveredLink);

      const firstLink = gift?.links?.[0];
      if (firstLink && !giftPreviews.has(hoveredLink)) {
        fetchGiftPreview(gift.id, firstLink);
      }
    }
  }, [hoveredLink, mergedCategories, giftPreviews, fetchGiftPreview]);

  const toggleGift = (gift: Gift) => {
    // Verifica se o item está esgotado
    const isSoldOut = gift.selectedBy.length >= gift.maxAttempts;
    if (isSoldOut) {
      return; // Não permite selecionar se esgotado
    }

    const newSelected = new Set(selectedGifts);
    
    if (newSelected.has(gift.id)) {
      newSelected.delete(gift.id);
      setShowAlreadySelectedWarning(null);
    } else {
      // Se o presente já foi escolhido por outra pessoa, mostra aviso
      if (gift.selectedBy.length > 0) {
        setShowAlreadySelectedWarning(gift.id);
        setTimeout(() => setShowAlreadySelectedWarning(null), 5000);
      }
      newSelected.add(gift.id);
    }
    
    setSelectedGifts(newSelected);
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const shouldShowBaianoModal = (gifts: Gift[], name: string): boolean => {
    // Lista de nomes que devem ver o modal
    const targetNames = ['caio', 'berman', 'clarissa', 'gerson', 'luiz', 'luiz felipe', 'lara', 'emily', 'luana', 'nogueira', 'geovanna', 'geovana'];
    
    // Verifica se o nome contém algum dos nomes da lista
    const nameLower = name.toLowerCase();
    const hasTargetName = targetNames.some(targetName => nameLower.includes(targetName));
    
    if (!hasTargetName) return false;

    // Calcula valor total baseado nos types
    let totalValue = 0;
    gifts.forEach(gift => {
      if (gift.type === 'super-cheap') {
        totalValue += 100; // Valor estimado < 100
      } else if (gift.type === 'cheap') {
        totalValue += 200; // Valor estimado < 200
      } else {
        totalValue += 300; // Valor estimado >= 300
      }
    });

    return totalValue < 300;
  };

  const handleSubmit = () => {
    if (selectedGifts.size === 0) {
      alert('Por favor, selecione pelo menos um presente!');
      return;
    }

    const gifts = mergedCategories
      .flatMap(cat => cat.gifts)
      .filter(g => selectedGifts.has(g.id));

    // Verifica se deve mostrar modal divertido
    if (shouldShowBaianoModal(gifts, guestName)) {
      setShowBaianoModal(true);
      return;
    }

    setIsSubmitting(true);
    onSubmit(gifts);
  };

  const handleContinueWithLowValue = () => {
    setShowBaianoModal(false);
    const gifts = mergedCategories
      .flatMap(cat => cat.gifts)
      .filter(g => selectedGifts.has(g.id));
    setIsSubmitting(true);
    onSubmit(gifts);
  };

  const handleGoBackToSelect = () => {
    setShowBaianoModal(false);
  };

  // Filtra categorias que têm presentes
  const categoriesWithGifts = mergedCategories.filter(cat => cat.gifts && cat.gifts.length > 0);


  const formattedTexts = (guest: string) => {
    if (guest.toLowerCase().includes('gerson')) {
      return {
        title: 'Eai seu verme maldito???',
        description: 'Macaco do caralho, Coça a porra do bolso fdp',
        quote: 'Se for ficar nessa má vontade melhor nem ir mano',
        cta: 'Deboa Tikão, você merece.',
        cancel: 'Eu sou safado e vou vacilar.',
        footer: 'Life is this, I like this'
      };
    }

    if (guest.toLowerCase().includes('clarissa')) {
      return {
        title: 'Não acredito 🫨',
        description: 'Mande seu namorado coçar o bolso aí',
        quote: 'Pegue só mais um, namoralzinha 🤌',
        cta: 'Deboa Tikão, você merece.',
        cancel: 'My bad Tikão',
        footer: 'To gastando, vei! O importante é ter você lá com a gente! 💕'
      };
    }

    return {
      title: 'Porra é essa?! 🤯',
      description: 'Qual foi véi? Coça o bolso aí namoral! 💸',
      quote: 'Pega mais uma paradinha pra ajudar, po! A gente tá montando o lar aqui na humildade 😂',
      cta: 'Deboa brabo, cês merecem! 🎁',
      cancel: 'Tô liso(a), vou vacilar.',
      footer: 'To gastando, vei! O importante é ter você lá com a gente! 💕'
    };
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-4 text-6xl"
          >
            🎁
          </motion.div>
          
          <h2 className="text-4xl font-bold mb-3" style={{ color: 'var(--black)' }}>
            Olá, {guestName}! 
          </h2>
          <p className="text-lg mb-2" style={{ color: 'var(--gray)' }}>
            Escolha os presentes que gostaria de nos dar
          </p>
          <p className="text-sm" style={{ color: 'var(--gray)', opacity: 0.8 }}>
            Você pode selecionar quantos quiser! ✨
          </p>
          
          {/* Contador de selecionados */}
          <motion.div
            className="mt-6 inline-block glass-strong px-6 py-3 rounded-full"
            animate={selectedGifts.size > 0 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <p className="font-semibold" style={{ color: 'var(--terracota)' }}>
              {selectedGifts.size} {selectedGifts.size === 1 ? 'presente selecionado' : 'presentes selecionados'}
            </p>
          </motion.div>
        </motion.div>

        {/* Categorias de presentes */}
        <div className="space-y-12">
          {categoriesWithGifts.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              {/* Header da categoria com botão de expandir/minimizar */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--black)' }}>
                  <ShoppingBagIcon className="w-7 h-7" style={{ color: 'var(--terracota)' }} />
                  {category.name}
                  <span className="text-sm font-normal" style={{ color: 'var(--gray)' }}>
                    ({category.gifts.length} {category.gifts.length === 1 ? 'item' : 'itens'})
                  </span>
                </h3>
                
                <motion.button
                  onClick={() => toggleCategory(category.id)}
                  className="glass px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                  style={{ color: 'var(--terracota)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {expandedCategories.has(category.id) ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Minimizar
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Exibir
                    </>
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {expandedCategories.has(category.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.gifts.map((gift, giftIndex) => {
                  const isSelected = selectedGifts.has(gift.id);
                  const isAlreadySelected = gift.selectedBy.length > 0;
                  const isSoldOut = gift.selectedBy.length >= gift.maxAttempts;
                  const showWarning = showAlreadySelectedWarning === gift.id;
                  const preview = giftPreviews.get(gift.id);
                  const showPreview = hoveredLink === gift.id && preview && preview.image;

                  return (
                    <motion.div
                      key={gift.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: categoryIndex * 0.1 + giftIndex * 0.05 }}
                      className="relative"
                    >
                      <motion.button
                        onClick={() => toggleGift(gift)}
                        disabled={isSoldOut}
                        className="w-full h-full min-h-[180px] p-6 rounded-2xl text-left relative overflow-visible transition-all duration-300 flex flex-col"
                        style={{
                          background: isSelected 
                            ? 'rgba(255, 255, 255, 0.6)' 
                            : isSoldOut
                            ? 'rgba(255, 255, 255, 0.15)'
                            : isAlreadySelected
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgba(255, 255, 255, 0.3)',
                          backdropFilter: 'blur(10px)',
                          border: isSelected ? '2px solid var(--terracota)' : isSoldOut ? '1px solid rgba(200, 121, 65, 0.3)' : '1px solid rgba(232, 220, 200, 0.3)',
                          opacity: isSoldOut ? 0.5 : (isAlreadySelected && !isSelected ? 0.7 : 1),
                          cursor: isSoldOut ? 'not-allowed' : 'pointer'
                        }}
                        whileHover={!isSoldOut ? { scale: 1.03 } : {}}
                        whileTap={!isSoldOut ? { scale: 0.97 } : {}}
                      >
                        {/* Badge de seleção */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              className="absolute top-3 right-3 z-10"
                            >
                              <CheckCircleIcon className="w-8 h-8 text-green-600" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Badge ESGOTADO */}
                        {isSoldOut && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-3 right-3 z-10"
                          >
                            <div className="glass-strong px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1" style={{ backgroundColor: 'var(--terracota)', color: 'white' }}>
                              <XCircleIcon className="w-4 h-4" />
                              ESGOTADO
                            </div>
                          </motion.div>
                        )}

                        {/* Badge "já escolhido" */}
                        {isAlreadySelected && !isSelected && !isSoldOut && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute top-3 right-3 z-10"
                          >
                            <div className="glass-strong px-2 py-1 rounded-full text-xs font-medium" style={{ color: 'var(--gray)' }}>
                              {gift.selectedBy.length}/{gift.maxAttempts}
                            </div>
                          </motion.div>
                        )}

                        {/* Conteúdo do presente */}
                        <div className="relative z-0 flex-1 flex flex-col">
                          <div className="mb-3">
                            <GiftIcon 
                              className="w-10 h-10" 
                              style={{ color: isSelected ? 'var(--terracota)' : 'var(--gray)' }} 
                            />
                          </div>
                          
                          <h4 className="font-semibold mb-auto pr-10 min-h-[3rem] flex items-center" style={{ color: 'var(--black)' }}>
                            {gift.name}
                          </h4>

                          {gift.links && gift.links.length > 0 && (
                            <div className="relative mt-4 flex flex-wrap gap-2">
                              {gift.links.map((link, linkIndex) => (
                                <div key={linkIndex} className="relative">
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseEnter={() => setHoveredLink(gift.id)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    className="text-xs font-medium underline inline-block"
                                    style={{ color: 'var(--terracota)' }}
                                  >
                                    {(gift.links?.length || 0) > 1 ? `Opção ${linkIndex + 1}` : 'Ver produto'} →
                                  </a>

                                  {/* Popover do preview - apenas no primeiro link */}
                                  {linkIndex === 0 && (
                                    <AnimatePresence>
                                      {showPreview && (
                                        <motion.div
                                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                          animate={{ opacity: 1, y: 0, scale: 1 }}
                                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                          className="popover absolute left-0 bottom-full mb-2 p-4 w-64"
                                          style={{ pointerEvents: 'none', zIndex: 9999 }}
                                        >
                                          <Image
                                            src={preview.image!}
                                            alt={preview.title}
                                            width={256}
                                            height={128}
                                            className="w-full h-32 object-cover rounded-lg mb-2"
                                            unoptimized
                                          />
                                          <p className="text-sm font-semibold line-clamp-2" style={{ color: 'var(--black)' }}>
                                            {preview.title}
                                          </p>
                                          {preview.description && (
                                            <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--gray)' }}>
                                              {preview.description}
                                            </p>
                                          )}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.button>

                      {/* Warning para presentes já escolhidos */}
                      <AnimatePresence>
                        {showWarning && !isSoldOut && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            className="absolute -bottom-24 left-0 right-0 z-30"
                          >
                            <div className="glass-strong rounded-xl p-3 shadow-xl" style={{ border: '2px solid var(--terracota-light)' }}>
                              <div className="flex items-start gap-2">
                                <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--terracota)' }} />
                                <p className="text-sm" style={{ color: 'var(--black-soft)' }}>
                                  <span className="font-semibold">Opa!</span> Esse item já foi pego. 
                                  Por que você não pega um novo, po? 😉
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Botões de ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={onBack}
            className="glass px-8 py-4 rounded-full font-semibold"
            style={{ color: 'var(--gray)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Voltar
          </motion.button>

          <motion.button
            onClick={handleSubmit}
            disabled={selectedGifts.size === 0 || isSubmitting}
            className="px-12 py-4 rounded-full font-bold text-white relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'var(--terracota)' }}
            whileHover={selectedGifts.size > 0 ? { scale: 1.05, boxShadow: "0 12px 40px 0 rgba(200, 121, 65, 0.4)" } : {}}
            whileTap={selectedGifts.size > 0 ? { scale: 0.95 } : {}}
          >
            {isSubmitting ? 'Confirmando...' : 'Confirmar Presentes'}
          </motion.button>
        </motion.div>
      </div>

      {/* Modal Baiano Divertido */}
      <AnimatePresence>
        {showBaianoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 bg-opacity-20 flex items-center justify-center p-4 z-50"
            onClick={() => {}}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-200/80 rounded-3xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">😅</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--black)' }}>
                  {formattedTexts(guestName).title}
                </h3>
                <p className="text-lg mb-6" style={{ color: 'var(--black-soft)' }}>
                  {formattedTexts(guestName).description}
                </p>
                <p className="text-base mb-8 text-zinc-900">
                  {formattedTexts(guestName).quote}
                </p>

                <div className="space-y-3">
                  <motion.button
                    onClick={handleGoBackToSelect}
                    className="w-full py-4 rounded-xl font-bold text-white"
                    style={{ background: 'var(--terracota)' }}
                    whileHover={{ scale: 1.02, boxShadow: "0 12px 40px 0 rgba(200, 121, 65, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formattedTexts(guestName).cta}
                  </motion.button>

                  <motion.button
                    onClick={handleContinueWithLowValue}
                    className="w-full py-3 rounded-xl font-medium glass"
                    style={{ color: 'var(--gray)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formattedTexts(guestName).cancel}
                  </motion.button>
                </div>

                <p className="text-xs mt-6 text-zinc-700">
                  {formattedTexts(guestName).footer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
