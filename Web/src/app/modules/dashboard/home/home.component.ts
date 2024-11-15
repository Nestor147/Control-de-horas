
import { Component } from '@angular/core';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CoreComponentsModule,
    CoreDirectivesModule
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor()
  {
  }
}
