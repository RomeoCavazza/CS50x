<p align="center">
  <img src="Assets/cs50-logo.png" alt="CS50 Logo" width="500"/>
</p>

<h1 align="center">CS50 — Introduction to Computer Science</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Course-CS50x_2026-red?style=for-the-badge&logo=harvard" alt="CS50x 2026"/>
  <img src="https://img.shields.io/badge/Language-C-blue?style=for-the-badge&logo=c" alt="C"/>
  <img src="https://img.shields.io/badge/Progress-5%2F11_Weeks-brightgreen?style=for-the-badge" alt="Progress"/>
  <img src="https://img.shields.io/badge/University-Harvard-A51C30?style=for-the-badge" alt="Harvard"/>
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/RomeoCavazza/CS50?style=flat-square&color=blue" alt="Last Commit"/>
  <img src="https://img.shields.io/github/repo-size/RomeoCavazza/CS50?style=flat-square&color=green" alt="Repo Size"/>
  <img src="https://img.shields.io/github/languages/top/RomeoCavazza/CS50?style=flat-square" alt="Top Language"/>
</p>

---

Ce dépôt contient mes solutions pour le cours CS50 de Harvard.

## Structure du projet

```
cs50/
├── Makefile          # Configuration de compilation pour tous les exercices
├── .venv/            # Environnement Python virtuel (check50, style50, submit50)
├── Week 1 — C/       # Exercices de la semaine 1 (C)
│   ├── world/        # Hello, World
│   ├── me/           # Hello (avec nom utilisateur)
│   ├── mario-less/   # Pyramide Mario (simple)
│   ├── mario-more/   # Pyramides Mario (double)
│   ├── cash/         # Algorithme glouton pour la monnaie
│   └── credit/       # Validation de carte de crédit (algorithme de Luhn)
├── Week 2 — Arrays/  # Exercices de la semaine 2 (Arrays, Strings)
│   ├── readability/  # Indice de lecture Coleman-Liau
│   ├── scrabble/     # Calcul de score Scrabble
│   ├── caesar/       # Chiffrement de César
│   └── substitution/ # Chiffrement par substitution
├── Week 3 — Algorithms/ # Exercices de la semaine 3 (Algorithmes de tri et vote)
│   ├── sort/         # Identification des algorithmes de tri
│   ├── plurality/    # Élection à la pluralité
│   ├── runoff/       # Scrutin à élimination progressive (instant runoff)
│   └── tideman/      # Méthode de Tideman (ranked pairs)
├── Week 4 — Memory/  # Exercices de la semaine 4 (Mémoire, pointeurs, fichiers)
│   ├── volume/       # Modification du volume d'un fichier WAV
│   ├── filter-less/  # Filtres d'images (grayscale, sepia, reflect, blur)
│   ├── filter-more/  # Filtres d'images avancés (edges)
│   └── recover/      # Récupération de fichiers JPEG
└── Week 5 — Data Structures/ # Exercices de la semaine 5 (Structures de données)
    ├── inheritance/  # Simulation de groupes sanguins par héritage
    └── speller/      # Correcteur orthographique avec table de hachage
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
# Week 1 — C
make "Week 1 — C/world/hello"
make "Week 1 — C/me/hello"
make "Week 1 — C/mario-less/mario"
make "Week 1 — C/mario-more/mario"
make "Week 1 — C/cash/cash"
make "Week 1 — C/credit/credit"

# Week 2 — Arrays
make "Week 2 — Arrays/readability/readability"
make "Week 2 — Arrays/scrabble/scrabble"
make "Week 2 — Arrays/caesar/caesar"
make "Week 2 — Arrays/substitution/substitution"

# Week 3 — Algorithms
make "Week 3 — Algorithms/plurality/plurality"
make "Week 3 — Algorithms/runoff/runoff"
make "Week 3 — Algorithms/tideman/tideman"

# Nettoyer les exécutables
make clean
```

**Note** : Les guillemets sont nécessaires à cause des espaces dans les noms de dossiers.

### Exécution

```bash
# Week 1
./"Week 1 — C/world/hello"
./"Week 1 — C/me/hello"
./"Week 1 — C/mario-less/mario"
./"Week 1 — C/cash/cash"
./"Week 1 — C/credit/credit"

# Week 2 (caesar et substitution nécessitent un argument en ligne de commande)
./"Week 2 — Arrays/readability/readability"
./"Week 2 — Arrays/scrabble/scrabble"
./"Week 2 — Arrays/caesar/caesar" 13
./"Week 2 — Arrays/substitution/substitution" NQXPOMAFTRHLZGECYJIUWSKDVB

# Week 3 (plurality, runoff et tideman nécessitent des noms de candidats)
./"Week 3 — Algorithms/plurality/plurality" Alice Bob Charlie
./"Week 3 — Algorithms/runoff/runoff" Alice Bob Charlie
./"Week 3 — Algorithms/tideman/tideman" Alice Bob Charlie
```

### Vérification avec check50

