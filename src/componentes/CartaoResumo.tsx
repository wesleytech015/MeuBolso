import { StyleSheet, Text, View } from 'react-native';

interface PropriedadesCartaoResumo {
  titulo: string;
  valor: number;
}

export function CartaoResumo({ titulo, valor }: PropriedadesCartaoResumo) {
  const valorFormatado = valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <View style={styles.cartao}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.valor}>{valorFormatado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    marginBottom: 12,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  titulo: {
    marginBottom: 8,
    color: '#64748B',
    fontSize: 14,
  },
  valor: {
    color: '#172B4D',
    fontSize: 22,
    fontWeight: '700',
  },
});