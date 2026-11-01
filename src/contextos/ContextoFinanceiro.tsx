import { createContext, useContext, useState, type ReactNode } from 'react';

export type TipoMovimentacao = 'receita' | 'despesa';

export interface MovimentacaoFinanceira {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoMovimentacao;
  categoria: string;
  data: string;
}

interface DadosContextoFinanceiro {
  movimentacoes: MovimentacaoFinanceira[];
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  adicionarMovimentacao: (movimentacao: MovimentacaoFinanceira) => void;
}

const ContextoFinanceiro = createContext<DadosContextoFinanceiro | undefined>(
  undefined,
);

interface ProvedorContextoFinanceiroProps {
  children: ReactNode;
}

export function ProvedorContextoFinanceiro({
  children,
}: ProvedorContextoFinanceiroProps) {
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoFinanceira[]>(
    [],
  );

  const totais = movimentacoes.reduce(
    (resultado, movimentacao) => {
      if (movimentacao.tipo === 'receita') {
        resultado.totalReceitas += movimentacao.valor;
      } else {
        resultado.totalDespesas += movimentacao.valor;
      }

      return resultado;
    },
    { totalReceitas: 0, totalDespesas: 0 },
  );

  const dadosContexto: DadosContextoFinanceiro = {
    movimentacoes,
    totalReceitas: totais.totalReceitas,
    totalDespesas: totais.totalDespesas,
    saldo: totais.totalReceitas - totais.totalDespesas,
    adicionarMovimentacao: (movimentacao) => {
      setMovimentacoes((atuais) => [...atuais, movimentacao]);
    },
  };

  return (
    <ContextoFinanceiro.Provider value={dadosContexto}>
      {children}
    </ContextoFinanceiro.Provider>
  );
}

export function useContextoFinanceiro() {
  const contexto = useContext(ContextoFinanceiro);

  if (!contexto) {
    throw new Error(
      'useContextoFinanceiro deve ser usado dentro de ProvedorContextoFinanceiro.',
    );
  }

  return contexto;
}