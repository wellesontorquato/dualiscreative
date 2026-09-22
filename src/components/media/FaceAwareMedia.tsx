"use client";

import {
  type CSSProperties,
} from "react";

import {
  useSmartMedia,
} from "@/components/media/useSmartMedia";

import type {
  FaceFocusPoint,
} from "@/lib/face-focus";


type FaceAwareMediaProps = {
  kind:
    | "image"
    | "video";

  src: string;

  alt: string;

  fallbackFocus:
    FaceFocusPoint;

  hoverLabel?: string;
};


export function FaceAwareMedia({
  kind,
  src,
  alt,
  fallbackFocus,
  hoverLabel,
}: FaceAwareMediaProps) {

  const {
    focus,
    isPlaying,
    mediaFailed,
    faceDetected,

    onMouseEnter,
    onMouseLeave,

    onImageLoad,

    onVideoLoadedMetadata,
    onVideoLoadedData,
    onVideoSeeked,
    onVideoPlay,
    onVideoPause,

    onMediaError,
  } =
    useSmartMedia({
      kind,
      fallbackFocus,
    });


  const mediaStyle = {
    "--home-focus-x":
      `${focus.x}%`,

    "--home-focus-y":
      `${focus.y}%`,

    /*
     * Alias mantidos para CSS legado
     * e componentes compartilhados.
     */
    "--media-focus-x":
      `${focus.x}%`,

    "--media-focus-y":
      `${focus.y}%`,
  } as CSSProperties;


  /*
   * ================================================
   * FALLBACK
   * ================================================
   */

  if (
    mediaFailed
  ) {

    return (
      <div
        className="home-face-media home-face-media--fallback"
        style={mediaStyle}
      >
        <span>
          DUALIS
        </span>
      </div>
    );

  }


  /*
   * ================================================
   * IMAGE
   * ================================================
   */

  if (
    kind === "image"
  ) {

    return (
      <div
        className="home-face-media home-face-media--image"

        data-face={
          faceDetected
            ? "detected"
            : "fallback"
        }

        style={mediaStyle}
      >

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}

          alt={alt}

          className="home-face-media__asset"

          loading="lazy"

          decoding="async"

          crossOrigin="anonymous"

          onLoad={(
            event,
          ) => {

            onImageLoad(
              event.currentTarget,
            );

          }}

          onError={
            () => {

              onMediaError();

            }
          }
        />


        <div className="home-face-media__shade" />

      </div>
    );

  }


  /*
   * ================================================
   * VIDEO
   * ================================================
   */

  return (
    <div
      className={
        [
          "home-face-media",
          "home-face-media--video",

          isPlaying
            ? "is-playing"
            : "is-paused",
        ]
          .filter(Boolean)
          .join(" ")
      }

      data-face={
        faceDetected
          ? "detected"
          : "fallback"
      }

      style={mediaStyle}

      onMouseEnter={(
        event,
      ) => {

        void onMouseEnter(
          event.currentTarget,
        );

      }}

      onMouseLeave={(
        event,
      ) => {

        onMouseLeave(
          event.currentTarget,
        );

      }}
    >

      <video
        src={src}

        className="home-face-media__asset"

        data-smart-video="true"

        aria-label={alt}

        aria-hidden="true"

        tabIndex={-1}

        muted

        loop

        playsInline

        preload="metadata"

        crossOrigin="anonymous"

        disablePictureInPicture

        onLoadedMetadata={(
          event,
        ) => {

          onVideoLoadedMetadata(
            event.currentTarget,
          );

        }}

        onLoadedData={(
          event,
        ) => {

          onVideoLoadedData(
            event.currentTarget,
          );

        }}

        onSeeked={(
          event,
        ) => {

          onVideoSeeked(
            event.currentTarget,
          );

        }}

        onPlay={(
          event,
        ) => {

          onVideoPlay(
            event.currentTarget,
          );

        }}

        onPause={(
          event,
        ) => {

          onVideoPause(
            event.currentTarget,
          );

        }}

        onError={
          () => {

            onMediaError();

          }
        }
      />


      <div className="home-face-media__shade" />


      <div
        className="home-face-media__hover"
        aria-hidden="true"
      >

        <span className="home-face-media__play">
          ▶
        </span>


        {hoverLabel ? (
          <span className="home-face-media__hover-label">
            {hoverLabel}
          </span>
        ) : null}

      </div>

    </div>
  );
}
