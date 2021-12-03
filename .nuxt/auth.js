import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { CookieScheme } from '~auth/runtime'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": {
    "login": "/auth",
    "logout": "/auth",
    "home": "/app/dashboard",
    "callback": "/auth"
  },
  "vuex": {
    "namespace": "auth"
  },
  "cookie": {
    "prefix": "auth.",
    "options": {
      "path": "/"
    }
  },
  "localStorage": {
    "prefix": "auth."
  },
  "defaultStrategy": "laravelSanctum"
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // laravelSanctum
  $auth.registerStrategy('laravelSanctum', new CookieScheme($auth, {
  "url": "http://dict.com/",
  "endpoints": {
    "csrf": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      "url": "http://dict.com/api/csrf-cookie",
      "method": "get"
    },
    "login": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      "url": "http://dict.com/api/v1/login",
      "method": "post"
    },
    "logout": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      "url": "http://dict.com/api/v1/logout",
      "method": "post"
    },
    "user": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      "url": "http://dict.com/api/user",
      "method": "get"
    }
  },
  "user": {
    "property": "data",
    "autoFetch": true
  },
  "token": {
    "property": "data.token",
    "required": true,
    "global": true,
    "type": "Bearer",
    "name": "Authorization",
    "maxAge": 2592000
  },
  "name": "laravelSanctum",
  "cookie": {
    "name": "XSRF-TOKEN"
  }
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
