# 📁 Estrutura do Projeto - Chá de Casa Nova

## 🎯 Visão Geral

Site completo para chá de casa nova com:
- ✨ Design glassmorphism + tons pastéis + minimalismo
- 🎭 Animações impressionantes com Framer Motion
- 🎁 Sistema de seleção de presentes (múltipla escolha)
- 💾 Integração com Firebase para persistência
- 📱 Notificações via WhatsApp (Twilio)
- 🎨 Preview de produtos ao fazer hover

## 📂 Arquivos Criados

### Configuração e Dados
```
├── .env.local.example          # Template das variáveis de ambiente
├── SETUP.md                    # Guia completo de configuração
├── QUICK_START.md              # Guia rápido para começar
├── ESTRUTURA_DO_PROJETO.md     # Este arquivo
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── confirm/
│   │   │   │   └── route.ts          # API: Salva confirmação + envia WhatsApp
│   │   │   └── link-preview/
│   │   │       └── route.ts          # API: Busca preview de produtos (Open Graph)
│   │   │
│   │   ├── page.tsx                  # 🔥 PÁGINA PRINCIPAL - Fluxo completo
│   │   ├── types.ts                  # Interfaces TypeScript
│   │   └── globals.css               # Estilos globais (glassmorphism)
│   │
│   ├── components/
│   │   ├── LandingPage.tsx           # Landing page com info do evento
│   │   ├── ConfirmationForm.tsx      # Formulário de nome
│   │   ├── GiftSelector.tsx          # Seletor de presentes (complexo)
│   │   └── ThankYouPage.tsx          # Tela de agradecimento + confetti
│   │
│   ├── data/
│   │   └── gifts.ts                  # 📝 LISTA DE PRESENTES (customizar aqui)
│   │
│   └── lib/
│       ├── firebase.ts               # 🔑 CONFIG FIREBASE (adicionar credenciais)
│       └── firebaseService.ts        # Funções para salvar/buscar dados
```

## 🎨 Design System

### Cores Pastéis (globals.css)
```css
--pastel-pink: #ffd6e8
--pastel-blue: #d4e4ff
--pastel-purple: #e8d4ff
--pastel-mint: #d4ffe8
--pastel-peach: #ffebd4
--pastel-lavender: #f0e4ff
```

### Classes Glassmorphism
- `.glass` - Efeito glassmorphism médio
- `.glass-strong` - Efeito glassmorphism forte (mais opaco)
- `.glass-subtle` - Efeito glassmorphism sutil (mais transparente)
- `.hover-lift` - Efeito de elevação no hover

### Animações Customizadas
- `.animate-float` - Elementos flutuantes
- `.animate-shimmer` - Efeito de brilho/shimmer

## 🔄 Fluxo da Aplicação

```
1. LANDING PAGE (LandingPage.tsx)
   ↓
   [Usuário clica em "Confirmar Presença"]
   ↓
2. FORMULÁRIO (ConfirmationForm.tsx)
   ↓
   [Usuário digita nome e confirma]
   ↓
3. SELEÇÃO DE PRESENTES (GiftSelector.tsx)
   ↓
   [Usuário seleciona presentes]
   ↓
4. SUBMISSÃO
   - Salva no Firebase (confirmations collection)
   - Envia WhatsApp via Twilio
   ↓
5. AGRADECIMENTO (ThankYouPage.tsx)
   - Mostra confetti
   - Exibe mensagem personalizada
```

## 💾 Estrutura de Dados

### Firebase Collections

#### `confirmations`
```typescript
{
  id: string (auto-gerado)
  name: string                    // Nome do convidado
  selectedGifts: string[]         // Array de IDs dos presentes
  timestamp: number               // Data/hora da confirmação
}
```

#### `gifts` (opcional - pode usar apenas o gifts.ts)
```typescript
{
  id: string
  name: string
  category: string
  link?: string
  selectedBy: string[]            // Array de nomes que escolheram
}
```

