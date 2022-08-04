# lib / Library

## What is the purpose of this folder?

This folder contains any code which is shared across multiple components, or used "globally".

## Are there any subfolders which need explaining?

`constants` - Any constants which will be re-used
`hooks` - Any custom hooks which are used in at least 2 locations. If a hook is only used in one place, the code for it should go alongside the code using it.
`providers` - Any providers that are global, or used in at least 2 locations. Similar to the above, if a provider is only used in one place for a specific purpose, store it alongside the code using it.
`types` - Any types which will be re-used
`util` - Any utility functions that will be re-used, e.g. "truncate web3 address"
