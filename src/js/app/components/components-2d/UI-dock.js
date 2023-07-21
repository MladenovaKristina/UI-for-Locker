import { Black, Graphics, DisplayObject, GameObject } from '../../../utils/black-engine.module';
import UIObjects from './UI-objects';

export default class UIDock extends DisplayObject {
    constructor(sceneNumber) {
        super();
        this._sceneNumber = sceneNumber;
        this._bg = null;
        this.highlight = null;
        this.initView();
    }

    setSceneNumber(sceneNumber) {
        this._sceneNumber = sceneNumber;
        this.onResize();
    }

    initView() {
        this.createBackground();
        this.createHighlight();
        this.createBanner();
        this.initObjects();
        // Move this line here to add the highlight after the objects
    }

    createBackground() {
        const bb = Black.stage.bounds;
        const height = 200;
        this._bg = new GameObject();
        this._bg.width = bb.width;
        this._bg.height = height;
        this.add(this._bg);
    }

    createBanner() {
        const bb = Black.stage.bounds;
        const height = 200;
        const centerY = bb.bottom - height / 2 - 100;

        this._banner = new Graphics();
        this._banner.fillStyle(0xFFFFFF, 0.7);
        this._banner.rect(bb.left, centerY - height / 2, bb.width, height);
        this._banner.fill();

        this._bg.add(this._banner);
    }

    createHighlight() {
        this.highlight = new Graphics();
        this.highlight.fillStyle(0xffffff, 1);
        this.highlight.circle(0, 0, 100);
        this.highlight.fill();
        this.highlight.visible = false;
        this._bg.add(this.highlight);
    }

    initObjects() {
        this._objects = new UIObjects(this._sceneNumber, this._banner);
        this.add(this._objects);
    }

    showHighlight(object) {
        if (this._sceneNumber === 0) {
            this.highlight.x = object.x + object.width * 0.58;
            this.highlight.y = Black.stage.bounds.bottom - object.height / 6;
        } else {
            this.highlight.x = object.x + object.width / 2;
            this.highlight.y = object.y + object.height / 2;
        }
        this.highlight.visible = true;
    }

    hideHighlight() {
        if (this._sceneNumber !== 0) {
            this.highlight.visible = false;
        }
    }

    onResize() {
        const bb = Black.stage.bounds;
        const height = 200;
        const centerY = bb.bottom - height / 2 - 100;

        this._banner.clear();
        this._banner.fillStyle(0xFFFFFF, 0.7);
        this._banner.rect(bb.left, centerY - height / 2, bb.width, height);
        this._banner.fill();

        this._objects.onResize();
    }
}
