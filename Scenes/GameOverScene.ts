import { Color, Mesh, MeshBasicMaterial, Scene } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import TGameLoop from "../GameLoop/GameLoop";
import { _ChangeStatePopup, _StatePopup } from "../InGame";
import TPlayer from "../Player/Player";

export default class TGameOverScene extends Scene
{
    private countDown : number = 30;
    private chance : number = 3;

    constructor()
    {
        super();
        this._Init();
    }

    get _GetterCountDown() : number
    {
        return this.countDown;
    }

    set _SetterCountDown(_Setter : number)
    {
        this.countDown = _Setter;
    }

    public _Init() : void
    {
        const _TFontLoader = new FontLoader();

        _TFontLoader.load("fonts/Fonts_Json/S-Core Dream 6 Bold_Regular.json",(font : Font) =>
        {
            let _TText = new TextGeometry("Tontinue?\nPress Typing 'Tontinue'",
            {
                font:font,
                size : 1,
                height : 0,
                curveSegments : 12
            });

            _TText.computeBoundingBox();
            _TText.translate(-8,3,-10);

            const _Color = new Color('rgb(255,255,255)');
            const _Material = new MeshBasicMaterial({color:_Color});

            let _TextMesh = new Mesh(_TText, _Material);
            this.add(_TextMesh);
        });
    }

    public _Update(_TGameLoop : TGameLoop, _TPlayer : TPlayer) : void
    {
        if (this.chance !== 0)
        {
            this.countDown -= 0.007;

            if (this.countDown <= 0)
            {
                _ChangeStatePopup("flex");
                _TPlayer._SetterGameOver = false;
                _TGameLoop._AddScene("Main");
                this.countDown = 30;
            }
        }
        else if (this.chance === 0)
        {
            _ChangeStatePopup("flex");
            _TPlayer._SetterGameOver = false;
            _TGameLoop._AddScene("Main");
            this.chance = 3;
        }
    }

    public  _ChanceMinus() : void
    {
        if (this.chance !== 0)
        {
            this.chance -= 1;
        }
    }
}