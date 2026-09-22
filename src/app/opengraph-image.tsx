import {
  ImageResponse,
} from "next/og";


export const alt =
  "Dualis Creative â€” Photography meets Motion";


export const size = {
  width:
    1200,

  height:
    630,
};


export const contentType =
  "image/png";


export default function OpenGraphImage() {

  return new ImageResponse(
    (
      <div
        style={{
          width:
            "100%",

          height:
            "100%",

          display:
            "flex",

          flexDirection:
            "column",

          justifyContent:
            "space-between",

          background:
            "#080808",

          color:
            "#f4f1ea",

          padding:
            "72px",

          fontFamily:
            "Arial, sans-serif",
        }}
      >

        <div
          style={{
            display:
              "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            fontSize:
              "22px",

            letterSpacing:
              "0.18em",

            textTransform:
              "uppercase",
          }}
        >
          <span>
            Dualis Creative
          </span>

          <span>
            Visual Studio
          </span>
        </div>


        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap:
              "18px",
          }}
        >

          <div
            style={{
              display:
                "flex",

              fontSize:
                "82px",

              lineHeight:
                1,

              letterSpacing:
                "-0.055em",

              fontWeight:
                500,
            }}
          >
            Photography
          </div>


          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                "28px",

              fontSize:
                "82px",

              lineHeight:
                1,

              letterSpacing:
                "-0.055em",

              fontWeight:
                500,
            }}
          >

            <span
              style={{
                opacity:
                  0.4,
              }}
            >
              meets
            </span>

            <span>
              Motion.
            </span>

          </div>

        </div>


        <div
          style={{
            display:
              "flex",

            justifyContent:
              "space-between",

            fontSize:
              "18px",

            letterSpacing:
              "0.08em",

            opacity:
              0.65,
          }}
        >
          <span>
            Photography Â· Film Â· Direction
          </span>

          <span>
            Brasil Â· 2026
          </span>
        </div>

      </div>
    ),
    {
      ...size,
    },
  );
}
