import { Color, Mesh, MeshBasicMaterial, Scene } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";

export default class TWaitingScene extends Scene
{
    constructor()
    {
        super();
        this._Init();
    }

    public _Init() : void
    {
        this._CreateText("fonts/Fonts_Json/S-Core Dream 6 Bold_Regular.json","Welcome To Torizon!",-7.5,3,-10);
        this._CreateText("fonts/Fonts_Json/S-Core Dream 3 Light_Regular.json","Press Typing 'Level (1 ~ 3)'",-8.5,1,-10);
    }

    public _CreateText(_Url : string,_Text : string, x : number, y : number, z : number) : void
    {
        const _TFontLoader = new FontLoader();

        _TFontLoader.load(_Url,(font : Font) =>
        {
            let _TText = new TextGeometry(_Text,
            {
                font:font,
                size : 1,
                height : 0,
                curveSegments : 12
            });

            _TText.computeBoundingBox();

            _TText.translate(x,y,z);

            const _Color = new Color('#0075FF');
            const _Material = new MeshBasicMaterial({color:_Color});

            let _TextMesh = new Mesh(_TText, _Material);
            this.add(_TextMesh);
        });
    }
}