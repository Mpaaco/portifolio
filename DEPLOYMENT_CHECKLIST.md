# ✅ CHECKLIST DE DEPLOYMENT

Use este arquivo para acompanhar seu progresso! Copy e cola aqui e marque conforme avança.

---

## 🟦 PHASE 1: Preparação Local (seu PC)

### Código

- [ ] Arquivo `src/config/api.js` criado
- [ ] Arquivo `vite.config.js` atualizado
- [ ] Arquivo `package.json` com novos scripts
- [ ] Arquivo `vercel.json` criado
- [ ] Arquivo `Procfile` criado
- [ ] `.env.example` atualizado

### Git

- [ ] Todos os arquivos commitados
  ```bash
  git add .
  git commit -m "chore: preparar para deployment (Vercel + Render)"
  git push origin main
  ```

### Testes Locais

- [ ] Frontend funciona localmente: `npm run dev:frontend`
- [ ] Backend funciona localmente: `npm run dev:backend`
- [ ] Build funciona: `npm run build` (sem erros)

---

## 🟦 PHASE 2: Backend - Render

### MongoDB Atlas Setup

- [ ] Conta criada em https://www.mongodb.com/cloud/atlas
- [ ] Cluster criado (FREE)
- [ ] Database user criado
- [ ] IP adicionado: 0.0.0.0/0
- [ ] Connection string copiada
  ```
  mongodb+srv://usuario:senha@cluster.mongodb.net/
  ```

### Render Setup

- [ ] Conta criada em https://render.com (com GitHub)
- [ ] Repositório conectado
- [ ] Web Service criado

### Variáveis de Ambiente (Render)

- [ ] `PORT` = `3000`
- [ ] `NODE_ENV` = `production`
- [ ] `MONGODB_DATABASE` = `portf_db`
- [ ] `MONGODB_URI` = `mongodb+srv://...` ✅ com username e password

### Deploy

- [ ] Clicado em [Create Web Service]
- [ ] ⏳ Aguardado build (3-5 minutos)
- [ ] ✅ Status verde (sucesso)
- [ ] 📋 URL anotada: `https://_____.onrender.com`

### Testes Backend

- [ ] Teste curl:
  ```bash
  curl https://sua-url-render.onrender.com/api/posts
  ```
  - Esperado: `[]` ou array JSON
  
- [ ] Acesse no navegador (pode demorar 30-60s na primeira vez)

---

## ⬜ PHASE 3: Frontend - Vercel

### Vercel Setup

- [ ] Conta criada em https://vercel.com (com GitHub)
- [ ] Projeto importado
- [ ] Framework: Vite selecionado

### Variáveis de Ambiente (Vercel)

- [ ] `VITE_API_URL` = `https://sua-url-render.onrender.com`
  (Sem barra final!)

### Deploy

- [ ] Clicado em [Deploy]
- [ ] ⏳ Aguardado build (1-3 minutos)
- [ ] ✅ Status pronto (sucesso)
- [ ] 📋 URL anotada: `https://____.vercel.app`

### Testes Frontend

- [ ] Página carrega sem erros 404
- [ ] Abri DevTools (F12)
- [ ] Verifiquei [Console] - sem erros vermelhos
- [ ] Verifiquei [Network] - requisições `/api/` retornam 200

---

## 🔗 PHASE 4: Integração

### Testes de Integração

- [ ] Backend responde:
  ```bash
  curl https://seu-backend.onrender.com/api/posts
  ```

- [ ] Frontend conecta ao backend (DevTools → Network)

- [ ] ✅ Teste funcionalidades:
  - [ ] Carregar posts
  - [ ] Enviar contato
  - [ ] Criar novo post (Admin)
  - [ ] Editar post
  - [ ] Deletar post

### Troubleshooting

- [ ] Se erro CORS: atualizar `server.js` com origin do Vercel
- [ ] Se 503: fazer uma requisição para "acordar" o Render
- [ ] Se variável não funciona: redeploy no Vercel

---

## 📝 INFORMAÇÕES IMPORTANTES

```
URL Backend:     https://_____________________.onrender.com
URL Frontend:    https://_____________________.vercel.app
MongoDB String:  mongodb+srv://___:___@cluster.___/
```

---

## 🔄 ATUALIZAÇÕES FUTURAS

Sempre que quiser atualizar:

```bash
git add .
git commit -m "feat: sua alteração"
git push origin main

# Resultado:
# Render → auto-redeploy (3-5 min)
# Vercel → auto-redeploy (1-3 min)
```

- [ ] Primeiro deploy completo ✅
- [ ] Próxima atualização: ___/___/____

---

## 📞 PRÓXIMAS ETAPAS (Opcional)

- [ ] Adicionar domínio customizado
- [ ] Configurar email de notificações
- [ ] Habilitar analytics
- [ ] Adicionar CI/CD pipeline
- [ ] Configurar backup automático do MongoDB

