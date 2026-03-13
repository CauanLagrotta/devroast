# DevRoast

## Visão Geral

Plataforma para roast (críticas implacáveis) de código. Usuários enviam código e recebem avaliações sobre a qualidade do código, com humor.

## Stack

- **Next.js 16** - Framework React
- **Tailwind CSS v4** - Estilização
- **Radix UI** - Primitivos de UI (Switch)
- **Shiki** - Syntax highlighting
- **Biome** - Linting e formatação

## Estrutura de Componentes

```
src/components/ui/
├── button.tsx
├── toggle.tsx
├── badge.tsx
├── card.tsx
├── code-block.tsx
├── code-input.tsx
├── diff-line.tsx
└── score-ring.tsx
```

### Padrões de Componentes

1. Usar `tailwind-variants` (tv) para variants
2. NÃO usar `cn()`/`twMerge` com variants - passar `className` direto
3. Usar variáveis Tailwind (ex: `bg-accent-green`, `text-text-primary`)
4. Definir variáveis no `@theme` em `src/app/globals.css`

### Variáveis Tailwind Disponíveis

```
--color-bg-page, --color-bg-surface, --color-bg-input, --color-bg-elevated
--color-border-primary, --color-border-secondary
--color-text-primary, --color-text-secondary, --color-text-tertiary
--color-accent-green, --color-accent-red, --color-accent-amber
```

## Páginas

- `/` - Home com input de código
- `/results` - Resultados do roast
- `/leaderboard` - Ranking dos piores códigos
- `/components` - Gallery de componentes
