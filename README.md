## Preparação para Publicação

O projeto foi configurado para distribuição utilizando Expo Application Services (EAS).

### Android

- Package: `com.wesleytech015.meubolso`
- Versão: `1.0.0`
- Build de produção gerado em formato `.aab`
- Assinatura realizada com Android Keystore gerenciado pelo EAS
- Validação final: Expo Doctor 20/20

### iOS

- Bundle Identifier: `com.wesleytech015.meubolso`
- Build Number: `1`
- Fluxo de publicação preparado para App Store Connect

### Build

O build Android de produção foi gerado com:

`eas build --platform android --profile production`

O arquivo `.aab` é o artefato utilizado para submissão na Google Play Store.