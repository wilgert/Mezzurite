﻿import { NgModule, ModuleWithProviders } from "@angular/core";
import { PerformanceTimingService } from "@ms/mezzurite-core";
import { MezzuriteDirective } from './angular-performance-directive';
import { RoutingService } from "./routing.service";

@NgModule({
    declarations: [MezzuriteDirective],
    exports: [MezzuriteDirective]
})
export class AngularPerfModule {
    static forRoot() : ModuleWithProviders {
        return {
            ngModule: AngularPerfModule,
            providers: [
                { provide: PerformanceTimingService, useFactory: createPerfTimingService },
                RoutingService
                // Add new services here.
            ]
        };
    }
}

export function createPerfTimingService() {
    return new PerformanceTimingService();
}

export {
    PerformanceTimingService,
    RoutingService
    // Add new services here.
};