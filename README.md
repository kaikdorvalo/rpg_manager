
# Sistema de Gerenciamento para um jogode PRG

O sistema foi desenvolvido com NodeJS no back-end, com o famework Nestjs.

O banco de dados utilizado foi o PostgreSQL

A ORM utilizada foi o TypeORM

Para fazer requisições foi utilizado o Postman

OBS: Tanto o banco de dados quanto a ORM foram implementadas de acordo com a documentação do Nestjs e do TypeORM

# Como subir o servidor

1. Clone o repositório e certifique de ter clonado a branch main
2. Instale as dependências com `npm install`
3. Crie um arquivo `.env` e cole dentro delo todo o conteúdo do arquivo `.env.example`, adicionando as inormações necessárias para acessar o banco de dados.
4. Abra o gerenciador de banco de dados PostgreSQL e crie um novo banco de dados com o mesmo nome informado no arquivo `.env` 
3. Suba o servidor em modo de desenvolvimento com `npm run start:dev`

# Configurando o Postman

1. Abra o Postman e importe o arquivo `rpg_manager.postman_collection.json` que encontra-se na raíz do projeto.
2. Se tudo deu certo, uma coleção com todas as requisições e exemplo foram criadas.

ATENÇÃO: Os dados de requisições existentes são os que eu utilizei para testar. Lembre-se de mudar para os seus dados no decorrer das requisições

# Requisitos x Rotas

ATENÇÃO: Não vou disponibilizar um exemplo de body para as requisições, pois o arquvio `rpg_manager.postman_collection.json` irá trazer todas essa infromações conforme eu configurei.

1. Cadastrar Personagem
* http://localhost:3000/characters/create
* Necessário enviar um body com os dados do personagem a ser criado
* Não é possível criar itens mágicos no momento da criação de personagem.
* `POST`

2. Cadastrar Item Mágico;
* http://localhost:3000/magic_items/create
* Necessário enviar um body com os dados do item a ser criado
* o body deve possuir um campo com id do personagem que será dono do item. (Relação 1 x n como descrito na problemática, não podendo existir item sem personagem atrelado)
* `POST`

3. Listar Personagem
* http://localhost:3000/characters/info/:id
* Substituir o :id da url pelo id no personagem desejado
* Essa rota lista o as informações do personagem, inclusive itens
* `GET`

4. Buscar Personagem por Identificador
* http://localhost:3000/characters/find/:id
* Substituir o :id da url pelo id no personagem desejado
* Essa rota traz somento o personagem, sem considerar os itens
* `GET`

5. Atualizar Nome Aventureiro por Identificador
* http://localhost:3000/characters/changes/adventurous_name/:id
* Substituir o :id da url pelo id no personagem desejado
* Necessário enviar um body com o novo nome desejado
* `PUT`

6. Remover Personagem
* http://localhost:3000/characters/delete/:id
* Substituir o :id da url pelo id no personagem desejado
* Essa ação também deleta os itens que estão relacionados ao personagem (relação 1 x n de acordo com a problemática)
* `DELETE`

7. Adicionar Item Mágico ao personagem
* http://localhost:3000/magic_items/add_to_character/:id
* Substituir o :id da url pelo id no personagem desejado
* Essa rota permite que um item que está relacionado a um personagem seja possível adicionar em outro personagem, removendo do primeiro.
* `POST`

8. Listar Itens Mágicos
* http://localhost:3000/magic_items/list
* Lista todos os items mágicos existentes no banco de dados
* `GET`

9. Buscar Item Mágico por Identificador
* http://localhost:3000/magic_items/find/:id
* Substituir o :id da url pelo id do item mágico desejado
* `GET`

10. Listar Itens Mágicos por Personagem;
* http://localhost:3000/characters/magic_items/all/:id
* Substituir o :id da url pelo id do personagem desejado
* Lista todos os itens mágicos do personagem
* `GET`

11. Remover Item Mágico do Personagem
* http://localhost:3000/magic_items/remove_from_character/:id
* Substituir o :id da url pelo id do personagem desejado
* Necessário enviar o id do item mágico desejado no body
* Essa rota remove o item mágico do personagem e também do banco de dados (respeitando relação 1 x n da problemática)
* `DELETE`

12. Buscar Amuleto do Personagem
* http://localhost:3000/characters/amulet/:id
* Substituir o :id da url pelo id do personagem desejado
* Se existir amuleto, traz na resposta. Se não existir, traz uma resposta vazia sem data
* `GET`


