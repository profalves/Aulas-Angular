# Fundamentos de Testes de Software

## Introdução

A criação de classes de testes é uma das boas práticas indicadas para todas aplicações, pois é através deles que garantimos que nossa aplicação continua se comportando como deveria, mesmo após serem realizadas modificações no código. Tão importante quanto os testes, a adesão a padrões e boas práticas, além de um código claro e conciso, também devem estar no radar de todos os desenvolvedores.

## Tipos de Testes de Software

### Teste Unitário

Teste Unitário é um nível de teste de software em que unidades individuais de um sistema são testados. São testes que têm como objetivo testar regras de negócio, testando cada função isoladamente, para ter certeza que ele faz somente o que foi designado para fazer.

Podemos testar:

- Pipe;
- Class;
- Componente;
- Diretivas;
- Service.

Sempre que você criar um componente, tenha em mente que também será gerado um arquivo `spec.ts`. Este arquivo vai nos auxiar a iniciar os testes.

### Teste End-to-end (E2E)

**Testes Funcionais**, ou **testes end to end (e2e)**, consistem no teste da funcionalidade completa de uma aplicação. Numa aplicação web, executa imitando a interação de um usuário, comportamento que eles fariam, dando clicks na tela e tudo mais rodando no browsers. É muito legal para testar múltiplos browsers, tamanhos de tela e devices.

### Testes de Integração

Testes que invocam diretamente o nosso código. Exemplo: teste de um serviço no Angular. O teste invoca uma função com um conjunto de parâmetros e verifica se o
resultado é o esperado.

## Conceitos de Testes

### TDD (Test Driven Development ou Desenvolvimento Orientado por Testes)

**TDD** trata-se de uma prática de desenvolvimento de software onde a codificação das funcionalidades começa a partir da escrita de testes unitários. Essa técnica foi criada por Kent Beck e é um dos pilares do **XP** (*Extreme Programming*).

O TDD consistem em um ciclo apelidado de **Red**, **Green**, **Refactor**. Que funciona da seguinte maneira:

- Escrevemos um teste para uma funcionalidade a qual queremos implementar. Ao executar esse teste ele deve falhar, pois ainda não temos a implementação e assim passamos pelo step red.

- Após o nosso teste falhar implementamos a funcionalidade e executamos o nosso teste novamente, porém dessa vez o teste passa com sucesso, com isso passamos pelo step green do TDD.

- Com os testes funcionando chegamos ao step refactor. Como o próprio nome já diz, nesse momento devemos refatorar nosso código procurando pontos a melhorar e aplicando boas práticas de programação.

Esse ciclo pode se repetir quantas vezes o desenvolvedor julgar necessário e a cada nova implementação é interessante que todos os testes que já estão em funcionamento sejam executados, pois assim é possível validar que todos os testes continuam funcionando e que a nova implementação não impactou nas funcionalidades já desenvolvidas.

