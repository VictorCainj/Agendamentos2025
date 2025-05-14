import { Request, Response } from 'express';
import { supabase } from '../supabase/client';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
  if (authError || !authData.user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  // Buscar perfil
  let { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, email, name, type')
    .eq('id', authData.user.id)
    .single();
  if (profileError || !profile) {
    // Se não existe, criar perfil padrão
    const { data: newProfile, error: newProfileError } = await supabase
      .from('profiles')
      .insert([{ id: authData.user.id, email, name: email, type: 'prestador' }])
      .select('id, email, name, type')
      .single();
    if (newProfileError || !newProfile) {
      return res.status(401).json({ message: 'Perfil não encontrado e não foi possível criar.' });
    }
    profile = newProfile;
  }
  // Retornar token de sessão do Supabase e dados do usuário
  res.json({
    token: authData.session?.access_token,
    user: {
      id: profile.id,
      type: profile.type,
      name: profile.name,
      email: profile.email,
    },
  });
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name, type } = req.body;
  if (!email || !password || !name || !type) {
    return res.status(400).json({ message: 'Dados obrigatórios faltando.' });
  }
  // Criar usuário no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
  if (authError || !authData.user) {
    return res.status(400).json({ message: authError?.message || 'Erro ao criar usuário' });
  }
  // Salvar perfil
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([{ id: authData.user.id, email, name, type }]);
  if (profileError) {
    return res.status(400).json({ message: profileError.message });
  }
  res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
}; 