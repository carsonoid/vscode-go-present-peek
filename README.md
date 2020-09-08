# Functionality

This extension adds peek support to go present `.slide` files when they use the markdown format. You can also manually enable support for the old play syntax by registering it's file type with this extension's settings.

This makes it much easier to edit files referenced by the `.code` and `.play` commands that can be used in presentations. Allowing inline edits to the files with ease!

See editor docs for more details
 * [Visual Studio Code: Goto Definition](https://code.visualstudio.com/docs/editor/editingevolved#_go-to-definition)
 * [Visual Studio Code: Peek](https://code.visualstudio.com/docs/editor/editingevolved#_peek)

# Notes

Recommended settings:

* `"editor.stablePeek": true` -  To keep the peek editor open across double clicks and escape
* `"editor.definitionLinkOpensInPeek": true` - To make control-click open peeks instead of files by default

# Changelog

## 1.0.3

  * Rework icon

## 1.0.2

  * Cleanup file lookup code and fix finding of non-go files

## 1.0.1

  * Shamelessly copied from https://github.com/pranaygp/vscode-css-peek
