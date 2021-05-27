import request from 'supertest';
import { app } from '../../app';

it('fails when email does not exist', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test1@test2.com',
      password: '12123132133',
    })
    .expect(400);
});

it('fails when incorrect password is supplied ', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test2.com',
      password: '12123132133',
      confirmPassword: '12123132133',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test1@test2.com',
      password: '1212',
    })
    .expect(400);
});

it('send back cookie when valid credetial', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test2.com',
      password: '12123132133',
      confirmPassword: '12123132133',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test1@test2.com',
      password: '12123132133',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
