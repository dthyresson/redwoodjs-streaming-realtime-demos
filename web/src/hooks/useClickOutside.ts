/**
 * Example Usage:
 *
 * import React, { useRef } from 'react';
 * import { useOutsideClick } from 'app/hooks/useClickOutside';
 *
 * const myComponent = () => {
 *   const ref = useRef(null);
 *   const handleClose = () => { console.log('close'); };
 *   useOutsideClick(handleClose, ref);
 *
 *   return (
 *     <div ref={ref}>
 *       <p>Click outside of me to close</p>
 *     </div>
 *   );
 * }
 */

import { useCallback, useEffect } from 'react'

const MOUSE_UP = 'mouseup'

export function useOutsideClick(handleClose: () => void, ref: any) {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (ref?.current?.contains && !ref.current.contains(event.target)) {
        handleClose()
      }
    },
    [handleClose, ref]
  )

  useEffect(() => {
    document.addEventListener(MOUSE_UP, handleClick)

    return () => {
      document.removeEventListener(MOUSE_UP, handleClick)
    }
  }, [handleClick])
}
