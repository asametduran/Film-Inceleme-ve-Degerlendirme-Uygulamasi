export const router = {
  routes: {
    '/': () => import('./pages/home.js').then(module => module.default()),
    '/movie/:id': (params) => import('./pages/movieDetail.js').then(module => module.default(params.id)),
    '/profile': () => import('./pages/profile.js').then(module => module.default()),
    '/login': () => import('./pages/login.js').then(module => module.default()),
    '/register': () => import('./pages/register.js').then(module => module.default()),
    '/discover': () => import('./pages/discover.js').then(module => module.default())
  },

  init() {
    window.addEventListener('popstate', () => this.handleRoute());
    document.addEventListener('click', (e) => {
      if (e.target.matches('a')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        this.navigate(href);
      }
    });
    this.handleRoute();
  },

  async handleRoute() {
    const path = window.location.pathname;
    const route = this.matchRoute(path);
    
    if (route) {
      try {
        await route.handler(route.params);
      } catch (error) {
        console.error('Sayfa yüklenirken hata:', error);
        document.getElementById('app').innerHTML = '<div class="text-center py-8 text-red-500">Sayfa yüklenirken bir hata oluştu.</div>';
      }
    } else {
      document.getElementById('app').innerHTML = '<div class="text-center py-8">Sayfa Bulunamadı</div>';
    }
  },

  matchRoute(path) {
    for (const [pattern, handler] of Object.entries(this.routes)) {
      const paramNames = [];
      const regexPattern = pattern.replace(/:([^/]+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return '([^/]+)';
      });
      
      const match = path.match(new RegExp(`^${regexPattern}$`));
      
      if (match) {
        const params = {};
        paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        
        return { handler, params };
      }
    }
    return null;
  },

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }
};