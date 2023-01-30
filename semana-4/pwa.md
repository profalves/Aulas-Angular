# 06 - PWA e Requisições HTTP

> **Objetivo**: Iniciar o desenvolvimento de um PWA com o uso de requisições HTTP.

## Principios do PWA

[Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) são, sucintamente falando, aplicativos criados em navegadores. À medida que o usuário constrói progressivamente um relacionamento com o aplicativo ao longo do tempo, ele se torna mais e mais poderoso. Ele é carregado rapidamente, mesmo em redes escamosas, envia notificações push relevantes, tem um ícone na tela inicial e é carregado como uma experiência de tela inteira de nível superior.

Então, um PWA é:

- **Progressivo** - Funciona para todos os usuários, independentemente da escolha do navegador, porque é construído com aprimoramento progressivo como um princípio básico.
- **Responsivo** - Compatível com qualquer fator de forma: desktop, celular, tablet ou o que for o próximo.
- **Independente de conectividade** - Aprimorado com `service workers` para trabalhar offline ou em redes de baixa qualidade.
- **App-like** - Parece um aplicativo, porque o modelo de shell do aplicativo separa a funcionalidade do conteúdo.
- **Fresh** - Sempre atualizado graças ao processo de atualização do `service worker`.
- **Seguro** - veiculado via HTTPS para evitar espionagem e garantir que o conteúdo não tenha sido adulterado.
- **Detectável** - É identificável como um "aplicativo" graças ao escopo do registro do W3C `manifest` e `service worker`, permitindo que os mecanismos de pesquisa o encontrem.
- **Reengajável** - Facilita o reengajamento por meio de recursos como `notificações push`.
- **Instalável** - permite que os usuários adicionem aplicativos mais úteis a sua tela inicial sem o incômodo de uma loja de aplicativos.
- **Linkable** - Compartilhe facilmente o aplicativo via URL, não requer instalação complexa.

Para que um PWA funcione sem mais problemas, devemos utilizar dois arquivos importantes:

1. `serviceWorker.js`
2. `manifest.json`

### Docs

- [Introdução aos Progressive Web Apps](https://medium.com/tableless/introdu%C3%A7%C3%A3o-aos-progressive-web-apps-ad47ba24cddb)
- https://developers.google.com/web/progressive-web-apps/

## Service Workers

Um service worker é um script que seu navegador executa em segundo plano, separado da página da Web. Isso possibilita recursos que não precisam de uma página da Web ou de interação do usuário. Atualmente, eles já incluem recursos como `notificações push` e `sincronização em segundo plano`.

Características importantes de um service worker:

- É executado em um contexto isolado;
- Não tem acesso ao DOM;
- Roda em uma thread separada;
- Incapaz de realizar operações “blocantes”;
- Funcionam apenas em sites servidos via HTTPS.
- Ele é encerrado quando ocioso e reiniciado quando necessário novamente.
- Os service workers usam `Promises`. Se você não estiver familiarizado com isso, interrompa esta leitura e confira [Promessas, uma introdução](https://developers.google.com/web/fundamentals/primers/promises?hl=pt-br).

### Docs

- [https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle?hl=pt-br](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle?hl=pt-br)

## Web App Manifest

O manifesto dos PWAs é um arquivo JSON que permite controlar como o aplicativo ou site é exibido para o usuário em áreas que normalmente se espera ver em aplicativos nativos (por exemplo, a tela inicial de um dispositivo), como definir o que o usuário pode inicializar e o visual durante a inicialização.

Quando criar o manifesto e ele estiver no seu site, adicione uma tag link a todas as páginas que envolve o seu aplicativo web da seguinte forma:

``` html
<link rel="manifest" href="/manifest.json">
```

### Docs

- https://developers.google.com/web/fundamentals/web-app-manifest/?hl=pt-br
- https://developer.mozilla.org/pt-BR/docs/Web/Manifest
