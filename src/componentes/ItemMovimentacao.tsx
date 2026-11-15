import { StyleSheet, Text, View } from 'react-native';

import type { MovimentacaoFinanceira } from '../tipos/Movimentacao';

interface PropriedadesItemMovimentacao {
  movimentacao: MovimentacaoFinanceira;
}

export function ItemMovimentacao({
  movimentacao,
}: PropriedadesItemMovimentacao) {
  const receita = movimentacao.tipo === 'receita';

  const valorFormatado = movimentacao.valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const dataFormatada = new Date(movimentacao.data).toLocaleDateString('pt-BR');

  return (
    <View style={styles.cartao}>
      <Text style={styles.descricao}>{movimentacao.descricao}</Text>

      <Text style={styles.detalhes}>
        {movimentacao.categoria} · {dataFormatada}
      </Text>

      <Text style={[styles.valor, receita ? styles.receita : styles.despesa]}>
        {receita ? 'Receita' : 'Despesa'}: {valorFormatado}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  descricao: {
    color: '#172B4D',
    fontSize: 18,
    fontWeight: '600',
  },
  detalhes: {
    marginTop: 6,
    color: '#64748B',
    fontSize: 14,
  },
  valor: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  receita: {
    color: '#15803D',
  },
  despesa: {
    color: '#B91C1C',
  },
});