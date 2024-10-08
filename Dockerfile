FROM debian:12-slim as base

WORKDIR /app

RUN apt-get update -y \
	&& apt-get install -y \
		nodejs \
		npm \
	&& rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json .
RUN npm install
COPY . .


FROM base as dev
EXPOSE 3000
ENTRYPOINT npm run dev
