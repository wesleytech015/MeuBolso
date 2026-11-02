import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TelaNovaMovimentacao } from '../telas/TelaNovaMovimentacao';
import { TelaInicio } from '../telas/TelaInicio';

export type ParametrosNavegacaoPrincipal = {
  Inicio: undefined;
  NovaMovimentacao: undefined;
  Movimentacoes: undefined;
};

const Pilha = createNativeStackNavigator<ParametrosNavegacaoPrincipal>();

function TelaTemporaria(): null {
  return null;
}

export function NavegacaoPrincipal() {
  return (
    <NavigationContainer>
      <Pilha.Navigator initialRouteName="Inicio">
        <Pilha.Screen
          name="Inicio"
          component={TelaInicio}
          options={{ headerShown: false }}
        />
        <Pilha.Screen
  name="NovaMovimentacao"
  component={TelaNovaMovimentacao}
  options={{ title: 'Nova Movimentação' }}
/>
        <Pilha.Screen
          name="Movimentacoes"
          component={TelaTemporaria}
          options={{ title: 'Movimentações' }}
        />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}