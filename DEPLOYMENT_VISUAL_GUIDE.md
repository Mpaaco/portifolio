# 📱 Guia Visual: Configurações Passo a Passo (Vercel + Render)

## 🟦 RENDER: Backend Node.js + MongoDB

### Preparação

```
1. Ter repositório Git público ou privado (recomendo privado)
2. Variáveis de ambiente prontas (MongoDB connection string)
3. Procfile criado ✅ (já feito)
```

### Fluxo Visual Render

```
render.com
    ↓
[Sign up/Login] → GitHub
    ↓
Dashboard
    ↓
[New +] → [Web Service]
    ↓
Conectar repositório
    ↓
Configurar:
├─ Name: portfolio-backend
├─ Environment: Node
├─ Build: npm install
├─ Start: npm start
└─ Region: São Paulo
    ↓
[Environment Variables]
├─ PORT = 3000
├─ MONGODB_URI = mongodb+srv://...
├─ MONGODB_DATABASE = portf_db
└─ NODE_ENV = production
    ↓
[Create Web Service]
    ↓
⏳ Aguardar 3-5 minutos
    ↓
✅ Serviço Online
    ↓
📋 Copiar URL: https://seu-servico.onrender.com
```

---

### ✅ Checklist Render - Passo a Passo Clicável

#### Passo 1️⃣: Acesse render.com

```
URL: https://render.com
```

#### Passo 2️⃣: Crie Conta

```
[Sign up] → [Continue with GitHub]
├─ Autorize a Render
└─ Conecte sua conta
```

#### Passo 3️⃣: Crie Novo Serviço

```
[Dashboard] 
    ↓
[New +] (canto superior direito)
    ↓
[Web Service]
```

#### Passo 4️⃣: Conecte Repositório

```
[Connect a repository]
    ↓
Procure por "portifolio"
    ↓
[Connect] (botão ao lado)
```

#### Passo 5️⃣: Configure o Serviço

```
┌─ Name: portfolio-backend
├─ Environment: Node
├─ Build Command: npm install
├─ Start Command: npm start
├─ Instance Type: Free
└─ Region: São Paulo (maior latência menor)
```

#### Passo 6️⃣: Adicione Variáveis de Ambiente

```
[Environment Variables] → [Add Environment Variable]

Clique 6 vezes para adicionar:

1️⃣ PORT
   └─ 3000

2️⃣ NODE_ENV
   └─ production

3️⃣ MONGODB_DATABASE
   └─ portf_db

4️⃣ MONGODB_URI
   └─ mongodb+srv://usuario:senha@cluster.mongodb.net/?retryWrites=true&w=majority
   
5️⃣ (Deixar em branco se não usar outras)
```

**Onde Conseguir MongoDB Connection String:**

```
1. Acesse: https://www.mongodb.com/cloud/atlas
2. [Sign Up/Login]
3. [Create] → [Free Shared]
4. Name: portf_db
5. Provider: AWS
6. Region: São Paulo (sa-east-1)
7. [Create]
8. Aguarde criação (~5 min)
9. Clique em [Connect]
10. [Add IP Address] → [0.0.0.0/0] (qualquer IP)
11. [Create Database User] → usuario / senha
12. [Drivers] → [Node.js]
13. Copie a string (a que começa com mongodb+srv://)
14. Substitua <username> e <password>
```

#### Passo 7️⃣: Faça Deploy

```
[Create Web Service]
    ↓
⏳ Aguarde: Build em progresso...
    ↓
Você verá logs do npm install
    ↓
✅ Quando ficar verde: PRONTO!
```

#### Passo 8️⃣: Obtenha a URL do Backend

```
Procure em: [Environments] → ou copie de [Logs]

A URL será algo assim:
https://portfolio-backend-1234.onrender.com

💾 COPIE E GUARDE ESTA URL!
```

---

## ⬜ VERCEL: Frontend React + Vite

### Preparação

```
1. Backend já deployado no Render ✅
2. Ter a URL do backend anotada ✅
3. vercel.json já criado ✅
4. vite.config.js atualizado ✅
```

### Fluxo Visual Vercel

```
vercel.com
    ↓
[Sign up/Login] → GitHub
    ↓
Dashboard
    ↓
[Add New] → [Project]
    ↓
Selecionar repositório
    ↓
Configurar Build
├─ Framework: Vite
├─ Build: npm run build
└─ Output: dist
    ↓
[Environment Variables]
├─ VITE_API_URL = https://seu-backend-render.com
    ↓
[Deploy]
    ↓
⏳ Aguardar 2-3 minutos
    ↓
✅ Frontend Online
    ↓
📋 URL: https://seu-projeto.vercel.app
```

---

### ✅ Checklist Vercel - Passo a Passo Clicável

#### Passo 1️⃣: Acesse vercel.com

```
URL: https://vercel.com
```

#### Passo 2️⃣: Crie Conta

```
[Sign Up] → [Continue with GitHub]
├─ Autorize a Vercel
└─ Conecte sua conta
```

#### Passo 3️⃣: Importe Projeto

