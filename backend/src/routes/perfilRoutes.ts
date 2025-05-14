import { Router } from 'express';
import { supabase } from '../supabase/client';

const router = Router();

router.put('/', async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) return res.status(400).json({ message: 'Dados obrigatórios faltando.' });
  const { error } = await supabase.from('profiles').update({ name }).eq('id', id);
  if (error) return res.status(500).json({ message: error.message });
  res.json({ message: 'Nome atualizado!' });
});

export default router; 