const arrows = document.querySelectorAll<HTMLElement>('.checkpoint-arrow');

arrows.forEach(arrow => {
  let timer1: number;
  let timer2: number;

  arrow.addEventListener('mouseenter', () => {
    arrow.classList.remove('reset');

    // étape 1 : progression
    arrow.classList.add('is-progress');

    // étape 2 : checkpoint
    timer1 = window.setTimeout(() => {
      arrow.classList.add('is-checkpoint');
    }, 300);
  });

  arrow.addEventListener('mouseleave', () => {
    clearTimeout(timer1);
    clearTimeout(timer2);

    arrow.classList.remove('is-progress', 'is-checkpoint');
    arrow.classList.add('reset');

    // cleanup après transition
    timer2 = window.setTimeout(() => {
      arrow.classList.remove('reset');
    }, 300);
  });
});
