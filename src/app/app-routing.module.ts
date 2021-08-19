import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {GameDataResolver} from "./core/resolvers/game-data.resolver";
import {UserResolver} from "./core/resolvers/user.resolver";

const rootRoutes: Routes = [
  {
    path: 'browser',
    loadChildren: () => import('./pages/browser/browser.module').then(m => m.BrowserModule),
    resolve: {
      gameData: GameDataResolver
    }
  },
  {
    path: 'oauth',
    loadChildren: () => import('./pages/oauth/oauth.module').then(m => m.OauthModule),
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'embed',
    loadChildren: () => import('./pages/embedded/embedded.module').then(m => m.EmbeddedModule),
    resolve: {
      gameData: GameDataResolver
    }
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(m => m.PlayerModule),
    resolve: {
      gameData: GameDataResolver
    }
  },
  {
    path: '',
    redirectTo: 'browser',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: 'browser'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(rootRoutes, {
      anchorScrolling: 'disabled'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
