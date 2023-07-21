import { Black, Graphics, Sprite, DisplayObject, GameObject } from '../../../utils/black-engine.module';

export default class UIObjects extends DisplayObject {
    constructor(sceneNumber, dock) {
        super();
        this._dock = dock;
        this._sceneNumber = sceneNumber;
        this._objectNumber = null;
        this._selectObjectNumber = 1;
        this._overflow = false;
        this._desiredHeight = 200;
        this._initView();
    }

    _initView() {
        this._spacing = [];

        if (this._sceneNumber === 3) {
            this._objectNumber = 4;
        } else {
            this._objectNumber = 3;
        }

        const bb = Black.stage.bounds;
        const height = this._desiredHeight;
        const positionY = bb.bottom - height;
        const centerX = bb.width / 2;

        if (this._sceneNumber === 0) {
            this._initColorObjects(height);
        } else {
            this._initSpriteObjects(height, positionY, centerX);
        }
    }

    _initColorObjects(height) {
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
    }

    _initSpriteObjects(height, positionY, centerX) {
        const spriteCategories = ['wallpaper', 'light', 'decoration', 'spray', 'sticker'];
        const category = spriteCategories[this._sceneNumber - 1];

        for (let i = 0; i <= this._objectNumber; i++) {
            const spriteName = `${category}_${i}`;
            const element = new Sprite(spriteName);

            const aspectRatio = element.width / element.height;
            element.height = height;
            element.width = height * aspectRatio;
            element.y = positionY - height / 2;

            this._dock.addChild(element);
        }

        this.reposition();
    }

    reposition() {
        this._spacing = [];
        let height = this._desiredHeight;
        let availableSpace = window.innerWidth;

        if (this._dock.mChildren.length > 0) {
            const isLandscape = Black.stage.bounds.width > Black.stage.bounds.height;
            const childrenCount = this._dock.mChildren.length;
            const totalChildrenWidth = this._dock.mChildren.reduce((totalWidth, element) => totalWidth + element.width, 0);

            let currentX, positionY, spacing;

            const childrenHalved = Math.ceil(this._dock.mChildren.length / 2);
            if (isLandscape) {
                const bb = Black.stage.bounds;
                positionY = bb.bottom - height - height / 2;
                spacing = ((availableSpace - totalChildrenWidth) / (childrenCount + 1) + availableSpace / childrenHalved) / childrenHalved;
                currentX = 0 - spacing;

                if (this._sceneNumber == 5 || this._sceneNumber == 2 || this._sceneNumber == 3) {
                    this._desiredHeight *= 0.9;
                    this._overflow = true;
                    positionY -= this._desiredHeight * 0.2;

                    currentX = 0 - spacing;
                    spacing *= 1.5;
                }
                if (this._sceneNumber == 3) {
                    positionY -= this._desiredHeight * 0.05;
                    currentX = 0;
                }
                if (this._sceneNumber == 4) {
                    positionY -= this._desiredHeight * 0.05;
                    currentX = spacing;
                    spacing *= 1.2;
                }
            } else {
                const bb = Black.stage.bounds;
                positionY = bb.bottom - height - height / 2;
                spacing = ((availableSpace - totalChildrenWidth) / (childrenCount + 1) + availableSpace / childrenHalved) / childrenHalved;
                currentX = 0;

                if (this._sceneNumber == 5 || this._sceneNumber == 2 || this._sceneNumber == 3) {
                    this._desiredHeight *= 0.9;
                    this._overflow = true;
                    positionY -= this._desiredHeight * 0.2;

                    currentX = spacing;
                }
                if (this._sceneNumber == 3) {
                    positionY -= this._desiredHeight * 0.05;
                    currentX = spacing * 4;
                }
                if (this._sceneNumber == 4) {
                    positionY -= this._desiredHeight * 0.05;
                    currentX = spacing;
                    spacing *= 1.2;
                }
            }



            for (let i = 0; i < childrenCount; i++) {
                this.visible = true;
                this.active = false;
                const element = this._dock.mChildren[i];
                element.x = currentX;
                const aspectRatio = element.width / element.height;
                element.height = this._desiredHeight;
                element.width = this._desiredHeight * aspectRatio; element.y = positionY;

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
            console.log(objects[i].x);
        }
    }
}
