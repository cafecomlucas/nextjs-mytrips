## Configurando o Boilerplate / Limpando o projeto

Pasta do projeto criada através do comando `yarn create next-app`. Configuração feita sem recursos adicionais (TypeScript por ex.), pois a ideia é configurar manualmente.

Alguns arquivos foram removidos/editados para limpar o projeto.

---

## Configurando o TypeScript

Ao criar o arquivo `tsconfig.json` (manualmente ou através do comando `touch tsconfig.json`) e rodar o comando `yarn dev`, os tipos (`@types/node`, `@types/react`) e o próprio `typescript` foram adicionados como dependencias de desenvolvimento. O arquivo `tsconfig.json` foi modificado automaticamente.

Como o projeto é novo e será feito tudo certinho desde o começo, no arquivo `tsconfig.json` o `strict` foi setado como como `true`.

O arquivo de configuração de tipos pro next foi criado (`next-env.d.ts`) - não foi feito o commit por estar na config padrão do `.gitignore`.

O arquivo `index.js` foi alterado para `index.tsx` (ao invés de `ts`, por ser um arquivo jsx e possuir coisas visuais/html - ou seja, não é um arquivo apenas com funcionalidades). Também foi necessário ajustar o arquivo `jsconfig.json`, adicionando a linha `"jsx": "react-jsx"` por conta de erros apontados no index pelo TypeScript - correção: era cache, o arquivo `jsconfig.json` foi removido (a config já está no `tsconfig.json`).

---

## Configurando o .editorconfig

Foi criado o arquivo `.editorconfig` para setar as configurações de indentação, tipos de final de linha, charset, etc. Mesmo com o Prettier configurado depois, é interessante ter o editor config para os novos arquivos já "iniciarem" com a formatação correta, ao invés de começar com uma formatação que pode ser errada pra depois ser corrigida. É bom pra manter o padrão desde o início.

---

## Configurando o ESLint

O ESLint analisa o código enquanto está sendo digitado (variáveis, métodos, hooks), sublinhando os erros quando necessário. Pode ser utilizado com o plugin no VS Code ou sem o plugin (nesse caso é necessário rodar um comando).

O ESLint foi instalado através do comando `npx eslint --init` que executa o binário direto do repositório com as perguntas de configuração.

- Resposta 1: JavaScript
- Resposta 2: To check syntax and find problems
- Resposta 3: JavaScript modules (import/export) (esm)
- Resposta 4: React
- Resposta 5: Yes (TypeScript)
- Resposta 6: Browser
- Resposta 7: js (config file)
- Resposta 8: No (install dependencies with npm)

Sobre a resposta 2, em versões anteriores do eslint existia uma opção "To check syntax, find problems and enforce code style", que não seria selecionada pois a formatação vai ser feita através do Prettier.

Sobre a resposta 8, como o yarn está sendo utilizado, a instalação pelo npm foi cancelada e com a lista da configuração os pacotes foram instalados manualmente com o comando `yarn add --dev ...`.

---

## Configurando o ESLint (adicional)

Alguns plugins e configurações podem ser adicionados durante o projeto, e existem alguns deles que já podem ser configurados no início.

Foi instalado o plugin do React Hooks pro ESLint (`eslint-plugin-react-hooks`), que verifica se os hooks estão sendo utilizados da forma correta, se o useEffect está sendo passado de forma certa, etc.

Na configuração, o plugin pode ser setado direto na prop `extends` ou nas props `plugins` + `rules` para configurações mais específicas. Optamos pela segunda opção. Para definir as regras `rules-of-hooks` e `exhaustive-deps` foi copiado o trecho dessas regras da documentação.

Como o TypeScript vai ser o responsável pela parte de tipos, a regra do propTypes foi desativada.

Como o NextJs possui a variável `React` como global para todos os arquivos, não é necessário importa-la, por isso a regra `react/react-in-jsx-scope` foi desativada.

Como o TypeScript possui a inferência de tipos, não é necessário tipar o retorno de funções exportadas onde o TypeScript já entende qual é o tipo. Por isso a regra `@typescript-eslint/explicit-module-boundary-types` foi desligada. Isso evita que o TypeScript fica verboso. (Ainda continua sendo necessário tipar o retorno quando o TypeScript não conseguir inferir).

