# Pokédex Vue

Pokédex moderna feita com Vue 3, TypeScript, Vite, Axios e PokéAPI.

## Requisitos

- Node.js compatível com a versão atual do Vite (recomendado Node 22.12+).
- npm.

## Como executar

```bash
npm install
npm run dev
```

Abra no navegador o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Verificar e compilar

```bash
npm run type-check
npm run build
npm run preview
```

## Estrutura

- `src/components`: componentes visuais reutilizáveis.
- `src/composables/usePokemon.ts`: estado, busca e navegação.
- `src/services/pokeapi.ts`: cliente Axios e transformação da resposta da API.
- `src/types/pokemon.ts`: tipos TypeScript.
- `src/assets/styles/main.css`: estilos globais e visual responsivo.
- `public/images` e `public/sounds`: recursos locais opcionais do projeto antigo.

## Reaproveitar recursos antigos

Copie as imagens para `public/images/` e os sons para `public/sounds/`. Os caminhos públicos são usados como `/images/nome-do-arquivo.png` e `/sounds/nome-do-arquivo.mp3`. Atualize os nomes nos componentes se forem diferentes.

A aplicação consulta a PokéAPI pública, portanto precisa de conexão com a internet para pesquisar Pokémon.
