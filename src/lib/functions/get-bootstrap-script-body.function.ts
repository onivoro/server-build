export function getBootstrapScriptBody(region: string, bucket: string, app: string) {
    return `
    var loadConfig = {
        bucket: '${bucket}',
        region: '${region}',
        toLoad: {
            'script': {
                '${app}': ['runtime.js', 'polyfills.js', 'main.js'],
            },
            'link': {
                '${app}': ['styles.css']
            }
        }
    };

    Object.entries(loadConfig.toLoad).forEach((configs) => {
        const type = configs[0];
        const segregatedConfigs = configs[1];
        Object.entries(segregatedConfigs).forEach((segregatedConfig) => {
            const folder = segregatedConfig[0];
            const files = segregatedConfig[1];
            const prefix = \`https://s3.\${loadConfig.region}.amazonaws.com/\${loadConfig.bucket}\`;

            files.forEach(file => {
                const element = document.createElement(type);
                const path = \`\${prefix}/\${folder}/\${file}\`;

                if (type === 'link') {
                    element.setAttribute('href', path);
                    element.setAttribute('rel', 'stylesheet');
                    document.head.appendChild(element);
                } else if (type === 'script') {
                    element.setAttribute('src', path);
                    element.setAttribute('type', 'module');
                    element.onload = console.warn('onload', path);
                    element.onerror = console.warn('onerror', path);
                    document.head.appendChild(element);
                }
            });
        });
    });

    const l = document.createElement('link');
    l.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');
    l.setAttribute('rel', 'stylesheet');
    document.head.appendChild(l);`;
}