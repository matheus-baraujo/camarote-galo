const { registerClient } = require('../services/api');
require('dotenv').config({ path: '.env.test' });

describe('Teste de Integração - registerClient', () => {
  let clienteDeTeste;

  beforeAll(() => {
    clienteDeTeste = {
      nome: 'Jest Teste',
      email: `teste${Date.now()}@email.com`, // Evita e-mails duplicados
      cpf: `123.456.789-00`,
      cep: '12345-678',
      telefone: '(11) 98765-4321',
      password: 'senha123',
    };
  });

  test('Deve registrar um cliente na API real', async () => {
    const resultado = await registerClient(clienteDeTeste);
    expect(resultado).toBe(true);
  });

  test('Deve falhar ao registrar um cliente com CPF duplicado', async () => {
    const resultado = await registerClient(clienteDeTeste);
    expect(resultado).toEqual({ error: 'Já existe outro cadastro com este cpf' });
  });

});