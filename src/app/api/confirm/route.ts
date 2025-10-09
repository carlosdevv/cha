import { saveConfirmation } from '@/lib/firebaseService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * CONFIGURAÇÃO DO TWILIO PARA WHATSAPP
 * 
 * O Twilio oferece um trial gratuito com créditos para testar.
 * 
 * COMO CONFIGURAR:
 * 
 * 1. Crie uma conta no Twilio: https://www.twilio.com/try-twilio
 * 2. Verifique seu número de telefone (será o número que receberá as mensagens)
 * 3. No dashboard do Twilio, vá em: Messaging > Try it out > Send a WhatsApp message
 * 4. Siga as instruções para conectar seu WhatsApp ao Twilio (você precisará enviar uma mensagem específica para o número do Twilio)
 * 5. Pegue suas credenciais:
 *    - Account SID (encontrado no Dashboard)
 *    - Auth Token (encontrado no Dashboard)
 *    - WhatsApp Sandbox Number (ex: whatsapp:+14155238886)
 * 
 * 6. Crie um arquivo .env.local na raiz do projeto com:
 *    TWILIO_ACCOUNT_SID=seu_account_sid
 *    TWILIO_AUTH_TOKEN=seu_auth_token
 *    TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
 *    TWILIO_WHATSAPP_TO=whatsapp:+5511999999999  (seu número com código do país)
 * 
 * 7. Para usar em produção (sem sandbox), você precisará solicitar aprovação do template de mensagem no Twilio
 * 
 * NOTA: O trial gratuito do Twilio oferece $15.50 em créditos, suficiente para centenas de mensagens.
 * Cada mensagem do WhatsApp custa aproximadamente $0.005 (meio centavo de dólar).
 * 
 * ALTERNATIVA MAIS SIMPLES (sem Twilio):
 * Você pode usar a API do WhatsApp Business diretamente, mas requer mais configuração.
 * Outra opção é usar serviços como WPPConnect ou Baileys (open source) que conectam direto ao WhatsApp Web.
 */

// Função para enviar mensagem via Twilio WhatsApp
async function sendWhatsAppNotification(guestName: string, gifts: string[]) {
  const accountSid = 'AC5d60de64d2e953c93cd1cb7558c9b340';
  const authToken = '5e3d1f22839f7b5fd78c1e46992be5da';
  const fromNumber = 'whatsapp:+14155238886'; // Ex: whatsapp:+14155238886
  const toNumber = 'whatsapp:+5571994011114'; // Ex: whatsapp:+5511999999999
  
  // Se não tiver as credenciais configuradas, apenas loga no console
  if (!accountSid || !authToken || !fromNumber || !toNumber) {
    console.log('⚠️ Credenciais do Twilio não configuradas. Mensagem que seria enviada:');
    console.log(`Nome: ${guestName}`);
    console.log(`Presentes escolhidos: ${gifts.join(', ')}`);
    return { success: true, message: 'Credenciais não configuradas - mensagem logada no console' };
  }

  try {
    const message = `🎉 *Nova Confirmação - Chá de Casa Nova*\n\n` +
                   `👤 *Convidado:* ${guestName}\n` +
                   `🎁 *Presentes escolhidos:*\n${gifts.map(g => `  • ${g}`).join('\n')}\n\n` +
                   `_Enviado automaticamente pelo sistema_`;

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64')
        },
        body: new URLSearchParams({
          From: fromNumber,
          To: toNumber,
          Body: message
        })
      }
    );

    if (response.ok) {
      return { success: true, message: 'Mensagem enviada com sucesso!' };
    } else {
      const error = await response.json();
      console.error('Erro ao enviar WhatsApp:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    return { success: false, error };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, selectedGifts, giftNames } = body;

    if (!name || !selectedGifts || selectedGifts.length === 0) {
      return NextResponse.json(
        { error: 'Nome e presentes são obrigatórios' },
        { status: 400 }
      );
    }

    // Salva no Firebase
    const confirmation = {
      name,
      selectedGifts,
      timestamp: Date.now()
    };

    const result = await saveConfirmation(confirmation);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Erro ao salvar confirmação' },
        { status: 500 }
      );
    }

    // Envia notificação via WhatsApp
    await sendWhatsAppNotification(name, giftNames);

    return NextResponse.json({
      success: true,
      message: 'Confirmação salva com sucesso!',
      id: result.id
    });

  } catch (error) {
    console.error('Erro na API de confirmação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

