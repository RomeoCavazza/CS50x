# CS50 - Introduction to Computer Science

Ce dépôt contient mes solutions pour le cours CS50 de Harvard.

## Structure du projet

```
cs50/
├── Makefile          # Configuration de compilation pour tous les exercices
├── .venv/            # Environnement Python virtuel (check50, style50, submit50)
├── libcs50/          # Bibliothèque CS50 locale (source)
└── Week 1 — C/       # Exercices de la semaine 1 (C)
    ├── world/        # Hello, World
    ├── me/           # Hello (avec nom utilisateur)
    ├── mario-less/   # Pyramide Mario (simple)
    ├── mario-more/   # Pyramides Mario (double)
    ├── cash/         # Algorithme glouton pour la monnaie
    └── credit/       # Validation de carte de crédit (algorithme de Luhn)
```

## Prérequis

### Bibliothèque CS50

La bibliothèque CS50 (`cs50.h`, `get_string()`, etc.) est installée dans `~/.local/` :
- Headers : `~/.local/include/cs50.h`
- Bibliothèques : `~/.local/lib/libcs50.*`

### Outils CS50

Les outils CS50 sont installés dans un environnement Python virtuel (`.venv/`) :
- `check50` : Vérification automatique des exercices
- `style50` : Vérification du style de code
- `submit50` : Soumission des exercices

## Utilisation

### Compilation

Depuis la racine du projet :

```bash
# Compiler un exercice spécifique
make "Week 1 — C/world/hello"
make "Week 1 — C/me/hello"
make "Week 1 — C/mario-less/mario"
make "Week 1 — C/cash/cash"
make "Week 1 — C/credit/credit"

# Nettoyer les exécutables
make clean
```

**Note** : Les guillemets sont nécessaires à cause des espaces dans "Week 1 — C".

### Exécution

```bash
./"Week 1 — C/world/hello"
./"Week 1 — C/me/hello"
./"Week 1 — C/mario-less/mario"
```

### Vérification avec check50

```bash
# Activer l'environnement virtuel
source .venv/bin/activate

# Vérifier un exercice (depuis le dossier de l'exercice)
cd "Week 1 — C/world"
../.venv/bin/check50 cs50/problems/2026/x/world

cd "../me"
../.venv/bin/check50 cs50/problems/2026/x/me

cd "../mario-less"
../.venv/bin/check50 cs50/problems/2026/x/mario/less

cd "../mario-more"
../.venv/bin/check50 cs50/problems/2026/x/mario/more

cd "../cash"
../.venv/bin/check50 cs50/problems/2026/x/cash

cd "../credit"
../.venv/bin/check50 cs50/problems/2026/x/credit
```

### Soumission avec submit50

```bash
# Activer l'environnement virtuel
source .venv/bin/activate

# Soumettre un exercice (depuis le dossier de l'exercice)
cd "Week 1 — C/world"
../.venv/bin/submit50 cs50/problems/2026/x/world

cd "../me"
../.venv/bin/submit50 cs50/problems/2026/x/me

# etc.
```

## Makefile

Le Makefile à la racine configure automatiquement :
- Les chemins d'inclusion pour `cs50.h` (`-I$(HOME)/.local/include`)
- Le linkage avec la bibliothèque CS50 (`-lcs50`)
- Le rpath pour trouver la bibliothèque à l'exécution

### Variables principales

- `CC` : Compilateur (cc)
- `CFLAGS` : Flags de compilation (-Wall -Wextra -std=c11)
- `LDFLAGS` : Flags de linkage avec CS50
- `CHECK50` : Chemin vers check50 dans le venv
- `SUBMIT50` : Chemin vers submit50 dans le venv

## Exercices

### Week 1 — C

#### world
**Hello, World** - Premier programme, affiche "hello, world\n"

#### me
**Hello** - Demande le nom de l'utilisateur et affiche un message personnalisé

#### mario-less
**Mario (Less)** - Affiche une pyramide alignée à droite de blocs #
- Validation de l'entrée (hauteur positive)

#### mario-more
**Mario (More)** - Affiche deux pyramides côte à côte avec un espace de 2 caractères
- Validation de l'entrée (hauteur entre 1 et 8)

#### cash
**Cash** - Calcule le minimum de pièces nécessaires pour rendre la monnaie
- Utilise un algorithme glouton (quarters → dimes → nickels → pennies)
- Validation de l'entrée (montant positif en cents)

#### credit
**Credit** - Valide un numéro de carte de crédit et détermine son type
- Implémente l'algorithme de Luhn pour la validation
- Détecte American Express, MasterCard, ou Visa

## Notes techniques

### Problèmes connus

- **style50** : Nécessite `libmagic` qui n'est pas facilement installable sur NixOS. L'indentation est vérifiée manuellement (4 espaces, style CS50).

### Configuration système

Ce projet est configuré pour NixOS avec :
- Bibliothèque CS50 installée localement dans `~/.local/`
- Outils CS50 dans un venv Python
- Makefile adapté pour gérer les chemins avec espaces

## Ressources

- [CS50 sur edX](https://www.edx.org/course/introduction-computer-science-harvardx-cs50x)
- [CS50 Reference](https://cs50.readthedocs.io/)
- [Documentation CS50 Library](https://github.com/cs50/libcs50)

