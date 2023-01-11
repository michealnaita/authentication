import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
export default async function validateUser(payload: {
  email: string;
  password: string;
}): Promise<string | false> {
  try {
    const userData: {
      id: string;
      hash: string;
    } = await db.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    const result = await bcrypt.compare(payload.password, userData.hash);

    if (userData && result) {
      return userData.id;
    } else {
      throw new Error('Invalid user credentials');
    }
  } catch (e) {
    console.log('verrifying user error: ', e);
    return false;
  }
}
