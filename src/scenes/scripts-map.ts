import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap extends ScriptMap {
	"src/scenes/scene/WebXRConfiguration.ts": any;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/scene/WebXRConfiguration.ts": require("./scene/WebXRConfiguration"),
}
