"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

type RouteRevealProps = {
  children: React.ReactNode;
};

export function RouteReveal({
  children,
}: RouteRevealProps) {
  const pathname = usePathname();

  const curtainRef =
    useRef<HTMLDivElement>(null);

  const isHome =
    /^\/(pt|en)\/?$/.test(pathname);

  useEffect(() => {
    const curtain =
      curtainRef.current;

    if (
      !curtain ||
      isHome
    ) {
      return;
    }


    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;


    /*
     * Em reduced motion não deixamos
     * a cortina cobrir a página.
     */

    if (reducedMotion) {

      gsap.set(
        curtain,
        {
          display: "none",
        },
      );

      return;
    }


    const ctx =
      gsap.context(
        () => {

          gsap.set(
            curtain,
            {
              transformOrigin:
                "top center",

              scaleY: 1,
            },
          );


          gsap.to(
            curtain,
            {
              scaleY: 0,

              duration: 0.95,

              delay: 0.12,

              ease:
                "power4.inOut",
            },
          );

        },
        curtain,
      );


    return () =>
      ctx.revert();

  }, [pathname, isHome]);

  return (
    <>
      {!isHome && (
        <div
          ref={curtainRef}
          className="route-reveal"
          aria-hidden="true"
        >
          <span>DUALIS</span>
        </div>
      )}

      {children}
    </>
  );
}
