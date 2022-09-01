import gsap from "gsap";
import imagesLoaded from "imagesLoaded";
import ScrollBar, {ScrollbarPlugin} from "smooth-scrollbar";


class DisabledScrollPlugin extends ScrollbarPlugin {
    static pluginName = "disabledScroll";

    static defaultOptions = {
        direction: "",
    };

    transformDelta(delta) {
        if(this.options.direction) {
            delta[this.options.direction] = 0
        }

        return { ...delta };
    }
}

//load 
ScrollBar.use(DisabledScrollPlugin);


class AnchorPlugin extends ScrollbarPlugin {
    static pluginName = 'anchor';
  
    onHashChange = () => {
      this.jumpToHash(window.location.hash);
    };
  
    onClick = (event) => {
      const { target } = event;
  
      if (target.tagName !== 'A') {
        return;
      }
  
      const hash = target.getAttribute('href');
  
      if (!hash || hash.charAt(0) !== '#') {
        return;
      }
  
      this.jumpToHash(hash);
    };
  
    jumpToHash = (hash) => {
      const { scrollbar } = this;
  
      if (!hash) {
        return;
      }    
  
      // reset scrollTop
      scrollbar.containerEl.scrollTop = 0;
  
      scrollbar.scrollIntoView(document.querySelector(hash));
    };
  
    onInit() {
      this.jumpToHash(window.location.hash);
  
      window.addEventListener('hashchange', this.onHashChange);
  
      this.scrollbar.contentEl.addEventListener('click', this.onClick);
    }
  
    onDestory() {
      window.removeEventListener('hashchange', this.onHashChange);
  
      this.scrollbar.contentEl.removeEventListener('click', this.onClick);
    }
  }

  // usage
ScrollBar.use(AnchorPlugin);


const bar = document.querySelector(".loading__bar--inner");
const numCounter = document.querySelector(".loading__counter--number")

let counter = 0;

let barInterval = setInterval(() => {
    bar.style.width = counter + '%';
    numCounter.innerText = `${counter}%`
    counter++;

    if (counter === 101) {
        clearInterval(barInterval);
        gsap.to(".loading__bar", {
            duration: 5,
            rotate: "90deg",
            left: "1000%",
        });
        gsap.to(".loading__text, .loading__counter", {
            duration: 0.5,
            opacity: 0,
        });
        gsap.to(".loading__box", {
            duration: 1,
            height: "300px",
            width: "300px",
            borderRadius: "50%",
        });
        gsap.to(".loading__svg", {
            duration: 10,
            opacity: 1,
            rotate: "360deg",
        });
        gsap.to(".loading__box", {
            delay: 2,
            border: "none",
        });
        imagesLoaded(document.querySelectorAll('img'), () => {
            gsap.to(".loading", {
                delay: 2,
                duration: 2,
                zIndex: 1,
                background: "transparent",
                opacity: 0.5
            });
            gsap.to(".loading__svg", {
                delay: 2,
                duration: 100,
                rotate: "360deg",
                opacity: 0.3,
                filter: "blur(10px)"

            });
            gsap.to('header', {
                duration: 1,
                duration: 2,
                top: "0"
            });
            gsap.to('.socials', {
                duration: 1,
                delay: 2.5,
                bottom: "10rem"
            });
            gsap.to('.scrolldown', {
                duration: 1,
                delay: 2.9,
                bottom: "3.5rem",
            });
            setTimeout(() => {
            let options = {
                damping: 0.1,
                alwaysShowTracks: true,
                plugins: {
                    disabledScroll: {
                        direction: "x"
                    }
                }
            }

            let pageSmooth = ScrollBar.init(document.body, options)
            pageSmooth.track.xAxis.element.remove();
            }, 2000)
        })

    }
}, 20)