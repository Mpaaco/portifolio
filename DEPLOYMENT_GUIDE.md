# 🚀 Guia de Deploy: Vercel (Frontend) + Render (Backend)

## 📋 Resumo das Alterações Realizadas

### ✅ Alterações Feitas no Projeto

1. **`src/config/api.js`** - Nova configuração centralizada de URLs de API
   - Detecta ambiente (dev/produção)
   - Define URLs dinâmicas

2. **`vite.config.js`** - Atualizado para produção
   - Melhorado build para Vercel
   - Proxy mantido para desenvolvimento local

3. **`package.json`** - Novos scripts
   - `npm run dev:frontend` - Roda apenas Vite
   - `npm run dev:backend` - Roda apenas Node
   - `npm start` - Para Render

4. **`vercel.json`** - Configuração do Vercel
   - Define build command
   - Configura rotas
   - Define cache headers

5. **`Procfile`** - Para Render
   - Define comando de inicialização

6. **`.env.example`** - Atualizado
   - Documenta todas as variáveis necessárias

---

## 🟦 PARTE 1: Deploy do Backend na Render

### Passo 1: Preparar o Repositório

```bash
# Certifique-se de que tudo está commitado
git add .
git commit -m "feat: preparar projeto para deploy separado (Vercel + Render)"
git push origin main
```

### Passo 2: Criar Conta e Conectar GitHub

1. Acesse [render.com](https://render.com)
2. Clique em **"Sign up"** e faça login com GitHub
3. Autorize a Render a acessar seus repositórios

### Passo 3: Criar Novo Web Service

1. No dashboard, clique em **"New +"** → **"Web Service"**
2. Selecione seu repositório `portifolio`
3. Configure:
   - **Name**: `portfolio-backend` (ou similar)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: Escolha a mais próxima (ex: São Paulo)
   - **Plan**: Free (ou paga conforme preciso)

### Passo 4: Configurar Variáveis de Ambiente

1. No painel do serviço, acesse **"Environment"**
2. Clique em **"Add Environment Variable"**
3. Adicione:

```
PORT = 3000
MONGODB_URI = mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/
MONGODB_DATABASE = portf_db
NODE_ENV = production
```

**Onde conseguir MongoDB:**
- Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Crie um cluster FREE
- Gere credenciais de acesso
- Copie a connection string

### Passo 5: Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o build (3-5 minutos)
3. Quando ficar verde ✅, seu backend está online!

**URL do Backend**: `https://seu-nome-render.onrender.com`

💾 **Anote esta URL!** Você precisará para configurar o Vercel.

---

## ⬜ PARTE 2: Deploy do Frontend no Vercel

### Passo 1: Criar Conta e Conectar GitHub

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Sign Up"** → Login com GitHub
3. Autorize a Vercel

### Passo 2: Criar Novo Projeto

1. Clique em **"Add New"** → **"Project"**
2. Selecione seu repositório `portifolio`
3. Configure:
   - **Project Name**: `portfolio-frontend`
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (deixe em branco ou .)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Passo 3: Configurar Variáveis de Ambiente

1. Antes de fazer deploy, clique em **"Environment Variables"**
2. Adicione:

```
VITE_API_URL = https://seu-nome-render.onrender.com
```

⚠️ **Importante**: Use a URL completa do seu backend na Render (aquela que você anotou no Passo 5 anterior)

### Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (2-3 minutos)
3. Quando ficar pronto, você receberá uma URL como:
   - `https://seu-projeto.vercel.app`

---

## 🔗 PARTE 3: Conectar Frontend ao Backend

### Verificar se está Funcionando

1. Acesse `https://seu-projeto.vercel.app`
2. Abra o Console do Navegador (F12)
3. Procure por requisições para `/api/`

Se ver erros como `CORS` ou `503`, ajuste:

### Solução 1: CORS no Backend

Seu `server.js` já tem CORS. Se receber erro, atualize:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://seu-projeto.vercel.app'
  ],
  credentials: true
}))
```

### Solução 2: Variável de Ambiente não Carregou

1. No Vercel, vá para **"Settings"** → **"Environment Variables"**
2. Apague e recrie com a URL correta
3. Faça redeploy: **"Deployments"** → clique nas 3 linhas → **"Redeploy"**

---

## 🧪 Testes Finais

### Teste 1: Backend está Online?

```bash
curl https://seu-nome-render.onrender.com/api/posts
```

Deve retornar JSON (não erro 404 ou 500)

### Teste 2: Frontend conecta ao Backend?

1. Abra `https://seu-projeto.vercel.app` em `http://localhost:3000`
2. Abra DevTools (F12)
3. Na aba **Network**, clique em um botão que chame a API
4. Deve ver requisição para `/api/posts` com status 200

### Teste 3: Formulários Funcionam?

- Teste ContactModal
- Teste PostFormModal
- Teste edição/exclusão de posts

---

## 🔄 Como Fazer Updates Após Deploy

### Atualizar o Backend (Render)

```bash
git add .
git commit -m "fix: corrigir algo no backend"
git push origin main
```

Render detecta automaticamente e faz redeploy (~2-3 min)

### Atualizar o Frontend (Vercel)

```bash
git add .
git commit -m "feat: adicionar algo no frontend"
git push origin main
```

Vercel detecta automaticamente e faz redeploy (~1-2 min)

---

## ⚠️ Troubleshooting

| Problema | Solução |
|----------|---------|
| 502 Bad Gateway | Backend está offline. Verifique no painel Render. |
| CORS Error | Atualize `CORS_ORIGINS` no backend com URL do Vercel. |
| Variáveis não carregam | Verifique nome exato (VITE_API_URL é case-sensitive). Redeploy. |
| MongoDB connection error | Verifique MONGODB_URI. Adicione seu IP na MongoDB Atlas. |
| Build falha no Render | Rode `npm install` localmente. Commit `package-lock.json`. |
| Build falha no Vercel | Rode `npm run build` localmente. Verifique erros. |

---

## 📚 Documentação Oficial

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Express Deploy](https://expressjs.com/en/advanced/best-practice-performance.html)

---

## ✨ Próximas Sugestões

- [ ] Adicionar variáveis de ambiente específicas por ambiente
- [ ] Configurar domínio customizado (ex: meuportfolio.com)
- [ ] Habilitar HTTPS automático (ambos fazem)
- [ ] Configurar email de notificação de erros
- [ ] Monitorar performance com Vercel Analytics

