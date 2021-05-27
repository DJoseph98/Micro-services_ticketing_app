import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// promise la lib non primised
const scryptAsync = promisify(scrypt);

export class Password {
  //static permet d'accéder aux fonctions sans instancier l'objet
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buffer.toString('hex') === hashedPassword;
  }
}
