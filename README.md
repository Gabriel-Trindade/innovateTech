# Desenvolvimento de Aplicativo para a InnovateTech

## Descrição do Projeto

A InnovateTech, uma empresa líder em tecnologia educacional, está empenhada em um projeto inovador em colaboração com sua comunidade de educadores para simplificar a gestão e visualização das informações dos alunos de forma intuitiva em uma aplicação móvel. O objetivo principal deste projeto é desenvolver um aplicativo que consumirá a API da randomuser e irá exibir informações importantes para o usuário.

## Requisitos

- Tela de carregamento com a logo da InnovateTech
- Listagem dos alunos com o limite de 20 alunos por carregamento
- Ao chegar no final da listagem carregar mais 20 alunos
- Ao clicar em algum dos alunos deve abrir um modal detalhando as informações desse aluno com:
  - Imagem
  - Nome completo
  - Email
  - Gênero
  - Data de nascimento
  - Telefone
  - Nacionalidade
  - Endereço
  - ID (Número de identificação)

## Extras

Além do desafio proposto com as duas telas, temos alguns diferenciais:

- **Diferencial 1:** Adicionar um filtro por Gênero na tabela;
- **Diferencial 2:** Após o primeiro load dos dados guardar as informações em um cache interno do celular, se o app for aberto novamente puxar os dados do cache e não da API.

## Notas

Todos os requisitos básicos do projeto foram construídos, tentei fazer de modo mais simples porém detalhada para bom entendimento do código, que inclusive, está comentado com todas as funções e os tipos de dados que as funções recebem.
Deixei de fora o diferencial 3 pois senti que utilizar gerenciadores de estado para uma aplicação simples, seria um trabalho desnecessário.

## Testado

Realizei os testes tanto em um emulador Android Pixel 7, quanto em um Iphone 14. Todas as funcionalidades funcionando nos dois dispositivos.

## Como Instalar e Rodar o Projeto

Clone o projeto, dentro da pasta do projeto, rode o comando `npm install`, após instalar as dependências, rode `npx expo start`.

Caso haja algum problema com a incialização, veja o passo a passo de como instalar os componentes necessários para rodar o expo no seu computador em: [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)
