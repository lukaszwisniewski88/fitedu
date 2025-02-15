FROM docker.io/oven/bun:slim AS INSTALLER
COPY package.json .
COPY bun.lock .
RUN bun install

FROM INSTALLER AS BUILDER
COPY --from=INSTALLER /home/bun/app/node_modules  node_modules
COPY package.json .
COPY tsconfig.json .
COPY bun.lock .
COPY src src
RUN bun run build

FROM docker.io/oven/bun:slim AS RUNNER
COPY --from=BUILDER /home/bun/app/dist dist
COPY --from=INSTALLER /home/bun/app/node_modules  node_modules
COPY package.json .
COPY bun.lock .
ENV NODE_ENV="production"
ENV PORT=3000
EXPOSE 3000
ENTRYPOINT ["bun", "run", "./dist/main.js"]
