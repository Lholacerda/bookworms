import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { connection } from '../Helper/database.config';
import app from '../../src/app';
import { afterAll, beforeAll, beforeEach, expect } from '@jest/globals';

const feature = loadFeature('../features/update_user_profile.feature');

defineFeature(feature, (test) => {
  let response;
  let userData;

  beforeAll(async () => {
    await connection.create();
  });

  beforeEach(async () => {
    await connection.clear();
    userData = await request(app).post('/users').send({
      name: 'Luis Henrique',
      username: 'luisx3',
      email: 'luisx3@gmail.com',
      password: 'senha123',
    }).then(res => res.body);
  });

  afterAll(async () => {
    await connection.close();
  });

  test('Editar informações do perfil', ({ given, when, then, and }) => {
    given('eu estou na minha página de perfil logado com o email "luisx3@gmail.com" e senha "senha123"',() => {});

    and('eu seleciono a opção "Editar Perfil"', () => {});

    when('eu atualizo o campo "Bio" com "Amante de livros e aventuras literárias"', () => {});

    and('eu salvo as alterações', async (table) => {
        const [userData] = table;
        response = await request(app).post('/users').send(userData);
      });

    then('eu deveria ver a mensagem "Perfil atualizado com sucesso"', () => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Perfil atualizado com sucesso');
    });

    and('minha nova bio "Amante de livros e aventuras literárias" e exibida na página de perfil', async () => {
        const updatedUser = await request(app).get('/users');
        expect(updatedUser.body.bio).toBe('Amante de livros e aventuras literárias');
    });







    
  });
});
