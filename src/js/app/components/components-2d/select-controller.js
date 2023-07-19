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
        this._selectAmount = this._objects.length;
    }

    onDown(x, y) {
        this.getObjectAtPosition(x, y);
    }

    getObjectAtPosition(x, y) {
        const clickedObject = this._objects.find(object => {
            const objectBounds = object.getBounds();
            return (
                x >= objectBounds.x &&
                x <= objectBounds.x + objectBounds.width &&
                y >= objectBounds.y &&
                y <= objectBounds.y + objectBounds.height
            );
        });

        if (
            this._selectAmount === 1 &&
            clickedObject === this.selectedObject
        ) {
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
            // For selectAmount = 1, deselect the previously selected object, if any.
            this.deselect(this.selectedObject);

            if (object !== this.selectedObject) {
                // If the clicked object is different from the selected object, select it.
                this.selectedObject = object;
                this._dock.showHighlight(x, y);
                this.messageDispatcher.post(this.onSelectEvent, { selectedObject: object });
            } else {
                // If the clicked object is the same as the selected object, deselect it.
                this.selectedObject = null;
                this._dock.hideHighlight();
                this.messageDispatcher.post(this.onDeselectEvent, { deselectedObject: object });
            }
        } else {
            // For selectAmount > 1, we don't deselect when a new item is pressed.
            // We only deselect when a clicked item is clicked again.
            if (object === this.selectedObject) {
                this.deselect(object);
            } else {
                this.selectedObject = object;
                this._dock.showHighlight(x, y);
                this.messageDispatcher.post(this.onSelectEvent, { selectedObject: object });
            }
        }
    }


    deselect(object) {
        if (object) {
            this._dock.hideHighlight();
            this.messageDispatcher.post(this.onDeselectEvent, { deselectedObject: object });
            this.selectedObject = null;
        }
    }
}
