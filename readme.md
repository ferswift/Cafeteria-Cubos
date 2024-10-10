# Desafio Módulo 2

##### Coloque seu nome aqui: 

**Siga o Figma ou o Penpot que está na raiz do projeto chamado "desafioT15"**

## Instruções para Entrega

1. Faça um fork deste repositório.
2. Clone o repositório para sua máquina local.
3. Implemente o projeto conforme as orientações abaixo.
4. Abra um Pull Request (PR) para enviar sua solução final.
5. Adicione seu nome completo na descrição da PR.

## Boas Práticas

- Faça commits regulares (sugerimos ao final de cada parte da página).
- Após terminar, não se esqueça de atualizar seu repositório remoto (`git push`).
- Mantenha seu código limpo e bem organizado.
- Use nomes semânticos e descritivos para variáveis e funções.
- Encapsule lógicas repetidas em funções reutilizáveis.
- Utilize `try` e `catch` para capturar possíveis erros.
- Armazene os preços dos produtos em centavos.

## Importante

O HTML e o CSS da aplicação já estão prontos. Sua tarefa é manipular o DOM usando JavaScript para adicionar a interatividade.

---
<details>
<summary>PART I - Após a Aula Conhecendo DOM e Eventos DOM:</summary>


1. Criar um array de objetos JavaScript representando os produtos com os seguintes campos: `id`, `nome`, `imagem`, `descricao`, `preco` (em centavos), `vegano`, e `categoria`.

```js
const produtos = [
  {
    id: "7",
    nome: "Mocha",
    imagem: "./image/product-07.png",
    descricao: "Uma descrição completa do produto.",
    preco: {
      de: 1000,
      por: 800,
    },
    vegano: false,
    categoria: "clássicos",
  },
];
```

2. Na Home, usar esse array de objetos para injetar os produtos no HTML já existente, garantindo que sejam listados na categoria correta.

```html
<a href="./product.html?p=123" class="products__list--item">
  <img src="./image/product-02.png" alt="">
  <h3 class="products__list--price">R$ 0,00 <span>R$ 0,00</span></h3>
  <h4 class="products__list--name">Americano</h4>
  <div class="product__tag">
    <img src="./image/Plant.png" alt="vegano">
    <span>Vegano</span>
  </div>
</a>
```

3. Criar o layout do carrinho de compras (HTML e CSS), conforme o design no Figma ou Penpot.
</details>
<details>
<summary>PART II - Após a Aula Manipulando DOM:</summary>

1. Na Home, adicionar links em cada produto que redirecionam para a página `product.html`, passando o `ID` do produto como parâmetro na URL (exemplo: `product.html?p=123`).

2. Na página de Produto, obter o `ID` do produto usando o código abaixo e exibir todos os dados daquele produto:

```js
const params = new URLSearchParams(window.location.search);
const idProduto = params.get('p');
console.log('ID do produto:', idProduto);
```

3. Na página de Produto, implementar a funcionalidade do botão Comprar:

- Adicionar o produto ao carrinho considerando a quantidade e as observações fornecidas pelo usuário.

- Implementar a funcionalidade de alterar a quantidade de produtos diretamente no campo de quantidade, garantindo que o valor mínimo seja 1.

- Criar um array de objetos para armazenar os produtos no carrinho, adicionando os campos quantidade e observacao ao objeto do produto.

```js
const produtosNoCarrinho = [
  {
    id: "6b9f",
    idProduto: "4",
    nome: "Café com Leite",
    imagem: "./image/product-04.png",
    preco: 1000,
    vegano: false,
    quantidade: 3,
    observacao: "",
  },
];
```

4. Implementar a funcionalidade de abrir e fechar o carrinho ao clicar no ícone de `X.svg`.
</details>
<details>
<summary>
PART III - Após a Aula de Api Pt.1 e Api Pt.2
</summary>
1. Na raiz do projeto, há um arquivo `db.json`. Use o JSON Server para gerar uma API fake.

```json
{
  "produtos": [
    {
      "id": "1",
      "nome": "Espresso",
      "imagem": "./image/product-01.png",
      "descricao": "Imagine um café espresso como um abraço acolhedor em uma xícara...",
      "preco": {
        "de": 800,
        "por": 600
      },
      "vegano": true,
      "categoria": "classicos"
    }
  ],
  "carrinho": [
    {
      "id": "6b9f",
      "idProduto": "4",
      "nome": "Café com leite",
      "imagem": "./image/product-04.png",
      "preco": 1000,
      "vegano": false,
      "quantidade": "3",
      "observacao": ""
    }
  ]
}
```
### Deixe sua FAKE API Rodando para que os endpoints funcionem

