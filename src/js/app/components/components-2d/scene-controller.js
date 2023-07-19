import { Scene } from 'three';
import ConfigurableParams from '../../../data/configurable_params';
import { Tween, Black, Graphics, Sprite, DisplayObject, MessageDispatcher, Ease } from '../../../utils/black-engine.module';
import Helpers from '../../helpers/helpers';
import UIDock from './UI-dock';
export default class SceneController extends DisplayObject {
    constructor() {
        super();
        this._sceneNumber = 3;
        this._selectController = null;
        this._uiDock = null;
    }

    viewSelectController(selectController) {
        this._selectController = selectController;
        this.controller(this._sceneNumber);
    }

    onAdded() {
        this._initUIDock();
    }

    _initUIDock() {
        this._uiDock = new UIDock(this._sceneNumber);
        this.add(this._uiDock)
    }



    controller(sceneNumber) {
        this._uiDock.setSceneNumber(sceneNumber);
        if (this._sceneNumber == 0 || this._sceneNumber == 1 || this._sceneNumber == 2 || this._sceneNumber == 4) {
            this._selectController.selectOne();
        }

        if (this._sceneNumber == 3 || this._sceneNumber == 5) {
            this._selectController.selectAll();
        }
    }

    onDown(x, y) {
        this._selectController.onDown(x, y);
    }
}