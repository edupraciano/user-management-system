import express from 'express';
import userController from './controllers/userController.js';

const router = express.Router();

// Rota para obter todos os usuários
router.get('/users', userController.index);

// Rota para pesquisar um usuário
router.post('/users', userController.find);

// Rota para exibir o formulário de adicionar usuário (GET)
router.get('/users/add', userController.addUser);

// Rota para processar o formulário de adicionar usuário (POST)
router.post('/users/add', userController.addUser);

// Rota para exibir o formulário de edição de usuário (GET)
router.get('/users/:id/edit', userController.editUserForm);

// Rota para editar usuário (PUT)
router.put('/users/:id', userController.editUser);

// Rota para deletar usuário (DELETE)
router.delete('/users/:id', userController.deleteUser);

// Rota para visualizar usuário (GET)
router.get('/users/:id/view', userController.viewUser);

// Middleware para lidar com páginas não encontradas (404)
router.use((req, res, next) => {
    res.status(404).render('pages/404');
});

export default router;
