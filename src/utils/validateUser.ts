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
    //TODO: unhash password and compare
    //TODO: throw InvlidCredetials error on error
    if (userData.hash == payload.password) {
      return userData.id;
    } else {
      return false;
    }
  } catch (e) {
    console.log('verrifying user error: ', e);
    return false;
  }
}
