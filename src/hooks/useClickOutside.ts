import { useEffect } from "react"

type onClickOutsideFN = (ref: React.MutableRefObject<HTMLElement | null>,
    handler: (e?: React.MouseEvent) => void) => void;

export const useClickOutside: onClickOutsideFN = (ref, handler) => {

    useEffect(() => {
        const listener = (e: any) => {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            } else {
                handler(e);
            }
        }
        document.addEventListener('mousedown', listener);
        console.log('Listener added');

        return () => {
            document.removeEventListener('mousedown', listener);
        }
    }, [ref, handler])

}