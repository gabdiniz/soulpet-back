 # Programa SoulPet

<img src="./assets/banner-home.png" width= 100%> 

<br>
Este é um api Back-end para ser integrado junto à api
<a href="https://github.com/gabdiniz/soulpet_front"> Front-end</a> e gerar uma solução voltada para o gerenciamento de um <b>Petshop</b>, por meio de um sistema de gestão que tem o objetivo de oferecer recursos específicos para facilitar e tornar a rotina do negócio mais eficiente.

<br>

## Recursos e Funcionalidades <img src="./assets/soul-pet-logo.svg" width= 7%> 

O programa SoulPet possui os seguintes recursos e funcionalidades para a gestão do negócio:
- Cadastro e controle de clientes: com informações pertinentes ao cliente, tais como: nome, endereço, telefone e e-mail.
- Cadastro e controle de pets: com informações pertinentes ao pet, tais como: nome, tipo de animal, porte, data de nascimento, identificação do dono e foto.

- Cadastro e controle de produtos: com informações pertinentes ao produto, tais como: nome, preço, descrição, desconto, data de desconto e categoria, sendo que, está predefinida em higiene, brinquedos e conforto.

- Inserção e controle de pedidos: com informações pertinentes ao pedido, tais como: cliente, produto e quantidade solicitados.

- Cadastro e controrle de serviços: permite o registro de serviços realizados pelo petshop.

- Inserção e controle de agendamentos: possui uma seção para registrar agendamentos com informações pertinentes ao serviço solicitado para o pet, data agendada e status.

## Pré-requisitos <img src="./assets/soul-pet-logo.svg" width= 7%> 

Antes de começar, será preciso ter instalado em sua máquina e/ou configurado as seguintes ferramentas:

1. Tecnologias e Ambiente de Desenvolvimento

