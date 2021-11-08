import * as LamDION from "@di-on-solutions/lamdion";
import {DemoPayload} from "../../../../Payload/DemoPayload";

export const handler = LamDION.AWSEventBridgeBoostrap(DemoPayload, async (event) => {
    console.log(event.EventPayload)
});