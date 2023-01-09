# GIT e GitHub

Git é um sistema de controle de versão de arquivos. Através deles podemos desenvolver projetos na qual diversas pessoas podem contribuir simultaneamente no mesmo, editando e criando novos arquivos e permitindo que os mesmos possam existir sem o risco de suas alterações serem sobrescritas.

Se não houver um sistema de versão, imagine o caos entre duas pessoas abrindo o mesmo arquivo ao mesmo tempo. Uma das aplicações do git é justamente essa, permitir que um arquivo possa ser editado ao mesmo tempo por pessoas diferentes. Por mais complexo que isso seja, ele tenta manter tudo em ordem para evitar problemas para nós desenvolvedores.

Para usar o Git, basta baixá-lo aqui: <https://git-scm.com/downloads>

## Iniciando com o git

### Status

Este comando é fundamental para entender tudo que está acontecendo dentro do git

```bash
git status

# simplifica a saída o git status
git status --porcel #or --porcelain 

# escolher o que exibir no git status
git status -sb #or -s -b

# onde:
# -s: mostra status atual dos arquivos (forma curta de excutar o parametro --porcel)
# -b: mostra a branch atual 
```

### Staging

Antes de inciarmos os commits, precisamos falar de `git add`:

Este comando adiciona o(s) arquivo(s) em um lugar que chamamos de INDEX, que funciona como uma área do git no qual os arquivos possam ser enviados ao reposiório. É importante saber que ADD não está adicionando um arquivo novo ao repositório, mas sim dizendo que o arquivo (sendo novo ou não) está sendo preparado para entrar na próxima revisão do repositório.
EX:

```bash
#Adiciona todos os arquivos
git add . #or --all or -a

# Adiciona somente o(s) arquivo(s) desejado(s)
git add "index.html" 
```

### Commit

Agora vamos ao `commit`:

Este comando realiza o que chamamos de “commit”, que significa pegar todos os arquivos que estão naquele lugar INDEX que o comando `add` adicionou e criar uma revisão com um número e um comentário, que será vista por todos.

```bash
git commit -m "comentário qualquer"
```

> Existe um açúcar sintático para adicionar e commitar arquivos de uma só vez, usando o paramentro ***-am***, mas só funciona para arquivos já commitados anteriormente. Ex: `git commit -am "outro comentário qualquer`

### Branchs

Suponha que o seu projeto seja um site html, e você deseja criar uma nova seção no seu código HTML, mas naquele momento você não deseja que estas alterações estejam disponíveis para mais ninguém, só para você. Isso é, você quer alterar o projeto (incluindo vários arquivos nele), mas ainda não quer que isso seja tratado como “oficial” para outras pessoas, então você cria um branch (como se fosse uma cópia espelho) e então trabalha apenas nesse branch, até acertar todos os detalhes dele.

No git, o conceito de branch é algo muito simples e fácil de usar. Mas quando que temos que criar um branch? Imagine que o seu site está pronto, tudo funcionando perfeitamente, mas surge a necessidade de alterar algumas partes dele como forma de melhorá-lo. Além disso, você precisa manter estas alterações tanto no computador de casa quanto do trabalho. Com isso temos um problema, se você começa a alterar os arquivos em casa, para na metade da implementação, e precisa terminar no trabalho, como você iria comitar tudo pela metade e deixar o site incompleto?

Para isso existe o conceito de branch, que é justamente ramificar o seu projeto em 2, como se cada um deles fosse um repositório, e depois juntá-lo novamente.

Use o seguinte comando de terminal para criar um branch:

```bash
git checkout -b 'hotfix' # onde hotfix é nome da branch nova.

# Mudar de branch:
git checkout master # onde master é o nome da branch já existente.
```

## Publicando seu repositorio

### O que é o GitHub

O Github é um serviço web que oferece diversas funcionalidades extras aplicadas ao git. Resumindo, você poderá usar gratuitamente o github para hospedar seus projetos pessoais. Além disso, quase todos os projetos/frameworks/bibliotecas sobre desenvolvimento open source estão no github, e você pode acompanhá-los através de novas versões, contribuir informando bugs ou até mesmo enviando código e correções. Se você é desenvolvedor e ainda não tem github, você está atrasado e essa é a hora de correr atrás do prejuízo.

Ele não é o unico serviço em nuvem que oferece hospadegem de repositórios, também temos:

- [GitLab](https://about.gitlab.com/)
- [Bitbucket](https://bitbucket.org)
- [Gogs](https://gogs.io/)

### Push

Além disso, temos o `git push`: Push (empurrar) é usado para publicar todos os seus commits para o repositório. Neste momento poderá ser solicitado a sua senha:
Ex: `git push -u origin master`

### PRs

Os PRs (Pull requests) permitem que você troque as alterações feitas no código-fonte e colabore com outras pessoas no mesmo projeto.

Com os PRs, você pode:

- Comparar as mudanças entre duas branches.
- Revisar e discutir as modificações propostas.
- Impedir que uma branch seja mesclada antes de estar pronta
- Resolver conflitos de merge na interface do usuário da plataforma
- Solicitar aprovações.
- Etc.

### Conflitos

Conflitos no Git são bastante comuns e **acontecem sempre quando o mesmo arquivo foi modificado por duas versões diferentes** e essas versões não podem ser automaticamente mescladas. Veja a seguir como um conflito pode acontecer na prática:

- <https://metring.com.br/guia-resolvendo-conflitos-no-git>

> Todos os comandos explicados acima e um pouco mais está em um compilado neste meu repositório particular que pode ser usado para consulta e estudos: <https://github.com/profalves/Comandos-Git>

#### Docs

- <https://git-scm.com/>
- <https://tableless.com.br/tudo-que-voce-queria-saber-sobre-git-e-github-mas-tinha-vergonha-de-perguntar/>
- <https://medium.com/luizalabs/pull-merge-requests-seguindo-boas-pr%C3%A1ticas-8a7bbbad0ea7>

## Treinamento GIT

- <https://learngitbranching.js.org/>

## Desafio

Realizar todo o treinamento de Git acima.
