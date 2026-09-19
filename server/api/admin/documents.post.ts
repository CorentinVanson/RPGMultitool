import { createError, defineEventHandler, readBody } from 'h3';
import { writeDocument } from '../../utils/database';

interface EditDocument {
  key: string;
  payload: string;
}

// Outil de debug : édite le payload d'un document existant (ou en crée un nouveau).
export default defineEventHandler(async (event) => {
  const body = await readBody<EditDocument>(event);
  if (!body?.key || body.key.length > 200 || typeof body.payload !== 'string' || body.payload.length > 5_000_000) {
    throw createError({ statusCode: 400, statusMessage: 'Document invalide' });
  }

  // Vérifie que le payload est un JSON valide, comme attendu par le reste de l'application.
  try {
    JSON.parse(body.payload);
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Le payload doit être un JSON valide' });
  }

  return writeDocument(body.key, body.payload);
});