```bash
# Activer l'environnement virtuel
source .venv/bin/activate

# Week 1 — C (depuis le dossier de l'exercice)
cd "Week 1 — C/world" && check50 cs50/problems/2026/x/world
cd "Week 1 — C/me" && check50 cs50/problems/2026/x/me
cd "Week 1 — C/mario-less" && check50 cs50/problems/2026/x/mario/less
cd "Week 1 — C/mario-more" && check50 cs50/problems/2026/x/mario/more
cd "Week 1 — C/cash" && check50 cs50/problems/2026/x/cash
cd "Week 1 — C/credit" && check50 cs50/problems/2026/x/credit

# Week 2 — Arrays
cd "Week 2 — Arrays/readability" && check50 cs50/problems/2026/x/readability
cd "Week 2 — Arrays/scrabble" && check50 cs50/problems/2026/x/scrabble
cd "Week 2 — Arrays/caesar" && check50 cs50/problems/2026/x/caesar
cd "Week 2 — Arrays/substitution" && check50 cs50/problems/2026/x/substitution

# Week 3 — Algorithms
cd "Week 3 — Algorithms/plurality" && check50 cs50/problems/2026/x/plurality
cd "Week 3 — Algorithms/runoff" && check50 cs50/problems/2026/x/runoff
cd "Week 3 — Algorithms/tideman" && check50 cs50/problems/2026/x/tideman
```

### Soumission avec submit50

```bash
source .venv/bin/activate

# Même structure que check50, en remplaçant check50 par submit50
cd "Week 1 — C/world" && submit50 cs50/problems/2026/x/world
# etc.
```

## Makefile

Le Makefile à la racine configure automatiquement :
- Les chemins d'inclusion pour `cs50.h` (`-I$(HOME)/.local/include`)
- Le linkage avec la bibliothèque CS50 (`-lcs50`) et math (`-lm` pour `readability`)
- Le rpath pour trouver la bibliothèque à l'exécution

### Variables principales

- `CC` : Compilateur (cc)
- `CFLAGS` : Flags de compilation (-Wall -Wextra -std=c11)
- `LDFLAGS` : Flags de linkage avec CS50 et math
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

### Week 2 — Arrays

#### readability
**Readability** - Calcule le niveau de lecture d'un texte avec l'indice Coleman-Liau
- Compte lettres, mots et phrases
- Affiche "Before Grade 1", "Grade X" ou "Grade 16+"

#### scrabble
**Scrabble** - Compare les scores de deux mots selon les points Scrabble
- Lettres non-alphabétiques ignorées
- Affiche "Player 1 wins!", "Player 2 wins!" ou "Tie!"

#### caesar
**Caesar** - Chiffrement de César (décalage de k positions)
- Argument : clé entière positive
- Préserve la casse et les caractères non-alphabétiques
- Usage : `./caesar key`

#### substitution
**Substitution** - Chiffrement par substitution (clé de 26 lettres)
- Argument : clé de 26 caractères, chaque lettre une seule fois
- Préserve la casse, insensible à la casse pour la clé
- Usage : `./substitution key`

### Week 3 — Algorithms

#### sort
**Sort** - Identification d'algorithmes de tri en analysant les performances
- Analyse des temps d'exécution sur données aléatoires, triées et inversées
- Identification de Bubble Sort, Merge Sort et Selection Sort

#### plurality
**Plurality** - Élection à la pluralité (le candidat avec le plus de votes gagne)
- Vote par nom de candidat
- Gestion des égalités (affiche tous les gagnants)
- Usage : `./plurality Alice Bob Charlie`

#### runoff
**Runoff** - Scrutin à élimination progressive (instant runoff voting)
- Système de vote par classement préférentiel
- Élimination successive du candidat en dernière place
- Gestion des égalités et des votes invalides
- Usage : `./runoff Alice Bob Charlie`

#### tideman
**Tideman** - Méthode des paires classées (ranked pairs / Condorcet)
- Algorithme le plus complexe : tally → sort → lock
- Détection de cycles par DFS récursif dans le graphe verrouillé
- Garantit l'élection du gagnant de Condorcet s'il existe
- Usage : `./tideman Alice Bob Charlie`

### Week 4 — Memory

#### volume
**Volume** - Modifie le volume d'un fichier audio WAV par un facteur donné
- Manipulation directe d'en-têtes et d'échantillons audio
- Usage : `./volume input.wav output.wav factor`

#### filter-less
**Filter (Less)** - Applique des filtres sur des images BMP
- Implémente `grayscale`, `sepia`, `reflect` et `blur`
- Manipulation de pixels via la structure `RGBTRIPLE`

#### filter-more
**Filter (More)** - Filtres d'images avancés
- Ajoute la détection de contours (Sobel edge detection)
- Implémente `edges` en plus des filtres de base

#### recover
**Recover** - Récupère des fichiers JPEG à partir d'une image brute de carte mémoire
- Analyse forensique bit par bit
- Détection de signatures JPEG (`0xff 0xd8 0xff 0xe?`)
- Gestion dynamique de fichiers (50 images récupérées)

### Week 5 — Data Structures

#### inheritance
**Inheritance** - Simule l'héritage de groupes sanguins sur plusieurs générations
- Utilisation de structures récursives et d'allocation dynamique
- Gestion de la mémoire (allocation/libération) pour un arbre généalogique

#### speller
**Speller** - Correcteur orthographique utilisant une table de hachage
- Chargement d'un dictionnaire de ~143k mots en mémoire
- Table de hachage optimisée avec fonction de hachage **djb2**
- Vérification orthographique insensible à la casse en temps constant (ou presque)
- Tests de performance avec `check50` et benchmarks (`getrusage`)

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

