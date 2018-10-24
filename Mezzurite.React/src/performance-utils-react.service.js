// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { MezzuriteUtils } from "@ms/mezzurite-core";
import pkg from "../package";

export class MezzuriteReactUtils extends MezzuriteUtils{
    static createMezzuriteObject(){
        super.createMezzuriteObject();
        window.mezzurite.packageVersion = pkg.version;
        window.mezzurite.packageName = pkg.name;
    }
}