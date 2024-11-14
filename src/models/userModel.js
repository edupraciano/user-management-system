import connection from '../db_config/connection.js';

class UserModel {
    findAll = async () => {
        const SQL = 'SELECT * FROM users';
        const [result] = await connection.execute(SQL);
        return result;
    }

    search = async (query) => {
        const SQL = 'SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?';
        const [result] = await connection.execute(SQL, [`%${query}%`, `%${query}%`]);
        return result;
    }

    create = async ({ first_name, last_name, email, phone, comments, status = 'Ativo' }) => {
        const SQL = 'INSERT INTO users (first_name, last_name, email, phone, comments, status) VALUES (?, ?, ?, ?, ?, ?)';
        await connection.execute(SQL, [first_name, last_name, email, phone, comments, status]);
    }

    update = async (id, { first_name, last_name, email, phone, comments, status }) => {
        const sql = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?, status = ? WHERE id = ?';
        const [result] = await connection.execute(sql, [first_name, last_name, email, phone, comments, status, id]);
        return result;
    };

    findById = async (id) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [result] = await connection.execute(sql, [id]);
        return result[0];
    }

    destroy = async (id) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        await connection.execute(sql, [id])
    }
}

export default new UserModel();
