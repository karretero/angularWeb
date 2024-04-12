import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@/core/app.component';
import { config } from '@/core/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
