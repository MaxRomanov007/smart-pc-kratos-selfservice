FROM oven/bun:1 AS base

WORKDIR /app

# install dependencies with bun
FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --no-save --frozen-lockfile

# rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

ARG KRATOS_URL
ARG HYDRA_ADMIN_URL
ARG FILE_SERVER_ADDRESS
ARG FILE_SERVER_BROWSER_ADDRESS
ARG FILE_SERVER_USER
ARG FILE_SERVER_PASSWORD

ENV NEXT_PUBLIC_ORY_SDK_URL=${KRATOS_URL}
ENV ORY_SDK_URL=${KRATOS_URL}
ENV HYDRA_ADMIN_URL=${HYDRA_ADMIN_URL}
ENV FILE_SERVER_ADDRESS=${FILE_SERVER_ADDRESS}
ENV FILE_SERVER_BROWSER_ADDRESS=${FILE_SERVER_BROWSER_ADDRESS}
ENV FILE_SERVER_USER=${FILE_SERVER_USER}
ENV FILE_SERVER_PASSWORD=${FILE_SERVER_PASSWORD}

RUN bun run build

# production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

ENV NODE_ENV=production \
    PORT=3002 \
    HOSTNAME="0.0.0.0"

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --no-log-init -g nodejs nextjs

COPY --from=builder /app/public ./public

# automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG KRATOS_URL
ARG HYDRA_ADMIN_URL
ARG FILE_SERVER_ADDRESS
ARG FILE_SERVER_BROWSER_ADDRESS
ARG FILE_SERVER_USER
ARG FILE_SERVER_PASSWORD

ENV NEXT_PUBLIC_ORY_SDK_URL=${KRATOS_URL}
ENV ORY_SDK_URL=${KRATOS_URL}
ENV HYDRA_ADMIN_URL=${HYDRA_ADMIN_URL}
ENV FILE_SERVER_ADDRESS=${FILE_SERVER_ADDRESS}
ENV FILE_SERVER_BROWSER_ADDRESS=${FILE_SERVER_BROWSER_ADDRESS}
ENV FILE_SERVER_USER=${FILE_SERVER_USER}
ENV FILE_SERVER_PASSWORD=${FILE_SERVER_PASSWORD}

USER nextjs

CMD ["bun", "./server.js"]