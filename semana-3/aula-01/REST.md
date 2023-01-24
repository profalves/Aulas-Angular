# API, REST e RESTFUL

## API

Acrônimo de **Application Programming Interface** (Interface de Programação de Aplicações) é basicamente um conjunto de rotinas e padrões estabelecidos por uma aplicação, para que outras aplicações possam utilizar as funcionalidades desta aplicação.

Desta forma, entendemos que as APIs permitem uma interoperabilidade entre aplicações. Em outras palavras, a comunicação entre aplicações e entre os usuários.

- Responsável por estabelecer comunicação entre diferentes serviços.
- Meio de campo entre as tecnologias.
- Intermediador para troca de informações.

## Representações

Agora que já sabemos que uma API permite a interoperabilidade entre usuários e aplicações, isso reforça ainda mais a importância de pensarmos em algo padronizado e, de preferência, de fácil representação e compreensão por humanos e máquinas. Isso pode soar um pouco estranho, mas veja esses três exemplos:

### Representação XML

```xml
<endereco>
  <rua>
    Rua Recife
  </rua>
  <cidade>
    Paulo Afonso
  </cidade>
</endereco>
```

### Representação JSON

```json
{ 
  "endereco": {
    "rua": "Rua Recife",
    "cidade": "Paulo Afonso",
    "estado": "Bahia"
  }
}
```

### Representação YAML

```yaml
endereco:
  rua: rua Recife
  cidade: Paulo Afonso
```

## REST

um acrônimo para **REpresentational State Transfer** (Transferência de Estado Representativo).

Será feita a transferência de dados de uma maneira simbólica, figurativa, representativa, de maneira didática.

A transferência de dados, geralmente, usando o protocolo HTTP.

O REST determina algumas obrigações nessas transferências de dados, o que o torna RESTFul

Resources (Recursos) seriam como uma entidade ou um objeto.

## RESTFUL

RESTful, é a aplicação dos padrões REST.

### 6 requisitos (constraints) para ser RESTful

- *Uniform Interface*: Manter uma uniformidade, uma constância, um padrão na construção da interface. Nossa API precisa ser coerente para quem vai consumi-lá. Precisa fazer sentido para o cliente e não ser confusa. Logo, coisas como: o uso correto dos verbos HTTP; endpoints coerentes (todos os endpoints no plural, por exemplo); usar somente uma linguagem de comunicação (json) e não várias ao mesmo tempo; sempre enviar respostas aos clientes; são exemplos de aplicação de uma interface uniforme.

- *Client-server*: Separação do cliente e do armazenamento de dados (servidor), dessa forma, poderemos ter uma portabilidade do nosso sistema, usando o React para WEB e React Native para o smartphone, por exemplo.

- *Stateless*: Cada requisição que o cliente faz para o servidor, deverá conter todas as informações necessárias para o servidor entender e responder (RESPONSE) a requisição (REQUEST). Exemplo: A sessão do usuário deverá ser enviada em todas as requisições, para saber se aquele usuário está autenticado e apto a usar os serviços, e o servidor não pode lembrar que o cliente foi autenticado na requisição anterior. Nos nossos cursos, temos por padrão usar tokens para as comunicações.

- *Cacheable*: As respostas para uma requisição, deverão ser explicitas ao dizer se aquela resquição, pode ou não ser cacheada pelo cliente.

- *Layered System*: O cliente acessa a um endpoint, sem precisar saber da complexidade, de quais passos estão sendo necessários para o servidor responder a requisição, ou quais outras camadas o servidor estará lidando, para que a requisição seja respondida.

- *Code on demand (optional)*: Dá a possibilidade da nossa aplicação pegar códigos, como o javascript, por exemplo, e executar no cliente.

## Verbos HTTP

### GET

O método GET solicita a representação de um recurso específico. Requisições utilizando o método GET devem retornar apenas dados. Para se obter dados especificados, não se envia corpo (*body*), mas paramentros `/:id/` ou query strings `?term=angular&week=3` na URI.

### POST

O método POST é utilizado quando queremos criar um recurso. Quando usamos POST, os dados vão no corpo da requisição e não na URI.

### PUT

O método POST é utilizado para submeter uma entidade (*objeto*) a um recurso específico, frequentemente causando uma mudança no estado do recurso, ou seja, editar uma entidade. Para isso a entidade completa irá no corpo da request, com os dados que precisam ser alterados.

### PATCH

O método PATCH é utilizado para aplicar modificações parciais em um recurso. Enquanto o PUT necessita de enviar o objeto completo e modificado para o servidor, o PATCH apenas envia os dados a serem alterados sem precisar se a entidade completa.

### DELETE

O método DELETE remove um recurso específico.

### HEAD

O método HEAD solicita uma resposta de forma idêntica ao método GET, porém sem conter o corpo da resposta. Tal solicitação pode ser feita antes de baixar um grande recurso para economizar largura de banda. Por exemplo, podemos usar para pré-autenticação no servidor da web, antes de você fazer envio de dados grandes. Sem a primeira solicitação HEAD, você estaria enviando os dados grandes para o servidor da web duas vezes (porque a primeira solicitação retornaria uma resposta não autorizada 401 com o cabeçalho *WWW-authenticate*).

### CONNECT

O método CONNECT estabelece um túnel para o servidor identificado pelo recurso de destino. Converte a requisição de conexão para um túnel TCP/IP transparente, geralmente para facilitar a comunicação criptografada com SSL (HTTPS) através de um proxy HTTP não criptografado.

### OPTIONS

O método OPTIONS é usado para descrever as opções de comunicação com o recurso de destino, retornando os métodos HTTP suportados pelo servidor para a URL especificada.

### TRACE

O método TRACE executa um teste de chamada *loop-back* junto com o caminho para o recurso de destino. Devolve a mesma requisição que for enviada para que ver se houve mudança e/ou adições feitas por servidores intermediários.

## STATUS DAS RESPOSTAS HTTP

- 1xx: Informação
- 2xx: Sucesso
  - 200: OK
  - 201: CREATED
  - 204: Não tem conteúdo, mais usado para DELETE
- 3xx: Redirection
- 4xx: Client Error
  - 401: Unauthorized
  - 403: Forbidden
  - 400: Bad Request
  - 404: Not Found!
- 5xx: Server Error
  - 500: Internal Server Error

---

## BOAS PRÁTICAS

- Utilizar verbos HTTP ***corretos*** para nossas requisições.
- Utilizar um padrão na criação dos endpoints. Ex: `GET /api/v1/products`
- Não deixar barra no final do endpoint
- Nunca deixe o cliente sem resposta! Trate os erros, pelos status HTTP

---

## Docs

- <https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods>
- <https://developer.mozilla.org/pt-BR/docs/Web/HTTP>
- <https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web>
- <http://httpstat.us/>
- <https://www.httpstatus.com.br/>
- <https://pt.linkedin.com/pulse/api-rest-e-restful-voc%C3%AA-sabe-qual-diferen%C3%A7a-entre-elas-gomes-rocha>
- <https://www.redhat.com/pt-br/topics/api/what-is-a-rest-api>
- <https://dev.to/leandroats/vscode-rest-client-2cei>
- <https://gorest.co.in/>
