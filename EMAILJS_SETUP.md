# 📧 Configuração EmailJS - SUPER SIMPLES!

## Por que EmailJS?

✅ **100% Gratuito** até 200 emails/mês  
✅ **Funciona na Vercel** sem problemas  
✅ **Não precisa de domínio próprio**  
✅ **Não precisa configurar servidor**  
✅ **Setup em 5 minutos**  

---

## 🚀 Passo a Passo (5 minutos)

### 1. Criar Conta
Acesse: https://www.emailjs.com/ e clique em **"Sign Up"**

---

### 2. Conectar seu Email

1. Após login, clique em **"Email Services"** no menu lateral
2. Clique em **"Add New Service"**
3. Escolha seu provedor:
   - **Gmail** (recomendado - mais fácil)
   - Outlook
   - Yahoo
   - Qualquer SMTP
4. Siga as instruções (geralmente só fazer login)
5. ✅ **Copie o SERVICE ID** (ex: `service_abc123`)

---

### 3. Criar Template de Email

1. Clique em **"Email Templates"** no menu lateral
2. Clique em **"Create New Template"**
3. Configure:

**Subject (Assunto):**
```
Confirmação - Chá de Casa Nova Tiko & Julia 🏠
```

**From Name (Nome do Remetente):**
```
Tiko & Julia
```

**From Email:**
```
{{from_email}}  (deixe assim mesmo, é uma variável)
```

**To Email (Para):**
```
{{to_email}}
```

**Body (Corpo do Email):**
```
Olá {{to_name}}! 🎉

Obrigado por confirmar sua presença no nosso chá de casa nova! 
Estamos muito felizes em poder celebrar este momento especial com você.

Presentes Escolhidos:
{{gifts_list}}

Detalhes do Evento:
📅 Data: Domingo, 07 de Dezembro de 2025
🕐 Horário: 13:00h
📍 Local: Casa de Vidro Cerimonial
🗺️ Ver no Google Maps: https://maps.app.goo.gl/HumcaC0k5Uw5cIYzR

Sua generosidade nos deixa muito felizes! Cada presente escolhido com 
carinho nos ajudará a construir nosso lar cheio de amor e memórias especiais.

Mal podemos esperar para celebrar com você! 💕

Com muito carinho,
Tiko & Julia
```

4. Clique em **"Save"**
5. ✅ **Copie o TEMPLATE ID** (ex: `template_xyz789`)

---

### 4. Pegar Public Key

1. Clique em **"Account"** no menu lateral
2. Vá na aba **"General"**
3. ✅ **Copie a PUBLIC KEY** (ex: `Abc123XyZ`)

---

### 5. Configurar no Projeto

Crie ou edite o arquivo `.env.local` na raiz do projeto:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=Abc123XyZ
```

**⚠️ IMPORTANTE:** 
- Substitua pelos IDs reais que você copiou
- As variáveis DEVEM ter o prefixo `NEXT_PUBLIC_`

---

## ✅ Pronto!

Agora é só rodar o projeto:

```bash
pnpm dev
```

O sistema de email está funcionando! 🎉

---

## 🧪 Como Testar

1. Acesse http://localhost:3000
2. Complete o fluxo de confirmação
3. Na tela de agradecimento, clique em **"Sim, quero receber!"**
4. Digite seu email
5. Verifique sua caixa de entrada!

---

## 📊 Painel EmailJS

No painel do EmailJS você pode:
- Ver quantos emails foram enviados
- Ver histórico de emails
- Acompanhar a cota (200/mês)
- Adicionar mais serviços de email

Acesse: https://dashboard.emailjs.com/

---

## 🆘 Problemas Comuns

### Email não chega?
1. Verifique a caixa de SPAM
2. No EmailJS, vá em "Email Services" e teste a conexão
3. Confira se os IDs no `.env.local` estão corretos

### Erro "Service not found"?
- O SERVICE_ID está errado
- Verifique no painel EmailJS > Email Services

### Erro "Template not found"?
- O TEMPLATE_ID está errado
- Verifique no painel EmailJS > Email Templates

### Erro "Public Key invalid"?
- A PUBLIC_KEY está errada
- Verifique no painel EmailJS > Account > General

---

## 💰 Planos EmailJS

- **Free**: 200 emails/mês (suficiente para maioria dos casos)
- **Starter**: $9/mês - 1.000 emails
- **Pro**: $49/mês - 10.000 emails

Para um chá de casa nova, o plano gratuito é mais que suficiente! 🎊

---

## 🔒 Segurança

EmailJS funciona no frontend, mas tem proteção contra spam:
- Rate limiting automático
- Captcha opcional
- Whitelist de domínios

Para produção, configure o domínio permitido:
1. EmailJS > Account > Security
2. Adicione: `sua-url-vercel.vercel.app`

---

✨ **É isso! Super simples, não é?**

Se tiver dúvidas, a documentação oficial está em: https://www.emailjs.com/docs/

