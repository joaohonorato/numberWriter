# numbeReader

Leitor de números por extenso

## Getting Started

Instruções de como rodar a aplicação em ambiente de desenvolvimento e teste.

### Prerequisites

É necessário ter o seguinte programa instalado:
```
Docker
    - docker
    - docker-machine
    - docker-compose
```

### Installing

Para rodar a aplicação em um container, entre no diretório que contem o Dockerfile :

Possible issue solution in docker config in windows:

Create container:
```
docker-machine create --driver virtualbox certi
```

Bind container to cmd shell:
```
docker-machine.exe env --shell cmd certi

@FOR /f "tokens=*" %i IN ('docker-machine.exe env --shell cmd default') DO @%i
```

Get ip from docker-machine container
```
docker-machine ip default
```

Build e Run:
```
docker build -t certi/numbereader .

docker run -p 3000:3000 -d certi/numbereader

```
Ou 
```
docker-compose up
```
## Running the tests

Sem testes até o momento

## Deployment

Informações sobre a aplicação:

## Built With

* [Node.Js](https://nodejs.org/) - Linguagem de programação
* [Express.js](https://expressjs.com/pt-br/) - Framework web
* [Nodemon](https://nodemon.io/) - Live reload


## Authors

* **João Assis** - *Início* - [Assis](https://github.com/joaohonorato)


## Acknowledgments

* Agradeço a comunidade de desenvolvedores que sempre compartilham informações na web
* Ao docker e npm por facilitar a montagem dos ambientes
* Ao javascript por saber evoluir constatemente
