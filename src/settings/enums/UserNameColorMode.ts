/*
Copyright 2021 Quirin Götz <codeworks@supercable.onl>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import PropTypes from 'prop-types';

/* TODO: This should be later reworked into something more generic */

export enum UserNameColorMode {
    Uniform = "uniform",
    PowerLevel = "powerlevel",
    MXID = "mxid",
}

/* We need this because multiple components are still using JavaScript */
export const UserNameColorModePropType = PropTypes.oneOf(Object.values(UserNameColorMode));