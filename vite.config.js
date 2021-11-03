import { UserConfigExport, ConfigEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// const serverUrl = 'http://bim.bnerc.com';
const serverUrl = 'http://test.bnerc.com';
export default ({ command }) => {
  let prodMock = true;
  return {
    plugins: [
      vue(),
    ],
    base: "./",//打包路径
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')//设置别名
      }
    },
    server: {
      port: 8080,//启动端口
      open: true,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: serverUrl,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/')
        }
      },
      cors: true
    }
  }
}
