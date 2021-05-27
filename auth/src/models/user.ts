import mongoose from 'mongoose';
import { Password } from '../utils/password';

interface UserAttrs {
  email: string;
  password: string;
}

//Describe properties Model User has for TS
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//Describe properties User document has for TS
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  //oveeride la fonction Javascript qui permet de créer un json
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//Ajoute une fonction au User Model
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// middleware mongoose avant de sauvegarder le document
userSchema.pre('save', async function (done) {
  //check si password is modified (work on first time too)
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
