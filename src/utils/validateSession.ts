import { PrismaClient } from '@prisma/client';
import { DataBaseError } from './errors';
const db = new PrismaClient();
export default async function validateSession(
  sessionId: string
): Promise<boolean> {
  try {
    const session = await db.session.findFirst({
      where: {
        id: sessionId,
      },
    });
    if (session) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new DataBaseError('Error fetching session data');
  }
}
