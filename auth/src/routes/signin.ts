import express, { Request, Response } from 'express';
import { signinSchema } from '../validations/req-user-validation';
import { validateRequest } from '@djticketsudemy/common';
import { User } from '../models/user';
import { BadRequestError } from '@djticketsudemy/common';
import jwt from 'jsonwebtoken';
import { Password } from '../utils/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  validateRequest(signinSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
      //return res.status(400).send({ message: 'Invalid Credentials' });
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY! // signifie à TS que c'est déjà setter autre part
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
