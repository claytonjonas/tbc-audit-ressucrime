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
## Uso

Abra o site e arraste um ou mais combat logs `.txt` para a área de upload.

Os eventos de `SPELL_RESURRECT` são analisados no navegador e apresentados em:
- total de ressurreições;
- ranking de curadores;
- distribuição por skill/classe;
- jogadores mais ressuscitados;
- linha do tempo;
- tabela completa com filtros e busca.
