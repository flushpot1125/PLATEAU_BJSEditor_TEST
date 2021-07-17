import { Node } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import { fromScene } from "../tools";
import {MeshBuilder,Vector3,Mesh} from "@babylonjs/core";

/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameas
 *      - Transform nodes
 * 
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
export default class MyScript extends Node {
    /**
     * Override constructor.
     * @warn do not fill.
     */
     @fromScene("ground")
     __ground : Mesh;
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        let __scene = this._scene;
        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
        light.intensity = 0.7;
        let wcf =async function WebXRConfigration():Promise<void>{
            const env = __scene.createDefaultEnvironment();
            let xr = await __scene.createDefaultXRExperienceAsync({
                   floorMeshes: [env.ground]
            });

            //changed position when WebXR immersive-vr mode is active. 
            xr.baseExperience.camera.position.set(-3.8, 2, 11);

            xr.teleportation.addFloorMesh(this.__ground);
            xr.pointerSelection.attach();
            

            __scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline("ssao", __scene.activeCamera);
            __scene.postProcessRenderPipelineManager.supportedPipelines.forEach(pp=>{
                __scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline(
                    pp.name,
                    __scene.activeCamera
                );
           });

        }

        wcf();
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
    }

    /**
     * Called on a message has been received and sent from a graph.
     * @param message defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    public onMessage(name: string, data: any, sender: any): void {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    }
}
