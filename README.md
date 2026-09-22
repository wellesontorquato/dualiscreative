# Dualis Creative

Site-portfólio da Dualis Creative, estúdio audiovisual focado em fotografia, filme, movimento e direção visual.

O projeto utiliza Next.js App Router, TypeScript e uma arquitetura editorial orientada a mídia, com suporte a português e inglês.

## Stack

- Next.js 16
- React 19
- TypeScript
- GSAP
- Lenis
- MediaPipe Tasks Vision
- ESLint 9
- Netlify

## Requisitos

- Node.js 24.x
- npm
- Git

A versão do Node está registrada em `.nvmrc` e em `package.json`.

## Instalação

```bash
npm ci
```

## Desenvolvimento

Modo padrão:

```bash
npm run dev
```

Modo Webpack:

```bash
npm run dev:webpack
```

Também é possível:

```bash
npm run dev -- --webpack
```

## Qualidade

Lint:

```bash
npm run lint
```

Lint com correção automática:

```bash
npm run lint:fix
```

TypeScript:

```bash
npm run typecheck
```

Build:

```bash
npm run build
```

Gate completo:

```bash
npm run check
```

O comando `check` executa lint, TypeScript e build.

## Variáveis de ambiente

Use `.env.example` como referência.

Variável principal:

```text
NEXT_PUBLIC_SITE_URL
```

Ela define a URL pública utilizada em canonical, metadata, sitemap, robots e compartilhamento social.

Em desenvolvimento:

```text
http://localhost:3000
```

Em produção, configure o domínio definitivo.

## Internacionalização

Rotas principais:

```text
/pt
/en
```

As páginas possuem metadata localizada, canonical e hreflang.

## SEO

O projeto gera:

```text
/icon.png
/apple-icon.png
/opengraph-image
/robots.txt
/sitemap.xml
```

Também possui Open Graph e Twitter Card.

## Estrutura principal

```text
src/
  app/
  components/
    animations/
    home/
    i18n/
    layout/
    media/
    ui/
    work/
  data/
  i18n/
  lib/

public/
  brand/
  mediapipe/
  projects/
```

## Deploy

O projeto está preparado para Netlify.

Configuração:

```text
netlify.toml
```

Build:

```bash
npm run build
```

Diretório:

```text
.next
```

## CI

Workflow:

```text
.github/workflows/quality.yml
```

Executa em push e pull request:

```bash
npm ci
npm run check
```

## Mídia

A arquitetura possui foco editorial por asset e refinamento facial progressivo.

Comportamento dos vídeos:

```text
mouse hover -> play
mouse leave -> pause
teclado -> Enter / Espaço
touch comum -> preview estático
```

## Status

Concluído:

- saneamento de CSS
- arquitetura de mídia
- performance
- acessibilidade
- SEO
- internacionalização

A etapa final trata os ativos definitivos, otimização das mídias e checklist de publicação.

## Gate de publicação

Antes de publicar definitivamente:

```bash
npm run release:check
```

Esse comando verifica conteúdo ainda provisório, como:

- mídia externa de demonstração;
- vídeos sem poster definitivo;
- nomes genéricos de projetos;
- links `href="#"`;
- URL pública ainda não confirmada.

O refinamento facial por MediaPipe é opcional.

Por padrão:

```text
NEXT_PUBLIC_ENABLE_FACE_TRACKING=false
```

Nesse modo o site utiliza os pontos focais editoriais definidos nos próprios dados, evitando carregar o runtime de visão computacional para todos os visitantes.

Para ativar o refinamento em runtime:

```text
NEXT_PUBLIC_ENABLE_FACE_TRACKING=true
```
