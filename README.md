# 📱 My Places | CMS + Mapa interativo

Aplicação Front-End + BFF com geração de mapa a partir de dados cadastrados em um CMS. 

- Para gerar as páginas internas/urls estáticas (SSG) e marcadores do mapa/pins são feitas requisições para uma API GraphQL do CMS em "build time" do lado do servidor (node.js). 

- Para gerar os desenhos do mapa são feitas requisições para uma API REST em "run time" do lado do cliente (browser). O mapa possui estilização customizada (via Mapbox) e é interativo. 

- Utiliza a abordagem Jamstack, com o site gerado via NextJS e o conteúdo gerenciado via HyGraph (Headless CMS).

https://rawcdn.githack.com/cafecomlucas/my-places/20a03ab911b6e399d5351740c375f58e29b8f4b3/.github/my-places.mp4

\_

---

## 🛠️ Acesso online

- [my-places.cafecomlucas.dev](https://my-places.cafecomlucas.dev)

\_

---

## 🛠️ Acesso local

Instalação das dependências:

```sh
yarn 
```

Subir o projeto localmente:

```sh
yarn dev
```
