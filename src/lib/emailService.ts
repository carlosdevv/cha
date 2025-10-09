import emailjs from '@emailjs/browser';

/**
 * CONFIGURAÇÃO DO EMAILJS - SUPER SIMPLES! 🎉
 * 
 * EmailJS é GRATUITO (até 200 emails/mês) e funciona 100% no frontend.
 * Não precisa de servidor, domínio ou configuração de DNS!
 * 
 * COMO CONFIGURAR (5 MINUTOS):
 * 
 * 1. Criar conta no EmailJS: https://www.emailjs.com/
 * 
 * 2. Após login, conectar seu email:
 *    a) Clique em "Email Services" no menu lateral
 *    b) Clique em "Add New Service"
 *    c) Escolha seu provedor de email:
 *       - Gmail (mais fácil - recomendado)
 *       - Outlook
 *       - Yahoo
 *       - Ou qualquer SMTP
 *    d) Siga as instruções (geralmente só fazer login com sua conta)
 *    e) Copie o SERVICE ID (ex: service_abc123)
 * 
 * 3. Criar Template de Email:
 *    a) Clique em "Email Templates" no menu lateral
 *    b) Clique em "Create New Template"
 *    c) Use este template (copie e cole):
 * 
 *    Subject: Confirmação - Chá de Casa Nova Tiko & Julia 🏠
 * 
 *    Body:
 *    ```
 *    Olá {{to_name}}! 🎉
 * 
 *    Obrigado por confirmar sua presença no nosso chá de casa nova! 
 *    Estamos muito felizes em poder celebrar este momento especial com você.
 * 
 *    Presentes Escolhidos:
 *    {{gifts_list}}
 * 
 *    Detalhes do Evento:
 *    📅 Data: Domingo, 07 de Dezembro de 2025
 *    🕐 Horário: 13:00h
 *    📍 Local: Casa de Vidro Cerimonial
 *    🗺️ Ver no Google Maps: https://maps.app.goo.gl/HumcaC0k5Uw5cIYzR
 * 
 *    Sua generosidade nos deixa muito felizes! Cada presente escolhido com 
 *    carinho nos ajudará a construir nosso lar cheio de amor e memórias especiais.
 * 
 *    Mal podemos esperar para celebrar com você! 💕
 * 
 *    Com muito carinho,
 *    Tiko & Julia
 *    ```
 * 
 *    d) Salve o template
 *    e) Copie o TEMPLATE ID (ex: template_xyz789)
 * 
 * 4. Pegar sua Public Key:
 *    a) Clique em "Account" no menu lateral
 *    b) Vá na aba "General"
 *    c) Copie a PUBLIC KEY (ex: Abc123XyZ)
 * 
 * 5. Adicionar no arquivo .env.local:
 *    NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
 *    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
 *    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=Abc123XyZ
 * 
 * PRONTO! É só isso! Super simples! 🎊
 * 
 * NOTA: As variáveis precisam ter o prefixo NEXT_PUBLIC_ porque o EmailJS
 * funciona no frontend (client-side).
 */

interface EmailParams {
  to_name: string;
  to_email: string;
  gifts_list: string;
  [key: string]: any; // Permite outros parâmetros do EmailJS
}

export async function sendConfirmationEmail(
  name: string, 
  email: string, 
  gifts: string[]
): Promise<{ success: boolean; error?: string }> {
  
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  // Se não tiver as credenciais configuradas, apenas loga no console
  if (!serviceId || !templateId || !publicKey) {
    console.log('⚠️ EmailJS não configurado. Email que seria enviado:');
    console.log(`Para: ${email}`);
    console.log(`Nome: ${name}`);
    console.log(`Presentes: ${gifts.join(', ')}`);
    return { 
      success: true, 
      error: 'EmailJS não configurado - email logado no console' 
    };
  }

  try {
    // Formata a lista de presentes
    const giftsList = gifts.map((gift, index) => `${index + 1}. ${gift}`).join('\n');

    const templateParams: EmailParams = {
      to_name: name,
      to_email: email,
      gifts_list: giftsList
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    console.log('✅ Email enviado com sucesso:', response);
    return { success: true };

  } catch (error: any) {
    console.error('❌ Erro ao enviar email:', error);
    return { 
      success: false, 
      error: error?.text || 'Erro ao enviar email' 
    };
  }
}

