# 🚀 Quick Start - Chá de Casa Nova

## 📋 Checklist Rápido

### ✅ Antes de Rodar

1. **Firebase** (OBRIGATÓRIO):
   - [ ] Ir em `src/lib/firebase.ts` e substituir credenciais
   - [ ] Ativar Firestore Database no Firebase Console
   
2. **Twilio** (OPCIONAL - sem isso as notificações só aparecem no console):
   - [ ] Criar arquivo `.env.local` na raiz
   - [ ] Adicionar credenciais do Twilio
   
3. **Conteúdo**:
   - [ ] Substituir foto do casal em `src/components/LandingPage.tsx` (linha 139-145)
   - [ ] Atualizar links dos presentes em `src/data/gifts.ts`

### 🏃 Rodar o Projeto

```bash
# 1. Instalar dependências
pnpm install

# 2. Rodar em desenvolvimento
pnpm dev

# 3. Acessar
# http://localhost:3000
```

## 🔑 Arquivos Principais para Customizar

1. **`src/lib/firebase.ts`** - Adicionar suas credenciais do Firebase
2. **`src/data/gifts.ts`** - Substituir links dos presentes pelos reais
3. **`src/components/LandingPage.tsx`** - Substituir foto do casal (linha 139-145)
4. **`.env.local`** - Criar com credenciais do Twilio (opcional)

## 📱 Números do WhatsApp

No arquivo `.env.local`, você pode adicionar múltiplos números:

```env
TWILIO_WHATSAPP_TO=whatsapp:+5511999999999,whatsapp:+5511888888888
```

## 🎨 Preview das Telas

1. **Landing Page** - Apresentação do evento com animações
2. **Confirmação** - Formulário para o convidado se identificar
3. **Presentes** - Grid com 6 categorias e 4 presentes cada
4. **Agradecimento** - Tela final com confetti

## ⚡ Problemas Comuns

**Erro ao salvar no Firebase?**
→ Verifique se as credenciais em `src/lib/firebase.ts` estão corretas

**WhatsApp não envia?**
→ Normal! Crie o arquivo `.env.local` com as credenciais do Twilio

**Erro ao rodar?**
→ Delete a pasta `.next` e rode `pnpm dev` novamente

## 💡 Dica

O projeto já funciona mesmo sem configurar o Twilio! As notificações só aparecerão no console do terminal. Configure o Twilio apenas se quiser receber mensagens no WhatsApp.

---

Para mais detalhes, veja o arquivo `SETUP.md` completo! 📖

