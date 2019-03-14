# api2db-data.rio-transportes

Servidor nodejs rodando uma rotina baseada no processo cronjob para a cada hora buscar informações dos transpostes dos ônibus do portal data.rio.

## Getting Started

Instruções de como rodar a aplicação em ambiente de desenvolvimento.

### Prerequisites

É necessário ter o seguinte programa instalado:

Node.js

```
npm start.
```
### Installing

Para rodar a aplicação é necessário primeiro instalar suas dependências:
* Entre no diretório onde se encontra o package.json
* Execute :
```
npm install
```

## Deployment

Informações sobre a aplicação:

* Ajustar o arquivo database.json com informações do banco
* Executar comandos:
Criar tabelas do banco:
```
sequelize db:migrate
```
Rodar elt:
```
npm start
```

## Built With

- [Node.Js](https://nodejs.org/) - Linguagem de programação
- [Sequelize-cli] [Sequelize](http://docs.sequelizejs.com/) - ORM para Node.js 
- [Cron](https://www.npmjs.com/package/cron) - Scheduler para Node.js


## Authors

- **João Assis** - [Assis](https://github.com/joaohonorato)

## Acknowledgments

- Agradeço a comunidade de desenvolvedores que sempre compartilham informações na web
- Ao docker e npm por facilitar a montagem dos ambientes
- Ao javascript por saber evoluir constatemente