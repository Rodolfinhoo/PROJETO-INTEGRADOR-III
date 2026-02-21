const { User, Barbershop } = require('../models/index');
const jwt = require('jsonwebtoken');

class AuthController {
  // LOGIN
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const emailNormalized = email.toLowerCase().trim();

      const user = await User.findOne({
        where: { email: emailNormalized },
        include: [
          {
            model: Barbershop,
            as: 'barbershop',
            attributes: ['id', 'name', 'address', 'phone', 'email'],
          }
        ],
        attributes: ['id', 'name', 'email', 'password', 'role', 'barbershop_id']
      });

      if (!user) return res.status(401).json({ error: 'User not found' });

      const passwordMatch = await user.checkPassword(password);
      if (!passwordMatch) return res.status(401).json({ error: 'Invalid password' });

      const token = jwt.sign(
        { id: user.id, barbershop_id: user.barbershop_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          barbershop: user.barbershop
        },
        token
      });

    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // REGISTER
  async register(req, res) {
    try {
      const { name, email, password, role, barbershop } = req.body;

      if (!name || !email || !password || !barbershop) {
        return res.status(400).json({ error: 'Name, email, password, and barbershop are required' });
      }

      // Verifica se usuário já existe
      const userExists = await User.findOne({ where: { email: email.toLowerCase() } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Cria barbearia
      const newBarbershop = await Barbershop.create({
        name: barbershop.name,
        address: barbershop.address,
        phone: barbershop.phone,
        email: barbershop.email,
      });

      // Cria usuário vinculado à barbearia
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password, // ⚠️ não faz hash aqui, o model cuida disso
        role: role || 'admin',
        barbershop_id: newBarbershop.id
      });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          barbershop: newBarbershop
        },
        token
      });

    } catch (error) {
      console.error('Erro no registro:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new AuthController();