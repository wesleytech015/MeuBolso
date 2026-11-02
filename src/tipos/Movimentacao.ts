
export type TipoMovimentacao = 'receita' | 'despesa';

export interface MovimentacaoFinanceira {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoMovimentacao;
  categoria: string;
  data: string;
}
