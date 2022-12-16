import { Color, Group, Mesh, MeshBasicMaterial, Scene, Vector3 } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import TGameLoop from "../GameLoop/GameLoop";
import TInGameScene from "./InGameScene";


export default class TReadyScene extends Scene
{
    private _LevelName : string;
    private _LevelSubName : string;
    private _LevelTruck : string;

    private _Timer : number = 5;
    private _Vec3 : Vector3;

    constructor(_LName : string, _SName : string, _Truck : string, _Vec3 : Vector3)
    {
        super();

        this._LevelName = _LName;
        this._LevelSubName = _SName;

        this._LevelTruck = _Truck;
        this._Vec3 = _Vec3;

        this._Init();
    }

    public _Init() : void
    {
        this._CreateText("fonts/Fonts_Json/S-Core Dream 6 Bold_Regular.json",this._LevelName,-15,3,-10, 2);
        this._CreateText("fonts/Fonts_Json/S-Core Dream 3 Light_Regular.json",this._LevelSubName,-15,1,-10, 1);
        this.CreateTruckModel(this._LevelTruck, this._Vec3);
    }

    public _Update(_TGameLoop : TGameLoop, _TargetModel : string ,_InGameScene : TInGameScene, 
        _Speed : number, _LevelIndex : number) : void
    {
        this._Timer -= 0.01;

        if (this._Timer < 0)
        {
            _TGameLoop._AddScene("Start");
            _InGameScene._SpawnEnemy(_TargetModel, _Speed, _LevelIndex);
            this._Timer = 5;
        }
    }

    public _CreateText(_Url : string,_Text : string, x : number, y : number, z : number , _Size : number) : void
    {
        const _TFontLoader = new FontLoader();

        _TFontLoader.load(_Url,(font : Font) =>
        {
            let _TText = new TextGeometry(_Text,
            {
                font:font,
                size : _Size,
                height : 0,
                curveSegments : 12
            });

            _TText.computeBoundingBox();

            _TText.translate(x,y,z);

            const _Color = new Color('rgb(255,255,255)');
            const _Material = new MeshBasicMaterial({color:_Color});

            let _TextMesh = new Mesh(_TText, _Material);
            this.add(_TextMesh);
        });
    }

    public CreateTruckModel(_Path : string, _Vec3 : Vector3) : void
    {
        const _TFBXLoader = new FBXLoader();

        _TFBXLoader.load(_Path,
            (object : Group) =>
            {
                this.add(object);             
                object.position.add(_Vec3);
                object.rotation.set(0,-1,0);
            }
        );
    }
}