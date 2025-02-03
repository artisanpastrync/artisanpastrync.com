import eslintPluginNext from '@next/eslint-plugin-next';
import prettier from 'eslint-plugin-prettier/recommended';
import typescriptEslint from 'typescript-eslint';

const ignores = [
    '.git/',
    '.next/',
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    '*.min.js',
    '*.config.js',
    '*.d.ts',
];

const config = typescriptEslint.config(
    { ignores },
    typescriptEslint.configs.recommended,
    {
        plugins: {
            '@next/next': eslintPluginNext,
        },
        rules: {
            ...eslintPluginNext.configs.recommended.rules,
            ...eslintPluginNext.configs['core-web-vitals'].rules,
        },
    },
    prettier,
    {
        rules: {
            '@typescript-eslint/no-empty-object-type': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            'sort-imports': 'off',
            'prettier/prettier': 'warn',
        },
    }
);

export default config;
