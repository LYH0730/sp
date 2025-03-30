import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// MSW 초기화 함수를 정의합니다.
async function initMSW() {
  if (import.meta.env.MODE === 'development') {
    // 개발 모드일 때만 MSW를 초기화합니다.
    const { worker } = await import('./mocks/browser');
    worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: { scope: '/' }
      },
      onUnhandledRequest: 'bypass'  // 핸들되지 않은 요청은 원래대로 통과시킵니다.
    }).then(() => {
      console.log('[MSW] 🚀 서비스 워커 시작 완료!');
    });
  }
}

// 애플리케이션을 시작합니다.
function startApp() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// MSW를 초기화하고 앱을 시작합니다.
initMSW().then(startApp);
