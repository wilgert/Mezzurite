// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Global Mezzurite object
 */
export class MezzuriteObject {
    firstViewLoaded: boolean;
    captureCycleStarted: boolean;
    routerPerf: boolean;
    measures: object;
    defaultLogs: object;
    childElementNames: object;
    slowestResource: object;
    currentComponents: object;
    vltComponentLookup: object; // bool lookup table indicating if component itersects viewport
    elementLookup: object; // DOM elements mapped to component
    componentMountLookup: object; // lookup for component mount status

    constructor() {
        this.firstViewLoaded = false;
        this.captureCycleStarted = false;
        this.routerPerf = false;
        this.measures = [];
        this.defaultLogs = [];
        this.childElementNames = {};
        this.slowestResource = {};
        this.currentComponents = {};
        this.vltComponentLookup = {};
        this.elementLookup = {};
        this.componentMountLookup = {};
    }
}