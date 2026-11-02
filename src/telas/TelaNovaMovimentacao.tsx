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

const CATEGORIAS_POR_TIPO: Record<TipoMovimentacao, string[]> = {
  receita: ['Salário', 'Freelance', 'Venda', 'Investimento', 'Outros'],
  despesa: [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Lazer',
    'Saúde',
    'Educação',
    'Contas',
    'Outros',
  ],
};



export function TelaNovaMovimentacao() {

     const { adicionarMovimentacao } = useContextoFinanceiro();

  const [descricao, setDescricao] = useState('');
  const [salvando, setSalvando] = useState(false);
  
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState<TipoMovimentacao>('despesa');
  const [listaAberta, setListaAberta] = useState(false);
  const categoriasDisponiveis = CATEGORIAS_POR_TIPO[tipo];

  function alterarTipo(novoTipo: TipoMovimentacao) {
    if (novoTipo !== tipo) {
      setTipo(novoTipo);
      setCategoria('');
      setListaAberta(false);
    }
  }

 async function salvarMovimentacao() {
  if (salvando) {
    return;
  }

  if (!descricao.trim()) {
    Alert.alert('Atenção', 'Informe a descrição.');
    return;
  }

  const valorDigitado = valor.trim();

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

  if (!categoriasDisponiveis.includes(categoria)) {
    Alert.alert('Atenção', 'Escolha uma categoria.');
    return;
  }

  setSalvando(true);

  try {
    await adicionarMovimentacao({
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
    setListaAberta(false);
    setTipo('despesa');

    Alert.alert('Sucesso', 'Movimentação salva.');
  } catch {
    Alert.alert(
      'Erro ao salvar',
      'Não foi possível salvar a movimentação. Tente novamente.',
    );
  } finally {
    setSalvando(false);
  }


  }

  return (
    <ScrollView
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.rotulo}>Descrição</Text>
      <TextInput
        style={styles.campo}
        placeholder={tipo === 'receita' ? 'Ex.: pagamento de freelance' : 'Ex.: compra no mercado'}
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

      <Text style={styles.rotulo}>Tipo</Text>
      <View style={styles.tipos}>
        {(['receita', 'despesa'] as const).map((opcao) => (
          <Pressable
            key={opcao}
            accessibilityRole="button"
            accessibilityState={{ selected: tipo === opcao }}
            onPress={() => alterarTipo(opcao)}
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

      <Text style={styles.rotulo}>Categoria</Text>
      <View style={styles.seletor}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Categoria: ${categoria || 'Escolha uma categoria'}`}
          accessibilityState={{ expanded: listaAberta }}
          onPress={() => setListaAberta(aberta => !aberta)}
          style={styles.linhaSeletor}
        >
          <Text style={styles.textoOpcao}>{categoria || 'Escolha uma categoria'}</Text>
          <Text>{listaAberta ? '▴' : '▾'}</Text>
        </Pressable>
        {listaAberta && categoriasDisponiveis.map(opcao => (
          <Pressable
            key={opcao}
            accessibilityRole="button"
            accessibilityState={{ selected: categoria === opcao }}
            style={[styles.linhaCategoria, categoria === opcao && styles.opcaoSelecionada]}
            onPress={() => {
              setCategoria(opcao);
              setListaAberta(false);
            }}
          >
            <Text style={styles.textoOpcao}>{opcao}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
  disabled={salvando}
  style={[styles.botao, salvando && { opacity: 0.6 }]}
  onPress={salvarMovimentacao}
>
  <Text style={styles.textoBotao}>
    {salvando ? 'Salvando...' : 'Salvar movimentação'}
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
  seletor: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  linhaSeletor: {
    minHeight: 48,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linhaCategoria: {
    minHeight: 48,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#CBD5E1',
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



