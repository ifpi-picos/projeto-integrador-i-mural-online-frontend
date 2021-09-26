# Projeto > Mural Virtual

> :heavy_exclamation_mark: **OBS**: Este repositório contempla a penas o Frontend, para execução deste faz-se necessário que o backend esteja instalado e rodando.

## Índice
[Sobre o projeto](#sobre) | [Funcionalidades](#func) | [Layout](#layout) | [Organização](#organizacao) | [Pré-Requisitos](#prerequisitos) | [Instalação](#instalacao) | [Config Gitflow](#configgitflow) | [Tecnologias](#tecnologias) | [Ferramentas](#ferramentas) | [Deploy da Aplicação](#deploy)

## :computer: Sobre o projeto <a name="sobre"></a>
O projeto **Mural Virtual** é uma aplicação de autoria dos alunos do curso de Análise e Desenvolvimento de sistemas do Instituto Federal do Piauí - Campus Picos.

Esse projeto foi criado como partes das disciplinas de Engenharia de software, Programação Web I e II e agora está sendo utilizado e mantido na disciplina de projeto integrador I.

A sua principal função é permitir a criação de noticias sobre o campus e reunir tais noticiais em um só lugar, para acesso de todos.

## :paperclip: Funcionalidades <a name="func"></a>

### :closed_lock_with_key: Autenticação
- [x] Cadastro
- [x] Login
- [x] Logout
- [ ] Recuperação de senha **(Em updates futuros)**
- [ ] Validação dos campos de login e senha **(Em updates futuros)**

### :pushpin: Postagem
- [x] Criação
- [x] Atualização
- [x] Deleção

### :heavy_check_mark: Usabilidade
- [ ] Painel administrativo **(Em updates futuros)**
- [ ] Barra de pesquisa de postagens **(Em updates futuros)**
- [ ] Filtragem de notícias por categoria **(Em updates futuros)**

## :art: Layout <a name="layout"></a>

### Tela principal da aplicação
[![Captura-de-tela-de-2021-09-07-15-25-52.png](https://i.postimg.cc/0NbLcDYL/Captura-de-tela-de-2021-09-07-15-25-52.png)](https://postimg.cc/QBZ4MBnb)


### Tela de Cadastro
[![cadastro.png](https://i.postimg.cc/jjZGhvn6/cadastro.png)](https://postimg.cc/HJ8ZYw2j)


### Tela de Login
[![login.png](https://i.postimg.cc/Jn7Hf7nV/login.png)](https://postimg.cc/f3FbXNmB)


### Tela de postagens
[![Captura-de-tela-de-2021-09-18-16-58-06.png](https://i.postimg.cc/dtJQnNLp/Captura-de-tela-de-2021-09-18-16-58-06.png)](https://postimg.cc/s10RgcP4)


### Tela de cadastro de postagens
[![Captura-de-tela-de-2021-09-18-16-58-47.png](https://i.postimg.cc/15WSBmxV/Captura-de-tela-de-2021-09-18-16-58-47.png)](https://postimg.cc/BX1RQGnJ)


### Tela de atualização de postagem
[![Captura-de-tela-de-2021-09-18-16-59-35.png](https://i.postimg.cc/V6cc2kWf/Captura-de-tela-de-2021-09-18-16-59-35.png)](https://postimg.cc/2qTJZmtM)



## :triangular_ruler: Organização <a name="organizacao"></a>
**Este projeto se divide em dois módulos:**
- **Frontend** (Este repositório)
- **Backend** [Repositório Backend: Mural Virtual](https://github.com/ifpi-picos/projeto-integrador-i-mural-online-backend)

## :clipboard: Pré-requisitos <a name="prerequisitos"></a>
Os requísitos básicos para execução da aplicação são: ter instalado em sua maquina o [Git](https://git-scm.com/), [Nodejs](https://nodejs.org/en/) e um editor de código [VSCode](https://code.visualstudio.com/download).

> **Nota:** Para rodar essa aplicação(Frontend) é necessario que o servidor da mesma esteja instalado e rodando.

> **Observação:** Baixe o repositório do backend que se encontra neste
link: [Repositório Backend: Mural Virtual](https://github.com/ifpi-picos/projeto-integrador-i-mural-online-backend), e faça as configuraçoes necessárias.



## :hammer:  Instalação <a name="instalacao"></a>

### Comece a instalação clonando este repositório:
```
$ git clone https://github.com/ifpi-picos/projeto-integrador-i-mural-online-frontend.git
```

### Após o clone acesse a pasta do projeto no seu terminal linux:
```
$ cd projeto-integrador-i-mural-online-frontend
```

### Instale as dependências do Projeto:
```
$ npm installl
```

### Execute a aplicação:
```
$ npm run serve
```
> a aplicação vai está rodando em: ```http://localhost:8080/```

## Configuração Gitflow <a name="configgitflow"></a>
### Sobre o Gitflow
o gitflow é um framework que foi criado para trabalhar junto com o git, ele irá nos auxiliar no desenvolvimento organizando o fluxo desenvolvimento do codigo fonte.

## Instalação do Gitflow 
### Verificando se o gitflow já está instalado em sua maquina:
```
git flow version
```

**Caso ele não retorne nada, faça a instalação:**
[Windows](https://github.com/petervanderdoes/gitflow-avh/wiki/Installing-on-Windows)
[Linux](https://github.com/petervanderdoes/gitflow-avh/wiki/Installing-on-Linux,-Unix,-etc.)
[Mac Os X](https://github.com/petervanderdoes/gitflow-avh/wiki/Installing-on-Mac-OS-X)

**Observação:** Para usuários do fedora v31 e superior, o suporte ao gitlow foi descontinuado pelo repositório official, mas foi recontinuado pelo **Fedora Corp** para instalar acesse:
[elegos / gitflow](https://copr.fedorainfracloud.org/coprs/elegos/gitflow/), caso queira ir direto rode os seguintes comandos no seu terminal linux:

### Habilite o repositório:
```
sudo dnf copr enable elegos/gitflow
```
### Finalmente instale o Gitflow:
```
sudo dnf install gitflow
```
## Começando com gitflow
### Após a instalação, rode o seguinte comando:
```
git flow init -d
```
esse comando serve para criar toda a estrutura e configurações sem que precise confirmar nada.

**Dica:**
>Use sempre a branch **developer** nela está todas as ultimas atualizações feitas.


## :wrench: Tecnologias usadas no Front <a name="tecnologias"></a>
- [Vue](https://vuejs.org/v2/guide/installation.html)
- [Axios](https://www.npmjs.com/package/axios)
- [bootstrap-vue](https://bootstrap-vue.org/)
- [vue-router](https://router.vuejs.org/)
- [vuex](https://vuex.vuejs.org/)
- [Core-js](https://www.npmjs.com/package/core-js)

## :straight_ruler: Ferramentas de auxilio <a name="ferramentas"></a>
- **Editor:** [VSCode](https://code.visualstudio.com/download)
- **Editor de Markdown:** [StackEditor](https://stackedit.io)
- **Teste de API:** [Insomnia](https://insomnia.rest/download)
- **Ícones:** [Font Awesome](https://fontawesome.com)


## Deploy da aplicação <a name="deploy"></a>
A aplicação já está no ar no seguinte link:

:pushpin: [Aplicação Mural Virtual](https://mural-virtual.netlify.app/)


[![Work in Repl.it](https://classroom.github.com/assets/work-in-replit-14baed9a392b3a25080506f3b7b6d57f295ec2978f6f33ec97e36a161684cbe9.svg)](https://classroom.github.com/online_ide?assignment_repo_id=432758&assignment_repo_type=GroupAssignmentRepo)
