import { defineEventHandler } from 'h3';
import { listDocuments } from '../../utils/database';

// Outil de debug : liste tous les documents stockés en base (clé, version, payload).
export default defineEventHandler(async () => {
  return listDocuments();
});