Também foi necessário setar a versão do React como `detect` nas configurações para o ESLint conseguir ter um parâmetro antes de verificar os arquivos.

No `package.json` foi adicionado o comando `"lint": "eslint src"` para que o lint seja verificado com o comando `yarn lint` - que verifica se existem erros, se existir - informa os erros, se passar - concluí a verificação com sucesso.

Para verificação automatica ser feita enquanto o código está sendo criado foi instalado o plugin do ESLint no VSCode.

Obs 1: a configuração foi feita no arquivo `eslint.config.mjs` que é a nova maneira. Utilizar o arquivo `.eslintrc` se tornou obsoleto.

Obs 2: as linhas `tseslint.configs.recommended` e `pluginReact.configs.flat.recommended` foram movidas pro topo para poderem ser sobrescritas pela prop `rules`.

---

## Configurando o Prettier

O Prettier funciona como um verificador/formatador do texto digitado, setando regras visuais como espaçamento, tipos de aspas, etc. É diferente do Linter (como o ESLint) que verifica/corrige a qualidade do código (hooks, forma de importação, etc), auxiliando na prevenção de bugs.

Olhando a documentação, foi feita a instalação do Prettier com o comando:

```sh
yarn add --dev --exact prettier
```

Depois foi criado o arquivo `.prettierrc` setando as configurações do Prettier que são fora do padrão. Regras: sem vírgula ao final de um último item (prop `traillingComma`), sem ponto e vírgula ao final de uma linha/comando (prop `semi`) e aspas simples ao invés de aspas duplas (prop `singleQuote`).

É possível executar o Prettier através da linha de comando, através de um plugin do VSCode ou através de um plugin pro ESLint (e mudanças manuais nas configs do VSCode). A configuração feita é para funcionar junto com o ESLint (então não foi necessário instalar o plugin do VSCode).

Para rodar o Prettier como uma regra do ESLint, instalamos os plugins `eslint-config-prettier` e `eslint-plugin-prettier`.

```sh
yarn add --dev eslint-config-prettier eslint-plugin-prettier
```

O plugin `eslint-plugin-prettier` foi adicionado as configurações do ESLint em `eslint.config.mjs`, ele habilita o prettier e ativa o outro plugin (`eslint-config-prettier`). Obs: tentei só com o `eslint-config-prettier` por estar na doc mais atual, mas não funcionou, tive que instalar/importar o `eslint-plugin-prettier`.

Nesse ponto os erros já eram sublinhados no `index.tsc`, mas o arquivo ainda não se auto-corrigia ao salvar.

Por último foi criado o arquivo `.vscode/settings.json`, desativando a formatação padrão do editor (editor.formatOnSave) e ativando a formatação pelo eslint (source.fixAll.eslint).

---

## Configurando Git Hooks

Com os Hooks do Git é possível disparar certos comandos antes de ações importantes (como commit, push, merge) e interromper o fluxo, previnindo erros (de lint, test, etc) na base de código e evitando commits de "fix lint".

Para a configuração do Git Hook é utilizado o Husky e para a configuração dos comandos que serão executados antes do commit (em staged) é utilizado o `lint-staged`.


Para instalar e inicializar o Husky (fonte: doc):

```sh
yarn dev husky
npx husky init
```

Foi criada a pasta `.husky` com um arquivo chamado `pre-commit`, onde vão todos os comandos necessários antes de um commit.

Para instalar o lint-staged (fonte: doc):

```sh
yarn add --dev lint-staged
```

Com o lint-staged adicionado, o script "lint-staged" foi adicionado no `package.json` e no arquivo `pre-commit` do Husky foi adicionada a linha do terminal para executar o script "lint-staged" (com `--no-install` pra não precisar instalar o pacote `lint-staged` toda vez que executar).

Também foi adicionado o parâmetro `--max-warnings=0` ao script "lint" do `package.json` para que "warnings" também interrompam o fluxo.

---

## Configurando o ESLint (ajuste)

