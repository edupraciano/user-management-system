import UserModel from '../models/userModel.js';

class UserController {
    index = async (_, res) => {
        try {
            const users = await UserModel.findAll();
            res.status(200).render('pages/main', {
                title: "Home Page",
                users: users,
                search: false
            });
        } catch (error) {
            console.error('Error getting all the users.', error);
            res.status(500).json({ message: 'Error getting all the users.' });
        }
    }

    find = async (req, res) => {
        try {
            const query = req.body.user;
            const users = await UserModel.search(query);
            res.status(200).render('pages/main', {
                title: "Search Results",
                users: users,
                search: true
            });
        } catch (error) {
            console.error('Error getting this user.', error);
            res.status(500).json({ message: 'Error getting this user.' });
        }
    }

    addUser = async (req, res) => {
        if (req.method === "GET") {
            res.render('pages/addUser', { title: 'Add User', success: null, error: null });
        } else {
            try {
                const user = {
                    first_name: req.body.first_name.trim().toUpperCase(),
                    last_name: req.body.last_name.trim().toUpperCase(),
                    email: req.body.email.trim().toLowerCase(),
                    phone: req.body.phone.trim(),
                    comments: req.body.comments.trim().toUpperCase(),
                    status: req.body.status ? req.body.status.trim().toUpperCase() : 'ATIVO'
                };
                await UserModel.create(user);
                res.status(200).render('pages/addUser', {
                    title: 'Add User',
                    success: 'User added successfully!',
                    error: null
                });
            } catch (error) {
                console.error('Error adding new user.', error);
                res.status(500).render('pages/addUser', {
                    title: 'Add User',
                    success: null,
                    error: 'Error adding new user.'
                });
            }
        }
    }

    editUser = async (req, res) => {
        try {
            const id = req.params.id;
            const user = {
                first_name: req.body.first_name.trim().toUpperCase(),
                last_name: req.body.last_name.trim().toUpperCase(),
                email: req.body.email.trim().toLowerCase(),
                phone: req.body.phone.trim(),
                comments: req.body.comments.trim().toUpperCase(),
                status: req.body.status.trim().toUpperCase()
            };
            await UserModel.update(id, user);
            res.status(200).render('pages/editUser',
                {
                    title: 'Edit User', user: user,
                    success: 'User updated successfully!',
                    error: null
                });
        } catch (error) {
            console.error('Error updating the user.', error);
            res.status(500).render('pages/editUser', {
                title: 'Edit User',
                user: req.body,
                success: null,
                error: 'Error updating the user.'
            });
        }
    };

    editUserForm = async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).render('pages/404', {
                    title: 'User Not Found'
                });
            }
            res.status(200).render('pages/editUser', {
                title: 'Edit User',
                user: user,
                success: null,
                error: null
            });
        } catch (error) {
            console.error('Error fetching user data.', error);
            res.status(500).json({ message: 'Error fetching user data.' });
        }
    };

    deleteUser = async (req, res) => {
        try {
            const id = req.params.id;
            await UserModel.destroy(id);
            res.status(200).json({ message: 'User deleted successfully!' }); // Retornar uma mensagem de sucesso
        } catch (error) {
            console.error('Error deleting the user.', error);
            res.status(500).json({ message: 'Error deleting the user.' });
        }
    }

    viewUser = async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).render('pages/404', { title: 'User Not Found' });
            } res.status(200).render('pages/viewUser',
                { title: 'User Details', user: user });
        } catch (error) {
            console.error('Error fetching user data.', error);
            res.status(500).json({ message: 'Error fetching user data.' });
        }
    };
}

export default new UserController();
