# [API de Sistema Bancario](https://github.com/Felipe0Gaviao/RESTful-API_Sistema_Bancario)

## O que é esse Projeto

### Breve Descrição

É uma API de um Sistema Bancário escrito em <img src="https://cdn-icons-png.flaticon.com/128/5968/5968292.png" alt="drawing" width="30"/> rodando localmente, desde o código em si, até o [banco de dados](https://github.com/Felipe0Gaviao/RESTful-API_Sistema_Bancario/blob/main/src/bancodedados.js)

### Funcionalidades

1. Listar
   - Requisição de Método `GET`
   - Acessível por: `http://localhost:3000/contas`.
   - Como um parametro query, ele necessita da senha do banco, também localizada no banco de dados.
   - Por padrão a senha será `Cubos123Bank`
   - Então para ter certeza de que não haverá barreiras te impedindo de listar, a url que você deve acessar será `http://localhost:3000/contas?senha_banco=Cubos123Bank`
   - De inicio, não haverá nenhuma conta no banco de dados, então a requisição deve retornar `[]`
   - logo, para ela mostrar alguma coisa você deve usar o:
     
2. Criar
   - Requisição de Método `POST`
   - Acessível também por: `http://localhost:3000/contas` que nem o Listar.
   - Não recebe nenhum parâmetro na query, ao invés disso, recebe parâmetros dentro do corpo da requisição.
   - Um exemplo simples de uma requisição que funciona seria:\
     ![image](https://github.com/Felipe0Gaviao/RESTful-API_Sistema_Bancario/assets/133283097/9b82e6be-8073-4be6-8454-280f5bb71b62)
   - para criar uma conta, é necessário cada um dos itens acima, enquanto email e cpf precisam ser únicos, ou seja, não pode haver outras contas no banco de dados com o mesmo CPF ou E-mail

3. Substituir
   - Requisição de Método `PUT`
   - Acessível por: `http://localhost:3000/contas/:id/usuario`.
   - Como um parametro de pesquisa, ele necessita do parâmetro `:id` para especificar qual conta você gostaria de substituir os dados.
   - substitui as informações da conta especificada.

4. Excluir
   - Requisição de Método `DELETE`
   - Acessível por: `http://localhost:3000/contas/:id`.
   - Da mesma forma que o Substituir, ele recebe no parametro de pesquisa, o `:id` de uma conta.
   - Remove a conta do bando de dados, na condição de que a conta não possui saldo.

5. Depositar e Sacar
   - Requisições de Método `POST`
   - Acessíveis por: `http://localhost:3000/transacoes/`.
   - Você escolhe qual método usar: `/transacoes/depositar` ou `/transacoes/sacar`.
   - Da mesma forma que o Criar, eles recebem argumento no corpo da requisição.
   - Um exemplo logo abaixo:\
     ![image](https://github.com/Felipe0Gaviao/RESTful-API_Sistema_Bancario/assets/133283097/e3609e3a-92ac-4516-bcad-0fe0ce2369aa)
   - E da mesma forma que Criar, todos os parâmetros são obrigatórios.
   - O parâmetro `"numero_conta"` se refere ao número que a conta, quando criada, recebe automáticamente.
   - O Listar lista todas as contas e os números que cada uma delas representa, então pode encontrálos por lá para especificar em qual conta gostaria de depositar ou sacar.
     
6. Transferir
   - Requisição de Método `POST`
   - Acessível por: `http://localhost:3000/transacoes/transferir`
   - Está separado de Depositar e Sacar, ele rebe argumentos no corpo da requisição, mas são um pouco diferentes dos outros.
   - um exemplo disso:\
     ![image](https://github.com/Felipe0Gaviao/RESTful-API_Sistema_Bancario/assets/133283097/d6eaf4ab-70ff-48d6-82d4-e58a2f2d5a3f)
   - Novamente, todos os parãmentros obrigatórios.
   - O parâmetro `"numero_conta_origem"` indica a conta da qual você quer sacar, enquanto `"numero_conta_destino"` indica a conta para onde o valor vai ser enviado.
   - O parâmetro `"senha"` é a senha da conta de origem da qual o valor vai ser sacado.

7. Saldo e Extrato
   - Requisições de Método `GET`
   - Acessíveis por: `http://localhost:3000/contas/`
   - Após o `/contas/` há a escolha de colocar tanto `saldo` quanto `extrato`
   - Saldo retorna o Saldo da conta atual, exemplo abaixo:\
     ![image](https://github.com/Felipe0Gaviao/RESTful-API_Sistema_Bancario/assets/133283097/11fcf5c3-cddc-4437-8428-45df1ca84e53)
   - Extrato retorna o extrato de depósitos, saques e transferências que foram executas nesssa conta E para essa conta, um exemplo de resposta seria:\
     ![image](https://github.com/Felipe0Gaviao/RESTful-API_Sistema_Bancario/assets/133283097/28e6c53e-214a-4ad5-bafb-fd7096fc366a)
   - Cada item dentro do extrato é criado automáticamente assim que um Saque, Deposito ou Transferência é feito.

## Como Executar o Projeto

### Requisitos

Obrigatório: 

- Ter instalado na máquina:

  - ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) que pode ser adquirido [Aqui](https://nodejs.org/en)

- Ter Preparado:
  
  - Uma Ferramenta API, algumas sugestões:
    
    - [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
    - [PostMan](https://www.postman.com/)
    - PostWoman ou [Hoppscotch](https://hoppscotch.io/)

### Começando aqui no Github

1. Fazer um Fork desse Repositório, acessível por [Aqui](https://github.com/Felipe0Gaviao/RESTful-API_Sistema_Bancario/fork).
   - Ou indo até o topo da página, você pode encontrar um botão no canto superior direito iguai a esse: ![image](https://github.com/Felipe0Gaviao/RESTful-API_Sistema_Bancario/assets/133283097/eacbd71d-259c-4846-a24c-cb194455866a)

3. Clonar o Repositório para a máquina em que o Proejto vai ser executado.

### Agora com o Projeto na máquina

1. No Terminal, execute o comando `npm init -y` para iniciar um Projeto vazio

### Com o Projeto criado, os Pacotes que você irá precisar:

1. Obrigatórios:

  - ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) que pode ser instalado com o comando `npm install express`
    
    - A Documentação desse pacote pode ser acessada por esse Link [Express.js Documentation](https://expressjs.com/)
      
  - ![Date-fns](https://img.shields.io/badge/date_fns-%23c90076.svg?style=for-the-badge&logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE2M3B4IiBoZWlnaHQ9IjEzNnB4IiB2aWV3Qm94PSIwIDAgMTYzIDEzNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuMy4zICgxMjA3MikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+ZGF0ZS1mbnMtdHJhbnNwYXJlbnQgY29weSAyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9IlNvbGlkLWxvZ28iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOS4wMDAwMDAsIC0zMi4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPGcgaWQ9IldoaXRlLWxvZ28iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5LjAwMDAwMCwgMzIuMDAwMDAwKSIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMC40LDY3LjggQzAuNCw1NC43NDM5MzQ3IDIuNzk5OTc2LDQyLjQzMjA1NzggNy42LDMwLjg2NCBDMTIuNDAwMDI0LDE5LjI5NTk0MjIgMTkuMzExOTU0OSw5LjA0ODA0NDY0IDI4LjMzNiwwLjEyIEw0Ni40OCwwLjEyIEMyNy42NjM5MDU5LDE4Ljc0NDA5MzEgMTguMjU2LDQxLjMwMzg2NzUgMTguMjU2LDY3LjggQzE4LjI1Niw5NC4yOTYxMzI1IDI3LjY2MzkwNTksMTE2Ljg1NTkwNyA0Ni40OCwxMzUuNDggTDI4LjMzNiwxMzUuNDggQzE5LjMxMTk1NDksMTI2LjU1MTk1NSAxMi40MDAwMjQsMTE2LjMwNDA1OCA3LjYsMTA0LjczNiBDMi43OTk5NzYsOTMuMTY3OTQyMiAwLjQsODAuODU2MDY1MyAwLjQsNjcuOCBMMC40LDY3LjggWiBNMTYyLjYsNjcuOCBDMTYyLjYsODAuODU2MDY1MyAxNjAuMjAwMDI0LDkzLjE2Nzk0MjIgMTU1LjQsMTA0LjczNiBDMTUwLjU5OTk3NiwxMTYuMzA0MDU4IDE0My42ODgwNDUsMTI2LjU1MTk1NSAxMzQuNjY0LDEzNS40OCBMMTE2LjUyLDEzNS40OCBDMTM1LjMzNjA5NCwxMTYuODU1OTA3IDE0NC43NDQsOTQuMjk2MTMyNSAxNDQuNzQ0LDY3LjggQzE0NC43NDQsNDEuMzAzODY3NSAxMzUuMzM2MDk0LDE4Ljc0NDA5MzEgMTE2LjUyLDAuMTIgTDEzNC42NjQsMC4xMiBDMTQzLjY4ODA0NSw5LjA0ODA0NDY0IDE1MC41OTk5NzYsMTkuMjk1OTQyMiAxNTUuNCwzMC44NjQgQzE2MC4yMDAwMjQsNDIuNDMyMDU3OCAxNjIuNiw1NC43NDM5MzQ3IDE2Mi42LDY3LjggTDE2Mi42LDY3LjggWiIgaWQ9IlBhcmFucyI+PC9wYXRoPgogICAgICAgICAgICAgICAgPGcgaWQ9IkhhbmRzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2Ny4wMDAwMDAsIDkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IkhhbmQiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMiIgaGVpZ2h0PSI2OSI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJIYW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMi41MDAwMDAsIDQwLjUwMDAwMCkgc2NhbGUoLTEsIDEpIHJvdGF0ZSgtNDUuMDAwMDAwKSB0cmFuc2xhdGUoLTMyLjUwMDAwMCwgLTQwLjUwMDAwMCkgIiB4PSIyNyIgeT0iNiIgd2lkdGg9IjExIiBoZWlnaHQ9IjY5Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==&logoColor=%2361DAFB) que pode ser instalado com o comando `npm install date-fns --save`

    - A Documentação desse pacote pode ser acessada por esse Link [date-fns Documentation](https://date-fns.org/docs/Getting-Started)
      
2. Dev (não é obrigatório, mas ajuda em certas ocasiões)

  - ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) que pode ser instalado com o comando `npm install nodemon`

