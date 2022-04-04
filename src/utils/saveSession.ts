import { PrismaClient } from '@prisma/client';
import { v4 as uuidV4 } from 'uuid';
const db = new PrismaClient();
// TODO: throw database error on error
export default async function (userId: string): Promise<string | false> {
  try {
    const session: { id: string } = await db.session.create({
      data: {
        id: uuidV4(),
        user_id: userId,
      },
    });
    return session.id;
  } catch (e) {
    console.log('createing session error: ', e);
    return false;
  }
}
