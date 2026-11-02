import { FlatList, StyleSheet, Text } from 'react-native';

import { ItemMovimentacao } from '../componentes/ItemMovimentacao';
import { useContextoFinanceiro } from '../contextos/ContextoFinanceiro';

export function TelaMovimentacoes() {
  const { movimentacoes } = useContextoFinanceiro();
  

  return (
    <FlatList
      style={styles.tela}
      contentContainerStyle={styles.conteudo}
      data={[...movimentacoes].reverse()}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemMovimentacao movimentacao={item} />
      )}
      ListEmptyComponent={
        <Text style={styles.mensagem}>
          Nenhuma movimentação cadastrada.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  conteudo: {
    flexGrow: 1,
    padding: 24,
  },
  mensagem: {
    marginTop: 32,
    textAlign: 'center',
    color: '#64748B',
    fontSize: 16,
  },
});