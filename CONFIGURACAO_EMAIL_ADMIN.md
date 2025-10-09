# 📧 Configuração do Email de Relatório Administrativo

## 🎯 O que foi implementado

Agora, toda vez que alguém confirmar presença e escolher presentes, você receberá um **email automático** com:

1. ✅ **Alerta**: Quem acabou de confirmar
2. ✅ **Presentes do convidado**: Lista dos presentes escolhidos por ele
3. ✅ **Relatório completo**: TODOS os presentes escolhidos até então, por todas as pessoas

---

## 📋 Formato do Email

```
🎉 Novo Presente Recebido!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CARLOS SILVA acabou de te presentear! 🎁

Presentes escolhidos:
1. Geladeira Brastemp
2. Liquidificador
3. Air Fryer

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 RELATÓRIO COMPLETO DE PRESENTES

Até agora, 5 pessoas confirmaram presença:

• Geladeira Brastemp - Carlos Silva, Maria Santos
• Liquidificador - Carlos Silva, João Costa
• Air Fryer - Carlos Silva
• Torradeira - Ana Paula
• Microondas - Pedro Alves, Ana Paula
• Kit Louças - Maria Santos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[🔥 Ver no Firebase]
```

---

## ⚙️ Como Configurar

### **Passo 1: Criar Novo Template no EmailJS**