- [NodeJs ](https://nodejs.org/en)
- [VSCode ](https://code.visualstudio.com/)
- [Git ](https://git-scm.com/)
- [GitHub ](https://github.com/)
- [Postman ](https://www.postman.com/downloads/)

2. Banco de Dados

- [Firebase ](https://firebase.google.com/?hl=pt-br)
- [MySQL](https://www.mysql.com/)
- [MongoDB ](https://www.mongodb.com/)

Demais tecnologias/bibliotecas/frameworks utilizados no projeto (sugestão de documentação)

- [Javascript ](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
- [React](https://react.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Express](https://expressjs.com/pt-br/)
- [Sequelize ](https://sequelize.org/)
- [Moongose](https://mongoosejs.com/)

## Instalação e Execução da Aplicação <img src="./assets/soul-pet-logo.svg" width= 7%> 
### Rodando o Back-end (servidor)
<br>

```bash
# Clone este repositório 
$ git clone https://github.com/gabdiniz/soulpet-back

# Acesse a pasta do projeto no terminal/cmd 
$ cd nome_da_pasta_do_projeto

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

## Lista de Endpoints da API <img src="./assets/soul-pet-logo.svg" width= 7%> 

Essas são as rotas disponíveis, os recursos e os parâmetros necessários para realizar as operações:

- Clientes

1. Insere um novo cliente (POST): /clientes

    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |nome|string|obrigatório|
    |email|string|obrigatório|
    |telefone|string|obrigatório|
    |endereço|foreing_key|obrigatório|

2. Lista todos os clientes (GET): /clientes

3. Lista um cliente específico (GET): /clientes/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

4. Atualiza os dados de um cliente específico (PUT): /clientes/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

5. Exclui um cliente específico (DELETE): /clientes/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

6. Lista o endereço de um cliente específico (GET): /clientes/:clienteId/endereco
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |clienteId|number|obrigatório|

7. Lista o endereço de um cliente específico (GET): /clientes/:clienteId/pets
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |clienteId|number|obrigatório|

<br>
- Pets

1. Insere um novo pet (POST): /pets

    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |nome|string|obrigatório|
    |tipo|string|obrigatório|
    |porte|string|obrigatório|
    |dataNasc|dateonly|não obrigatório|
    |imagemUrl|string|não obrigatório|

2. Lista todos os pets (GET): /pets

3. Lista um pet específico (GET): /pets/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

4. Atualiza os dados de um pet específico (PUT): /pets/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

5. Exclui um pet específico (DELETE): /pets/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

<br>
- Produtos

1. Insere um novo produto (POST): /produtos

    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |nome|string|obrigatório|
    |preco|string|obrigatório|
    |descricao|string|obrigatório|
    |desconto|double|obrigatório|
    |dataDesconto|dateonly|obrigatório|
    |categoria|string|obrigatório|

2. Lista todos os produtos (GET): /produtos

3. Lista um produto específico (GET): /produtos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

4. Atualiza os dados de um produto específico (PUT): /produtos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

5. Exclui um produto específico (DELETE): /produtos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

6. Exclui todos os produtos (DELETE): /produtos/all
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |all|string|obrigatório|

<br>
- Pedidos

1. Insere um novo pedido (POST): /pedidos

    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |codigo|uuid|obrigatório|
    |quantidade|integer|obrigatório|
    
2. Lista todos os pedidos (GET): /pedidos

3. Lista um pedido específico (GET): /pedidos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

4. Lista todos os pedidos correspondentes ao id do produto (GET): /pedidos/produtos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

5. Lista todos os pedidos correspondentes ao id do cliente (GET): /pedidos/clientes/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

6. Atualiza os dados de um pedido específico (PUT): /pedidos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

7. Exclui um pedido específico (DELETE): /pedidos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

8. Exclui todos os pedidos correspondentes ao id do cliente (DELETE): /pedidos/clientes/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

9. Exclui todos os pedidos correspondentes ao id do produto (DELETE): /pedidos/produtos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

<br>
- Serviços

1. Insere um novo serviço (POST): /servicos

    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |nome|string|obrigatório|
    |preco|double|obrigatório|
    
2. Lista todos os serviços (GET): /servicos

3. Lista um serviço específico (GET): /servicos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

4. Atualiza os dados de um serviço específico (PUT): /serviços/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

5. Exclui um serviço específico (DELETE): /serviços/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

6. Exclui todos os serviços (DELETE): /servicos/all
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |all|string|obrigatório|

<br>
- Agendamentos

1. Insere um novo agendamento (POST): /agendamentos

    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |petId|number|obrigatório|
    |servicoId|number|obrigatório|
    |dataAgendada|dateonly|obrigatório|
    |realizada|boolean|obrigatório|
    
2. Lista todos os agendamentos (GET): /agendamentos

3. Lista um agendamento específico (GET): /agendamentos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

4. Atualiza os dados de um agendamento específico (PUT): /agendamentos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

5. Exclui um agendamento específico (DELETE): /agendamentos/:id
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |id|number|obrigatório|

6. Exclui todos os agendamentos (DELETE): /agendamentos/all
    | Parâmetro | Tipo | Requisito |
    |-----------|------|----------|
    |all|string|obrigatório|

<br>

## Colaboradores <img src="./assets/soul-pet-logo.svg" width= 7%> 

|[<img src="https://avatars.githubusercontent.com/u/115419806?v=4" width=100%/><br/><sub>Gabriel Diniz<sub/>](https://github.com/gabdiniz)|[<img src="https://avatars.githubusercontent.com/u/125272384?v=4" width=100%/><br/><sub>Jonatas Vieira<sub/>](https://github.com/jhonasjhones)|[<img src="https://avatars.githubusercontent.com/u/107771309?v=4" width=100%/><br/><sub>Lucas Damaso<sub/>](https://github.com/luucdamaso)|[<img src="https://avatars.githubusercontent.com/u/116334877?v=4" width=100%/><br/><sub>Mikael Meira<sub/>](https://github.com/luucdamasohttps://github.com/zcastlem)|[<img src="https://avatars.githubusercontent.com/u/125225150?v=4" width=100%/><br/><sub>Tamires Rovere<sub/>](https://github.com/TamiresDellaRovere)|[<img src="https://avatars.githubusercontent.com/u/125217859?v=4" width=100%/><br/><sub>Sandra Silva<sub/>](https://github.com/SandramSilva)|
|---|---|---|---|---|---|


## Licença <img src="./assets/soul-pet-logo.svg" width= 7%> 

Esta aplicação utiliza a Licença MIT, o que significa que você pode usá-la, copiá-la, modificar e distribuir o código desta aplicação, desde que seja mantida a atribuição de direitos autorais e a licença seja incluída em todas as cópias e modificações do código. Para obter mais informações sobre a Licença MIT, consulte o arquivo LICENSE.md na raiz deste repositório.


## Autora
<hr>
<img src="https://avatars.githubusercontent.com/u/125217859?v=4" width= 10%>


<a href="https://github.com/SandramSilva"> Sandra Silva</a>

