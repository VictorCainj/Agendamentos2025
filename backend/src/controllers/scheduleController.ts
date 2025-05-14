import { Request, Response } from 'express';
import { Schedule } from '../models/Schedule';
import { supabase } from '../supabase/client';

export const getOpenSchedules = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('agendamentos')
    .select('*')
    .eq('status', 'aberto')
    .order('dataAgendamento', { ascending: false });
  if (error) return res.status(500).json({ message: error.message });
  res.json({ total: data?.length || 0, agendamentos: data || [] });
};

export const createSchedule = async (req: Request, res: Response) => {
  const { clienteNome, endereco, servico, valor, valorPago, tipo, observacoes, dataAgendamento } = req.body;
  if (!clienteNome || !endereco || !servico || valor === undefined || !tipo || !dataAgendamento) {
    console.error('Dados obrigatórios faltando:', req.body);
    return res.status(400).json({ message: 'Dados obrigatórios faltando.' });
  }
  try {
    const { data, error } = await supabase
      .from('agendamentos')
      .insert([{ clienteNome, endereco, servico, valor, valorPago, tipo, observacoes, status: 'aberto', dataAgendamento }])
      .select()
      .single();
    if (error) {
      console.error('Erro Supabase ao criar agendamento:', error);
      return res.status(500).json({ message: error.message });
    }
    res.status(201).json(data);
  } catch (err) {
    console.error('Erro inesperado ao criar agendamento:', err);
    res.status(500).json({ message: 'Erro inesperado ao criar agendamento.' });
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { clienteNome, endereco, servico, valor, valorPago, tipo, observacoes, dataAgendamento, status } = req.body;
  const { data, error } = await supabase
    .from('agendamentos')
    .update({ clienteNome, endereco, servico, valor, valorPago, tipo, observacoes, dataAgendamento, status })
    .eq('id', id)
    .select()
    .single();
  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
};

export const deleteSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('agendamentos')
    .delete()
    .eq('id', id);
  if (error) return res.status(500).json({ message: error.message });
  res.status(204).send();
};

export const finalizarSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('agendamentos')
    .update({ status: 'concluido' })
    .eq('id', id)
    .select()
    .single();
  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
};

export const getAllSchedules = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('agendamentos')
    .select('*')
    .order('dataAgendamento', { ascending: false });
  if (error) return res.status(500).json({ message: error.message });
  res.json({ total: data?.length || 0, agendamentos: data || [] });
}; 