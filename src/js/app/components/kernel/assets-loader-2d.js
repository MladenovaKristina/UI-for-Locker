import { AssetManager, GameObject } from '../../../utils/black-engine.module';
import hint_mickey from '../../../data/textures/hint_mickey.png';
import hint_simple from '../../../data/textures/hint_simple.png';
import hint_original from '../../../data/textures/hint_original.png';
import infinity_sign from '../../../data/textures/infinity_sign.png';
import btn_outline from '../../../data/textures/btn_outline.png';
import btn_color from '../../../data/textures/btn_color.png';
import btn_back from '../../../data/textures/btn_back.png';

import text_banner from '../../../data/textures/UI/text-banner.png';
import check from '../../../data/textures/UI/check.png';

import spray_0 from '../../../data/textures/UI/red-spray.png';
import spray_1 from '../../../data/textures/UI/blue-spray.png';
import spray_2 from '../../../data/textures/UI/purple-spray.png';
import spray_3 from '../../../data/textures/UI/yellow-spray.png';
import spray_4 from '../../../data/textures/UI/green-spray.png';

import decoration_0 from '../../../data/textures/UI/cube.png';
import decoration_1 from '../../../data/textures/UI/decor.png';
import decoration_2 from '../../../data/textures/UI/TEDDY.png';
import decoration_3 from '../../../data/textures/UI/scissors.png';
import decoration_4 from '../../../data/textures/UI/flower.png';
import decoration_5 from '../../../data/textures/UI/scissors.png';

import light_0 from '../../../data/textures/UI/droplight_002.png';
import light_1 from '../../../data/textures/UI/droplight_003.png';
import light_2 from '../../../data/textures/UI/droplight_005.png';
import light_3 from '../../../data/textures/UI/droplight_006.png';

import wallpaper_0 from '../../../data/textures/UI/wallpapaer_000.png';
import wallpaper_1 from '../../../data/textures/UI/wallpapaer_001.png';
import wallpaper_2 from '../../../data/textures/UI/wallpapaer_005 (2).png';
import wallpaper_3 from '../../../data/textures/UI/wallpapaer_006 (2).png';
import wallpaper_4 from '../../../data/textures/UI/wallpapaer_010 (2).png';

import ConfigurableParams from '../../../data/configurable_params';

export default class AssetsLoader2D extends GameObject {
  constructor() {
    super();

    this.loaded = 'loaded';
  }

  onAdded() {
    this._loadAssets();
  }

  _loadAssets() {
    const assets = new AssetManager();

    assets.enqueueImage('hint_mickey', hint_mickey);
    assets.enqueueImage('hint_simple', hint_simple);
    assets.enqueueImage('hint_original', hint_original);
    assets.enqueueImage('infinity_sign', infinity_sign);

    assets.enqueueImage('btn_outline', btn_outline);
    assets.enqueueImage('btn_color', btn_color);
    assets.enqueueImage('btn_back', btn_back);

    assets.enqueueImage('spray_0', spray_0);
    assets.enqueueImage('spray_1', spray_1);
    assets.enqueueImage('spray_2', spray_2);
    assets.enqueueImage('spray_3', spray_3);
    assets.enqueueImage('spray_4', spray_4);

    assets.enqueueImage('check', check);
    assets.enqueueImage('text_banner', text_banner);

    assets.enqueueImage('decoration_0', decoration_0);
    assets.enqueueImage('decoration_1', decoration_1);
    assets.enqueueImage('decoration_2', decoration_2);
    assets.enqueueImage('decoration_3', decoration_3);
    assets.enqueueImage('decoration_4', decoration_4);
    assets.enqueueImage('decoration_5', decoration_5);

    assets.enqueueImage('light_0', light_0);
    assets.enqueueImage('light_1', light_1);
    assets.enqueueImage('light_2', light_2);
    assets.enqueueImage('light_3', light_3);

    assets.enqueueImage('wallpaper_0', wallpaper_0);
    assets.enqueueImage('wallpaper_1', wallpaper_1);
    assets.enqueueImage('wallpaper_2', wallpaper_2);
    assets.enqueueImage('wallpaper_3', wallpaper_3);
    assets.enqueueImage('wallpaper_4', wallpaper_4);

    assets.enqueueImage('logo', ConfigurableParams.getData()["logo_for_google"]["change_logo"]["value"]);
    assets.enqueueImage('endscreen_logo', ConfigurableParams.getData()["endcard"]["logo"]["value"]);
    assets.enqueueImage('ref_image', ConfigurableParams.getData()["reference_photo"]["ref_photo"]["value"]);

    assets.on('complete', () => this.post(this.loaded));
    assets.loadQueue();
  }
}
