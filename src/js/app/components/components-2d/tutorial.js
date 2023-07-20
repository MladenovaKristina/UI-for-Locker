import ConfigurableParams from '../../../data/configurable_params';
import { Tween, Black, Graphics, Sprite, DisplayObject, TextField, Ease, Timer, ColorScatter } from '../../../utils/black-engine.module';
import UTween from '../../helpers/../../utils/utween';
import { TutorialHand } from './tutorial-hand';

export default class Hint extends DisplayObject {
    constructor(uiElements) {
        super();

        this._sign = null;

        this.scaleX = 1;
        this.scaleY = 1;

        this.visible = true;

        this._uiElements = uiElements._uiElements;

        this._spacing = uiElements._spacing;

        this._bb = Black.stage.bounds;
    }

    onAdded() {
        // this._sign.blendMode = 'mask';
        this._hand = new TutorialHand();
        this._hand.x = this._spacing[0];

        this._hand.y = this._bb.bottom - this._uiElements[0].height / 10 * 2;

        this.add(this._hand);

        if (ConfigurableParams.getData()['hint']['starting_hint_type']['value'] === 'INFINITY ONLY') this._hand.visible = false;
        this.show();

    }

    show() {
        if (ConfigurableParams.getData()['hint']['starting_hint_type']['value'] === 'NONE') return;
        this.visible = true;
        this.startHint();
    }

    startHint() {
        this._hintTimer = new Timer(1.2, Infinity);
        this.add(this._hintTimer);

        const getCounter = function () {
            let value = 0;
            return function () { return value++; }
        }
        const count = getCounter();

        this._hintTimer.on('tick', msg => {
            this._makeStep(count);
        });

        this._hand.visible = true;
        this._makeStep(count);
    }

    _makeStep(count) {
        const activeItems = this._uiElements;

        const index = count() % activeItems.length;
        if (activeItems.length <= 0) this._hand.visible = false;
        else this._hand.visible = true;
        this._hand.x = this._spacing[index] - activeItems[index].width * 0.6;

        this.tap();
    }

    tap() {
        this._hand.y = this._bb.bottom - this._hand.height * 1.2;
        const moveTween = new Tween({
            y: [this._hand.y - 30, this._hand.y + 30]
        }, 0.5, { ease: Ease.sinusoidalInOut });
        this._hand.add(moveTween);
    }

    hide() {
        const hideTween = new Tween({
            y: Black.stage.bounds.bottom + 250
        }, 0.2);

        this.add(hideTween);

        hideTween.on('complete', msg => this.visible = false);
    }
}
