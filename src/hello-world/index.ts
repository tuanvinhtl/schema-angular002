import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { capitalize } from '@angular-devkit/core/src/utils/strings';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function helloWorld(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const name: string  = _options.name;
    const content: string = _options.content;
    const extension: string = _options.extension || '.md';
    const path = join(name, extension);
    const angularConfig = 'angular.json';
	
    // Let's make sure we're in an angular workspace
    if (!tree.exists(angularConfig)) {
      throw new SchematicsException('???This is not an Angular worksapce! Try again in an Angular project.');
    } else {
      if (!tree.exists(path)) {
        tree.create(path, capitalize(content));
      } else {
        throw new SchematicsException('???That file already exists! Try a new name');
      }
    }
    return tree;
  };
}
