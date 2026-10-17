export type HudPanel = 'crew' | 'log' | 'chat' | 'bacon';
export interface HudState { theme:'light'|'dark'; tilt:boolean; hudPanel:HudPanel|null; bacon:number; }
export declare const hudPanels:Record<HudPanel,{title:string;icon:string;render:(count:number)=>string}>;
export declare function HudDock(activePanel:HudPanel|null):string;
export declare function HudDrawer(activePanel:HudPanel|null,count:number):string;
export declare function HudShell(state:HudState,mapMarkup:string):string;
