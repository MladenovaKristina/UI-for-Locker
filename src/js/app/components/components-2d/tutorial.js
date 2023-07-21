import ConfigurableParams from '../../../data/configurable_params';
import { Tween, Black, Graphics, Sprite, DisplayObject, TextField, Ease, Timer, ColorScatter } from '../../../utils/black-engine.module';
import UTween from '../../helpers/../../utils/utween';
import { TutorialHand } from './tutorial-hand';
export default class Hint extends DisplayObject {
    constructor(uiElements) {
        super();

        this.scaleX = 1;
        this.scaleY = 1;

        this.visible = true;

        this._uiElements = [];
        this._overflow = null;
        this._spacing = [];

        this._hand = null;
        this._moveTween = null;
        this._bb = Black.stage.bounds;

        this._hintTimer = null;
        this._counter = 0; // Initialize the counter property
    }

    onResize(scene) {
        this.stopHint();

        this._uiElements = scene._uiElements;
        this._overflow = scene._overflow;

        this._bb = Black.stage.bounds;
        this.startHint(scene._spacing);
    }

    onAdded() {
        // this._sign.blendMode = 'mask';
        this._hand = new TutorialHand();

        this.add(this._hand);

        if (ConfigurableParams.getData()['hint']['starting_hint_type']['value'] === 'INFINITY ONLY') this._hand.visible = false;
    }

    show() {
        if (ConfigurableParams.getData()['hint']['starting_hint_type']['value'] === 'NONE') return;
        this.visible = true;
    }

    startHint(spacing) {
        this._hintTimer = new Timer(1.2, Infinity);
        this.add(this._hintTimer);

        const getCounter = function () {
            let value = 0;
            return function () { return value++; };
        };
        const count = getCounter();

        this._hintTimer.on('tick', msg => {
            this._makeStep(count, spacing);
        });
        this._makeStep(count, spacing);
    }

    _makeStep(count, spacing) {
        this.visible = true;

        const activeItems = this._uiElements;
        const index = count() % activeItems.length;

        if (activeItems.length <= 0) this._hand.visible = false;
        else this._hand.visible = true;

        if (Black.stage.bounds.width > Black.stage.bounds.height) {
            this._hand.x = spacing[index] - activeItems[index].width / 2 - this._hand.width * 0.2;
        }
        else {

            this._hand.x = spacing[index] - activeItems[index].width / 2 - this._hand.width * 0.2;
        }


        this.tap();
    }

    tap() {
        this._hand.y = this._bb.bottom - this._hand.height * 1.2;

        this._moveTween = new Tween(
            { y: [this._hand.y - 30, this._hand.y + 30] },
            0.5,
            { ease: Ease.sinusoidalInOut }
        );

        this._hand.add(this._moveTween);
    }

    stopHint() {
        if (this._hintTimer) {
            this._hintTimer.stop();
            this._hintTimer = null;
        }

        if (this._moveTween) {
            this._moveTween.stop();
            this._moveTween = null;
        }
    }

    hide() {
        const hideTween = new Tween(
            { y: Black.stage.bounds.bottom + 250 },
            0.2
        );

        this.add(hideTween);

        hideTween.on('complete', msg => (this.visible = false));
    }
}
