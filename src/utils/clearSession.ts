import { PrismaClient } from '@prisma/client';
import { DataBaseError } from './errors';
const db = new PrismaClient();
export default async function clearSession(sessionId: string): Promise<void> {
  try {
    await db.session.delete({
      where: {
        id: sessionId,
      },
    });
  } catch (e) {
    throw new DataBaseError('Error fetching session data');
  }
}
