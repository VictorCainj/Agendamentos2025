export type ScheduleType = 'orcamento' | 'reparo';

export interface Schedule {
  id: string;
  clienteNome: string;
  endereco: string;
  servico: string;
  valor: number;
  valorPago?: number;
  tipo: ScheduleType;
  observacoes?: string;
  status: 'aberto' | 'finalizado';
  dataAgendamento: string; // ISO
} 