require('esbuild')
    .build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        outfile: 'dist/action-prender.js',
    })
    .catch(() => process.exit(1));
