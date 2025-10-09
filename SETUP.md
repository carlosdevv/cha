# 🏠 Chá de Casa Nova - Tiko & Julia

Site para o chá de casa nova com design glassmorphism, animações incríveis e integração com Firebase e WhatsApp!

## 🚀 Como Configurar

### 1. Instalar Dependências

```bash
pnpm install
```

### 2. Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto (ou use um existente)
3. No console do projeto, clique em "Adicionar app" > Web (ícone `</>`)
4. Copie as credenciais do Firebase
5. Vá até `src/lib/firebase.ts` e substitua as credenciais dummy pelas suas:

```typescript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJECT_ID.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

6. No Firebase Console, ative o **Firestore Database**:
   - Vá em "Build" > "Firestore Database"
   - Clique em "Create database"
   - Escolha o modo de produção ou teste
   - Selecione a localização

7. Configure as regras de segurança do Firestore (opcional, mas recomendado para produção):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /confirmations/{document} {
      allow read, write: if true; // Para produção, adicione autenticação adequada
    }
    match /gifts/{document} {
      allow read: if true;
      allow write: if true; // Para produção, adicione autenticação adequada
    }
  }
}
```

### 3. Configurar Twilio para WhatsApp (Opcional mas Recomendado)

O Twilio oferece um **trial gratuito com $15.50 em créditos**, suficiente para centenas de mensagens!

#### Passo a passo:

