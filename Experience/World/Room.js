import Experience from "../Experience";
import * as THREE from 'three';
export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.setModel();
        this.setAnimation();
    }
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        console.log(this.room);

        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    };
    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }

            if (child.name === "AquaGlass") {
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xc2ebff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }
            if (child.name === "screenTV") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.videokda,
                });
            }
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
    };
    resize() {
    }
    update() {
        this.mixer.update(this.time.delta * 0.0009);
    }
}