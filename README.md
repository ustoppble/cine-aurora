# Cine Aurora

Site de apresentação do **Cine Aurora**, um cinema boutique fictício — sala única, curadoria autoral e um café anexo. Página única e estática, sem build e sem dependências: apenas HTML, CSS e um pouco de JavaScript.

## O que tem aqui

- Hero com imagem em tela cheia e texto composto em código por cima da mídia
- Programação em cartaz com os pôsteres dos filmes
- A sala, o Café Aurora, preços dos ingressos
- Horários, localização e o botão de reserva

## Como rodar localmente

Clone o repositório e abra o `index.html` direto no navegador:

```bash
git clone https://github.com/ustoppble/cine-aurora.git
cd cine-aurora
open index.html   # no Linux: xdg-open index.html
```

Se preferir servir por HTTP (recomendado para conferir o carregamento das imagens do jeito que o navegador faz em produção):

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Versão publicada

O site está no ar via GitHub Pages: **https://ustoppble.github.io/cine-aurora/**

## Estrutura

```
index.html    marcação da página
style.css     estilos, tokens e animações
script.js     interações e efeitos de scroll
assets/       imagens (hero, pôsteres, sala, café)
```