```bash
# Instalar JSON Server globalmente
npm install -g json-server

# Executar o servidor
npx json-server db.json

# Para rodar em uma porta específica
npx json-server db.json --port 3333
```

### Endpoints:

- `/produtos`
  - `GET`: pegar a lista de produtos
- `/produtos/[id] `(trocar `[id]` pelo id do produto)
  - `GET` => pegar os dados de um produto específico
- `/carrinho`
  - `GET`: pegar a lista de produtos no carrinho
  - `POST`: cadastrar um item no carrinho
- `/carrinho/[id]` (trocar `[id]` pelo id do item)
  - `DELETE`: deletar um item do carrinho
  - `PUT`: alterar os dados do item no carrinho



2. Fazer a integração com a API para substituir o array de produtos e o array de produtos no carrinho:
  - Home
    - Obtenha a listagem de produtos no endopoint `GET /produtos`
  - Produto
    - Obtenha os dados do produto específico no endpoint `GET /produtos[id]`
    - Ao clicar em comprar, o produto deve ser adicionado no carrinho, use o endpoint `POST /carrinho`
- carrinho:
  - Obtenha a listagem de produtos do carrinho no endpoint `GET /carrinho`
  - Delete um produto do carrinho usando o endpoint `DELETE /carrinho/[id]`
  - Altere a quantidade de um produto do carrinho `PUT /carrinho/[id]`
  - Exclua todos os itens do carrinho usando o endpoint `DELETE /carrinho/[id]`. Dica você pode usar um foreach para deletar todos.
  - Calcule o subtotal, frete e valor total usando o endpoint `GET /carrinho`


### (Opcional) Utilizando Axios
Você pode usar Axios para realizar as requisições. Caso escolha essa opção, importe o Axios no seu projeto.

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```
</details>
<details>
<summary>
PART VI - (opcional) Após a Aula de Sass:
</summary>
- Converter os arquivos CSS para SASS.
- Utilizar variáveis, aninhamento e mixins para melhorar a estrutura do código CSS.
</details>


## Interatividade - Detalhes por página

### Página Home

#### Header

- **Ícone do carrinho**:
  - A quantidade de itens deve ser dinâmica, de acordo com o número de produtos no carrinho.
  - Ao clicar no ícone do carrinho, o modal do carrinho deve ser exibido, conforme o design no Figma.

#### Listagem de Produtos

- Cada produto deve ter um link para a página `product.html`, passando o ID do produto como parâmetro (exemplo: `product.html?p=123`).
- A página de produto deve usar este parâmetro para carregar os dados específicos do produto.

---

### Página de Produto

#### Header

- O header deve ser idêntico ao da **Home**, com o ícone de carrinho e a quantidade dinâmica de produtos.

#### Conteúdo do Produto

- Os dados do produto devem ser dinâmicos e extraídos a partir do ID (`p`) passado na URL.
- O **botão "Comprar"** deve:
  - Adicionar o produto ao carrinho.
  - Considerar a quantidade especificada no campo "Quantidade".
  - Incluir as observações fornecidas pelo usuário, caso existam.

---

## Carrinho de Compras

#### Header do Carrinho

- O header do carrinho deve conter:
  - Um **botão para fechar** (`X.svg`) o modal do carrinho.
  - A **quantidade total de itens** no carrinho.
  - Um **botão para excluir todos os itens** do carrinho.

#### Listagem de Produtos no Carrinho

Cada item no carrinho deve exibir:
  - **Foto do produto**.
  - **Nome do produto**.
  - **Categoria**.
  - **Preço**.
  - **Quantidade** (com opção de alteração).
  - Um **botão para remover** (`Trash.svg`) o produto do carrinho.

#### Rodapé do Carrinho

Deve exibir:
  - **Subtotal**: valor total dos produtos.
  - **Frete**: valor do frete (pode ser zero).
  - **Valor total**: soma do subtotal e frete.
  - Um **botão "Finalizar Compra"** que dispara um popup com a mensagem "Compra realizada com sucesso".

---
