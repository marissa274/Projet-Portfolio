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

Sans barre de navigation, l’accueil conserve un cadrage plus carré. La typographie utilise les dimensions des panneaux pour mieux remplir leur espace. Au scroll, le carré blanc supérieur droit s’agrandit depuis son coin pour recouvrir le portrait. Ses textes s’effacent et « GET TO KNOW ME » apparaît au centre, en gras et dans le même bordeaux que les textes des carrés (`hsl(350, 55%, 32%)`). En poursuivant le défilement, le titre pivote et rejoint le côté avec sa règle. La présentation existante reste ensuite sur fond bordeaux. GSAP ScrollTrigger suit le défilement natif et permet de revenir en arrière. En mode mouvement réduit, le titre reste statique et les textes alternent avec un simple fondu.

La version retouchée du portrait est `public/images/marissa-portrait-enhanced.png` (1106 × 1422). L’original est conservé. Retouche réalisée avec l’outil imagegen intégré : amélioration de la clarté et des textures, conservation du visage, de la pose, de la tenue et du fond bordeaux, retrait de l’icône audio en bas à droite. Il s’agit d’une restauration générative, pas d’une nouvelle photographie originale.

Prompt utilisé avec imagegen :

> Edit target: the attached portrait photograph of Marissa. High fidelity restoration and high resolution enhancement for a very large full screen portfolio portrait. Preserve the exact same person, face, facial features, skin tone, expression, makeup, blonde wavy hairstyle, black blazer, white shirt, pose, proportions and burgundy studio background. Do not redesign, beautify or change her identity. Improve apparent clarity with natural fine skin texture, individual hair detail and crisp fabric texture, subtle professional studio finish, no oversharpening, no plastic smoothing. Keep the same portrait composition and aspect ratio, highest available output resolution. Remove only the small speaker/audio icon overlay at the lower right and reconstruct the burgundy background under it. No text, no new objects. Save the resulting enhanced portrait as a project asset and provide its local path.
