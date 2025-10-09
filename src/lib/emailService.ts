import emailjs from "@emailjs/browser";

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
  [key: string]: string; // Permite outros parâmetros do EmailJS
}

// Interface para email de confirmação do convidado
export async function sendConfirmationEmail(
  name: string,
  email: string,
  gifts: string[]
): Promise<{ success: boolean; error?: string }> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // Se não tiver as credenciais configuradas, apenas loga no console
  if (!serviceId || !templateId || !publicKey) {
    console.log("⚠️ EmailJS não configurado. Email que seria enviado:");
    console.log(`Para: ${email}`);
    console.log(`Nome: ${name}`);
    console.log(`Presentes: ${gifts.join(", ")}`);
    return {
      success: true,
      error: "EmailJS não configurado - email logado no console",
    };
  }

  try {
    // Formata a lista de presentes
    const giftsList = gifts
      .map((gift, index) => `${index + 1}. ${gift}`)
      .join("\n");

    const templateParams: EmailParams = {
      to_name: name,
      to_email: email,
      gifts_list: giftsList,
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    console.log("✅ Email enviado com sucesso:", response);
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    return {
      success: false,
      error: "Erro ao enviar email",
    };
  }
}

// Interface para relatório administrativo
interface AdminEmailParams {
  to_email: string;
  guest_name: string;
  guest_gifts: string;
  full_report: string;
  total_guests: string;
  [key: string]: string;
}

/**
 * Envia email de relatório para os administradores
 * Mostra quem acabou de confirmar e o relatório completo de todos os presentes
 */
export async function sendAdminReport(
  guestName: string,
  guestGifts: string[],
  allGiftsReport: { giftName: string; selectedBy: string[] }[]
): Promise<{ success: boolean; error?: string }> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID; // Template diferente para admin
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // Emails dos administradores (pode adicionar múltiplos separados por vírgula)
  const adminEmails = "carloslopessf@gmail.com,julia.albuquerquel08@gmail.com";

  if (!serviceId || !templateId || !publicKey) {
    console.log(
      "⚠️ EmailJS Admin não configurado. Relatório que seria enviado:"
    );
    console.log(`Novo convidado: ${guestName}`);
    console.log(`Presentes escolhidos: ${guestGifts.join(", ")}`);
    console.log("Relatório completo:", allGiftsReport);
    return {
      success: true,
      error: "EmailJS Admin não configurado - relatório logado no console",
    };
  }

  try {
    // Formata os presentes do convidado atual
    const guestGiftsList = guestGifts
      .map((gift, idx) => `${idx + 1}. ${gift}`)
      .join("\n");

    // Formata o relatório completo
    const fullReport = allGiftsReport
      .filter((item) => item.selectedBy.length > 0) // Apenas presentes escolhidos
      .map((item) => {
        const names = item.selectedBy.join(", ");
        return `• ${item.giftName} - ${names}`;
      })
      .join("\n");

    const totalGuests = new Set(
      allGiftsReport.flatMap((item) => item.selectedBy)
    ).size;

    // Envia para cada email de admin
    const emails = adminEmails.split(",").map((e) => e.trim());
    const promises = emails.map(async (adminEmail) => {
      const templateParams: AdminEmailParams = {
        to_email: adminEmail,
        guest_name: guestName,
        guest_gifts: guestGiftsList,
        full_report: fullReport || "Nenhum presente escolhido ainda.",
        total_guests: totalGuests.toString(),
      };

      return await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
    });

    await Promise.all(promises);

    console.log(
      "✅ Relatório admin enviado com sucesso para:",
      emails.join(", ")
    );
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao enviar relatório admin:", error);
    return {
      success: false,
      error: "Erro ao enviar relatório",
    };
  }
}
