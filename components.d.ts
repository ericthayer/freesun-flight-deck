export type Concept = 'map' | 'hud';
export type Theme = 'light' | 'dark';
export interface CrewRole { initials: string; name: string; role: string; bio: string; }
export declare const paths: Record<string,string>;
export declare function icon(name:string,cls?:string):string;
export declare function balloon(cls?:string):string;
export declare function cardHead(iconName:string,title:string,action?:string,label?:string):string;
export declare function weatherCard():string;
export declare function nextFlight():string;
export declare function crewCard():string;
export declare function logCard():string;
export declare function chatCard():string;
export declare function baconCard(count:number):string;
export declare const crewRoles:CrewRole[];
