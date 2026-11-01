import { StatusBar } from 'expo-status-bar';
import { ProvedorContextoFinanceiro } from './src/contextos/ContextoFinanceiro';
import { NavegacaoPrincipal } from './src/navegacao/NavegacaoPrincipal';

export default function App() {
  return (
    <ProvedorContextoFinanceiro>
      <NavegacaoPrincipal />
      <StatusBar style="auto" />
    </ProvedorContextoFinanceiro>
  );
}
