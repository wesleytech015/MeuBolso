import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartaoResumo } from '../componentes/CartaoResumo';
import { useContextoFinanceiro } from '../contextos/ContextoFinanceiro';
import type { ParametrosNavegacaoPrincipal } from '../navegacao/NavegacaoPrincipal';

type PropriedadesTelaInicio = NativeStackScreenProps<
  ParametrosNavegacaoPrincipal,
  'Inicio'
>;

export function TelaInicio({ navigation }: PropriedadesTelaInicio) {
  const { saldo, totalReceitas, totalDespesas } = useContextoFinanceiro();

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>MeuBolso</Text>

      <CartaoResumo titulo="Saldo Atual" valor={saldo} />
      <CartaoResumo titulo="Receitas" valor={totalReceitas} />
      <CartaoResumo titulo="Despesas" valor={totalDespesas} />

      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate('NovaMovimentacao')}
        style={styles.botao}
      >
        <Text style={styles.textoBotao}>Nova Movimentação</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate('Movimentacoes')}
        style={[styles.botao, styles.botaoSecundario]}
      >
        <Text style={[styles.textoBotao, styles.textoBotaoSecundario]}>
          Ver Movimentações
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#F5F7FA',
  },
  titulo: {
    marginBottom: 24,
    color: '#172B4D',
    fontSize: 28,
    fontWeight: '700',
  },
  botao: {
    alignItems: 'center',
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#2563EB',
  },
  botaoSecundario: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textoBotaoSecundario: {
    color: '#2563EB',
  },
});