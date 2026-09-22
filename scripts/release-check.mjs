import {
  readFile,
  readdir,
} from "node:fs/promises";

import {
  extname,
  join,
  relative,
} from "node:path";


const root =
  process.cwd();


const blockers = [];
const warnings = [];


async function readText(
  relativePath,
) {

  return readFile(
    join(
      root,
      relativePath,
    ),
    "utf8",
  );
}


async function walkSource(
  directory,
) {

  const entries =
    await readdir(
      directory,
      {
        withFileTypes:
          true,
      },
    );


  const files = [];


  for (
    const entry
    of entries
  ) {

    const fullPath =
      join(
        directory,
        entry.name,
      );


    if (
      entry.isDirectory()
    ) {

      files.push(
        ...await walkSource(
          fullPath,
        ),
      );

      continue;
    }


    const extension =
      extname(
        entry.name,
      );


    if (
      extension === ".ts" ||
      extension === ".tsx"
    ) {

      files.push(
        fullPath,
      );
    }
  }


  return files;
}


const projectData =
  await readText(
    "src/data/projects.ts",
  );


const homeMedia =
  await readText(
    "src/data/home-media.ts",
  );


const mediaSources =
  [
    projectData,
    homeMedia,
  ].join(
    "\n",
  );


if (
  /pexels\.com/i.test(
    mediaSources,
  )
) {

  blockers.push(
    "Existem mídias externas do Pexels nos dados do projeto.",
  );
}


/*
 * REAL_VIDEO_POSTER_CHECK_V2
 *
 * Um poster é obrigatório apenas para slots de vídeo
 * que já possuem mídia real.
 *
 * Slots futuros com src:null não entram neste bloqueio.
 */
const mediaBlocks =
  projectData
    .split(
      /\n\s{8}id:\s*["']/,
    )
    .slice(
      1,
    );


const realVideoWithoutPoster =
  mediaBlocks.some(
    (
      block,
    ) =>

      /kind\s*:\s*["']video["']/i.test(
        block,
      ) &&

      /src\s*:\s*["'][^"']+["']/i.test(
        block,
      ) &&

      (
        !/poster\s*:/i.test(
          block,
        ) ||

        /poster\s*:\s*null/i.test(
          block,
        )
      ),
  );


if (
  realVideoWithoutPoster
) {

  blockers.push(
    "Existem vídeos reais sem poster definitivo.",
  );
}


if (
  /Projeto Um|Projeto Dois|Projeto Três|Project One|Project Two|Project Three/i.test(
    projectData,
  )
) {

  blockers.push(
    "Existem nomes genéricos de projetos.",
  );
}


if (
  /slug\s*:\s*["']project-(one|two|three)["']/i.test(
    projectData,
  )
) {

  warnings.push(
    "Os slugs project-one/project-two/project-three ainda são genéricos.",
  );
}




/*
 * PROJECT_CONTENT_PLACEHOLDERS_V1
 *
 * Impede publicação enquanto um projeto real
 * ainda possui conteúdo provisório.
 */
if (
  /A definir|To be defined|Conteúdo em preparação|Content in preparation/i.test(
    projectData,
  )
) {

  blockers.push(
    "Existem campos de projeto ainda marcados como conteúdo em preparação.",
  );
}


/*
 * OPTIONAL_SECOND_FILM_V1
 *
 * film-two pode permanecer sem mídia temporariamente
 * em Casamentos e Fotos Institucionais.
 *
 * Demais slots continuam obrigatórios.
 */
const projectBlocks =
  projectData.split(
    /\n\s{2}\{\s*\n\s{4}slug:/,
  );


const missingRequiredMedia =
  projectBlocks.some(
    (
      block,
    ) => {

      const slugMatch =
        block.match(
          /^\s*"([^"]+)"/,
        );


      const slug =
        slugMatch?.[1] ?? "";


      const mediaBlocks =
        block
          .split(
            /\n\s{8}id:\s*"/,
          )
          .slice(
            1,
          );


      return mediaBlocks.some(
        (
          mediaBlock,
        ) => {

          const idMatch =
            mediaBlock.match(
              /^([^"]+)"/,
            );


          const mediaId =
            idMatch?.[1] ?? "";


          const isOptionalFilmTwo =
            mediaId === "film-two" &&
            (
              slug === "editorial-casamentos" ||
              slug === "fotos-institucionais"
            );


          if (
            isOptionalFilmTwo
          ) {

            return false;
          }


          return /src\s*:\s*null/i.test(
            mediaBlock,
          );
        },
      );
    },
  );


if (
  missingRequiredMedia
) {

  blockers.push(
    "Existem slots obrigatórios de mídia ainda sem arquivo definitivo.",
  );
}



/*
 * QUICKTIME_RELEASE_BLOCK_V1
 *
 * Arquivos MOV permanecem preservados como originais,
 * mas devem ser convertidos para MP4/WebM antes
 * da publicação definitiva.
 */
if (
  /\.mov["']/i.test(
    mediaSources,
  )
) {

  blockers.push(
    "Existem vídeos MOV que ainda precisam ser convertidos para MP4/WebM para produção web.",
  );
}

const sourceFiles =
  await walkSource(
    join(
      root,
      "src",
    ),
  );


const placeholderLinks =
  [];


for (
  const sourceFile
  of sourceFiles
) {

  const source =
    await readFile(
      sourceFile,
      "utf8",
    );


  if (
    /href\s*=\s*["']#["']/i.test(
      source,
    )
  ) {

    placeholderLinks.push(
      relative(
        root,
        sourceFile,
      ),
    );
  }
}


if (
  placeholderLinks.length
) {

  blockers.push(
    `Existem links href="#" em: ${placeholderLinks.join(", ")}`,
  );
}


const siteUrl =
  process.env
    .NEXT_PUBLIC_SITE_URL;


if (
  !siteUrl ||
  /localhost/i.test(
    siteUrl,
  )
) {

  warnings.push(
    "NEXT_PUBLIC_SITE_URL público não foi confirmado neste ambiente.",
  );
}


const faceTrackingEnabled =
  process.env
    .NEXT_PUBLIC_ENABLE_FACE_TRACKING ===
  "true";


console.log("");
console.log(
  "DUALIS - RELEASE CHECK",
);
console.log(
  "======================",
);
console.log("");


if (
  blockers.length === 0
) {

  console.log(
    "Bloqueios de conteúdo: nenhum.",
  );

}
else {

  console.log(
    "BLOQUEIOS DE PUBLICAÇÃO:",
  );

  console.log("");

  blockers.forEach(
    (
      blocker,
      index,
    ) => {

      console.log(
        `${index + 1}. ${blocker}`,
      );
    },
  );
}


if (
  warnings.length
) {

  console.log("");
  console.log(
    "AVISOS:",
  );
  console.log("");

  warnings.forEach(
    (
      warning,
      index,
    ) => {

      console.log(
        `${index + 1}. ${warning}`,
      );
    },
  );
}


console.log("");
console.log(
  `MediaPipe runtime: ${
    faceTrackingEnabled
      ? "ATIVO"
      : "DESATIVADO"
  }`,
);


console.log("");


if (
  blockers.length
) {

  console.log(
    "STATUS: RELEASE BLOQUEADO POR CONTEÚDO.",
  );

  process.exitCode =
    1;

}
else {

  console.log(
    "STATUS: PRONTO PARA RELEASE.",
  );
}
