import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useContextoFinanceiro } from '../contextos/ContextoFinanceiro';

import type { TipoMovimentacao } from '../tipos/Movimentacao';



export function TelaNovaMovimentacao() {

     const { adicionarMovimentacao } = useContextoFinanceiro();

  const [descricao, setDescricao] = useState('');

  
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState<TipoMovimentacao>('despesa');

 function salvarMovimentacao() {
    if (!descricao.trim()) {
      Alert.alert('Atenção', 'Informe a descrição.');
      return;
    }

    const valorDigitado = valor.trim();

    // Aceita exemplos como 25, 25,90 ou 25.90.
    if (!/^\d+([.,]\d{1,2})?$/.test(valorDigitado)) {
      Alert.alert(
        'Atenção',
        'Informe um valor válido, como 25,90, sem separador de milhar.',
      );
      return;
    }

    const valorNumerico = Number(valorDigitado.replace(',', '.'));

    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Atenção', 'O valor deve ser maior que zero.');
      return;
    }

    if (!categoria.trim()) {
      Alert.alert('Atenção', 'Informe a categoria.');
      return;
    }

   adicionarMovimentacao({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
  descricao: descricao.trim(),
  valor: valorNumerico,
  tipo,
  categoria: categoria.trim(),
  data: new Date().toISOString(),
});

setDescricao('');
setValor('');
setCategoria('');
setTipo('despesa');

Alert.alert('Sucesso', 'Movimentação adicionada.');

  }

  return (
    <ScrollView
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.rotulo}>Descrição</Text>
      <TextInput
        style={styles.campo}
        placeholder="Ex.: compra no mercado"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.rotulo}>Valor (R$)</Text>
      <TextInput
        style={styles.campo}
        placeholder="Ex.: 25,90"
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={setValor}
      />

      <Text style={styles.rotulo}>Categoria</Text>
      <TextInput
        style={styles.campo}
        placeholder="Ex.: alimentação"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Text style={styles.rotulo}>Tipo</Text>
      <View style={styles.tipos}>
        {(['receita', 'despesa'] as const).map((opcao) => (
          <Pressable
            key={opcao}
            accessibilityRole="button"
            accessibilityState={{ selected: tipo === opcao }}
            onPress={() => setTipo(opcao)}
            style={[
              styles.opcao,
              tipo === opcao && styles.opcaoSelecionada,
            ]}
          >
            <Text style={styles.textoOpcao}>
              {opcao === 'receita' ? 'Receita' : 'Despesa'}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        style={styles.botao}
        onPress={salvarMovimentacao}
      >
        <Text style={styles.textoBotao}>Salvar movimentação</Text>
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
  rotulo: {
    marginBottom: 8,
    color: '#172B4D',
    fontSize: 16,
    fontWeight: '600',
  },
  campo: {
    marginBottom: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    color: '#172B4D',
    fontSize: 16,
  },
  tipos: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  opcao: {
    flex: 1,
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  opcaoSelecionada: {
    borderColor: '#2563EB',
    backgroundColor: '#DBEAFE',
  },
  textoOpcao: {
    color: '#172B4D',
    fontWeight: '600',
  },
  botao: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#2563EB',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});