```
[Add New] (canto superior direito)
    ↓
[Project]
    ↓
[Select a repository]
    ↓
Procure por "portifolio"
    ↓
[Import]
```

#### Passo 4️⃣: Configure o Projeto

```
Project Name: portfolio-frontend
Framework Preset: Vite
Root Directory: ./ (ou deixar em branco)

Build and Output Settings
├─ Build Command: npm run build
├─ Output Directory: dist
└─ Install Command: npm install
```

#### Passo 5️⃣: Adicione Variáveis de Ambiente

```
Antes de clicar em [Deploy]:

[Environment Variables]
    ↓
VITE_API_URL
└─ https://portfolio-backend-1234.onrender.com
   (Use a URL completa do Render que você copiou!)
```

#### Passo 6️⃣: Faça Deploy

```
[Deploy]
    ↓
⏳ Aguarde: Build em progresso...
    ↓
Você verá:
- ▶️ Installing dependencies
- ▶️ Building project
- ▶️ Optimizing production build
    ↓
✅ Quando ficar pronto: SUCESSO!
```

#### Passo 7️⃣: Obtenha a URL do Frontend

```
Após deploy com sucesso, você verá:

🎉 Congratulations! Your project is live!

URL do projeto:
https://portfolio-frontend.vercel.app
```

---

## 🔗 TESTE A INTEGRAÇÃO

### Teste 1: Backend Responde?

```bash
# Terminal do seu PC local

curl https://seu-backend.onrender.com/api/posts

# Esperado: 
# [ ] (array JSON)
# ou
# { "message": "..." }

# Se receber erro 500: verificar MongoDB
# Se receber erro 503: backend dormindo (Render free ativa após requisição)
```

### Teste 2: Frontend Conecta?

```
1. Abra: https://seu-projeto.vercel.app
2. Clique em alguma página que usa API (ex: Publicações)
3. Abra DevTools (F12)
4. Vá em: [Network]
5. Procure por requisições que iniciam com "api/"
6. Clique em uma
7. Verifique:
   ├─ Status: 200 ✅ (sucesso)
   ├─ Response: dados JSON
   └─ Request URL: https://seu-backend.onrender.com/api/...
```

### Teste 3: Formulários Funcionam?

```
✅ Enviar contato
✅ Criar post
✅ Editar post  
✅ Deletar post
```

Se algum falhar, check:
1. Abra DevTools (F12)
2. Aba [Console] - há erros vermelhos?
3. Aba [Network] - qual a resposta do servidor?

---

## 🔄 UPDATES FUTUROS

### Quando você quer atualizar o código:

```bash
# No seu PC:
git add .
git commit -m "feat: sua mensagem"
git push origin main

# Resultado automático:
├─ Render detecta → rebuild backend (3-5 min)
└─ Vercel detecta → rebuild frontend (1-2 min)
```

### Se quebrou e quer rollback:

**Render:**
```
[Deployments] → Clique na versão anterior → [Deploy]
```

**Vercel:**
```
[Deployments] → Clique nos 3 pontinhos → [Redeploy]
```

---

## ⚠️ PROBLEMAS COMUNS

### ❌ "503 Service Unavailable" no Backend

**Causa:** Render free ativa o app apenas com requisições
**Solução:** Faça uma requisição (aguarde 30-60s) → tenta novamente

### ❌ "CORS Error" no Console

**Causa:** Backend não permite origem do Vercel
**Solução:** Adicione em `server.js`:

```javascript
app.use(cors({
  origin: 'https://seu-projeto.vercel.app',
  credentials: true
}))
```

Commit e push → auto redeploy

### ❌ "VITE_API_URL undefined"

**Causa:** Variável não setada corretamente
**Solução:** 
1. Vercel → [Settings] → [Environment Variables]
2. Apague e recrie com NOME EXATO: `VITE_API_URL`
3. [Deployments] → último → [Redeploy]

### ❌ Build falha no Vercel

**Causa:** Erro no código durante `npm run build`
**Solução:**
```bash
# No seu PC:
npm run build

# Arrume os erros
git add .
git commit -m "fix: erros de build"
git push origin main
```

### ❌ MongoDB "authentication failed"

**Causa:** Connection string errada
**Solução:**
1. MongoDB Atlas → [Database] → [Connect]
2. Copy a string fornecida
3. Substitua `<username>` e `<password>` com valores reais
4. Render → [Environment] → edite MONGODB_URI
5. Clique em [Manual Deploy] ou aguarde próximo push

---

## 💡 DICAS IMPORTANTES

| Dica | Razão |
|------|-------|
| Sempre fazer commit antes de push | Render/Vercel trigam ao ver novo push |
| Testar build localmente: `npm run build` | Pega erros antes de fazer deploy |
| Monitorar logs dos serviços | Render/Vercel mostram erros em tempo real |
| Usar `.env.production` para variáveis | Facilita manutenção de ambientes |
| Versionar `package-lock.json` | Garante mesmas dependências em produção |

---

## 📞 SUPORTE

Ficou com dúvida?

- Render Help: https://render.com/docs
- Vercel Support: https://vercel.com/support
- Node/Express: https://nodejs.org/docs
- MongoDB: https://docs.mongodb.com

