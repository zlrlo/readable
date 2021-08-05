import {
  Tree,
  formatFiles,
  installPackagesTask,
  readProjectConfiguration,
  generateFiles,
  joinPathFragments,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { GeneratorOptions } from './schema';
import { updateJson } from '@nrwl/devkit';

export default async function (tree: Tree, schema: GeneratorOptions) {
  // 라이브러리 생성
  await libraryGenerator(tree, { name: schema.name });

  // type이 'data-access'인 경우 codegen 파일 생성
  if (schema.type === 'data-access') {
    const libraryRoot = readProjectConfiguration(tree, schema.name).root;
    generateFiles(tree, joinPathFragments(__dirname, './files'), libraryRoot, schema);
  }

  await formatFiles(tree);

  // 'apps/client/tsconfig.json' 파일을 수정한다.
  updateJson(tree, 'apps/client/tsconfig.json', wsJson => {
    const index = schema.name.indexOf('-', 0);
    const dir = schema.name.substring(0, index);
    const name = schema.name.substring(index + 1);

    const key = `@readable/${dir}/${name}`;
    const value = [`libs/${dir}/${name}/src/index.ts`];

    wsJson.compilerOptions.paths = wsJson.compilerOptions.paths ?? {};
    wsJson.compilerOptions.paths[key] = value;

    return wsJson;
  });

  return () => {
    installPackagesTask(tree);
  };
}
