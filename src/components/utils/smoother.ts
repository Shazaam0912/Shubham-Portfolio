import { ScrollSmoother } from "gsap/ScrollSmoother";

export let smoother: ScrollSmoother;

export const setSmoother = (s: ScrollSmoother) => {
  smoother = s;
};
