import { Tween, Black, Graphics, Sprite, DisplayObject, GameObject, Ease } from '../../../utils/black-engine.module';
import Helpers from '../../helpers/helpers';
import ConfigurableParams from '../../../data/configurable_params';

export default class UIObjects extends DisplayObject {
    constructor(sceneNumber, dock) {
        super();
        this._dock = dock;
        this._sceneNumber = sceneNumber;
        this._objectNumber = null;
        this._selectObjectNumber = 1;
        this._overflow = false;
        this._initView();
    }

    _initView() {
        this._spacing = [];

        if (this._sceneNumber === 3) this._objectNumber = 4;
        else this._objectNumber = 3;
        const bb = Black.stage.bounds;

        const height = 200;
        const positionY = bb.bottom - height;
        const centerY = bb.bottom - height / 2 - 100;
        const centerX = bb.width / 2;

        if (this._sceneNumber === 0) {
            const colors = [0xFFFF00, 0xFF0000, 0x800080, 0x0000FF];
            const circleSize = 70;



            for (let i = 0; i < colors.length; i++) {
                const color = new Graphics();
                color.fillStyle(colors[i], 1);
                color.circle(0 + circleSize / 0.7, height / 2, circleSize);
                color.fill();

                const colorContainer = new GameObject();
                colorContainer.addChild(color);

                this._dock.addChild(colorContainer);
            }
        } else {
            const spriteCategories = ['wallpaper', 'light', 'decoration', 'spray', 'sticker'];
            const category = spriteCategories[this._sceneNumber - 1];

            for (let i = 0; i <= this._objectNumber; i++) {
                const spriteName = `${category}_${i}`;
                const element = new Sprite(spriteName);

                const aspectRatio = element.width / element.height;
                const desiredHeight = height;
                element.height = desiredHeight;
                element.width = desiredHeight * aspectRatio;
                element.y = positionY - height / 2;

                this._dock.addChild(element);
            } this.reposition();


        }

    }
    reposition() {
        let height = 200;
        let availableSpace = window.innerWidth;
        console.log(availableSpace)

        if (this._dock.mChildren.length > 0) {
            const isLandscape = Black.stage.bounds.width > Black.stage.bounds.height;
            const childrenCount = this._dock.mChildren.length;
            const totalChildrenWidth = this._dock.mChildren.reduce((totalWidth, element) => totalWidth + element.width, 0);

            let currentX, positionY, spacing;
            if (totalChildrenWidth > availableSpace) { this._overflow = true }

            const childrenHalved = (Math.ceil(this._dock.mChildren.length / 2));
            if (isLandscape) {
                const bb = Black.stage.bounds;
                positionY = bb.bottom - height - height / 2;
                spacing = 30;
                currentX = 0 + spacing;
            } else {
                const bb = Black.stage.bounds;
                positionY = bb.bottom - height - height / 2;
                spacing = (availableSpace - totalChildrenWidth) / (childrenCount + 1) + availableSpace / childrenHalved;
                currentX = spacing;
            }

            for (let i = 0; i < childrenCount; i++) {
                this.visible = true;
                this.active = false;
                const element = this._dock.mChildren[i];
                element.y = positionY;
                element.x = currentX;
                currentX += element.width + spacing;
                this._spacing.push(currentX);
            }
        }
    }
    onResize() {
        this._spacing = [];
        this.reposition();
    }
    size(objects) {
        for (let i = 0; i < objects.length; i++) {
            objects[i].width *= 0.8;
            objects[i].height *= 0.8;
            this._overflow = true;
            console.log(objects[i].x)

        }
    }

}
