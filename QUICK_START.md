# ⚡ QUICK START - Deploy em 15 Minutos

## 🔥 TL;DR - Versão Ultra Rápida

```
1. MongoDB: mongodb.com/cloud/atlas → criar cluster FREE
   └─ Copiar connection string (com username:password)

2. Render: render.com → [New Web Service]
   └─ Repositório: seu-repo
   └─ Build: npm install
   └─ Start: npm start
   └─ Vars: PORT=3000, MONGODB_URI=mongodb+srv://..., NODE_ENV=production
   └─ Deploy → Copiar URL: https://seu-backend.onrender.com

3. Vercel: vercel.com → [Import Project]
   └─ Repositório: seu-repo
   └─ Vars: VITE_API_URL=https://seu-backend.onrender.com
   └─ Deploy → PRONTO!

4. Testar: Abrir https://seu-projeto.vercel.app em DevTools (F12)
```

---

## 📝 Pré-Requisitos

- [ ] Código no GitHub (repositório público ou privado)
- [ ] Conta Google/Email para criar contas

---

## 🎬 ETAPA 1: MongoDB (5 minutos)

### Conta
```
https://www.mongodb.com/cloud/atlas
→ [Sign Up]
→ Email ou Google Login
```

### Cluster
```
[Create] → [Free Shared]
→ Nome: portf_db
→ Provider: AWS
→ Region: São Paulo (sa-east-1)
→ [Create]
(Aguarde 3-5 minutos)
```

### Segurança
```
[Network Access]
→ [Add IP Address]
→ [0.0.0.0/0]
→ [Confirm]

[Database Access]
→ [Add Database User]
→ Username: seu_usuario
→ Password: sua_senha
→ [Add User]
```

### Connection String
```
[Connect]
→ [Drivers]
→ [Node.js]
→ Copiar a string que começa: mongodb+srv://
→ Substituir <username> e <password>

Resultado:
mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/?retryWrites=true&w=majority
```

---

## 🟦 ETAPA 2: Backend - Render (5 minutos)

### Conta
```
https://render.com
→ [Sign up]
→ Continue with GitHub
→ Authorize
```

### Novo Serviço
```
[Dashboard]
→ [New +]
→ [Web Service]
→ Selecionar seu repositório "portifolio"
→ [Connect]
```

### Configuração
```
Name: portfolio-backend
Environment: Node
Region: São Paulo
Build Command: npm install
Start Command: npm start

[Create Web Service]
(Aguarde 3-5 minutos até ficar verde)
```

### Variáveis
```
Antes de criar, clique em [Environment Variables]:

PORT = 3000
NODE_ENV = production
MONGODB_DATABASE = portf_db
MONGODB_URI = mongodb+srv://seu_usuario:sua_senha@...

Depois clique [Create Web Service]
```

### Copie a URL
```
Quando ficar verde ✅:

Procure por: https://portfolio-backend-xxxxx.onrender.com

Copie e guarde esta URL!
```

---

## ⬜ ETAPA 3: Frontend - Vercel (3 minutos)

### Conta
```
https://vercel.com
→ [Sign Up]
→ Continue with GitHub
→ Authorize
```

### Projeto
```
[Add New]
→ [Project]
→ [Select Repository]
→ Selecione "portifolio"
→ [Import]
```

### Configuração
```
Project Name: portfolio-frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist

⚠️ Antes de [Deploy], clique em [Environment Variables]:

VITE_API_URL = https://seu-backend-xxxxx.onrender.com
                (A URL que você copiou do Render acima!)

Depois clique [Deploy]
(Aguarde 2-3 minutos até ficar pronto)
```

### URL Final
```
Quando terminar:

Você verá: https://seu-projeto.vercel.app ✅

Abra e teste!
```

---

## ✅ ETAPA 4: Teste (2 minutos)

### Navegador
```
1. Abra: https://seu-projeto.vercel.app
2. Veja se carrega sem erro 404
3. Clique em uma página que usa API (ex: Publicações)
```

### DevTools
```
1. Aperte F12
2. Aba [Network]
3. Procure por requisições que iniciam com "api/"
4. Status deve ser 200 ✅
```

### Funcionalidades
```
✅ Carregar posts
✅ Enviar contato (se houver formulário)
✅ Criar novo post (Admin)
✅ Editar/Deletar posts
```

---

## 🆘 Se Algo Não Funcionar

| Erro | Solução Rápida |
|------|---|
| 503 Backend | Render free demora. Aguarde 1 minuto e tente novamente |
| CORS Error | Var VITE_API_URL errada. Verifique no Vercel → [Settings] → [Environment] |
| Build fail | Rode `npm run build` no PC. Arrume erros. Commit. Push. |
| Vars não carregam | Redeploy: Vercel → [Deployments] → [Redeploy] |
| MongoDB erro | Connection string errada. Copie novamente de MongoDB Atlas |

---

## 🎯 Comandos Prontos para Copiar

### Terminal (Git)
```bash
cd "c:\Users\marco.oliveira\Documents\Marco\Dev Boy\Meus projetos\Marco\porti"
git add .
git commit -m "chore: deploy configs"
git push origin main
```

### Testar Backend
```bash
curl https://seu-backend-xxxxx.onrender.com/api/posts
# Esperado: [ ] ou [...]
```

---

## 📚 Se Quiser Mais Detalhes

- Leia: `DEPLOYMENT_GUIDE.md` (completo)
- Ou: `DEPLOYMENT_VISUAL_GUIDE.md` (visual)
- Ou: `DEPLOYMENT_CHECKLIST.md` (acompanhamento)

---

## ⏱️ Resumo de Tempo

| Etapa | Tempo |
|-------|-------|
| MongoDB Setup | 5 min |
| Render Deploy | 5 min (+ 3-5 espera) |
| Vercel Deploy | 3 min (+ 2-3 espera) |
| Testes | 2 min |
| **Total** | **15-20 min** |

**Agora é contigo! 🚀**

