import { Color, Group, Mesh, MeshBasicMaterial, Scene } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";

export default class TTorizontalText
{
    private _Scene : Scene;
    private _CurrentFont : Group;
    private _TextMesh : Mesh;
    private _Font : Font;

    constructor(_Scene : Scene)
    {
        this._Scene = _Scene;
        this._CurrentFont = new Group();

        const _TextLoader = new FontLoader();
        _TextLoader.load("fonts/Fonts_Json/S-Core Dream 6 Bold_Regular.json", (font : Font) =>
        {
            this._Font = font;
        });

    }

    public CreateTorizontal(_Texts : string) : void
    {
        let _TextGeo = new TextGeometry (_Texts,
        {
            font:this._Font,
            size:6,
            height:0,
            curveSegments:12
        });

        _TextGeo.computeBoundingBox();
        
        const xMid = -0.5 * ( _TextGeo.boundingBox.max.x - _TextGeo.boundingBox.min.x );
        _TextGeo.translate(xMid,5,-32);

        const _Color = new Color('#0075FF');
        const _TextMaterial = new MeshBasicMaterial( { color: _Color } );
        
        this._TextMesh = new Mesh(_TextGeo, _TextMaterial);
        this._CurrentFont.add(this._TextMesh);

        this._Scene.add(this._TextMesh);
    }

    public DestoryTorizontal() : void
    {
        this._Scene.remove(this._TextMesh);
        
    }
}