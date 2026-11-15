import AsyncStorage from '@react-native-async-storage/async-storage';

import type { MovimentacaoFinanceira } from '../tipos/Movimentacao';

const CHAVE_MOVIMENTACOES = '@meubolso:movimentacoes:v1';

function ehMovimentacaoValida(
  dado: unknown,
): dado is MovimentacaoFinanceira {
  if (typeof dado !== 'object' || dado === null) {
    return false;
  }

  const item = dado as Record<string, unknown>;

  return (
    typeof item.id === 'string' &&
    typeof item.descricao === 'string' &&
    typeof item.valor === 'number' &&
    Number.isFinite(item.valor) &&
    item.valor > 0 &&
    (item.tipo === 'receita' || item.tipo === 'despesa') &&
    typeof item.categoria === 'string' &&
    typeof item.data === 'string' &&
    !Number.isNaN(Date.parse(item.data))
  );
}

export async function salvarMovimentacoes(
  movimentacoes: MovimentacaoFinanceira[],
): Promise<void> {
  const dados = JSON.stringify(movimentacoes);

  await AsyncStorage.setItem(CHAVE_MOVIMENTACOES, dados);
}

export async function carregarMovimentacoes(): Promise<
  MovimentacaoFinanceira[]
> {
  const dados = await AsyncStorage.getItem(CHAVE_MOVIMENTACOES);

  if (dados === null) {
    return [];
  }

  const movimentacoes: unknown = JSON.parse(dados);

  if (
    !Array.isArray(movimentacoes) ||
    !movimentacoes.every(ehMovimentacaoValida)
  ) {
    throw new Error('Os dados de movimentações salvos são inválidos.');
  }

  return movimentacoes;
}