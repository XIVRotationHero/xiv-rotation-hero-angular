import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {GameDataResolver} from "./core/resolvers/game-data.resolver";

const rootRoutes: Routes = [
  {
    path: 'browser',
    loadChildren: () => import('./pages/browser/browser.module').then(m => m.BrowserModule),
    resolve: {
      gameData: GameDataResolver
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
export class AppRoutingModule {}
