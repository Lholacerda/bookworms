# Server

Back-end development with Node.js🛠️

## Running the project

1. Assegure-se de ter o **docker/docker-compose**, bem como um gerenciador de pacotes como **npm** ou **pnpm**, instalados em sua máquina.

2. Instale as dependências:

```bash
npm install
# or
pnpm install
```

3. Crie um arquivo **.env** na raiz do projeto, com as seguintes variáveis de ambiente:

```dotenv
# ###### GENERAL SETTINGS #######
PROJECT_NAME=bookworms

# ###### SERVER SETTINGS #######
SERVER_PORT=3001
NODE_ENV=development

# ###### DATABASE SETTINGS #######
DATABASE_URL=postgresql://postgres.erbtihwtnntpgrzueyfo:Livrosminhocas@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
DATABASE_PORT=5432
DATABASE_PASSWORD=Livrosminhocas

# ###### TEST DATABASE SETTINGS #######
DATABASE_TEST_PORT=5433
DATABASE_TEST_USER=postgres
DATABASE_TEST_PASSWORD=docker
DATABASE_TEST_DB=bookworms-test

# ###### IMAGE UPLOAD SETTINGS #######
PHOTOS_CLOUD_NAME=dzi0uoyed
PHOTOS_API_KEY=832872197633967
PHOTOS_API_SECRET=nEQCoptZL3CCDg2g0Iu2tpu-Jbc
```

4. Para rodar o servidor, execute:

```bash
docker compose up
```

5. Para rodar as migrations, execute com o servidor rodando em outro terminal:

```bash
npm run migration
# or
pnpm run migration
```

6. O servidor está rodando :)
