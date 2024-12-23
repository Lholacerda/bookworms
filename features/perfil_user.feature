Feature: Pagina de perfil
As a usuario
I want to acessar o meu perfil e de outras pessoas
So that eu possa conhecer aspectos de outros usuarios e eles possam conhecer os meus

Scenario: Acessar a pagina de perfil
Given eu estou logado com o email "luisx3@gmail.com" e senha "senha123"
When eu seleciono a opção "Meu Perfil" no menu principal
Then eu sou transferido para a minha pagina de perfil
And eu vejo todas minhas informações, como "Nome", "Foto de perfil", "Bio" e "e-mail"

Scenario: Visualizar perfis de outras pessoas
Given eu estou logado com o email "luisx3@gmail.com" e senha "senha123"
And eu estou na página inicial
When eu seleciono o perfil de outro usuário
Then eu sou transferido para a página de perfil deste usuário
And eu vejo informações como "Nome", "Foto de perfil", "Bio"

Scenario: Exibir o livro que o usuário está lendo atualmente
Given eu estou na pagina de perfil de "luisx3@gmail.com"
When eu navego ate a seção "Lendo atualmente"
Then "Titulo","Autor" e "Porcentagem de leitura" são exibidos na nesta secao

Scenario: Editar informacoes do perfil
Given eu estou na minha pagina de perfil logado com o email "luisx3@gmail.com" e senha "senha123"
And eu seleciono a opção "Editar Perfil"
When eu atualizo o campo "Bio" com "Amante de livros e aventuras literarias"
And eu salvo as alteracoes
Then eu deveria ver a mensagem "Perfil atualizado com sucesso"
And minha nova bio "Amante de livros e aventuras literárias" e exibida na pagina de perfil

Scenario: Falha ao editar perfil devido ao campo "Bio" vazio
Given eu estou na minha página de perfil logado com o email "joazinho_45@gmail.com" e senha "senha123" 
And eu seleciono a opção "Editar Perfil" 
When eu deixo o campo "Bio" vazio And eu salvo as alterações 
Then eu deveria ver uma mensagem de erro "O campo Bio não pode estar vazio" 
And as informações do perfil permanecem inalteradas 

