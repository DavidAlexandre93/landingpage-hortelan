Hortelan Agtech Ltda. — Landing Page

Uma landing page leve, estática e responsiva para apresentar o Hortelan Agtech Ltda. (IoT + automação + comunidade). O projeto inclui versão particionada (HTML/CSS/JS) e versão minificada single-file, integração de fonte Inter, favicon e Open Graph gerados a partir da logo, seção “Sobre” com vídeo e um FAQ/Mural com persistência local.

✨ Destaques

🎯 Design limpo com gradiente suave, cards e tipografia padronizada (Inter 400/600/800).

🖼️ Hero com print real do dashboard (otimizado e responsivo).

🎬 Seção “Sobre” com embed do YouTube (16:9, lazy).

🌐 PT/EN/ES/FR com switch estilizado (segmentado com animação).

💬 FAQ/Mural (localStorage): publicar, remover e exportar JSON.

🧩 Estático de verdade: sem backend; ideal para GitHub Pages/Netlify/Vercel.

🧠 SEO pronto: canonical, Open Graph, Twitter Card e JSON-LD.

🖼️ Favicon multi-tamanhos e og-image gerados da sua logo.

⚡ Performance: imagens lazy, preconnect de fontes, versão minificada.

📁 Estrutura
hortelan/
├─ index.html            # versão particionada
├─ styles.css            # estilos (tema claro/escuro via prefers-color-scheme)
├─ app.js                # i18n + lógica do FAQ/Mural
├─ index.min.html        # single-file minificado (CSS/JS inline)
└─ Assets/
   ├─ logo.png           # logo do Hortelan Agtech Ltda.
   ├─ dashboard.png      # screenshot do dashboard
   ├─ favicon.ico        # gerado (16–256px)
   └─ og-image.jpg       # imagem Open Graph (1200×630)

🚀 Como usar localmente
Opção A — Servidor simples com Node
cd hortelan
npx serve . -p 5173
# abra http://localhost:5173

Opção B — Python
cd hortelan
python -m http.server 5173
# abra http://localhost:5173


Se quiser um único arquivo para subir em qualquer lugar, use index.min.html.

🌍 Deploy

Vercel: importe o repositório, framework “Other”, diretório raiz ., output padrão.

Netlify: arraste a pasta para o drop; ou conecte o repo; build não é necessário.

GitHub Pages: branch main → Settings → Pages → Deploy from a branch → / (root).

🛠️ Personalização
1) Branding e cores

No styles.css, ajuste os tokens do tema:

:root{
  --bg:#ffffff; --fg:#0f172a; --muted:#475569; --line:#e2e8f0;
  --brand:#059669; --brand-700:#047857; --brand-50:#ecfdf5;
  --focus:#22c55e;
}

2) Logo, Dashboard e OG

Substitua os arquivos em Assets/:

logo.png (usado no JSON-LD e materiais sociais)

dashboard.png (imagem do hero)

og-image.jpg (thumbnail ao compartilhar)

Favicon: já está em Assets/favicon.ico (gerado a partir da logo). Se trocar a logo, recomendo regenerar; posso automatizar via script se quiser.

3) Fonte (Inter)

O <head> já inclui:

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">


A pilha de fontes está padronizada em styles.css/index.html:

body { font-family: 'Inter', Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; }

4) Domínio e SEO

No index.html:

Canonical: https://hortelan.vercel.app (troque pelo seu domínio final)

Open Graph: <meta property="og:image" content="assets/og-image.jpg">

JSON-LD:

{
  "@context":"https://schema.org",
  "@type":"Organization",
  "name":"Hortelan Agtech Ltda.",
  "url":"https://SEU-DOMINIO",
  "logo":"assets/logo.png",
  "sameAs":["https://www.linkedin.com/company/hortelan"]
}

5) Vídeo “Sobre”

Arquivo: index.html → seção #about.
Troque o src do iframe por outro vídeo se desejar.

6) Switch PT/EN

Atribuições data-i18n no HTML.

Dicionário no app.js (dict.pt e dict.en).

O seletor atualiza document.documentElement.lang e conteúdos.

💬 FAQ/Mural (sem backend)

Armazenamento: localStorage (cada navegador tem a sua “cópia”).

Exportar: botão Exportar JSON baixa faq-hortelan.json.

Limpar rápido: acesse a página com ?clearFaq no final da URL.

Produção: para receber as mensagens em qualquer lugar, integre Formspree, Formspark ou crie um endpoint próprio. Posso entregar um patch pronto.

♿ Acessibilidade

Navegação por teclado (foco visível).

“Pular para o conteúdo”.

Cores com contraste alto no dark mode.

Imagens com alt, vídeo com title e allowfullscreen.

⚙️ Performance

Imagens com loading="lazy".

Fonte Inter com preconnect.

Versão minificada (index.min.html) com CSS/JS inline para cargas rápidas.

Layout responsivo com grid e aspect-ratio (vídeo 16:9).

🧪 Troubleshooting

Vídeo não aparece: verifique bloqueadores de terceiros (YouTube). O embed está correto (referrer policy restrita e allow completo).

Switch PT/EN sem animação: confirme que a div.lang-switch não foi removida e que o app.js está carregando.

Logo distorcida: mantenha proporção; preferir PNG/SVG com fundo transparente.

📦 Scripts úteis

Não há build step obrigatório; mas você pode servir localmente:

# Node
npx serve . -p 5173

# Python
python -m http.server 5173


Se quiser um build “ultra” (minificar styles.css e app.js em arquivos separados), avise que eu gero um dist/ com hash de cache.

🤝 Contribuindo

Faça um fork

Crie uma branch: feat/minhas-melhorias

Commit: feat: ajusta cores e melhora FAQ

PR!

📄 Licença

Sugestão: MIT. (Posso incluir o texto completo e o arquivo LICENSE se preferir.)

📬 Contato

E-mail: davidalexandrefernandes@outlook.com

Demo: https://hortelan.vercel.app/dashboard/app
