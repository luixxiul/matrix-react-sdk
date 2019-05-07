/*
Copyright 2019 New Vector Ltd

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

import { MATRIXTO_URL_PATTERN } from '../linkify-matrix';
import { PlainPart, UserPillPart, RoomPillPart } from "./parts";

function parseHtmlMessage(html) {
    const REGEX_MATRIXTO = new RegExp(MATRIXTO_URL_PATTERN);
    const nodes = Array.from(new DOMParser().parseFromString(html, "text/html").body.childNodes);
    const parts = nodes.map(n => {
        switch (n.nodeType) {
            case Node.TEXT_NODE:
                return new PlainPart(n.nodeValue);
            case Node.ELEMENT_NODE:
                switch (n.nodeName) {
                    case "MX-REPLY":
                        return null;
                    case "A": {
                        const {href} = n;
                        const pillMatch = REGEX_MATRIXTO.exec(href) || [];
                        const resourceId = pillMatch[1]; // The room/user ID
                        const prefix = pillMatch[2]; // The first character of prefix
                        switch (prefix) {
                            case "@": return new UserPillPart(resourceId);
                            case "#": return new RoomPillPart(resourceId);
                            default: return new PlainPart(n.innerText);
                        }
                    }
                    default:
                        return new PlainPart(n.innerText);
                }
        }
    }).filter(p => !!p);
    return parts;
}

export default function parseEvent(event) {
    const content = event.getContent();
    if (content.format === "org.matrix.custom.html") {
        return parseHtmlMessage(content.formatted_body);
    } else {
        return [new PlainPart(content.body)];
    }
}
