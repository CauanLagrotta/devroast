# Padrões de Componentes UI

## Estrutura de Arquivos

Coloque componentes em `src/components/ui/`.

```
src/components/ui/
├── index.ts        # Exporta todos os componentes
├── button.tsx      # Componente individual
└── ...
```

## Padrão de Componente com tailwind-variants

### NÃO use twMerge com variants

O `tailwind-variants` já faz o merge das classes automaticamente quando você passa `className` como propriedade da variant.

```tsx
// ❌ ERRADO - desnecessário usar cn/twMerge
import { cn } from "@/lib/utils";

<button className={cn(buttonVariants({ variant, size }), className)} />

// ✅ CORRETO - passe className diretamente para a variant
<button className={buttonVariants({ variant, size, className })} />
```

### Template de Componente

```tsx
import { type ComponentHTMLAttributes, forwardRef } from "react";
import { tv } from "tailwind-variants";

const componentVariants = tv({
  base: "classes-base sempre aplicadas",
  variants: {
    variant: {
      primary: "classes para variant primary",
      secondary: "classes para variant secondary",
    },
    size: {
      sm: "classes para size sm",
      md: "classes para size md",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ComponentVariantProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
};

export interface ComponentProps extends ComponentHTMLAttributes<HTMLDivElement> {
  variant?: ComponentVariantProps["variant"];
  size?: ComponentVariantProps["size"];
  className?: string;
}

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={componentVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Component.displayName = "Component";

export { Component, componentVariants };
```

### Exportação

No `index.ts`:

```tsx
export { Button, buttonVariants } from "./button";
```

## Regras

1. Use `forwardRef` para permitir ref forwarding
2. Defina `displayName` após o componente
3. Use `type` separado para as variant props
4. Extenda o tipo HTML correto (ButtonHTMLAttributes, InputHTMLAttributes, etc)
5. Sempre passe `className` diretamente para a variant - não use `cn()` ou `twMerge()`
