# 📝 To-Do List Orientado a Testes (TDD)

Um gerenciador de tarefas simples na superfície, mas construído com uma arquitetura moderna e robusta por baixo dos panos. Este projeto foi desenvolvido inteiramente utilizando a metodologia **Test-Driven Development (TDD)**, garantindo confiabilidade, acessibilidade e um código limpo desde o primeiro commit.

## 🚀 O Projeto

O objetivo principal deste projeto não foi apenas criar uma lista de tarefas, mas sim aplicar conceitos avançados de Engenharia de Software no ecossistema do React. Cada funcionalidade foi precedida por um teste automatizado, moldando a interface através do comportamento esperado e focado na experiência do usuário e na acessibilidade.

### ✨ Funcionalidades

- **Adição de Tarefas:** Interface fluida para adicionar novos itens à lista.
- **Validação de Dados:** Bloqueio de submissões vazias com feedback visual imediato para o usuário.
- **Persistência Local:** Utilização do `localStorage` do navegador para não perder os dados ao recarregar a página.
- **Acessibilidade (a11y):** Elementos semânticos e labels corretamente atrelados, testados via papéis de acessibilidade (roles).

## 🛠️ Tecnologias e Ferramentas

- **React + Vite:** Fundação rápida e otimizada.
- **TypeScript:** Tipagem estática para maior segurança no desenvolvimento.
- **TailwindCSS v4:** Estilização utilitária focada em hierarquia visual e design limpo.
- **React Hook Form + Zod:** Gerenciamento de formulário não-controlado (performance) e validação rigorosa de _schema_.
- **Vitest + React Testing Library (RTL):** Motor de testes ultrarrápido rodando o "navegador virtual" (JSDOM) no terminal.

## 🧠 Destaques de Arquitetura

Como o foco foi nas boas práticas, alguns padrões de projeto foram implementados:

1. **Acessibilidade como Contrato de Teste:** Todos os testes de interface utilizam `getByRole` e nomes acessíveis em vez de IDs ou classes. Se a tela não for acessível para um leitor de tela, o teste falha.
2. **Lazy Initialization:** O estado inicial das tarefas utiliza uma função anônima no `useState` (`() => JSON.parse(...)`) para evitar leituras desnecessárias ao disco do navegador durante as re-renderizações, poupando processamento.
3. **Ciclo TDD (Red, Green, Refactor):** O Zod e o Tailwind só foram implementados _após_ os testes de falha estrutural provarem a necessidade da refatoração.

## 📦 Como rodar localmente

Certifique-se de ter o Node.js instalado na sua máquina. Abra o terminal e execute os comandos abaixo sequencialmente:

```bash
# 1. Clone este repositório
git clone [https://github.com/SEU_USUARIO/nome-do-repositorio.git](https://github.com/SEU_USUARIO/nome-do-repositorio.git)

# 2. Entre na pasta do projeto
cd nome-do-repositorio

# 3. Instale as dependências
npm install

# 4. Rode a aplicação em modo de desenvolvimento
npm run dev
```

## 🧪 Como rodar os testes

A suíte de testes automatizados cobre a renderização inicial, a validação de campos vazios, o salvamento de múltiplas tarefas e a persistência na memória.

Para rodar os testes e assistir às modificações em tempo real, utilize o comando:

```bash
npx vitest
```