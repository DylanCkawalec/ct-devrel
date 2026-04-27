# CoreThink Strategy

Static strategy plan (no backend). Numbers live in `data/*.json`.

## Clone, start, view

`run.sh` and `package.json` live in **this** folder (`corethink-strategy-os`). If you are in a parent directory (e.g. `corethink`), run `cd corethink-strategy-os` first.

```bash
git clone https://github.com/DylanCkawalec/ct-devrel.git
cd ct-devrel                    # or: cd corethink/corethink-strategy-os
chmod +x run.sh                 # once, if needed
./run.sh
```

That installs dependencies, checks your setup, then starts the dev server (Node 20+ required). Click **View Plan**, then **Strategy** in the nav or open **`http://127.0.0.1:3000/#/strategy`** (match host/port from the script output).

**Manual start:** `npm install && npm run dev` in this same folder.
