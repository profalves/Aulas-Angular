import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

interface ITask {
  task: string;
  completed: boolean;
}

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    .done {
      text-decoration: line-through;
      color: #aaa;
    }
  `
  
  @state()
  private listTodos = [
    { task: 'Tarefa 1', completed: true },
    { task: 'Tarefa 2', completed: false }
  ];  

  @property()
  name: string = "Rodrigo";

  @query('#newitem')
  input!: HTMLInputElement

  addToDo() {
    this.listTodos = [...this.listTodos,
      {
        task: this.input.value,
        completed: false
      }
    ]
  }

  toggleCompleted(item: ITask) {
    item.completed = !item.completed;
    this.requestUpdate();
  }

  render() {
    return html`
      <h1>To-Do List: ${this.name}</h1>
      <input 
        id="newitem" 
        placeholder="Adicione sua tarefa aqui" />
      <button
        @click=${this.addToDo}>Add</button>

      <ul>
        ${this.listTodos.map((item) => {
          return html`
            <li
              @click=${() => this.toggleCompleted(item)}
              class=${ item.completed ? "done" : "undone"}
              >${item.task}</li>`
        })}
      </ul>
    `
  }
}
