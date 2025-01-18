import { useRef } from "react";
function useDebounce(reqFunction: (...args: any[]) => void, delay: number = 300) {// eslint-disable-line

  const clock = useRef<ReturnType<typeof setTimeout> | null>(null); 

  return (...args: any[]) => { // eslint-disable-line

    if (clock.current) {
      clearTimeout(clock.current);
    }
    clock.current = setTimeout(() => {
      reqFunction(...args);
    }, delay);
  };
}

export default useDebounce;