1. **Criar conta no Twilio**:
   - Acesse [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
   - Crie sua conta gratuita
   - Verifique seu número de telefone

2. **Configurar WhatsApp Sandbox**:
   - No Dashboard do Twilio, vá em: **Messaging** > **Try it out** > **Send a WhatsApp message**
   - Você verá instruções para conectar seu WhatsApp
   - Envie uma mensagem para o número do Twilio (algo como: `join <código>`)
   - Aguarde a confirmação de que seu WhatsApp foi conectado

3. **Pegar suas credenciais**:
   - No Dashboard do Twilio, você encontrará:
     - **Account SID** (algo como: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)
     - **Auth Token** (clique em "show" para revelar)
   - O número do WhatsApp Sandbox (ex: `whatsapp:+14155238886`)

4. **Criar arquivo `.env.local`**:
   - Na raiz do projeto, copie o arquivo `.env.local.example`:
   ```bash
   cp .env.local.example .env.local
   ```
   
   - Edite `.env.local` e adicione suas credenciais:
   ```env
   # Twilio WhatsApp Configuration
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=seu_auth_token_aqui
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   # Seu número ou múltiplos números separados por vírgula
   TWILIO_WHATSAPP_TO=whatsapp:+5511999999999,whatsapp:+5511888888888
   ```

5. **Para produção** (depois do trial):
   - Você precisará solicitar aprovação de template de mensagem no Twilio
   - Ou comprar um número do Twilio dedicado
   - Mais info: [Twilio WhatsApp Business API](https://www.twilio.com/whatsapp)

**Nota**: Se você não configurar o Twilio, o sistema funcionará normalmente, mas as notificações serão apenas logadas no console do servidor (você verá no terminal).

### 4. Customizar Conteúdo

#### Substituir Foto do Casal:
1. Adicione a foto na pasta `public/` (ex: `public/couple-photo.jpg`)
2. Abra `src/components/LandingPage.tsx`
3. Vá até a linha **139-145** e descomente o código da imagem:
```tsx
<Image
  src="/couple-photo.jpg"
  alt="Tiko e Julia"
  fill
  className="object-cover rounded-xl"
  priority
/>
```
4. Comente ou remova a div placeholder

#### Atualizar Links dos Presentes:
1. Abra `src/data/gifts.ts`
2. Substitua os links de exemplo (`https://www.exemplo.com/...`) pelos links reais dos produtos
3. Exemplo:
```typescript
{
  id: 'mw-1',
  name: 'Cafeteira Elétrica Nespresso',
  category: 'most-wanted',
  link: 'https://www.magazineluiza.com.br/cafeteira-nespresso-...',  // Link real aqui
  selectedBy: []
}
```

## 🎨 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── confirm/         # API para salvar confirmação e enviar WhatsApp
│   │   └── link-preview/    # API para buscar preview dos produtos
│   ├── page.tsx             # Página principal com fluxo completo
│   ├── layout.tsx           # Layout geral
│   ├── globals.css          # Estilos globais (glassmorphism)
│   └── types.ts             # TypeScript interfaces
├── components/
│   ├── LandingPage.tsx      # Landing page inicial
│   ├── ConfirmationForm.tsx # Formulário de confirmação
│   ├── GiftSelector.tsx     # Seletor de presentes
│   └── ThankYouPage.tsx     # Página de agradecimento
├── data/
│   └── gifts.ts             # Lista de presentes (CUSTOMIZAR AQUI)
└── lib/
    ├── firebase.ts          # Configuração do Firebase (ADICIONAR CREDENCIAIS)
    └── firebaseService.ts   # Funções de serviço do Firebase
```

## 🏃 Rodar o Projeto

### Desenvolvimento:
```bash
pnpm dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Build para Produção:
```bash
pnpm build
pnpm start
```

## 📝 Features

✨ **Design Moderno**:
- Glassmorphism com tons pastéis
- Gradientes suaves e harmônicos
- Responsivo para mobile e desktop

🎭 **Animações Impressionantes**:
- Framer Motion para transições fluidas
- Elementos flutuantes e interativos
- Efeito de confetti na confirmação
- Hover effects nos presentes

🎁 **Seleção de Presentes**:
- Múltipla seleção de presentes
- Preview de produtos ao fazer hover
- Indicação visual de presentes já escolhidos
- Mensagem amigável ao escolher presente já selecionado

💾 **Integração Firebase**:
- Salva confirmações em tempo real
- Atualiza lista de presentes escolhidos
- Persistência de dados

📱 **Notificações WhatsApp**:
- Notificação automática via Twilio
- Envia nome do convidado e presentes escolhidos
- Suporta múltiplos números

## 🎯 Fluxo do Usuário

1. **Landing Page** → Visualiza informações do evento
2. **Confirmação** → Informa o nome
3. **Seleção de Presentes** → Escolhe um ou mais presentes
4. **Agradecimento** → Vê confirmação com efeito de confetti

## 📱 Testando WhatsApp

Após configurar o Twilio, para testar:

1. Inicie o servidor: `pnpm dev`
2. Complete o fluxo de confirmação
3. Você receberá uma mensagem no WhatsApp conectado ao sandbox!

## 🔧 Troubleshooting

### Firebase não salva dados:
- Verifique se as credenciais estão corretas em `src/lib/firebase.ts`
- Confirme que o Firestore está ativado no Firebase Console
- Verifique as regras de segurança do Firestore

### WhatsApp não envia:
- Confirme que as credenciais do Twilio estão no `.env.local`
- Verifique se seu WhatsApp está conectado ao sandbox
- Veja os logs no terminal para mensagens de erro
- Lembre-se: sem configurar, as mensagens só aparecem no console

### Erros de build:
```bash
# Limpe o cache e reinstale
rm -rf .next node_modules
pnpm install
pnpm dev
```

## 🎨 Customização de Cores

Para mudar a paleta de cores, edite `src/app/globals.css`:

```css
:root {
  --pastel-pink: #ffd6e8;      /* Rosa pastel */
  --pastel-blue: #d4e4ff;      /* Azul pastel */
  --pastel-purple: #e8d4ff;    /* Roxo pastel */
  --pastel-mint: #d4ffe8;      /* Verde menta */
  --pastel-peach: #ffebd4;     /* Pêssego pastel */
  --pastel-lavender: #f0e4ff;  /* Lavanda */
}
```

## 🚀 Deploy

### Vercel (Recomendado):
```bash
# Instale a CLI da Vercel
pnpm add -g vercel

# Deploy
vercel
```

Não esqueça de adicionar as variáveis de ambiente na Vercel:
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_FROM`
- `TWILIO_WHATSAPP_TO`

## 💕 Feito com amor para Tiko & Julia

Aproveitem o chá de casa nova! 🏠✨

