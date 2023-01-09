# GIT FLOW

## Instalando

### MAC OS X

```bash
brew install git-flow
```

### UBUNTU/LINUX

```bash
sudo apt-get install git-flow
```

## Inicializando

Um repositório não vem com git flow e o mesmo não pode ser margeado na master. Cada um tem que executar esse comando m cada repositório que tiver.
Entre no diretório base do repositório e digite:

```bash
git flow init
```

Digite \<ENTER\> até que as perguntas acabem para utilizar o padrão;

O comando acima irá:

1. Criar um branch develop como cópia da master (se o mesmo já existir, nada será feito)
2. Definição de como serão os nomes dos branchs separados por feature, hotfix, releases, etc…

### **Alerta:**

Tenha muito cuidado para ter certeza de que os branchs estão iguais com o comando:

```bash
git diff master develop
```

O output comando acima, se não for em branco, deve mostrar o que será removido da master e o que será adicionado da develop quando um gerarmos um novo release;

## FEATURES

### Descrição

Uma feature é uma nova funcionalidade que se quer inserir. Não se deve utilizar uma feature para concertar códigos pois na eventualidade de a feature ser removida, o fix também o será. Outro problema é que um fix pode demorar para ir para produção por causa da demora em se megear a feature.

### Criando

* Uma feature é inicializada com o seguinte comando:

```bash
git flow feature start <NOME_DA_FEATURE>
```

O comando acima irá:

1. criar um novo branch chamado `feature/<NOME_DA_FEATURE>` como cópia da develop;
2. Irá mudar para o Branch criado;

* Faça as modificações necessárias para a feature;

* Adicione os arquivos criados/deletados/modificados com:

```bash
git add/rm <FILE1> [<FILE2> [<FILE3> […]]]
```

* Commit as modificações:

```bash
git commit -m “<DESCRIÇÃO DO COMMIT>”
```

* Finalize a feature:

```bash
git flow feature finish <NOME_DA_FEATURE>
```

O comando acima irá:

1. Mergear a feature no branch develop;
2. Apagar o branch `feature/<NOME_DA_FEATURE>`;
3. Irá mudar para o branch develop;

### Várias pessoas trabalhando na mesma feature

#### Publicando o branch da feature

Nesse caso precisa-se públicar o repositório da feature no github:

```bash
git flow feature publish <NOME_DA_FEATURE>
```

#### Baixando o branch da feature

Caso queria baixar do github o repositório da feature:

```bash
git flow feature pull origin <NOME_DA_FEATURE>
```

#### Rastreando a feature

Caso queira rastrear a feature e o status da mesma:

```bash
git flow feature track <NOME_DA_FEATURE>
```

## HOTFIX

### Descrição

Um hotfix é uma modificação no código feita exclusivamente para tentar corrigir uma falha. Não se veve modificar padrão de utilização de features nem adicionar novas features em um hotfix. Mesmo adições de novos argumentos não devem ser introduzidos por hotfix à menos que o mesmo tenha sido definido para ir no release mas não o foi por um erro.

### Criando

* O seguinte comando criar um branch para hotfix:

```bash
git flow hotfix start <NOME_DO_HOTFIX>
```

O comando acima irá:

1. criar um novo branch chamado `hotfix/<NOME_DO_HOTFIX>` como cópia da master;
2. Irá mudar para o Branch criado;

* Faça as modificações necessárias para o hotfix;

* Adicione os arquivos criados/deletados/modificados com:

```bash
git add/rm <FILE1> [<FILE2> [<FILE3> […]]]
```

* Commit as modificações:

```bash
git commit -m “<DESCRIÇÃO DO COMMIT>”
```

* Finalize o hotfix:

```bash
git flow hotfix finish <NOME_DO_HOTFIX>
```

O comando acima irá:

1. Mergear o hotfix no branch develop;
2. Mergear o hotfix no branch master;
3. Apagar o branch `hotfix/<NOME_DO_HOTFIX>`;
4. Irá mudar para o branch develop;

## RELEASES

### Descrição

Um release precisa ser criado quando a develop foi testada extensivamente e essa snovas features podem entrar em produção. Nesse caso todas as modificações da develop serão incorporadas na master. É por isso que não se deve commitar direto na master a não ser por um hotfix. Se isso ocorrer há o risco de conflitar com o a develop.

### Criando

* O seguinte comando criar um release:

```bash
git flow release start <NOME_DO_RELEASE>
```

O comando acima irá:

1. criar um novo branch chamado `release/<NOME_DO_RELEASE>` como cópia da develop;
2. Irá mudar para o Branch criado;

* Faça as modificações necessárias para a release;

* Adicione os arquivos criados/deletados/modificados com:

```bash
git add/rm <FILE1> [<FILE2> [<FILE3> […]]]
```

* Commit as modificações:

```bash
git commit -m “<DESCRIÇÃO DO COMMIT>”
```

* Finalize o release:

```bash
git flow release finish <NOME_DO_RELEASE>
```

O comando acima irá:

1. Mergear o hotfix no branch master;
2. Taggear o release com seu nome;
3. Mergear o release devolta na develop (para o caso de haver modificações de última hora);
4. Apagar o branch `hotfix/<NOME_DO_RELEASE>`;

#### Publicando o branch da feature

* Opcionalmente, pode-se liberar a release para outros dev fazerem modificações de última hora com o comando:

```bash
git flow release publish <NOME_DO_RELEASE>
```

* Pode-se rastrear a(s) modificação(ões) do release com o comando abaixo:

```bash
git flow release track <NOME_DO_RELEASE\>
```
