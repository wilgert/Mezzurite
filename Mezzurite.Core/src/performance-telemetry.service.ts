// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { MezzuriteConstants } from './performance-constants';
import { PerformanceTimingService } from './performance-timing.service';
import { MezzuriteUtils } from './performance-utils.service';

/**
 * Class containing core telemetry functions
 */
export class PerformanceTelemetryService {

    /**
     * Starts capture cycle period
     */
    static startCaptureCycle(){  
        if (!(<any>window).mezzurite.captureCycleStarted){
            (<any>window).mezzurite.startTime = window.performance.now();
            (<any>window).mezzurite.captureCycleStarted = true;
            (<any>window).mezzurite.captureTimer = setTimeout(function(){
                PerformanceTelemetryService.captureTimings();
            },MezzuriteConstants.captureCycleTimeout)
        }
    };

    /**
     * Captures timings for the given period
     * @param isRedirect Bool dictating whether timings were captured at end of cycle or early
     */
    static captureTimings(isRedirect = false){
        clearTimeout((<any>window).mezzurite.captureTimer);
        (<any>window).mezzurite.endTime = window.performance.now();
        if (!(<any>window).mezzurite.captureCycleStarted){
            (<any>window).mezzurite.captureCycleStarted = true;
        }
        PerformanceTelemetryService.submitTelemetry(isRedirect);
        (<any>window).mezzurite.captureCycleStarted = false;
    };

    /**
     * Creates timings object to send to telemetry
     * @param isRedirect isRedirect bool
     * 
     * Timing object is an array of of objects with each object having three key/value pairs
     * 
     * [
     *  {metricType=<string>, value=<number>, data=<string> }
     * ]
     * 
     * metricType is one of the following:
     *  ALT, VLT, FVLT, RouteUrl, Redirect, AllComponents
     * 
     * value is a number value for the metric, -1 means no value.
     * 
     * data is a stringified json.  
     */
    static submitTelemetry(isRedirect: boolean): void {
        let timings: any[] = [];
        // add redirect value
        timings.push(MezzuriteUtils.createMetric(MezzuriteConstants.redirect, isRedirect === false ? 0 : 1))

        // calculate component measures off slowest resource values
        if ((<any>window).mezzurite.elementLookup !== {}){
            PerformanceTimingService.calculateSlowestResourceBatch();
        }
        // all components
        var components = PerformanceTimingService.getCurrentComponents();
        if ((<any>window).mezzurite.routerPerf){
            var altMeasure;
            var vltResults;
            
            // vlt
            if (components.length > 0){
                vltResults = PerformanceTimingService.calculateVlt();
                timings.push(MezzuriteUtils.createMetric(MezzuriteConstants.vltName, vltResults.vlt, vltResults.components));
            }
            // alt/fvlt
            if ((<any>window).mezzurite.firstViewLoaded === false){
                altMeasure = (<any>window).mezzurite.measures.filter((m:any) => m.name.indexOf(MezzuriteConstants.altName) > -1)[0];
                timings.push(MezzuriteUtils.createMetric(MezzuriteConstants.altName, altMeasure.componentLoadTime));
                // adding fvlt timing.
                timings.push(MezzuriteUtils.createMetric(MezzuriteConstants.fvltName, vltResults.vlt + altMeasure.componentLoadTime));
                (<any>window).mezzurite.firstViewLoaded = true;
            }
        }
        if (components.length > 0){
            timings.push(MezzuriteUtils.createMetric(MezzuriteConstants.allComponents, -1, components));
        }
        this.log(timings);
        MezzuriteUtils.testReset();
    };

    /**
     * Adds remaining metadata to send to logger and dispatches event
     * @param timings 
     */
    static log(timings: any){
        if ((<any>window).mezzurite){
            if (timings.length > 1){
                const obj = {
                    Timings: timings,
                    Framework: {
                        name: (<any>window).mezzurite.packageName,
                        version: (<any>window).mezzurite.packageVersion
                    },
                    ViewportWidth: (<any>window).mezzurite.viewportWidth,
                    ViewportHeight: (<any>window).mezzurite.viewportHeight,
                    RouteUrl: (<any>window).mezzurite.routeUrl
                }
                // log to console when developing locally
                if ((<any>window).location.href.indexOf("localhost") > -1){
                    console.log("to log for testing: ",obj);
                }
                if ((<any>window).mezzurite.EventElement)
                {
                    (<any>window).mezzurite.EventElement.dispatchEvent(new CustomEvent('Timing', {detail: obj}));
                }
            }
            else {
                console.log("nothing for Mezzurite to log.");
            }
        }
    };

    /**
     * Checks whether window.performance is undefined
     */
    static compatibilityCheck(){
        const isCompatible = (window.performance !== undefined);
        if (!isCompatible){
               const timings = [MezzuriteUtils.createMetric(MezzuriteConstants.unsupportedBrowserName, -1, MezzuriteConstants.unsupportedBrowserPerf)]
            this.log(timings);
        }
        return isCompatible;
    }
}