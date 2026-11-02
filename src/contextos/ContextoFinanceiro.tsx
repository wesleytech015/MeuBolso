import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

import {
  carregarMovimentacoes,
  salvarMovimentacoes,
} from '../servicos/ServicoArmazenamento';
import type { MovimentacaoFinanceira } from '../tipos/Movimentacao';

interface DadosContextoFinanceiro {
  movimentacoes: MovimentacaoFinanceira[];
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  adicionarMovimentacao: (
    movimentacao: MovimentacaoFinanceira,
  ) => Promise<void>;
}

const ContextoFinanceiro = createContext<
  DadosContextoFinanceiro | undefined
>(undefined);

interface ProvedorContextoFinanceiroProps {
  children: ReactNode;
}

export function ProvedorContextoFinanceiro({
  children,
}: ProvedorContextoFinanceiroProps) {
  const [movimentacoes, setMovimentacoes] = useState<
    MovimentacaoFinanceira[]
  >([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  const listaAtual = useRef<MovimentacaoFinanceira[]>([]);
  const gravando = useRef(false);

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      setCarregando(true);
      setErroCarregamento(false);

      try {
        const dados = await carregarMovimentacoes();

        if (ativo) {
          listaAtual.current = dados;
          setMovimentacoes(dados);
        }
      } catch {
        if (ativo) {
          setErroCarregamento(true);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    void carregarDados();

    return () => {
      ativo = false;
    };
  }, [tentativa]);

  async function adicionarMovimentacao(
    movimentacao: MovimentacaoFinanceira,
  ): Promise<void> {
    if (gravando.current) {
      throw new Error('Aguarde a gravação atual.');
    }

    gravando.current = true;

    try {
      const novasMovimentacoes = [
        ...listaAtual.current,
        movimentacao,
      ];

      await salvarMovimentacoes(novasMovimentacoes);

      listaAtual.current = novasMovimentacoes;
      setMovimentacoes(novasMovimentacoes);
    } finally {
      gravando.current = false;
    }
  }

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

  if (carregando || erroCarregamento) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
          gap: 16,
        }}
      >
        {carregando ? (
          <>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text>Carregando movimentações...</Text>
          </>
        ) : (
          <>
            <Text>Não foi possível carregar as movimentações.</Text>
            <Button
              title="Tentar novamente"
              onPress={() => setTentativa((atual) => atual + 1)}
            />
          </>
        )}
      </View>
    );
  }

  return (
    <ContextoFinanceiro.Provider
      value={{
        movimentacoes,
        totalReceitas: totais.totalReceitas,
        totalDespesas: totais.totalDespesas,
        saldo: totais.totalReceitas - totais.totalDespesas,
        adicionarMovimentacao,
      }}
    >
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