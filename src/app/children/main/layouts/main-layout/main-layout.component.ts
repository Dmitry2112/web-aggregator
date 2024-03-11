import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainFooterComponent } from '../../components/main-footer/main-footer.component';
import { RouterOutlet } from '@angular/router';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';

@Component({
    selector: 'main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./styles/main-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MainHeaderComponent, RouterOutlet, MainFooterComponent]
})
export class MainLayoutComponent { }
