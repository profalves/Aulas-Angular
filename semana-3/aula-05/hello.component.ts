import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
// export class HelloComponent implements DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
export class HelloComponent implements OnChanges, OnDestroy {
  @Input() title: string = 'World';

  ngOnDestroy(): void {
    console.log('O componente morreu');
    // this.loginService.unsubscribe();
  }

  // name: string = 'Rodrigo';

  // ngDoCheck() {
  //   // console.log('Inicializamos a verificação');
  // }

  // ngAfterContentInit() {
  //   console.log('O valor da props foi inserido');

  // }
  // ngAfterContentChecked() {
  //   console.log('O valor da props foi verificado com o component pai');
  // }
  // ngAfterViewInit() {
  //   console.log('executado logo após os dados dos filhos e do próprio componente ser inicializado');

  // }
  // ngAfterViewChecked() {
  //   console.log('sempre que é detectado uma alteração do conteúdo é chamado do componente pai');

  // }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(
      'Houve mudanças nesse componente',
      changes['title']
    );
  }
}
