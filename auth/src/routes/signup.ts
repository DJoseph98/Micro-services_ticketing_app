import express, { Request, Response } from 'express';
import { validateRequest } from '@djticketsudemy/common';
import { BadRequestError } from '@djticketsudemy/common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { signupSchema } from '../validations/req-user-validation';
const router = express.Router();

router.post(
  '/api/users/signup',
  validateRequest(signupSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      //throw new BadRequestError('User already exist');
      throw new Error('test')
      //return res.status(400).send({ message: 'User already exist' });
    }

    const user = User.build({ email, password });

    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY! // signifie à TS que c'est déjà setter autre part
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
