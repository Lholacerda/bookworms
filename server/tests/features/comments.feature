Feature: Gerenciamento de comentários em postagens
  As a user 
  I want to comment and view comments on posts.

  Scenario: criar comentário
    Given há um grupo no sistema com id "group1"
    And há um usuário no sistema com id "user1", username "gio" e groupId "group1"
    And há um post no sistema com id "post1", groupId "group1" e userId "user1"
    When uma requisição POST for enviada para "/comments" com o corpo da requisição sendo:
      """
        {
          "postId": "post1",
          "authorId": "user1",
          "createdAt": "2025-02-22T12:00:00Z",
          "text": "Este é um comentário."
        }
      """
    Then o status da resposta deve ser "201"
    And a resposta deve conter a mensagem "Comentário criado com sucesso!"

  Scenario: editar comentário
    Given há um grupo no sistema com id "group2"
    And há um usuário no sistema com id "user2", username "thais" e groupId "group2"
    And há um post no sistema com id "post2", groupId "group2" e userId "user2"
    And há um comentário no sistema com id "comment2", postId "post2", authorId "user2", date "2025-03-22T12:00:00Z" e texto "Que livro legal"
    When uma requisição PUT for enviada para "/comments/comment2" com o corpo da requisição sendo:
      """
        {
          "text": "Que livro bacana! Gostei muito"
        
        }
      """
    Then o status da resposta deve ser "200"
    And a resposta deve conter a mensagem "Comentário atualizado com sucesso"

  Scenario: deletar comentário
    Given há um grupo no sistema com id "group3"
    And há um usuário no sistema com id "user3", username "arthur" e groupId "group3"
    And há um post no sistema com id "post3", groupId "group3" e userId "user3"
    And há um comentário no sistema com id "comment3", postId "post3", authorId "user3", date "2025-01-10T12:00:00Z" e texto "Adorei esse livro!"
    When uma requisição DELETE for enviada para "/comments/comment3"
    Then o status da resposta deve ser "200"
    And a resposta deve conter a mensagem "Comentário deletado com sucesso"

  Scenario: não criar comentário com mais de 150 caracteres
    Given há um grupo no sistema com id "group4"
    And há um usuário no sistema com id "user4", username "maria" e groupId "group4"
    And há um post no sistema com id "post4", groupId "group4" e userId "user4"
    When uma requisição POST for enviada para "/comments" com o corpo da requisição sendo:
      """
      {
          "postId": "post4",
          "authorId": "user4",
          "text": "Este é um comentário muito longo que deve ultrapassar o limite de 150 caracteres. O objetivo deste teste é garantir que o sistema não permita a criação de comentários que sejam excessivamente longos e que isso retorne uma mensagem de erro adequada."
      }
      """
    Then o status da resposta deve ser "400"
    And a resposta deve conter a mensagem "Comentário deve ter no máximo 150 caracteres"
    # -----------------------------------------------------------------------

  Scenario: não permitir comentário vazio ou maior que 150 caracteres
    Given há um grupo no sistema com id "group5"
    And há um usuário no sistema com id "user5", username "joao" e groupId "group5"
    And há um post no sistema com id "post5", groupId "group5" e userId "user5"
    When uma requisição POST for enviada para "/comments" com o corpo da requisição sendo:
      """
      {
        "postId": "post5",
        "authorId": "user5",
        "text": ""
      }
      """
    Then o status da resposta deve ser "400"
    And a resposta deve conter a mensagem "Comentário não pode ser vazio"
  # Scenario: usuário tenta editar um comentário que não é dele
  #   Given há um grupo no sistema com id "group6"
  #   And há um usuário no sistema com id "user6", username "lara" e groupId "group6"
  #   And há um usuário no sistema com id "user7", username "paulo" e groupId "group6"
  #   And há um post no sistema com id "post6", groupId "group6" e userId "user6"
  #   And há um comentário no sistema com id "comment6", postId "post6", authorId "user6", texto "Esse livro é incrível!"
  #   When uma requisição PUT for enviada para "/comments/comment6" com o corpo da requisição sendo:
  #     """
  #     {
  #     "text": "Na verdade, achei mediano."
  #     }
  #     """
  #   And o usuário que enviou a requisição tem id "user7"
  #   Then o status da resposta deve ser "403"
  #   And a resposta deve conter a mensagem "Você não tem permissão para editar este comentário"
  # Scenario: criar comentário e garantir ordem cronológica
  #   Given há um grupo no sistema com id "group1"
  #   And há um usuário no sistema com id "user1", username "gio" e groupId "group1"
  #   And há um post no sistema com id "post1", groupId "group1" e userId "user1"
  #   When uma requisição POST for enviada para "/comments" com o corpo da requisição sendo:
  #     """
  #       {
  #         "postId": "post1",
  #         "authorId": "user1",
  #         "createdAt": "2025-03-22T10:00:00Z",
  #         "text": "Primeiro comentário"
  #       }
  #     """
  #   And uma requisição POST for enviada para "/comments" com o corpo da requisição sendo:
  #     """
  #       {
  #         "postId": "post1",
  #         "authorId": "user1",
  #         "createdAt": "2025-03-22T11:00:00Z",
  #         "text": "Segundo comentário"
  #       }
  #     """
  #   And uma requisição POST for enviada para "/comments" com o corpo da requisição sendo:
  #     """
  #       {
  #         "postId": "post1",
  #         "authorId": "user1",
  #         "createdAt": "2025-03-22T12:00:00Z",
  #         "text": "Terceiro comentário"
  #       }
  #     """
  #   When uma requisição GET for enviada para "/comments?postId=post1"
  #   Then o status da resposta deve ser "200"
  #   And a resposta deve conter os comentários na seguinte ordem:
  #     """
  #       "Primeiro comentário" (2025-03-22T10:00:00Z)
  #       "Segundo comentário" (2025-03-22T11:00:00Z)
  #       "Terceiro comentário" (2025-03-22T12:00:00Z)
  #     """