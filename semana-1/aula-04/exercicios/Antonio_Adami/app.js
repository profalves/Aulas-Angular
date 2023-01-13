class StateCart extends HTMLElement {

    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});

        this.table = this.createTable();
        this.form = this.createForm();
        this.total = this.createTotal();

        shadow.appendChild(this.table)
        shadow.appendChild(this.total)
        shadow.appendChild(this.form)

        this.state = {
            items: [],
            total: 0
        }
    }

    createTable() {
        const table = document.createElement('table');

        const thead = document.createElement('thead')
        const tbody = document.createElement('tbody')

        const tr = document.createElement('tr')

        const th1 = document.createElement('th')
        const th2 = document.createElement('th')
        const th3 = document.createElement('th')
        const th4 = document.createElement('th')
        const th5 = document.createElement('th')

        th1.setAttribute('scope', 'col');
        th2.setAttribute('scope', 'col');
        th3.setAttribute('scope', 'col');
        th4.setAttribute('scope', 'col');
        th5.setAttribute('scope', 'col');

        th1.innerHTML = 'Name';
        tr.appendChild(th1);
        th2.innerHTML = 'Value';
        tr.appendChild(th2);
        th3.innerHTML = 'Amount';
        tr.appendChild(th3);
        th4.innerHTML = 'Subtotal';
        tr.appendChild(th4);
        th5.innerHTML = '';
        tr.appendChild(th5);

        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);

        return table;
    }

    createForm() {
        const form = document.createElement('form');

        const input1 = document.createElement('input')
        const input2 = document.createElement('input')
        const input3 = document.createElement('input')

        const button = document.createElement('button')

        input1.setAttribute('name', 'name')
        input1.setAttribute('type', 'text')
        input1.setAttribute('placeholder', 'Name')
        input1.setAttribute('required', true)

        input2.setAttribute('name', 'value')
        input2.setAttribute('type', 'number')
        input2.setAttribute('placeholder', 'R$')
        input2.setAttribute('step', '0.01')
        input2.setAttribute('required', true)

        input3.setAttribute('name', 'amount')
        input3.setAttribute('type', 'number')
        input3.setAttribute('placeholder', '')
        input3.setAttribute('required', true)

        button.setAttribute('type', 'submit')
        button.innerHTML = 'Confirm'

        form.appendChild(input1)
        form.appendChild(input2)
        form.appendChild(input3)
        form.appendChild(button)

        form.addEventListener('submit', this.submitListener.bind(this))

        return form

    }

    createTotal() {
        const span = document.createElement('span');
        span.innerHTML = 'Total: 0'

        return span
    }

    appendToTable(data) {
        this.table
    
        const newRow = this.table.insertRow();

        const newCell1 = newRow.insertCell();
        newCell1.innerHTML = data.name;
        const newCell2 = newRow.insertCell();
        newCell2.innerHTML = data.value;
        const newCell3 = newRow.insertCell();
        newCell3.innerHTML = data.amount;
        const newCell4 = newRow.insertCell();
        newCell4.innerHTML = data.subTotal;
    }

    updateTotal(total) {
        this.total.innerHTML = `Total: ${total}`;
    }

    submitListener(event) {
        event.preventDefault();

        const input = {};

        const data = new FormData(event.target);
         [...data.entries()].forEach(d => {
            input[d[0]] = d[1];
        })

        input.subTotal = parseFloat(input.value) * parseInt(input.amount);

        this.state.items.push(input);
        this.state.total += input.subTotal

        this.appendToTable(input)
        this.updateTotal(this.state.total)
    }
    
}

customElements.define('state-cart', StateCart);