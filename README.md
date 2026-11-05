# Marissa Bindeki — Portfolio

Accueil React / Next.js inspiré d’un portrait en damier : une photographie continue, deux carrés blancs et une apparition progressive des textes.

## Lancer en local

```sh
npm install
npm run dev
```

Ouvrir http://localhost:3000. L’accueil est dans `app/page.tsx` et son style dans `app/globals.css`.

## Vérifier et construire

```sh
npm run typecheck
npm run build
```

Le dossier `out/` contient le site statique prêt à héberger. Ouvrir `index.html` à la racine du dépôt affiche encore l’ancienne version : utiliser le serveur Next.js pour voir la refonte.

Les pages HTML existantes restent les sources des rubriques About, Education, Expertise, Projects et Contact. `scripts/prepare-legacy.mjs` prépare automatiquement leurs copies et leurs scripts pour Next.js avant chaque lancement et chaque build. Leur migration React pourra se faire progressivement.

Les animations respectent la préférence de mouvement réduit du système.

Les deux textes d’introduction alternent automatiquement toutes les 5 secondes avec « I design, innovate, and create. » et « An entrepreneur turning dreams into reality. ». Le changement se répète sans dépendre du défilement. La police des titres est Bodoni Moda, chargée localement avec Next.js.

Sans barre de navigation, l’accueil occupe exactement la hauteur visible (`100svh`) pour montrer les quatre cases avant tout défilement. La typographie utilise les dimensions des panneaux pour mieux remplir leur espace. Au scroll, le carré blanc supérieur droit s’agrandit depuis son coin et dépasse légèrement le cadre pour recouvrir le portrait sans bord visible. Ses textes s’effacent et « GET TO KNOW ME » apparaît au centre, en gras et dans le même bordeaux que les textes des carrés (`hsl(350, 55%, 32%)`). En poursuivant le défilement, le titre pivote et rejoint le côté avec sa règle. La présentation existante reste ensuite sur fond bordeaux. GSAP ScrollTrigger suit le défilement natif et permet de revenir en arrière. En mode mouvement réduit, le titre reste statique et les textes alternent avec un simple fondu.

La route `/motion-lab` conserve les trois exemples rejouables. Le choix C, lignes en cascade, est appliqué à l’accueil, avec une alternance automatique toutes les cinq secondes. Elle inclut aussi les objets 3D générés, avec leur entrée rebondissante. L’ordinateur, le pinceau et le cerveau sont intercalés directement entre les mots de « GET TO KNOW ME », au contact des lettres. Chaque lettre dispose de son propre décalage, de sa trajectoire et de sa rotation. Les objets effectuent des tours complets en sens alternés pendant leur rebond. La composition rejoue cette séquence de façon autonome quand elle est centrée, même sans défiler, puis s’immobilise pour pivoter et rejoindre le côté. Le carré blanc prend progressivement la couleur bordeaux de la présentation pendant son agrandissement. Les prompts, fichiers et la référence Jitter sont documentés dans `docs/creative-assets.md`.

La règle de navigation est fixe à gauche, du même côté que le titre vertical. Elle est masquée sur l’accueil initial et apparaît quand « GET TO KNOW ME » rejoint le bord, puis reste disponible sur la présentation et les autres pages. Elle indique la progression de lecture et propose des liens vers Accueil, Présentation, Formation, Projets, Expertise et Contact. Son script et sa feuille de style sont partagés dans `public/scripts/site-ruler.js` et `public/stylesheets/site-ruler.css`.

Le titre « GET TO KNOW ME » reste fixé à gauche pendant le défilement de la page d’accueil, à côté de la règle. La présentation suivante utilise six vrais fragments contigus de la photo. Ils s’écartent pour créer cinq espaces de texte : le texte ne recouvre aucune partie de l’image. Chaque fragment tourne avec le texte qui lui est rattaché, puis se stabilise. « Recomposer la photo » et « Révéler mon histoire » permettent de jouer et d’inverser la même timeline, y compris en cours de mouvement. Le mode mouvement réduit ouvre les espaces sans rotation. La photo actuelle est réutilisée en attendant une éventuelle nouvelle photo.

## Vérifications dans Chromium

Playwright est installé en dépendance de développement. Pour installer le navigateur sur une nouvelle machine : `npx playwright install chromium`. Exécuter les tests avec `npm run test:e2e`. Ils vérifient le cadrage initial, les vrais espaces entre fragments, la recomposition, le redimensionnement, le mode mouvement réduit et la visibilité des icônes du titre fixe. Les captures des états fermé, ouvert et en rotation se trouvent dans `artifacts/qa/` après le test. Le travail de recherche et les choix d’animation sont documentés dans `docs/portrait-puzzle.md`.

La version retouchée du portrait est `public/images/marissa-portrait-enhanced.png` (1106 × 1422). L’original est conservé. Retouche réalisée avec l’outil imagegen intégré : amélioration de la clarté et des textures, conservation du visage, de la pose, de la tenue et du fond bordeaux, retrait de l’icône audio en bas à droite. Il s’agit d’une restauration générative, pas d’une nouvelle photographie originale.

Prompt utilisé avec imagegen :

> Edit target: the attached portrait photograph of Marissa. High fidelity restoration and high resolution enhancement for a very large full screen portfolio portrait. Preserve the exact same person, face, facial features, skin tone, expression, makeup, blonde wavy hairstyle, black blazer, white shirt, pose, proportions and burgundy studio background. Do not redesign, beautify or change her identity. Improve apparent clarity with natural fine skin texture, individual hair detail and crisp fabric texture, subtle professional studio finish, no oversharpening, no plastic smoothing. Keep the same portrait composition and aspect ratio, highest available output resolution. Remove only the small speaker/audio icon overlay at the lower right and reconstruct the burgundy background under it. No text, no new objects. Save the resulting enhanced portrait as a project asset and provide its local path.
