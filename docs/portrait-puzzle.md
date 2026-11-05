# Portrait puzzle

## Composition

Six fragments affichent des portions successives de la même image. L’état fermé reconstitue la photo sans masquer de pixels avec du texte. L’ouverture déplace les fragments et réserve cinq véritables espaces ; chacun contient une phrase de présentation. Le texte et la photo partagent le même parent 3D, ils tournent donc ensemble. Une seule timeline réversible commande l’ouverture et la recomposition pour que les clics pendant le mouvement restent continus.

Les transformations sont limitées à la translation, la rotation et l’opacité. La photo n’est pas regénérée ni déformée dans le fichier source. Le mode mouvement réduit révèle directement les phrases sans rotation. Une modification de largeur invalide les mesures des espaces tout en gardant un état fermé explicite pour pouvoir recomposer ensuite.

## Guides appliqués et recherche

- Animate : effet de présentation, mouvements coordonnés, interruption réversible, préférence de mouvement réduit.
- GSAP React : portée des sélecteurs, callbacks contextSafe et nettoyage à la sortie.
- GSAP Timeline et Core : séquence unique, positions explicites, stagger, matchMedia.
- GSAP Utils : sélection typée des fragments.
- GSAP Performance : transformation et opacité, pas de largeur/hauteur animées.
- GSAP ScrollTrigger : l’entrée dans la section déclenche la séquence ; son déroulement reste temporel pour être fluide même lorsque le défilement s’arrête.
- GSAP Plugins / Flip a été examiné : la documentation officielle indique que Flip ne prend pas en charge les transformations 3D. La rotation de ce puzzle utilise donc directement la timeline GSAP.

Sources primaires consultées : [GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/), [GSAP React](https://gsap.com/resources/React/), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [installation Playwright](https://playwright.dev/docs/intro), [navigateurs Playwright](https://playwright.dev/docs/browsers).

## Contrôle visuel

Tests réels avec Playwright et Chromium, pas seulement un contrôle HTTP. Captures sur 1440 × 1000 et 390 × 844, dans les états assemblé, séparé et en rotation. Les tests mesurent l’espace entre chaque fragment et confirment que chaque phrase tient entre deux fragments. Ils contrôlent aussi la recomposition après redimensionnement et les préférences de mouvement réduit.
