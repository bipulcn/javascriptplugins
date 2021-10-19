"user strict";
function scrollIt(destination, duration = 20000, easing = 'easeInCubic', callback) {

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
  console.log(start, startTime, documentHeight, windowHeight, destinationOffset, destinationOffsetToScroll);
  if ('requestAnimationFrame' in window === false) {
    console.log("doen scrolling");
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = time;
    console.log(time);
    // console.log(Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {

      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

/*

function scrollIt(destination, duration = 200, easing = 'easeInCubic', callback) {

  const easings = {
    linear(t)         { return t;                                                                 },
    easeInQuad(t)     { return t * t;                                                             },
    easeOutQuad(t)    { return t * (2 - t);                                                       },
    easeInOutQuad(t)  { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;                        },
    easeInCubic(t)    { return t * t * t;                                                         },
    easeOutCubic(t)   { return (--t) * t * t + 1;                                                 },
    easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    easeInQuart(t)    { return t * t * t * t;                                                     },
    easeOutQuart(t)   { return 1 - (--t) * t * t * t;                                             },
    easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;           },
    easeInQuint(t)    { return t * t * t * t * t;                                                 },
    easeOutQuint(t)   { return 1 + (--t) * t * t * t * t;                                         },
    easeInOutQuint(t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
  console.log(start, startTime, documentHeight, windowHeight, destinationOffset, destinationOffsetToScroll);
  if ('requestAnimationFrame' in window === false) {
    console.log("doen scrolling");
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    console.log(Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {

      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}
*/