document.addEventListener('DOMContentLoaded', function () {
    const formPedido = document.getElementById('pedidoForm');
    const listaPedidos = document.getElementById('listaPedidos');
    const valorTotalElement = document.getElementById('valorTotal');
    const trocoElement = document.getElementById('troco');

    const precos = {
        morango: 3.00,
        limao: 2.50,
        laranja: 2.00,
        melancia: 5.00,
        uva: 4.00,
        carambola: 6.00
    };

    function atualizarValores() {
        const total = Array.from(document.querySelectorAll('.fruit-selection input'))
            .reduce((acc, input) => {
                const fruta = input.id;
                const quantidade = parseInt(input.value) || 0;
                return acc + (quantidade * precos[fruta]);
            }, 0);

        valorTotalElement.textContent = total.toFixed(2);
        calcularTroco(total);  // Chama a função para calcular o troco
    }

    function calcularTroco(total) {
        const metodoPagamento = document.getElementById('metodoPagamento').value;
        const dinheiroRecebido = parseFloat(document.getElementById('dinheiroRecebido').value) || 0;

        let troco = 0;
        if (metodoPagamento === 'dinheiro') {
            troco = dinheiroRecebido - total;  // Calcula o troco
        }
        trocoElement.textContent = troco >= 0 ? troco.toFixed(2) : '0,00';  // Atualiza o troco exibido
    }

    document.querySelectorAll('.fruit-selection input').forEach(input => {
        input.addEventListener('input', atualizarValores);
    });

    document.getElementById('metodoPagamento').addEventListener('change', atualizarValores);
    document.getElementById('dinheiroRecebido').addEventListener('input', () => {
        const total = parseFloat(valorTotalElement.textContent);
        calcularTroco(total); // Atualiza o troco sempre que o valor recebido é mudado
    });

    formPedido.addEventListener('submit', function (event) {
        event.preventDefault();

        const camposObrigatorios = [
            'clienteNome', 
            'cep', 
            'numeroCasa', 
            'pontoReferencia', 
            'metodoPagamento'
        ];

        const validaCampos = camposObrigatorios.every(id => {
            const valor = document.getElementById(id).value.trim();
            return valor !== '';
        });

        if (!validaCampos) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const frutasSelecionadas = Array.from(document.querySelectorAll('.fruit-selection input'))
            .map(input => `${input.id.charAt(0).toUpperCase() + input.id.slice(1)}: ${input.value}`)
            .join(', ');

        const detalhesPedido = document.getElementById('detalhesPedido').value.trim();
        const total = parseFloat(valorTotalElement.textContent);
        const troco = parseFloat(trocoElement.textContent);

        // Criação da nova linha na tabela de pedidos
        const novoPedido = document.createElement('tr');
        novoPedido.innerHTML = `
            <td>${document.getElementById('clienteNome').value}</td>
            <td>${document.getElementById('cep').value}</td>
            <td>${document.getElementById('numeroCasa').value}</td>
            <td>${document.getElementById('pontoReferencia').value}</td>
            <td>${frutasSelecionadas}</td>
            <td>${document.getElementById('metodoPagamento').value}</td>
            <td>${detalhesPedido}</td>
            <td>R$ ${total.toFixed(2)}</td>
            <td>R$ ${troco >= 0 ? troco.toFixed(2) : '0,00'}</td>
        `;
        listaPedidos.appendChild(novoPedido);

        alert("Pedido realizado com sucesso!");

        // Resetar o formulário e atualizar valores
        formPedido.reset();
        valorTotalElement.textContent = '0,00';
        trocoElement.textContent = '0,00';
        atualizarValores();
    });

    const formFeedback = document.getElementById('formFeedback');
    const feedbackList = document.getElementById('feedbackList');

    formFeedback.addEventListener('submit', function (event) {
        event.preventDefault();

        const feedbackNome = document.getElementById('feedbackNome').value.trim();
        const feedbackComentario = document.getElementById('feedbackComentario').value.trim();

        if (!feedbackNome || !feedbackComentario) {
            alert("Por favor, preencha todos os campos de feedback.");
            return;
        }

        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        feedbackItem.innerHTML = `<strong>${feedbackNome}</strong>: ${feedbackComentario}`;

        feedbackList.appendChild(feedbackItem);
        formFeedback.reset();
        alert("Feedback enviado com sucesso!");
    });
});
