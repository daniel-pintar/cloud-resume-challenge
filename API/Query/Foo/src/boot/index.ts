import * as LamDION from "@di-on-solutions/lamdion";

export const handler = LamDION.Bootstrap(async (event: any) => {
    console.log(event)
});