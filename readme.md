# numberWriter
Escritor de números por extenso

A aplicação subirá um servidor node/http na porta 3000, e teremos os seguintes roteamentos :

* curl -s http://localhost:3000/
    Retorna uma **mensagem** de boas vidas.
* curl -s "1" POST http://localhost:3000/:number
    Retorna o número como um objeto json em formato de string
    Aceita números de (-99999,99999)
* Qualquer outro endereço
    Retorna uma **mensagem** de amigável de erro.

Obs: As **mensagens** não estão com formato json


## Getting Started

Instruções de como rodar a aplicação em ambiente de desenvolvimento e teste.

### Prerequisites

É necessário ter o seguinte programa instalado:

Node.js 
```
npm start.
```
Docker
    - docker
    - docker-machine
```
[Instruções](https://github.com/joaohonorato/numberWriter#installing)
```

### Installing

Para rodar a aplicação em um container, entre no diretório que contem o Dockerfile :

Possible issue solution in docker config in windows:
*Rode esses comandos dentro do diretorio raiz da aplicação*
Create container:
```
docker-machine create --driver virtualbox certi
```

Bind container to cmd shell (Pode ser diferente se estiver utilizando um outro programa):
```
docker-machine.exe env --shell cmd certi

@FOR /f "tokens=*" %i IN ('docker-machine.exe env --shell cmd default') DO @%i
```

Get ip from docker-machine container (Configuração adicional pode ser necessária se estiver rodando em windows sem hyperV , necessário configura o roteamaneto do virtualbox para o container)
```
docker-machine ip certi
```

Build e Run:
```
docker build -t certi/numbereader .

docker run -p 3000:3000 -d certi/numbereader

```
Se tiver docker compose instaldo em sua máquina, basta rodar:

```
docker-compose up -d
```

## Deployment

Informações sobre a aplicação:

## Built With

* [Node.Js](https://nodejs.org/) - Linguagem de programação
* [Docker](https://www.docker.com/) - Plataforma de containerização

## Authors

* **João Assis** - [Assis](https://github.com/joaohonorato)


## Acknowledgments

* Agradeço a comunidade de desenvolvedores que sempre compartilham informações na web
* Ao docker e npm por facilitar a montagem dos ambientes
* Ao javascript por saber evoluir constatemente
