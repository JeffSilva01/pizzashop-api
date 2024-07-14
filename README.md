# PizzaShop API

## Descrição

A **PizzaShop API** é uma aplicação desenvolvida para gerenciar um sistema de pedidos de uma pizzaria. Esta API permite que os usuários façam pedidos, consultem o menu, acompanhem o status do pedido, e muito mais.

## Requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado:

- Bun
- Postgres (instância local ou em nuvem)

## Instalação

Siga os passos abaixo para configurar e executar o projeto:

1. Clone o repositório:

```bash
git clone https://github.com/JeffSilva01/pizzashop-api.git
cd pizzashop-api
```

2. Instale as dependências:

```bash
bun install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```env
PORT=3000
DATABASE_URL=postgresql://username:password@hostname:port/pizzashop
JWT_SECRET=your_secret_key
```

4. Inicie o servidor:

```bash
bun dev
```

A API estará disponível em `http://localhost:3000`.

## Uso

### Endpoints Principais

- **GET /menu**: Retorna o menu com todas as pizzas disponíveis.
- **POST /orders**: Cria um novo pedido.
- **GET /orders/:id**: Consulta o status de um pedido específico.

### Exemplo de Requisição

- **Criar um Pedido**

```bash
curl -X POST http://localhost:3000/orders \
-H "Content-Type: application/json" \
-d '{
  "pizzaId": "60d21b4667d0d8992e610c85",
  "quantity": 2,
  "customer": {
    "name": "John Doe",
    "address": "123 Main St"
  }
}'
```

## Contribuição

Se você deseja contribuir com este projeto, por favor siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Envie para o branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
