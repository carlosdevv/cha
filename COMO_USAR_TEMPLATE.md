# 📧 Como Usar o Template de Email no EmailJS

## 📋 Passo a Passo Rápido

### 1. Abrir o HTML do Template
Abra o arquivo **`TEMPLATE_EMAIL_HTML.html`** que está na raiz do projeto.

### 2. Copiar o HTML
Selecione TODO o conteúdo do arquivo e copie (Ctrl+A, Ctrl+C ou Cmd+A, Cmd+C).

### 3. Configurar no EmailJS

1. **Login no EmailJS**: https://dashboard.emailjs.com/
2. Clique em **"Email Templates"** no menu lateral
3. Clique no template que você criou (ou crie um novo)
4. Na aba **"Settings"**, configure:
   - **Name**: Chá de Casa Nova - Confirmação
   - **Subject**: `Confirmação - Chá de Casa Nova Tiko & Julia 🏠`
   - **From**: `Tiko & Julia <{{from_email}}>`
   - **To**: `{{to_email}}`

5. Na aba **"Content"**, você verá:
   - Um botão **"Edit HTML"** ou **"<>"** 
   - Clique nele

6. **Cole o HTML completo** que você copiou do arquivo `TEMPLATE_EMAIL_HTML.html`

7. Clique em **"Save"**

### 4. Testar

1. Ainda no template, clique em **"Test"**
2. Preencha os campos:
   - **to_name**: Seu Nome
   - **to_email**: seu@email.com
   - **gifts_list**: 
     ```
     1. Cafeteira Nespresso
     2. Air Fryer 8L
     3. Jogo de Panelas
     ```
3. Clique em **"Send Test"**
4. Verifique seu email!

---

## 🎨 Variáveis do Template

O template usa estas variáveis que são preenchidas automaticamente pelo sistema:

- `{{to_name}}` - Nome do convidado
- `{{to_email}}` - Email do convidado
- `{{gifts_list}}` - Lista numerada dos presentes

**Não altere** essas variáveis no HTML! Elas são substituídas automaticamente.

---

## 🖼️ Preview do Email

O email ficará assim:

```
┌─────────────────────────────┐
│       [Emoji Casa]          │
│    Chá de Casa Nova         │
│      Tiko & Julia          │
├─────────────────────────────┤
│ Olá [Nome]! 🎉             │
│                             │
│ Obrigado por confirmar...   │
│                             │
│ 🎁 Presentes Escolhidos:    │
│ ┌─────────────────────┐    │
│ │ 1. Cafeteira...     │    │
│ │ 2. Air Fryer...     │    │
│ └─────────────────────┘    │
│                             │
│ 📅 Detalhes do Evento       │
│ ┌─────────────────────┐    │
│ │ 📅 Data: 07/12/2025 │    │
│ │ 🕐 Horário: 13:00h  │    │
│ │ 📍 Local: Casa...   │    │
│ │ [Ver no Google Maps]│    │
│ └─────────────────────┘    │
│                             │
│ Sua generosidade...         │
│                             │
│ 💕 Com muito carinho,       │
│    Tiko & Julia            │
└─────────────────────────────┘
```

---

## 🎨 Cores Usadas

As cores seguem o design do site:

- **Background**: Gradiente bege (#f5f0e8 → #e8dcc8)
- **Terracota**: #c87941 (destaques)
- **Preto suave**: #1a1a1a, #2d2d2d (textos)
- **Cinza**: #6b6b6b (textos secundários)
- **Branco**: #ffffff (card principal)

---

## ✏️ Personalizações

### Mudar o Emoji do Header
Linha 13 do HTML:
```html
<div style="font-size: 48px; margin-bottom: 10px;">🏠</div>
```
Troque 🏠 por outro emoji: 🎉 🎊 💝 🎁

### Mudar Cores
Procure por `#c87941` (terracota) e substitua pela cor desejada.

### Adicionar Logo
No lugar do emoji, adicione:
```html
<img src="URL_DA_SUA_LOGO" alt="Logo" style="height: 60px;">
```

---

## 📱 Responsivo

O template é 100% responsivo e funciona em:
- ✅ Gmail (Desktop e Mobile)
- ✅ Outlook
- ✅ Apple Mail
- ✅ Yahoo Mail
- ✅ Thunderbird

---

## 💡 Dicas

1. **Sempre teste** antes de usar em produção
2. **Verifique o spam** na primeira vez
3. **Não exagere no HTML** - menos é mais em emails
4. **Use inline styles** - como já está no template (obrigatório em emails)

---

## 🆘 Problema?

Se o email não chegar:
1. Verifique spam/lixo eletrônico
2. Teste o serviço de email no EmailJS
3. Verifique se as variáveis estão corretas

---

✅ **Template Pronto para Usar!**

Basta copiar, colar no EmailJS e testar! 🎉

