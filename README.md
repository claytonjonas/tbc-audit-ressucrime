# Rezz Log

Painel web para importar combat logs do World of Warcraft e visualizar todas
as ressurreições (`SPELL_RESURRECT`) organizadas: quem curou, quem foi trazido
de volta, com qual skill, e quando.

Funciona com qualquer spell de ressurreição — Redemption, Rebirth, Ancestral
Spirit, Resurrection, Mass Resurrection, etc. — sem precisar editar código,
porque o parser lê o nome da spell direto do log.

**100% estático e client-side.** Não tem backend, não tem build step, e o
combat log nunca sai do navegador do usuário — tudo é lido e processado
localmente com `FileReader` + JavaScript puro.

## Estrutura do projeto

```
wow-resurrect-dashboard/
├── index.html          # página única do dashboard
├── css/
│   └── style.css        # estilos (tema dark, inspirado na UI do próprio WoW)
├── js/
│   ├── parser.js         # parser do combat log -> lista de eventos
│   └── app.js             # upload, agregação, gráficos, tabela
└── README.md
```

## Rodar localmente

Não precisa de `npm install` nem build. Basta servir os arquivos estáticos:

```bash
# opção 1: Python
python3 -m http.server 8000

# opção 2: Node (se tiver o pacote `serve` instalado)
npx serve .
```

Depois abra `http://localhost:8000` no navegador.

> Abrir o `index.html` direto com duplo-clique (`file://`) também funciona
> na maioria dos navegadores, já que não há chamadas de servidor.

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser público ou privado, mas o
   GitHub Pages gratuito exige repositório público — ou GitHub Pro/Team para
   privado).
2. Suba os arquivos deste projeto para a raiz do repositório:

   ```bash
   git init
   git add .
   git commit -m "Rezz Log dashboard"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```

3. No GitHub, vá em **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
5. Em **Branch**, escolha `main` e a pasta `/ (root)`, depois clique **Save**.
6. Aguarde 1–2 minutos. O site ficará disponível em:

   ```
   https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
   ```

Qualquer novo `git push` para `main` atualiza o site automaticamente.

## Como usar

1. Abra o site.
2. Arraste o(s) arquivo(s) `.txt` do combat log para a área de upload (ou
   clique para escolher). Dá para importar vários arquivos de uma vez —
   útil para juntar várias sessões de raid num só painel.
3. O dashboard mostra:
   - **Cards de resumo**: total de ressurreições, curadores distintos, quem
     mais curou, quem mais "morreu".
   - **Gráfico por curador**: ranking de quem mais ressuscitou.
   - **Gráfico por skill/classe**: distribuição entre Redemption, Rebirth,
     Ancestral Spirit, Resurrection etc., coloridas com as cores reais das
     classes do WoW.
   - **Ranking de alvos**: quem mais precisou ser trazido de volta.
   - **Linha do tempo**: ressurreições por minuto ao longo da sessão.
   - **Tabela completa**: todos os eventos, com busca por nome, filtro por
     skill e ordenação por coluna.
4. Botão **Limpar** no topo reseta e volta pra tela de upload.

## Adicionar novas skills de ressurreição

O parser já captura qualquer `SPELL_RESURRECT`, então spells novas aparecem
automaticamente. Para colorir uma spell nova pela classe correta (em vez do
cinza padrão "Outra"), edite o mapa em `js/parser.js`:

```js
const SPELL_CLASS_MAP = {
  'Resurrection':      { class: 'Sacerdote', token: 'priest'  },
  'Redemption':        { class: 'Paladino',  token: 'paladin' },
  'Ancestral Spirit':  { class: 'Xamã',       token: 'shaman'  },
  'Rebirth':           { class: 'Druida',    token: 'druid'   },
  // adicione aqui, ex:
  // 'Soulstone Resurrection': { class: 'Bruxo', token: 'warlock' },
};
```

Se adicionar um `token` novo, defina também a cor dele em `CLASS_COLORS` no
topo de `js/app.js`.

## Tecnologias

- HTML/CSS/JS puro (sem framework, sem build)
- [Chart.js](https://www.chartjs.org/) via CDN, para os gráficos
- Fontes: Cinzel (títulos), Inter (corpo), JetBrains Mono (dados numéricos)
