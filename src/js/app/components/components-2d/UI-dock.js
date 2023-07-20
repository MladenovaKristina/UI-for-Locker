import ConfigurableParams from '../../../data/configurable_params';
import { Tween, Black, Graphics, Sprite, DisplayObject, GameObject, Ease } from '../../../utils/black-engine.module';
import Helpers from '../../helpers/helpers';
import UIObjects from './UI-objects';
export default class UIDock extends DisplayObject {
    constructor(sceneNumber) {
        super();
        this._sceneNumber = sceneNumber;
        this._bg = null;
        this.highlight = null;
        this.initView();
        this.initObjects();

    }
    setSceneNumber(sceneNumber) {
        this._sceneNumber = sceneNumber;
        //resize
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
        this.add(this.highlight)

        this._bg = new GameObject();
        this._bg.width = bb.width;
        this._bg.height = height;
        this.add(this._bg);



        this._banner = new Graphics();
        this._banner.fillStyle(0xFFFFFF, 0.7);
        this._banner.rect(bb.left, centerY - height / 2, bb.width, height);
        this._banner.fill();

        this.add(this._banner);

    }

    initObjects() {
        this._objects = new UIObjects(this._sceneNumber, this._banner);
        this.add(this._objects)
    }

    showHighlight(object) {
        this.highlight.x = object.x + object.width / 2;
        this.highlight.y = object.y + object.height / 2;
        this.highlight.visible = true;
    }

    hideHighlight() {
        this.highlight.visible = false;
    }
}