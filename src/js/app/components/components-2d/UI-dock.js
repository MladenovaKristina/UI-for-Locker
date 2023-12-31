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
        // Resize logic goes here if needed.
    }

    initView() {
        const bb = Black.stage.bounds;
        const height = 200;
        const centerY = bb.bottom - height / 2 - 100;


        this.highlight = new Graphics();
        this.highlight.fillStyle(0xffffff, 1);
        this.highlight.circle(0, 0, 100);
        this.highlight.fill();
        this.highlight.visible = false;
        this.add(this.highlight);

        this._bg = new GameObject();
        this._bg.width = bb.width;
        this._bg.height = height;
        this.add(this._bg);

        this._banner = new Graphics();
        this._banner.fillStyle(0xFFFFFF, 0.7);
        this._banner.rect(bb.left, centerY - height / 2, bb.width, height);
        this._banner.fill();
        this.add(this._banner);

        this.initObjects(this._banner);

    }

    initObjects() {
        this._objects = new UIObjects(this._sceneNumber, this._banner);
        this.add(this._objects);
    }

    showHighlight(object) {

        if (this._sceneNumber == 0) {
            this.highlight.x = object.x + object.width * 0.58;
            this.highlight.y = Black.stage.bounds.bottom - object.height / 6;
        }
        else {
            this.highlight.x = object.x + object.width / 2;
            this.highlight.y = object.y + object.height / 2;
        } this.highlight.visible = true;

    }

    hideHighlight(object) {
        if (this._sceneNumber == 0) {

        }
        else
            this.highlight.visible = false;
    }
}