### Categorias de Presentes (6 categorias, 4 itens cada)
1. **Mais Desejados** (`most-wanted`)
2. **Cozinha** (`kitchen`)
3. **Banheiro** (`bathroom`)
4. **Área de Serviço** (`laundry`)
5. **Quarto** (`bedroom`)
6. **Geral** (`general`)

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilos utilitários
- **Framer Motion** - Animações fluidas
- **Firebase** (Firestore) - Banco de dados
- **Twilio** - WhatsApp notifications
- **React Hot Toast** - Notificações toast
- **Canvas Confetti** - Efeito de confetti
- **Heroicons** - Ícones bonitos

## 🎯 Features Implementadas

### ✅ UI/UX
- [x] Design glassmorphism responsivo
- [x] Gradientes pastéis harmônicos
- [x] Animações com Framer Motion
- [x] Elementos flutuantes decorativos
- [x] Hover effects interativos
- [x] Mobile-first design

### ✅ Funcionalidades
- [x] Landing page informativa
- [x] Formulário de confirmação com validação
- [x] Seleção múltipla de presentes
- [x] Preview de produtos no hover (Open Graph)
- [x] Indicação visual de presentes já escolhidos
- [x] Mensagem amigável para presentes duplicados
- [x] Persistência de dados no Firebase
- [x] Notificações via WhatsApp
- [x] Tela de agradecimento com confetti
- [x] Toast notifications

### ✅ Integrações
- [x] Firebase Firestore
- [x] Twilio WhatsApp API
- [x] Open Graph para previews

## 📝 Próximos Passos (Para Você)

### 1. Configuração Obrigatória
- [ ] Adicionar credenciais do Firebase em `src/lib/firebase.ts`
- [ ] Ativar Firestore no Firebase Console

### 2. Customização de Conteúdo
- [ ] Substituir foto do casal em `src/components/LandingPage.tsx` (linha 139-145)
- [ ] Atualizar links dos presentes em `src/data/gifts.ts`

### 3. WhatsApp (Opcional)
- [ ] Criar conta no Twilio
- [ ] Criar arquivo `.env.local` com credenciais
- [ ] Conectar WhatsApp ao sandbox do Twilio

### 4. Deploy
- [ ] Fazer deploy na Vercel
- [ ] Adicionar variáveis de ambiente na Vercel
- [ ] Testar em produção

## 🎨 Como Personalizar

### Mudar Cores
Edite `src/app/globals.css` - seção `:root`

### Adicionar/Remover Presentes
Edite `src/data/gifts.ts`

### Mudar Textos da Landing
Edite `src/components/LandingPage.tsx`

### Ajustar Animações
Cada componente tem animações do Framer Motion que podem ser customizadas

## 🐛 Debug

### Ver logs do servidor
```bash
pnpm dev
# Logs aparecem no terminal
```

### Ver dados salvos
Firebase Console → Firestore Database → Collections

### Testar WhatsApp
Terminal mostrará se a mensagem foi enviada ou se houve erro

## 🚀 Performance

- **Build otimizado** com Next.js
- **Imagens otimizadas** com next/image
- **Lazy loading** dos componentes
- **Animações performáticas** com Framer Motion
- **CSS otimizado** com Tailwind

## 📱 Responsividade

Testado e funcional em:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablet (768px+)
- ✅ Mobile (375px+)

## 💡 Dicas de Uso

1. **Sem Firebase?** O site não salvará dados, mas funcionará visualmente
2. **Sem Twilio?** As notificações aparecerão apenas no console do terminal
3. **Preview de produtos** funciona melhor com sites que têm Open Graph tags (Amazon, Magazine Luiza, etc)

## 🎉 Pronto para Usar!

Siga o **QUICK_START.md** para começar rapidamente, ou o **SETUP.md** para um guia completo.

---

Feito com 💜 para o chá de casa nova do Tiko & Julia

