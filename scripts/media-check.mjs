import {
  readdir,
  stat,
} from "node:fs/promises";

import {
  extname,
  join,
} from "node:path";


const root =
  process.cwd();


const projects = [
  {
    number: "01",
    name: "15 anos",
    slug: "15-anos",
  },

  {
    number: "02",
    name: "Casamentos",
    slug: "editorial-casamentos",
  },

  {
    number: "03",
    name: "Fotos Institucionais",
    slug: "fotos-institucionais",
  },

  {
    number: "04",
    name: "Eventos externos e palestras",
    slug: "eventos-externos-palestras",
  },
];


const imageExtensions =
  new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif",
  ]);


const videoExtensions =
  new Set([
    ".mp4",
    ".webm",
  ]);


function formatBytes(
  bytes,
) {

  if (
    bytes <
    1024 * 1024
  ) {

    return `${
      (
        bytes /
        1024
      ).toFixed(
        1,
      )
    } KB`;
  }


  return `${
    (
      bytes /
      1024 /
      1024
    ).toFixed(
      1,
    )
  } MB`;
}


console.log("");
console.log(
  "DUALIS - MIDIAS DEFINITIVAS",
);
console.log(
  "==========================",
);
console.log("");


let totalFiles =
  0;

let totalImages =
  0;

let totalVideos =
  0;


for (
  const project
  of projects
) {

  const directory =
    join(
      root,
      "public",
      "projects",
      project.slug,
    );


  console.log(
    `${project.number} - ${project.name}`,
  );

  console.log(
    `Pasta: public/projects/${project.slug}`,
  );


  let entries = [];


  try {

    entries =
      await readdir(
        directory,
        {
          withFileTypes:
            true,
        },
      );

  }
  catch {

    console.log(
      "  PASTA NAO ENCONTRADA",
    );

    console.log("");

    continue;
  }


  const files =
    entries
      .filter(
        (
          entry,
        ) =>
          entry.isFile() &&
          entry.name !==
            "LEIA-ME.txt",
      )
      .sort(
        (
          a,
          b,
        ) =>
          a.name.localeCompare(
            b.name,
          ),
      );


  if (
    files.length === 0
  ) {

    console.log(
      "  Nenhuma midia adicionada ainda.",
    );

    console.log("");

    continue;
  }


  for (
    const file
    of files
  ) {

    const path =
      join(
        directory,
        file.name,
      );


    const extension =
      extname(
        file.name,
      ).toLowerCase();


    const fileStat =
      await stat(
        path,
      );


    let kind =
      "OUTRO";


    if (
      imageExtensions.has(
        extension,
      )
    ) {

      kind =
        "IMAGEM";

      totalImages +=
        1;

    }
    else if (
      videoExtensions.has(
        extension,
      )
    ) {

      kind =
        "VIDEO";

      totalVideos +=
        1;
    }


    totalFiles +=
      1;


    console.log(
      `  [${kind}] ${file.name} - ${formatBytes(fileStat.size)}`,
    );
  }


  console.log("");
}


console.log(
  "RESUMO",
);

console.log(
  "------",
);

console.log(
  `Arquivos: ${totalFiles}`,
);

console.log(
  `Imagens: ${totalImages}`,
);

console.log(
  `Videos: ${totalVideos}`,
);

console.log("");


if (
  totalFiles === 0
) {

  console.log(
    "STATUS: AGUARDANDO MIDIAS.",
  );

}
else {

  console.log(
    "STATUS: MIDIAS ENCONTRADAS PARA MAPEAMENTO.",
  );
}
