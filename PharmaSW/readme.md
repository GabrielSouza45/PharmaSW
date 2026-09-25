# 🐳 Executando a Aplicação com Docker

Guia prático para realizar o **build**, **execução** e **gerenciamento** da aplicação Spring Boot utilizando containers Docker.

---

## 📌 Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes recursos instalados na sua máquina:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ou Docker Engine via CLI)
* Terminal de comando (Bash, PowerShell, Zsh, etc.)

---

## 🚀 Passo a Passo para Execução

### 1. Construir a Imagem (`build`)

Rode o comando abaixo no diretório raiz do projeto para que o Docker processe o `Dockerfile`, compile a aplicação Spring Boot e crie a imagem:

```bash
docker build -t minha-aplicacao-pos:1.0 .
```

> **💡 Entendendo os parâmetros:**
> * `-t minha-aplicacao-pos:1.0`: Define o nome (*tag*) da sua imagem no formato `nome:versão`.
> * `.`: Indica que o `Dockerfile` e os arquivos do contexto de build estão no diretório atual.

---

### 2. Executar o Container (`run`)

Assim que o build for concluído com sucesso, inicie o container executando:

```bash
docker run -d -p 8080:8080 --name app-pos minha-aplicacao-pos:1.0
```

#### 🛠️ Explicação das Opções

| Opção | Descrição |
| :--- | :--- |
| `-d` (*detached*) | Roda o container em segundo plano, liberando o terminal para novos comandos. |
| `-p 8080:8080` | Mapeia a porta `8080` do **Host** (sua máquina) para a porta `8080` do **Container**. |
| `--name app-pos` | Atribui um nome customizado ao container para facilitar o gerenciamento. |

---

### 3. Testar e Acompanhar

#### 🌐 Acessar a Aplicação
Abra o seu navegador ou cliente HTTP (Postman/Insomnia) e acesse:
* **URL Base:** `http://localhost:8080`
* **Exemplo de Endpoint:** `http://localhost:8080/api/...`

#### 📜 Verificar Logs em Tempo Real
Para visualizar os logs do Spring Boot subindo diretamente no seu terminal:

```bash
docker logs -f app-pos
```

#### 🖥️ Acompanhamento via Docker Desktop
1. Abra o **Docker Desktop** e vá até a aba **Containers**.
2. Localize o container `app-pos` (um indicador verde sinalizará que ele está em execução).
3. Ao clicar no container, você poderá inspecionar logs, verificar métricas de CPU/Memória e controlar o ciclo de vida da aplicação com cliques simples.

---

## 🛑 Gerenciamento do Container

Para interromper ou remover a aplicação após o uso, utilize os comandos abaixo:

```bash
# Interromper a execução do container
docker stop app-pos

# Remover o container
docker rm app-pos
```

---

<p align="center">
  <sub>Desenvolvido para facilitar a implantação local com Docker 🚀</sub>
</p>