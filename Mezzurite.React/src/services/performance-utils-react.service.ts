// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { MezzuriteUtils } from '@microsoft/mezzurite-core';
import { environment } from './react-environment';

/**
 * Extension of Mezzurite Utilities that gets package specific information
 */
export class MezzuriteReactUtils extends MezzuriteUtils {
  static createMezzuriteObject (obj: any) {
    super.createMezzuriteObject(obj);
    (window as any).mezzurite.packageVersion = environment.version;
    (window as any).mezzurite.packageName = environment.name;
  }
}
