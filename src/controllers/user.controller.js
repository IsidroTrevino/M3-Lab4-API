import { prisma } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
    
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
    
        res.status(200).json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}