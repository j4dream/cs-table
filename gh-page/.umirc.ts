import { defineConfig } from 'dumi';

export default defineConfig({
  title: '虚拟化表格',
  favicon: 'https://zh-hans.reactjs.org/favicon-32x32.png?v=f4d46f030265b4c48a05c999b8d93791',
  logo: 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/30362ec0-6160-4873-be5a-3b39551a5a27/5539ea9f0cf2a3b799810f25/placeholder/logo.png',
  outputPath: 'docs-dist',
  styles: [
    `
      .c-table .cell,
      .c-table .header,
      .s-table .header,
      .s-table .cell {
      display: flex;
        justify-content: center;
        align-items: center;
      }

      .text-center {
        text-align: center;
      }
    `,
    '.__dumi-default-layout-content { max-width: 1200px; margin: 0 auto; }',
    '.dc-container { max-width: 1000px; margin: 0 auto; }'
  ],
});
