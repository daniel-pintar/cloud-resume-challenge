import * as LamDION from "@di-on-solutions/lamdion";
import {jsonObject, jsonMember} from "@di-on-solutions/lamdion";

@jsonObject
export class DemoPayload extends LamDION.EventPayload {

    @jsonMember
    public test: string;
}