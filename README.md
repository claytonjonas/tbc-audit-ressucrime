# Rezz Log

Dashboard web para analisar ressurreições (`SPELL_RESURRECT`) em combat logs do World of Warcraft.

## Projeto

Aplicação 100% estática e client-side:
- HTML/CSS/JavaScript puro
- Chart.js via CDN
- Nenhum backend
- Nenhum build
- Os combat logs são processados localmente no navegador

## Estrutura

```text
wow-resurrect-dashboard/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── parser.js
│   └── app.js
├── .gitignore
└── README.md
```

## Publicar no GitHub Pages

1. Suba todos os arquivos para a raiz do repositório.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
4. Clique em **Save**.

Não é necessário criar Environment ou configurar Node/npm.

A página ficará disponível em:

```text
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
```

## Uso

Abra o site e arraste um ou mais combat logs `.txt` para a área de upload.

Os eventos de `SPELL_RESURRECT` são analisados no navegador e apresentados em:
- total de ressurreições;
- ranking de curadores;
- distribuição por skill/classe;
- jogadores mais ressuscitados;
- linha do tempo;
- tabela completa com filtros e busca.

## Desenvolvimento local

Você pode servir o projeto com Python:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Observação

O `index.html` usa caminhos relativos (`css/style.css`, `js/parser.js` e `js/app.js`), portanto funciona normalmente em uma subpasta do GitHub Pages.
