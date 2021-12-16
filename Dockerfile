FROM node:17-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
USER root
WORKDIR /app
COPY . .
RUN npm install && npm run build
ENV NODE_ENV production
ENV PORT 80
ENV NEXT_TELEMETRY_DISABLED 1
EXPOSE 80
CMD ["node_modules/.bin/next", "start"]