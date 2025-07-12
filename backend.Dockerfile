FROM node:20-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable 
RUN apt-get update -y 
RUN apt-get install -y openssl
RUN rm -rf /var/lib/apt/lists/*

COPY . /usr/src/app
WORKDIR /usr/src/app

ENV DATABASE_URL="mysql://root:password@db:3306/mydb"

# RUN pnpm -F db db:push