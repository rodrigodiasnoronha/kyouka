# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command


## Gerar migrations

```bash
npm run typeorm migration:generate --  -o .\src\core\database\migrations\nome_das_suas_mudanças -d .\src\core\database\data-source.ts
```

## Executar migrations no banco

```bash
npm run typeorm migration:run -- -d .\src\core\database\data-source.ts
```