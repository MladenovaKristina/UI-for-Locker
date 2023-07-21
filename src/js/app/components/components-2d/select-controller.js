import { Tween, Black, Sprite, DisplayObject, MessageDispatcher, Ease } from '../../../utils/black-engine.module';
import Helpers from '../../helpers/helpers';

export default class SelectController extends DisplayObject {
    constructor(objects, dock) {
        super();
        this._objects = objects;
        this._dock = dock;
        this._selectAmount = null;
        this.messageDispatcher = new MessageDispatcher();
        this.onSelectEvent = 'onSelectEvent';
        this.onDeselectEvent = 'onDeselectEvent';
        this.selectedObject = null;
        this._initCheckmark();
        this.objectsLength = this._objects.length;
    }
    onResize() {
        const bb = Black.stage.bounds;

        this._checkmark.x = bb.right - this._checkmark.width;
        this._checkmark.y = bb.height / 2;
    }
    _initCheckmark() {
        const bb = Black.stage.bounds;
        this._checkmark = new Sprite('check');
        const aspectRatio = this._checkmark.width / this._checkmark.height;
        this._checkmark.height = 100;
        this._checkmark.width = this._checkmark.height * aspectRatio;
        this._checkmark.x = bb.right - this._checkmark.width;
        this._checkmark.y = bb.height / 2;
        this.add(this._checkmark);
        this._checkBounds = this._checkmark.getBounds();
    }

    selectOne() {
        this._selectAmount = 1;
    }

    selectAll() {
        this._selectAmount = this.objectsLength;
    }

    onDown(x, y) {
        this.getObjectAtPosition(x, y);
    }

    getObjectAtPosition(x, y) {
        const clickedObject = this._objects.find((object) => {
            const objectBounds = object.getBounds();
            return (
                x >= objectBounds.x &&
                x <= objectBounds.x + objectBounds.width &&
                y >= objectBounds.y &&
                y <= objectBounds.y + objectBounds.height
            );
        });

        if (this._selectAmount === 1 && clickedObject === this.selectedObject) {
            this.deselect(clickedObject);
        } else if (clickedObject) {
            this.select(x, y, clickedObject);
        }

        if (
            x >= this._checkBounds.x &&
            x <= this._checkBounds.x + this._checkBounds.width &&
            y >= this._checkBounds.y &&
            y <= this._checkBounds.y + this._checkBounds.height
        ) {
            this.activate();
        }
    }

    activate() {
        console.log("activate");
    }

    select(x, y, object) {
        if (this._selectAmount === 1) {
            this.deselect(this.selectedObject);
            if (object !== this.selectedObject) {
                this.selectedObject = object;
                this._dock.showHighlight(this.selectedObject);
                const selectedIndex = this._objects.indexOf(object);
                this.messageDispatcher.post(this.onSelectEvent, selectedIndex);
            } else {
                this._dock.hideHighlight(this.selectedObject);

                this.selectedObject = null;
                const selectedIndex = this._objects.indexOf(object);
                this.messageDispatcher.post(this.onDeselectEvent, selectedIndex);
            }
        } else {
            if (object === this.selectedObject) {
                this.deselect(object);
            } else {
                this.selectedObject = object;
                this._dock.showHighlight(this.selectedObject);
                const deselectedIndex = this._objects.indexOf(object);
                this.messageDispatcher.post(this.onSelectEvent, deselectedIndex);
            }
        }
    }

    deselect(object) {
        if (object) {
            this._dock.hideHighlight(object);
            this.messageDispatcher.post(this.onDeselectEvent, { deselectedObject: object });
            this.selectedObject = null;
        }
    }
}