1. Acesse sua conta no [EmailJS](https://www.emailjs.com/)
2. Vá em **"Email Templates"** → **"Create New Template"**

3. Configure o template:
   - **Template Name**: `Admin Report - Chá de Casa Nova`
   - **Subject**: `🎉 {{guest_name}} acabou de te presentear!`
   - **Content**: Copie o HTML do arquivo `TEMPLATE_EMAIL_ADMIN.html`

4. **Variáveis do Template** (EmailJS vai substituir automaticamente):
   ```
   {{to_email}}       - Email do destinatário (admin)
   {{guest_name}}     - Nome do convidado que confirmou
   {{guest_gifts}}    - Lista dos presentes escolhidos pelo convidado
   {{full_report}}    - Relatório completo de TODOS os presentes
   {{total_guests}}   - Número total de convidados que confirmaram
   ```

5. **Salve o template** e copie o **TEMPLATE ID** (ex: `template_admin_xyz`)

---

### **Passo 2: Adicionar Variáveis de Ambiente**

Abra o arquivo `.env.local` e adicione:

```env
# EmailJS - Serviço (mesmo das confirmações)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123

# EmailJS - Template NOVO para Admin
NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID=template_admin_xyz

# EmailJS - Public Key (mesma das confirmações)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=Abc123XyZ

# Emails dos Administradores (separados por vírgula)
NEXT_PUBLIC_ADMIN_EMAILS=carloslopessf@gmail.com
```

---

### **Passo 3: Múltiplos Emails (Opcional)**

Para receber os relatórios em múltiplos emails:

```env
NEXT_PUBLIC_ADMIN_EMAILS=carloslopessf@gmail.com,julia@exemplo.com,outro@exemplo.com
```

Todos os emails receberão o relatório simultaneamente! 📬

---

## 🧪 Como Testar

### **Teste 1: Email de Relatório**

1. Complete o fluxo do app (Landing → Confirmar → Selecionar presentes → Confirmar)
2. Após clicar em "Confirmar Presentes"
3. ✅ Você deve receber um email em `carloslopessf@gmail.com`
4. ✅ O email deve conter:
   - Nome do convidado
   - Presentes que ele escolheu
   - Relatório completo de todos os presentes

### **Teste 2: Múltiplas Confirmações**

1. Confirme com nome: `João`
2. Selecione: `Geladeira`, `Liquidificador`
3. Confirme
4. ✅ Recebe email

5. Abra novamente o app (nova aba/janela)
6. Confirme com nome: `Maria`
7. Selecione: `Geladeira`, `Torradeira`
8. Confirme
9. ✅ Recebe email mostrando:
   ```
   Relatório:
   • Geladeira - João, Maria
   • Liquidificador - João
   • Torradeira - Maria
   ```

### **Teste 3: Sem Configuração**

Se você ainda não configurou o EmailJS:

1. Complete uma confirmação
2. ✅ O relatório é **logado no console** do servidor
3. ✅ A confirmação é salva normalmente no Firebase
4. ✅ Não gera erro (graceful fallback)

---

## 📁 Arquivos Modificados

### 1. `src/lib/emailService.ts`
- ✅ Nova função: `sendAdminReport()`
- ✅ Envia email para múltiplos admins
- ✅ Formata relatório completo

### 2. `src/app/api/confirm/route.ts`
- ✅ Busca todas as confirmações após salvar
- ✅ Cria relatório completo
- ✅ Envia email via `sendAdminReport()`

### 3. `TEMPLATE_EMAIL_ADMIN.html` (NOVO)
- ✅ Template HTML bonito e responsivo
- ✅ Design alinhado com o tema do site
- ✅ Glassmorphism style

### 4. `CONFIGURACAO_EMAIL_ADMIN.md` (NOVO)
- ✅ Documentação completa
- ✅ Passo a passo de configuração

---

## 🎨 Exemplo Visual do Email

### Header (Fundo degradê terracota)
```
🎉
Novo Presente Recebido!
Chá de Casa Nova - Tiko & Julia
```

### Alerta (Fundo creme, borda terracota)
```
CARLOS SILVA acabou de te presentear! 🎁

Presentes escolhidos:
1. Geladeira Brastemp
2. Liquidificador
```

### Relatório (Fundo cinza claro)
```
📊 Relatório Completo de Presentes

Até agora, 5 pessoas confirmaram presença:

• Geladeira - Carlos, Maria
• Liquidificador - Carlos, João
• Torradeira - Ana
```

### Footer
```
[🔥 Ver no Firebase]

💡 Dica: Você pode adicionar mais emails...
```

---

## 🔧 Variáveis de Ambiente

### Necessárias:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID      # Service ID do EmailJS
NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID  # Template ID (novo para admin)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY      # Public Key do EmailJS
```

### Opcional:
```env
NEXT_PUBLIC_ADMIN_EMAILS  # Padrão: carloslopessf@gmail.com
```

---

## 💡 Dicas

### Para adicionar mais admins:
1. Edite `.env.local`
2. Adicione emails separados por vírgula
3. Reinicie o servidor (`pnpm dev`)

### Para personalizar o template:
1. Edite `TEMPLATE_EMAIL_ADMIN.html`
2. Copie o HTML atualizado
3. Cole no EmailJS Dashboard
4. Salve

### Para testar sem enviar email:
1. Não configure as variáveis de ambiente
2. O sistema loga no console do servidor
3. Útil para desenvolvimento local

---

## 🐛 Troubleshooting

### Problema: "Email não chega"
**Soluções**:
1. Verifique spam/lixo eletrônico
2. Confirme que `NEXT_PUBLIC_ADMIN_TEMPLATE_ID` está correto
3. Veja logs no console do servidor
4. Teste no [EmailJS Dashboard](https://dashboard.emailjs.com/admin)

### Problema: "Relatório vazio"
**Solução**: O relatório só mostra presentes JÁ ESCOLHIDOS. Se é a primeira confirmação, estará vazio.

### Problema: "Variável não substituída"
**Solução**: Verifique se as variáveis no template EmailJS estão escritas corretamente:
- `{{guest_name}}` ✅
- `{{guestName}}` ❌
- `{{ guest_name }}` ❌

---

## 📊 Limites do EmailJS

- **Plano Gratuito**: 200 emails/mês
- **Cada confirmação envia**: 1 email por admin configurado
- **Exemplo**: 3 admins = 3 emails por confirmação
- **100 confirmações** = 300 emails (excede o limite)

**Solução**: Se precisar de mais, upgrade para plano pago ($15/mês = 1000 emails)

---

## ✅ Checklist de Configuração

- [ ] Criar novo template no EmailJS com o HTML fornecido
- [ ] Copiar o Template ID
- [ ] Adicionar `NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID` no `.env.local`
- [ ] Confirmar que `NEXT_PUBLIC_ADMIN_EMAILS` está correto
- [ ] Reiniciar o servidor de desenvolvimento
- [ ] Fazer uma confirmação de teste
- [ ] Verificar se recebeu o email
- [ ] Verificar se o relatório está completo

---

## 🎯 Fluxo Completo

```
User confirma presença
       ↓
Seleciona presentes
       ↓
Clica em "Confirmar"
       ↓
API /api/confirm recebe os dados
       ↓
Salva no Firebase
       ↓
Envia WhatsApp (se configurado)
       ↓
Busca TODAS as confirmações
       ↓
Cria relatório completo
       ↓
Envia email para TODOS os admins ✉️
       ↓
Admins recebem email com:
  - Novo convidado
  - Presentes escolhidos por ele
  - Relatório completo atualizado
```

---

**🎉 Sistema de relatórios por email implementado e pronto para uso!**