A indicação de erros pelo ESLint estava duplicada com a indicação de erros do TypeScript, então foi feito um ajuste no arquivo de configuração (estava faltando importar as configs recomendadas do eslint).

---

## Configurando os testes | Jest

https://nextjs.org/docs/pages/guides/testing/jest

### Pacotes instalados:

Para trabalhar com os testes foi necessário instalar os seguintes pacotes:

***`jest`***: O framework de testes.

***`@types-jest`***: Fornece a tipagem para as variáveis do Jest.

***ts-node***: Dependencia do Jest. Motor de execução TypeScript utilizado pelo Jest para rodar o arquivo de configuração (`jest.config.ts` - no tutorial antigo ainda era `.js`). Segundo os DOCs do jest e do nextjs desse momento, é necessário ter esse pacote instalado no projeto pois não é uma dependência padrão do jest.


### Atualização/Criação de arquivos de configuração

Para definir a configuração do jest foi criado o arquivo `jest.config.ts`, onde foi definido: a ativação da cobertura de testes (`collectCoverage`) e a pasta da cobertura de testes (`collectCoverageFrom`). Obs 1: a config das pastas ignoradas pelo jest (`testPathIgnorePatterns`) não precisou ser criada pois essa versão do Next já configura isso com o `createJestConfig` do pacote `next/jest`. Obs 2: essa configuração poderia ser feita com o comando `yarn create jest`, mas gera um arquivo cheio de comentários, então o arquivo foi feito na mão.

Para não ser necessário fazer a importação das variáveis do Jest em cada arquivo de teste, as variáveis globais do jest: foram adicionadas as configs do eslint (`eslint.config.mjs`). Obs: em versões anteriores do ESLint essa config era setada na prop "env" do arquivo `.eslintrc`.
    
Para os testes rodarem via CLI: o trecho `"test": "jest"` foi adicionado ao `package.json`.

Rodei o comando `yarn test` no terminal, que chamou o jest com sucesso e indicou erro nos testes (pois nenhum teste foi escrito nessa etapa).

### Pacotes não instalados (já vem padrão nessa versão do Next)

No tutorial antigo esses pacotes precisaram ser instalados, mas não foi necessário pois vi que a versão atual do Next já utiliza eles por padrão:

***`next/babel`***: Config padrão do Next para o Babel.

***`next/jest`***: Config padrão do Next para o Jest.

***`@babel/preset-typescript`***: Config padrão do Next para tipagem do Babel.

---

## Configurando os testes | DOM

Feito seguindo o tutorial (antigo) e as docs do Next / Jest / Testing Library.

### Complementos pro Jest:

***`jest-environment-jsdom`***: Biblioteca que simula um ambiente de desenvolvimento do browser (com elementos do DOM). Vinha junto com o Jest em versões antigas (Instalação desse pacote individual necessária a parte a partir do Jest 28+).

***Pra facilitar testes com o Dom:***: Pacote `@testing-library/jest-dom` instalado. Esse pacote possui "matchers" do Jest que facilitam a verificação do Dom. Configuração feita no arquivo `jest.config.ts` pro `jest-dom` ser importado antes de qualquer teste (link pro novo arquivo de Setup `jest-setup.js`). Obs: também foram adicionadas as libs complementares `@testing-library/dom`, `@testing-library/react`.

### Complementos de Lint:
***Para o Jest Dom:***: o pacote `eslint-plugin-jest-dom` foi instalado e adicionado ao arquivo de config `eslint.config.mjs`.

### Complementos de Tipagem:

***Pro React DOM***: O pacote `@types/react-dom` foi instalado (TypeScript entende automaticamente).

***Pro Jest***: O arquivo do TypeScript `tsconfig.json` foi modificado para incluir o arquivo de Setup `jest-setup.ts`.

### Configs adicionais do package.json:

***Testes***: no "test:watch" foi adicionado o monitoramento de arquivos alterados  (`jest --watch`).

### Refs:

