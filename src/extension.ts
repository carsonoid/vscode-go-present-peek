import * as vscode from 'vscode';

import * as fs from 'fs';
import * as path from 'path';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

   // Use the console to output diagnostic information (console.log) and errors (console.error)
   // This line of code will only be executed once when your extension is activated
   //console.log('Congratulations, your extension "vscode-file-peek" is now active!');

   let config = vscode.workspace.getConfiguration('file_peek');
   let active_languages = (config.get('activeLanguages') as Array<string>);
   let search_file_extensions = (config.get('searchFileExtensions') as Array<string>);

   /*
   vscode.languages.getLanguages().then((languages: string[]) => {
      console.log("Known languages: " + languages);
   });
   */

   const peek_filter: vscode.DocumentFilter[] = active_languages.map((language) => {
      return {
         language: language,
         pattern: '**/*.slide'
      };
   });

   // Register the definition provider
   context.subscriptions.push(
      vscode.languages.registerDefinitionProvider(peek_filter,
         new PeekFileDefinitionProvider(search_file_extensions))
   );
}

// this method is called when your extension is deactivated
export function deactivate() {
}


/**
 * Provide the lookup so we can peek into the files.
 */
class PeekFileDefinitionProvider implements vscode.DefinitionProvider {
   protected fileSearchExtensions: string[] = [];

   constructor(fileSearchExtensions: string[] = []) {
      this.fileSearchExtensions = fileSearchExtensions;
   }

   provideDefinition(document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken): vscode.Definition {
      let line = document.lineAt(position);

      // console.log('====== peek-file definition lookup ===========');
      // console.log('line: ' + line.text);

      // Match play or code
      let re_str = `^\\s*\\.(play|code)\\s([^\\s]+)?\\s?`;
      let match = line.text.match(re_str);

      // console.log('re_str: ' + re_str);
      // console.log("   Match: ", match);

      if (null !== match) {
         let full_path = path.resolve(
            path.dirname(document.fileName),
            match[2]
         );
         // console.log('found: ' + full_path);
         return new vscode.Location(vscode.Uri.file(full_path),
            new vscode.Position(0, 1));
      }

      return null;
   }
}
