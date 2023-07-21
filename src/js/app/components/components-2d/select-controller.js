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
        this.selectedObjects = [];
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

        if (this._selectAmount != null && clickedObject === this.selectedObject) {
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
        this._dock.hideHighlight(this.selectedObject);
        console.log("activate")
        for (let i = 0; i < this.selectedObjects.length; i++) {
            console.log(this.selectedObjects[i].mTextureName)
        }
        //uncomment this if you want the activate function to remove the items from the UI that have been activated on the scene
        this.hideSelectedObjects();
    }
    select(x, y, object) {
        if (this._selectAmount === 1) {
            this.deselect(this.selectedObject);
            if (object !== this.selectedObject) {
                this.selectedObject = object;
                this._dock.showHighlight(this.selectedObject);
                const selectedIndex = this._objects.indexOf(object);
                this.messageDispatcher.post(this.onSelectEvent, selectedIndex);
                // Add the object to the selectedObjects array
                this.selectedObjects.push(object);
            } else {
                this._dock.hideHighlight(this.selectedObject);
                this.selectedObject = null;
                const selectedIndex = this._objects.indexOf(object);
                this.messageDispatcher.post(this.onDeselectEvent, selectedIndex);
                // Remove the object from the selectedObjects array
                const index = this.selectedObjects.indexOf(object);
                if (index !== -1) {
                    this.selectedObjects.splice(index, 1);
                }
            }
        } else {
            if (object === this.selectedObject) {
                this.deselect(object);
            } else {
                this.selectedObject = object;
                this._dock.showHighlight(this.selectedObject);
                const deselectedIndex = this._objects.indexOf(object);
                this.messageDispatcher.post(this.onSelectEvent, deselectedIndex);
                // Add the object to the selectedObjects array
                this.selectedObjects.push(object);
            }
        }
    }


    deselect(object) {
        if (object) {
            this._dock.hideHighlight(object);
            this.messageDispatcher.post(this.onDeselectEvent, { deselectedObject: object });
            const index = this.selectedObjects.indexOf(object);
            if (index !== -1) {
                this.selectedObjects.splice(index, 1);
            }
        }
    }

    hideSelectedObjects() {

        for (let i = 0; i < this.selectedObjects.length; i++) {
            this.hide(this.selectedObjects[i])
            console.log("activated hidden")

        }
        this.selectedObjects = [];
    }
    show(object) {
        object.visible = true;

    }
    hide(object) {
        object.visible = false;

    }
}
