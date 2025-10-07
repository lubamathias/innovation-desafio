# Innovation Brindes — Teste Técnico Front-end

Desafio técnico desenvolvido para o processo seletivo da **Innovation Brindes**.  
O projeto implementa uma mini-aplicação com `/login` e `/produtos`, fiel ao layout fornecido, utilizando **Next.js (App Router)** e consumo dos endpoints de autenticação e listagem da API homolog.

---

## 🚀 Demonstração

### 🔗 Repositório público
👉 [https://github.com/lubamathias/innovation-desafio](https://github.com/lubamathias/innovation-desafio)

### 🧭 Fluxo da aplicação
![Fluxo Demo](assets/demo.gif)

### 📊 Lighthouse (Desktop)
![Lighthouse Desktop](assets/lighthouse-desktop.png)

---

## ⚙️ Tecnologias utilizadas

- **Next.js (App Router)** – framework React moderno para SSR e SSG  
- **TypeScript** – tipagem estática e segurança de código  
- **Tailwind CSS** – estilização rápida, responsiva e consistente  
- **Zustand** – controle de estado global (auth + favoritos)  
- **fetch API** – com interceptador para anexar o token `Authorization: Bearer`  
- **Debounce + Busca com POST** – para filtrar produtos por nome/código  
- **Modal acessível** – com foco, overlay e fechamento por Esc  
- **LocalStorage** – persistência dos favoritos  
- **Responsividade mobile-first** – layout adaptado a diferentes tamanhos de tela  
- **SEO básico** – `<title>` e `<meta name="description">` em `/login` e `/produtos`

---

## 🧩 Funcionalidades

### 🔐 Autenticação
- Tela `/login` com:
  - Campos de e-mail e senha  
  - Botões “Manter logado” e “Esqueceu a senha?” (não funcional)
  - Validação de erro com mensagem amigável  
  - Redirecionamento automático para `/produtos` após login bem-sucedido  
  - Guarda de rotas: bloqueia acesso sem token (redirect automático para `/login`)  

### 🛍️ Listagem de produtos
- Consumo do endpoint GET `/produtos/listar` (com token)
- Grid responsivo com:
  - Imagem do produto  
  - Nome e código  
  - Preço formatado em BRL  
  - Selo **“EXCLUSIVO!”**  
  - Botão **“CONFIRA”**
- Busca com debounce (300–500 ms) via POST `/produtos/listar`
- Estado “sem resultados” quando a busca não retorna itens
- Ordenação local por **preço (asc/desc)** e **nome (A→Z / Z→A)**
- Paginação incremental / infinite scroll

### ⭐ Favoritos
- Cada produto pode ser favoritado
- Persistência em `localStorage`
- Filtro “Mostrar apenas favoritos”

### 🧱 Modal de detalhes
- Abertura ao clicar em “CONFIRA”
- Exibe informações completas do item
- Fechamento por botão ou tecla `Esc`
- Acessível (foco preso, overlay, aria-attributes)

---

## 🧠 Decisões técnicas

- **App Router:** escolhi o App Router por ser a abordagem moderna do Next.js, com melhor separação entre componentes server/client e suporte a metadados nativos.  
- **Zustand:** usei Zustand por ser leve e prático, com persistência simples para token e favoritos.  
- **Tailwind CSS:** permitiu manter o layout fiel e responsivo com rapidez.  
- **fetch wrapper (lib/api.ts):** criado para adicionar automaticamente o token e tratar 401 (logout).  
- **Composição de componentes:** os cards, modal, input e botões seguem padrão de componentização reutilizável.  

---

## 🧰 Como rodar localmente

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/lubamathias/innovation-desafio.git
cd innovation-desafio

2️⃣ Instale as dependências
npm install

3️⃣ Inicie o servidor de desenvolvimento
npm run dev

Acesse em http://localhost:3000/login

4️⃣ Login de teste

Use as credenciais fornecidas:

email: dinamica
senha: 123