[NextJS com Jest](https://nextjs.org/docs/app/guides/testing/jest)

[NextJS com Babel](https://nextjs.org/docs/pages/guides/babel)

[React Testing Library > Cheatsheet](https://github.com/testing-library/react-testing-library/raw/main/other/cheat-sheet.pdf)

---

## Criação do primeiro teste

### Novos arquivos

Arquivo do componente Main (`Main/index.tsx`) criado com uma `<div />` vazia.

Arquivo de teste (`Main/test.tsx`) criado com o teste que espera a renderização do cabeçalho com o texto "react avançado" (letras podem ser maiúsculas ou minúsculas - `/i`).

Após a criação do teste, o cabeçalho foi adicionado no componente Main (princípio do TDD - teste primeiro, código depois).


### Configs adicionais do package.json:

***Hooks***: no "lint-staged" foi adicionado o script de testes, com o parâmetro de interromper a execução no primeiro teste com erro (`jest --bail`).

Obs: No tutorial é adicionado o parâmetro `--findRelatedTests` com o argumento de evitar que os testes executem de novo ao salvar qualquer arquivo (e quebrem), porém, ao checar a doc, não fez sentido utiliza-lo pois é necessário passar nomes de arquivos (e sem isso, executando direto na linha de comando ocorre um erro - `The --findRelatedTests option requires file paths to be specified.`). O que ocorreu comigo foi que ao tentar fazer o commit da config adicional do "lint-staged" acima sem adicionar o arquivo de teste em staged, o jest é executado no contexto do que está em staged, e ocorre o erro (por não existirem testes nesse contexto - ou seja, ao executar `yarn test` direto pelo terminal passa mesmo sem o arquivo de teste em staged).

---

## Testes | Primeiro Snapshot

Os Snapshots servem para fazer uma cópia de como um arquivo fica depois de renderizado. Ao executar um teste, o registro da renderização anterior é comparado a renderização atual. O renderização anterior deve ser igual a renderização atual ou, se uma modificação for mesmo necessária, o Snapshot precisa ser atualiado pra renderização mais recente. Funcionam como uma camada extra para garantir (antes do commit) que as modificações feitas são mesmo necessárias. Obs: na primeira execução do teste o primeiro snapshot é criado automaticamente, para depois poder ser comparado nas próximas execuções.

O comando `yarn test:watch` foi executado para ficar monitorando/testando os arquivos modificados.

No arquivo de teste (`Main/test.tsx`) foi feita a modificação pra testar se o Snapshot está ok.

No componente Main (`Main/index.tsx`) foi feita a alteração do elemento `h1` para `h2`, que foi detectada pelo monitoramento do jest. Ao executar um novo teste foi indicado um erro na linha alterada, dizendo para verificar se as modificações feitas ou atualizar o Snapshot (tecla `u`). Ao atualizar o Snapshot o teste executou de novo automaticamente e passou.

Obs: Nem sempre os Snapshots são necessários. Nesse caso serviu pois a verificação do `heading` é mais genérica, mas em casos onde eu faço verificações mais específicas não preciso criar Snapshots.

### Configs adicionais de Lint

Foi necessário alterar as configs do ESLint (`eslint.config.mjs`) para ignorar os arquivos de Snapshot (`.snap`), pois o hook/lint-staged estava disparando um warning antes de fazer o commit, fazendo a aplicação quebrar e impedindo o commit.

Ao ajustar esse warning, apareceu outro, que foi corrigido em seguida - Foi necessário ajustar o hook no `package.json`, passando pro ESLint o parâmetro `--no-warn-ignored`, para não disparar warnings de arquivos ignorados pelo Lint (que é o caso do `.snap`), assim a aplicação não quebra e o commit pode ser feito.

---

## Estilização | Configurando o Emotion

Como alternativa ao `styled-components` (que está em modo de manutenção), foi utilizado o Emotion, que é bem parecido.

### Instalação

Para instalar o Emotion, foram adicionados alguns pacotes (dependencias normais e não de desenvolvimento):

```sh
yarn add @emotion/cache @emotion/react @emotion/styled
```

### Config do NextJS

Para integrar o Emotion com o Next foi adicionado o parâmetro `emotion: true`, nas opções do compilação do arquivo `next.config.mjs`. Obs: por utilizar o Emotion junto com o Next.js a parte do SSR (processamento do CSS no servidor) já funciona.

Também foi necessário criar o arquivo padrão do Next `pages/_app.tsx` com o código de implementação do Emotion e importação do CSS global.

### Criação do CSS globalSS

Foi criado o arquivo `styles/global.tsx` com o reset padrão do CSS.

### Config do TypeScript

Para integrar o TypeScript ao Emotion foi adicionada a linha `"jsxImportSource": "@emotion/react"` no arquivo `tsconfig.json`.

### Config do Babel

Segundo a DOC do Emotion desse momento não é estritamente necessário configurar o Babel quando se usa o TypeScript - só quando o Babel já existe no projeto e é necessário aplicar alguma regra específica do Babel.

### Configs adicionais do package.json:

***lint-staged***: O comando `--passWithNoTests` precisou ser adicionado pro commit poder acontecer sem erros pois os novos arquivos não possuem testes nesse momento.

### Refs:

[Emotion no NextJS (Emotion DOCs)](https://emotion.sh/docs/ssr#nextjs)

[Config do Emotion com TS - e sem Babel (Emotion DOCs)](https://emotion.sh/docs/typescript#with-the-babel-plugin)

[Exemplo do Emotion no Next (Github)](https://github.com/vercel/next.js/tree/canary/examples/with-emotion)

[Componente '_app' customizado (NextJS DOCs)](https://nextjs.org/docs/pages/building-your-application/routing/custom-app)

---

## Configuração dos caminhos absolutos

Na importação, para não precisar acessar os níveis de pasta com `../../../` a cada nível, foi preciso configurar os caminhos de diretórios absolutos - pra isso foi configurado a importação por caminho absoluto e os aliases (@) dos caminhos no arquivo `ts.config.json`. Os arquivos com importações foram atualizados.

### Ref:

[Set up - Absolute Paths/Path Aliases (NextJS DOCs)](https://nextjs.org/docs/pages/getting-started/installation#set-up-absolute-imports-and-module-path-aliases)

---

## Definindo Meta Tags padrão

Para definir as meta informações padrão foi criado o arquivo padrão do NextJS `pages/_document.tsx` com o título, os ícones e a descrição padrão.

Obs 1: No tutorial, o estilo global foi importado no `_document` por ser uma versão antiga do NextJS com o `styled-components` (e o caso desse repositório é a versão atual do NextJS com o `Emotion`).

Obs 2: a diferença principal entre o `_app` e o `_document` é que o `_app` é renderizado no servidor e no cliente e o `_document` é renderizado apenas no servidor (ao checar o código fonte da página, as meta informações já aparecem pois já foram processadas no servidor). Estilos devem ser importados no `_app` de acordo com a documentação atual do NextJS.

### Ref:

[Componente '_document' customizado (NextJS DOCs)](https://nextjs.org/docs/pages/building-your-application/routing/custom-document)

[Componente '_app'  customizado (NextJS DOCs)](https://nextjs.org/docs/pages/building-your-application/routing/custom-app)

---

## Componente Main | Estilos

Foi criado o arquivo `Main/styles.ts` para os estilos do componente `Main` (que é importado na página inicial). Nesse arquivo foram definidas os estilos via Emotion e as exportações dos componentes.

No componente `components/Main.tsx` os componentes foram importados e editados - definindo os títulos, textos, imagens e alt das imagens (pra acessibilidade).

Por convenção a importação do Emotion foi feita via `* as S`, assim batendo o olho todos os componentes com `<S.` no início já são identificados como componentes que tem estilização (ex: `<S.Title>`).

Ao rodar o teste (via `yarn test:watch`) ocorreu um erro por diferença no Snapshot e como a atualização era mesmo pra acontecer o Snapshot foi atualizado (tecla `u`).

Obs: Foi necessário fazer um ajuste no CSS global pra cor de fundo preencher toda a altura (`height: 100%`).

---

## Componente Main | Exemplo de teste no CSS

É possível verificar se os estilos foram aplicados via teste com o Jest - para isso o arquivo `Main/test.tsx` foi modificado. Foi adicionado um novo it/expect com o método `toHaveStyle` pra confirmar a cor de fundo do componente `S.Wrapper`.

É possível verificar vários estilos - nesse caso foi um exemplo. Esse tipo de teste se enquadra melhor em outros casos, por exemplo: o efeito `:hover` ou `:focus` de algum campo/botão/etc.

---

## Testes | Configuração de exibição do CSS nos Snapshots

O CSS nos Snapshots mostrava apenas classes com nomes estranhos e não as props do CSS que foram alteradas, por isso foi necessário configurar um pacote do Emotion pra fazer a integração do Jest com o Emotion e a separação do CSS.


Com essa integração configurada todos os estilos são importados pro Snapshot e podem ser conferidos antes do commit. O Snapshot fica um pouco maior, mas fica muito mais informativo, melhorando a atenção para alterações de estilos.

Obs: Vale lembrar que os Snapshots não são utilizados em tudo, somente onde faz mais sentido utilizá-lo.

---

## PWA | Configuração dos recursos de aplicativo local

É possível configurar a aplicação para ter acesso a recursos de um aplicativo local (como notificações, acesso offline, etc) para facilitar esse processo foi adicionado o pacote `next-pwa` (baseado no pacote `workbook` do Google), que gera boa parte da configuração:

```sh
yarn add next-pwa
```

Depois foi criado o arquivo `manifest.json` padrão com os ícones e informações do aplicativo - que foram importados no cabeçalho da aplicação (`_document.tsx`).

Para integrar o `next-pwa` com o `nextJS` o arquivo `next.config.js` foi alterado para importar e utilizar o `next-pwa`. Obs 1: Também foi configurado para gerar o pacote apenas no ambiente de produção e pra isso foi necessário configurar as variáveis globais do node no ESLint (arquivo `eslint.config.mjs`). Obs 2: No tutorial a importação é feita com `require` e `module.exports` (CommonJS - jeito antigo), mas consegui fazer com o `import` e `export default` (ES Modules - jeito moderno).

Feito isso já seria possível gerar os arquivos de produção:

```sh
yarn build
```

Mas ocorreram erros com a definição de tipos do `minimatch`, utilizado internamente pelo `next-pwa` - isso foi confirmado removendo o `next-pwa` (que depois foi adicionado de novo). Ao pesquisar sobre o erro foi possível [encontrar um jeito de contorna-lo](https://github.com/strapi/strapi/issues/23859#issuecomment-3031795231) criando no `package.json` a config `resolutions` com versões específicas do `minimatch` e do `@types/minimatch`. Ao fazer as alterações foi possível rodar o `yarn build`.

Após gerar o build de produção foi possível subir o mesmo:

```sh
yarn start
```

Ao acessar o localhost, um ícone de "Instalar aplicativo" já aparece na barra de endereços do navegador. Obs: Em versões antigas do DevTools / aba "Lighthouse" também era possível ver um ícone de `PWA`, atualmente é possível ver as configs da aplicação na aba "Application" > "manifest.json", que mostra o nome, os ícones, as funcionalidades, etc.

No arquivo `.gitignore` foram adicionados os arquivos gerados automaticamente pelo `next-pwa` na geração de uma build.

### Sobre o pacote pra config do PWA

O [next-pwa](https://github.com/shadowwalker/next-pwa) foi utilizado por conta do tutorial e até então não está claro se ele vai ser utilizado em alguma outra parte. Após pesquisas vi que já existe uma alternativa chamada [Serwist](https://serwist.pages.dev/). Essa alternativa moderna pode ser atualizada no boilerplate futuramente.

### Refs / Pesquisas

[Contornando o erro do minimatch (comentário)](https://github.com/strapi/strapi/issues/23859#issuecomment-3031795231)

[Página do Serwist (site)](https://serwist.pages.dev/)

[Página do Serwist (github)](https://github.com/serwist/serwist)

---

## Finalização do boilerplate

O boilerplate foi finalizado e está disponível no repositório [cafecomlucas/nextjs-boilerplate](https://github.com/cafecomlucas/nextjs-boilerplate).

---

## Inicialização do projeto

Criando um novo projeto do NextJS utilizando o boilerplate:

```sh
yarn create next-app -e https://github.com/cafecomlucas/nextjs-boilerplate
```

Foi feita uma limpeza no texto do componente `Main` e em arquivos do projeto (`styles.ts`, `test.tsx`, `test.tsx.snap` foram removidos). O título e a descrição do projeto foram atualizados (em `_document.tsx` e em `manifest.json`).

Para validar se o projeto está subindo (tudo certo):

```sh
yarn dev
```

Subindo as alterações (primeiro commit):

```sh
git branch -M main
git add .
git commit -m "Inicialização do projeto"
git remote add origin git@github.com:cafecomlucas/nextjs-mytrips.git
git push -u origin main
```

Obs: No tutorial foi removido o storybook, que estava sendo utilizado para outro tutorial, mas nesse projeto ele não foi instalado e já não existia.

---

## CSS | Propriedades customizadas - variáveis

Como vão existir cores e tamanhos padrões nesse projeto isso pode ser configurado utilizando variáveis do próprio CSS pra isso.

No arquivo `global.tsx` as variáveis CSS foram definidas e algumas estilizações padrão já foram aplicadas nas tags `body`, `p` e `a`.

Obs: Uma alternativa poderia ser o [`<ThemeProvider>` do styled-components](https://styled-components.com/docs/advanced) (se essa fosse a lib utilizada nesse projeto), mas utilizar as variáveis nativas do CSS pode ser feita sem depender da lib. 

### Refs:

[Variáveis CSS (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)

[Tema com Styled Components](https://styled-components.com/docs/advanced#theming)

[Tema com Emotion](https://emotion.sh/docs/theming)

---

## Adicionando mapas interativos

Para exibir mapas interativos foi utilizada a biblioteca [Leaflet](https://leafletjs.com/examples/quick-start/) junto com a biblioteca [React Leaftlet](https://react-leaflet.js.org/docs/start-installation/#using-a-package-registry) que abstrai o Leaflet para o uso de componentes. Para instalar as bibliotecas:

```sh
yarn add leaflet react-leaflet
```

Obs: As libs `react` e `react-dom` são mencionadas na DOC, mas já estão nesse projeto e não foi necessário instala-las.

No arquivo `_document.tsx` foi adicionado o CSS necessário (indicado na [documentação do Leaftlet]((https://leafletjs.com/examples/quick-start/))).

### Complementos de Tipagem:

Para o ambiente de desenvolvimento foi adicionada a tipagem do Leaflet:

```sh
 yarn add -D @types/leaflet
```

### Componente Map | Componente com código de exemplo

Foi criado o componente `Map` com o [código de exemplo](https://react-leaflet.js.org/docs/start-setup/)
) do React Leaflet. O componente `Map` foi importado na página inicial (`pages/index.tsx`).

Ao rodar o projeto ocorreu o erro "window is not defined" pois o Leaflet utiliza o objeto `window`do browser - em seguida é feito o ajuste para o mapa funcionar corretamente.

### Refs: 
[Instalação - Leaflet (DOCs)](https://leafletjs.com/examples/quick-start/)

[Instalação - React Leaflet (DOCs)](https://react-leaflet.js.org/docs/start-installation/#using-a-package-registry)

[Setup - Código de exemplo (React Leaflet DOCs)](https://react-leaflet.js.org/docs/start-setup/)

---

### Componente Map | Ajuste na importação do mapa (Dynamic Imports)

Para corrigir o erro "window is not defined" e o mapa abrir corretamente, na página inicial (`pages/index.tsx`) foi utilizado o [Dynamic Imports](https://nextjs.org/docs/pages/guides/lazy-loading#with-no-ssr) do Next com a config `ssr: false` - dessa forma o trecho do componente `Map` não tenta carregar no servidor e só é carregado no lado do cliente (no browser - onde o objeto `window` existe).

No componente `Map` foi adicionada a estilização de `width`/`height` pro mapa poder aparecer. Além disso o zoom do mapa com scroll foi ativado setando o atrubuto do Leaftlet `scrollWheelZoom` para `true`.

[Dynamic Imports (NextJS DOCs)](https://nextjs.org/docs/pages/guides/lazy-loading#with-no-ssr)

---