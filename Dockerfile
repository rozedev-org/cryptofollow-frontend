# Base image
FROM node:22.14.0-alpine AS base
WORKDIR /app

# Instala dependencias del sistema si se requieren módulos nativos
RUN apk add --no-cache libc6-compat

# Etapa de dependencias
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Etapa de build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .


ENV NEXT_PUBLIC_API_BFF="/api/cryptofollow-service/v1"


RUN npm run build

# Etapa final (runner)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Crea usuario no root
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && mkdir .next \
    && chown -R nextjs:nodejs .next

# Copia assets y runtime
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
