# 🎮 Word Termo Master - Edição Ultimate

> Uma recriação moderna, expandida e visualmente refinada do clássico jogo de palavras, inspirada no **Termo** e **Wordle**.

![Versão](https://img.shields.io/badge/version-3.5-blue)
![Status](https://img.shields.io/badge/status-concluído-success)
![Tecnologia](https://img.shields.io/badge/tech-HTML5%20%7C%20CSS3%20%7C%20JS-yellow)

## 📖 Sobre o Projeto

O **Word Master** é um jogo de raciocínio lógico onde o objetivo é descobrir palavras ocultas de 5 letras. Diferente das versões tradicionais, esta edição traz uma interface moderna com efeito **Glassmorphism**, paleta de cores **Azul Noturno (Dark Mode)** e suporte nativo para múltiplos modos de jogo simultâneos.

O projeto foi desenvolvido utilizando apenas tecnologias web nativas (Vanilla JS), garantindo leveza e compatibilidade total sem dependência de frameworks.

---

## ✨ Funcionalidades Principais

* **3 Modos de Jogo:**
    * **Solo (Termo):** Descubra 1 palavra em 6 tentativas.
    * **Dueto:** Jogue em 2 tabuleiros simultâneos com 7 tentativas.
    * **Quarteto:** O desafio supremo com 4 tabuleiros e 9 tentativas.
* **Banco de Palavras Rico:** Centenas de palavras categorizadas (Animais, Comida, Países, Corpo, Objetos, etc.).
* **Estatísticas Completas:**
    * Contagem de jogos e vitórias.
    * Cálculo de % de sucesso.
    * Sequência de vitórias (Streak) atual e recorde.
    * Gráfico de distribuição de tentativas.
* **Interface Premium:**
    * Design responsivo (Mobile First).
    * Animações fluídas (Flip de letras, Shake de erro, Pop de digitação).
    * Efeito de vidro (Blur) nos menus.
    * Sombras 3D e feedback tátil visual.
* **Configurações de Acessibilidade:**
    * **Alto Contraste:** Modo especial com cores Laranja e Azul para melhor visibilidade.
* **Persistência de Dados:** Todo o progresso e preferências são salvos automaticamente no navegador do usuário.

---

## 🎨 Visual e Design

O jogo foge do padrão "marrom" clássico, adotando uma identidade visual **Cyber/Modern**:

* **Fundo:** Degradê suave de *Midnight Blue* (`#0f172a` a `#1e293b`).
* **Elementos:** Bordas arredondadas e sombras projetadas para profundidade (Skeuomorphism leve).
* **Cores de Feedback:**
    * 🟩 **Verde (Correct):** Letra certa na posição certa.
    * 🟨 **Amarelo (Present):** Letra existe, mas em outra posição.
    * 🟦 **Cinza/Azulado (Absent):** Letra não existe na palavra.

---

## 🚀 Como Executar

Não é necessária nenhuma instalação complexa (npm, node, etc). O jogo é estático.

1.  **Baixe os arquivos** do projeto.
2.  Certifique-se de que os 4 arquivos estão na mesma pasta:
    * `index.html`
    * `style.css`
    * `script.js`
    * `words.js`
3.  **Abra o arquivo `index.html`** em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

---

## 📂 Estrutura do Projeto

`text
/
├── index.html      # Estrutura semântica, modais e layout base
├── style.css       # Estilos, animações, responsividade e tema dark
├── script.js       # Lógica do jogo, controle de estado e eventos
└── words.js        # Banco de dados de palavras categorizadas`

---

## 🎮 Controles

Teclado Físico: Digite as letras e use Enter para confirmar ou Backspace para apagar.

Teclado Virtual: Clique nas teclas na tela (funciona em touchscreens).

Menu Superior: Alterne entre os modos Solo, Dueto e Quarteto.

Ícones:

?: Como jogar.

📊: Estatísticas.

⚙️: Configurações (Alto Contraste).

## 🤝 Créditos e Inspiração

Este projeto foi desenvolvido por IA e orientação por Patrick Gonçalves como um exercício de domínio de HTML5, CSS3 e Javascript Moderno.

*Inspiração Original: Wordle (Josh Wardle / NYT).*

*Inspiração Brasileira: Termo (Fernando Serboncini).*

Desenvolvimento: Criado com auxílio de IA para estruturação lógica e refino de interface.
