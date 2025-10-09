import { Confirmation, Gift } from '@/app/types';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

// Salva uma confirmação de presença
export async function saveConfirmation(confirmation: Omit<Confirmation, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'confirmations'), confirmation);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Erro ao salvar confirmação:', error);
    return { success: false, error };
  }
}

// Atualiza um presente adicionando quem o escolheu
export async function updateGiftSelection(giftId: string, guestName: string) {
  try {
    const giftRef = doc(db, 'gifts', giftId);
    await updateDoc(giftRef, {
      selectedBy: arrayUnion(guestName)
    });
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar presente:', error);
    return { success: false, error };
  }
}

// Busca todos os presentes
export async function getGifts(): Promise<Gift[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'gifts'));
    const gifts: Gift[] = [];
    querySnapshot.forEach((doc) => {
      gifts.push({ id: doc.id, ...doc.data() } as Gift);
    });
    return gifts;
  } catch (error) {
    console.error('Erro ao buscar presentes:', error);
    return [];
  }
}

// Busca dados de seleção dos presentes a partir das confirmações
// Processa a coleção 'confirmations' e cria um Map de giftId -> array de nomes
export async function getGiftsSelectionData(): Promise<Map<string, string[]>> {
  try {
    const querySnapshot = await getDocs(collection(db, 'confirmations'));
    const selectionData = new Map<string, string[]>();
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const name = data.name;
      const selectedGifts = data.selectedGifts;
      
      // Para cada presente selecionado por essa pessoa
      if (Array.isArray(selectedGifts)) {
        selectedGifts.forEach((giftId: string) => {
          // Se o presente já existe no Map, adiciona o nome
          if (selectionData.has(giftId)) {
            const currentNames = selectionData.get(giftId)!;
            currentNames.push(name);
          } else {
            // Se não existe, cria um novo array com o nome
            selectionData.set(giftId, [name]);
          }
        });
      }
    });
    
    return selectionData;
  } catch (error) {
    console.error('Erro ao buscar dados de seleção:', error);
    return new Map();
  }
}

// Busca todas as confirmações
export async function getConfirmations(): Promise<Confirmation[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'confirmations'));
    const confirmations: Confirmation[] = [];
    querySnapshot.forEach((doc) => {
      confirmations.push({ id: doc.id, ...doc.data() } as Confirmation);
    });
    return confirmations;
  } catch (error) {
    console.error('Erro ao buscar confirmações:', error);
    return [];
  }
}

