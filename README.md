# Projeto > Mural Virtual > Frontend

> :heavy_exclamation_mark: **OBS**: Este repositório contempla a penas o Frontend, para execução deste faz-se necessário que o backend esteja instalado e rodando.


## Índice

[Sobre o projeto](#sobre) | [Deploy da Aplicação](#deploy) | [Funcionalidades](#func) | [Layout](#layout) | [Organização](#organizacao) | [Pré-Requisitos](#prerequisitos) | [Instalação](#instalacao) | [Config Gitflow](#configgitflow) | [Tecnologias](#tecnologias) | [Ferramentas](#ferramentas) | [Contribuidores](#contribuidores)


## :computer: Sobre o projeto <a name="sobre"></a>
O projeto **Mural Virtual** é uma aplicação de autoria dos alunos do curso de Análise e Desenvolvimento de sistemas do Instituto Federal do Piauí - Campus Picos.

Esse projeto foi criado como partes das disciplinas de **Engenharia de software**, **Programação Web I e II** e agora está sendo utilizado e mantido na disciplinas de projeto **integrador I e II** dos professores **Jesiel Viana e João Paulo**.

A sua principal função é permitir a criação de noticias sobre o campus e reunir tais notícias em um só lugar, para acesso de todos.

## Deploy da aplicação <a name="deploy"></a>
**A aplicação já está no ar no seguinte link:**

:pushpin: [Aplicação Mural Virtual](https://mural-virtual.netlify.app/)


## :paperclip: Funcionalidades <a name="func"></a>

### :closed_lock_with_key: Autenticação
- [x] Cadastro
- [x] Login
- [x] Logout
- [ ] Recuperação de senha **(Em updates futuros)**
- [x] Validação dos campos de login e senha 

### :pushpin: Postagem
- [x] Criação
- [x] Atualização
- [x] Exclusão

### :heavy_check_mark: Usabilidade
- [x] Painel administrativo 
- [x] Barra de pesquisa de postagens 
- [x] Filtragem de postagens por categoria 



## :art: Layout <a name="layout"></a>

## :lock: Login 

![Login_](https://user-images.githubusercontent.com/53342708/146420785-0454c9e6-c878-43e3-b835-86b1dd4a913c.gif)


## :unlock: Logout
![Logout](https://user-images.githubusercontent.com/53342708/146420787-88598e32-5e4f-4fcf-b773-61ab0f2f8f87.gif)



## :busts_in_silhouette: Cadastro Usuário
![Cadastro-Usuário](https://user-images.githubusercontent.com/53342708/137373926-83bf73b9-69e2-4a97-ac7c-f37a304f5b4a.gif)


## :pencil:  Cadastro de Postagem
![Criação_Postagem](https://user-images.githubusercontent.com/53342708/146420791-87513bd1-e67b-499c-80bc-00048e5b2ebc.gif)

## :mag_right: Filtragem e Pesquisa de Postagens
![Filtro_de_Noticia](https://user-images.githubusercontent.com/53342708/146420723-a3c3338d-8789-4f4e-917a-fb30d743a0da.gif)


## :ballot_box_with_check: Atualizar Postagem
![Atualização_de_Postagem](https://user-images.githubusercontent.com/53342708/146420793-33b25854-2a27-4f6a-b026-914c3722215a.gif)


## :negative_squared_cross_mark: Deletar Postagem
![Exlusão_de_Postagem](https://user-images.githubusercontent.com/53342708/146420789-31df35fb-12fa-4503-a2db-aaf8bba591e7.gif)



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

**Caso ele não retorne nada, faça a instalação para seu respectivo sistema operacional:**

<a href="https://github.com/petervanderdoes/gitflow-avh/wiki/Installing-on-Windows)
[Linux](https://github.com/petervanderdoes/gitflow-avh/wiki/Installing-on-Linux,-Unix,-etc.)
[Mac Os X](https://github.com/petervanderdoes/gitflow-avh/wiki/Installing-on-Mac-OS-X)Linux,-Unix,-etc"> <img height="35" alt="windows-instaltion"  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg"/><a/>  

<a href="https://github.com/petervanderdoes/gitflow-avh/wiki/Installing-on-Windows"> <img height="40" alt="Linux-instalation" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"/><a/>

<a href="https://github.com/petervanderdoes/gitflow-avh/wiki/Installing-on-Mac-OS-X"> <img height="40" alt="Mac-instalation" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"/><a/>



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
>esse comando serve para criar toda a estrutura e configurações sem que precise confirmar nada.

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


## 👨‍💻 Integrantes que contribuiram ao longo do projeto <a name="contribuidores"></a>
<table>
</tr>
  <tr>
    <td align="center"><a href="https://github.com/jacksonPrimo"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/53311794?v=4" width="100px;" alt="jackson-github"/><br /><sub><b>Jackson Aquino</b></sub></a><br /><a href="https://github.com/jacksonPrimo" title="jackson-github">:octocat:</a></td>
    <td align="center"><a href="https://github.com/samudebug"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/34324655?v=4" width="100px;" alt=""/><br /><sub><b>Samuel Martins</b></sub></a><br /><a href="https://github.com/samudebug" title="Samuel-github">:octocat:</a></td>
    <td align="center"><a href="https://github.com/Caioleto10"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/52712306?v=4" width="100px;" alt=""/><br /><sub><b>Caio Leto</b></sub></a><br /><a href="https://github.com/Caioleto10" title="Caio-github">:octocat:</a></td>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/57494565?v=4" width="100px;" alt=""/><br /><sub><b>Raquel Cadete</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">:octocat:</a></td>
    <td align="center"><a href="https://github.com/daniellamarques"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/86430405?v=4" width="100px;" alt=""/><br /><sub><b>Daniela Marques</b></sub></a><br /><a href="https://github.com/daniellamarques" title="daniela-github">:octocat:</a></td>
     <td align="center"><a href="https://github.com/Lukas00-gif"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62776762?v=4" width="100px;" alt=""/><br /><sub><b>Lukas Sousa</b></sub></a><br /><a href="https://github.com/Lukas00-gif" title="Lucas-github">:octocat:</a></td>
  </tr>
</table>