![TDD](https://res.cloudinary.com/practicaldev/image/fetch/s--b9FjzOmj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5ryscmqtvkgmbh6ihg3k.gif)

Os principais benefícios do TDD são:

- Maior cobertura de testes unitários
- Testes são executados com maior frequência
- O código se torna mais limpo

### BDD (Behavior Driven Development ou Desenvolvimento Orientado ao Comportamento)

O **BDD**, na prática, é um complemento ou uma evolução do **TDD**. Embora muitas pessoas acreditem que ele veio para substituir o TDD. Isso porque, basicamente, o TDD propõe a elaboração de testes simples antes da definição do código. Como se fazer perguntas do tipo: Mas como testar e o que avaliar?

Foi assim que, em meados do ano 2000, Dan North apresentou a metodologia do BDD pela primeira vez. A sua intenção era trazer pessoas não técnicas para o entendimento da testagem das funcionalidades dos programas, mantendo os testes. Vem daí outro cunho comportamental da metodologia, pois quando se desenvolve um software corre-se o risco de deixar de lado algum conceito usado pela equipe de negócios ou ainda manter-se estritamente técnico.

Por consequência, não é apenas a equipe de desenvolvedores que escreve os cenários de testes. Sendo assim, três agentes interagem para criar o produto: o *Product Owner* (PO), o *Quality Analyst* (QA) e o *Developer*. É o que Georgie Dinwiddie chamou de **“regra dos três amigos”**. Assim, se obtém melhores resultados na descrição dos testes.

Enfim, busca-se respostas para algumas questões, como:

- o que testar;
- como denominar os testes;
- como entender porque um teste falha;
- onde iniciar.

#### Cenários

Reforçando, portanto, a facilidade trazida pelo BDD na comunicação entre a equipe, veja um modelo de testes do BDD em que cada cenário é dividido em 3 blocos:

- **Given**: dado um determinado contexto (tem-se determinada reação);
- **When**: quando ocorrer algo;
- **Then**: então se espera algo.

Exemplo: **dada** (*given*) uma nova promoção, **quando** (*when*) ela for lançada oficialmente, **então** (*then*) será enviada uma notificação a um determinado grupo.

Paralelamente, uma série de frameworks é utilizada, como: [Jbehave](https://jbehave.org/) e [Spock](https://spockframework.org/).

## Code Coverage

Nesse aspecto podemos incluir dois temas próximos e facilmente confundidos, são eles:

- cobertura de código (*code coverage*);
- cobertura de testes (*test coverage*).

Essas duas características podem ser consideradas como métricas de um projeto de software.

### O que é a cobertura de código? 🤔

Falando inicialmente sobre a cobertura de código, o seu principal objetivo é encontrar códigos não testados. [Martin Fowler](https://martinfowler.com/) em um dos seus artigos sobre testes e métricas, discute sobre Test Coverage e Code Coverage, ilustrando da seguinte forma:

[![Test Coverage by Martin Fowler](https://miro.medium.com/v2/resize:fit:640/format:webp/1*vGhUwssoIgs2W0MoiQm2hg.png)](https://www.martinfowler.com/bliki/TestCoverage.html)

***É interessante destacar que a qualidade do software não pode ser quantificada por essa métrica.*** A cobertura de código irá nos ajudar na avaliação da suíte de testes de testes que foi escrita para o código existente.

Um sistema com alta cobertura de código significa que foi mais exaustivamente testado e tem uma menor chance de conter erros, ao contrário de um sistema com baixa cobertura de código.

### Como a cobertura de código pode ajudar?

A cobertura de código irá exercitar o código desenvolvido, permitindo explorar:

- Caminhos felizes; 😀
- Caminhos infelizes; 😢
- Caminhos alternativos; 🤨

Irá ajudar a encontrar código inútil/supérfluo/mal escrito, permitindo descobrirmos códigos que não são testados ou códigos inalcançados.

Facilita o aumento da cobertura de testes, uma vez que podemos descobrir cenários que não estão sendo explorados.

E possibilita encontrar gaps nos requisitos, nos casos de testes e defeitos a níveis de unidade, prevenindo assim defeitos em estágios iniciais do ciclo de vida do projeto.

### Cobertura de código x cobertura de testes 🧐

A cobertura de código não é a mesma coisa que cobertura de testes.

A cobertura de código, sendo uma métrica quantitativa, visa medir quanto (%) do software é coberto/exercitado ao executar um determinado conjunto de casos de testes.

### Tipos básicos de cobertura de código 📖

A cobertura de código possui alguns tipos básicos, tais como:

- Function — verifica quantas funções do código são chamadas;

- Statement — verifica quantas instruções do código são executadas;

- Branch — verifica se cada ramificação de cada estrutura de controle (incluindo if/else, switch case, for, while) é executada;

- Condition — verifica se cada sub-expressão booleana são avaliadas ambas como verdadeiras e falsas;

---

## Docs

- <https://priscila-henriques.medium.com/os-fundamentos-do-teste-de-software-f50a027e79b6>
- <https://www.devmedia.com.br/test-driven-development-tdd-simples-e-pratico/18533>
- <https://coodesh.com/blog/candidates/metodologias/bdd-na-pratica-entenda-o-que-e-e-como-funciona/>
- <https://martinfowler.com/bliki/TestCoverage.html>
