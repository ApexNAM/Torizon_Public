import { Group, Scene } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default class TTorizontalPlane
{
    private _Scene : Scene;
    private _Path : string;

    private _TFBXLoader : FBXLoader;
    private _TCurrentObjects : Group[] = [];

    private _TTorizontalX : number;
    private _TTorizontalY : number;
    private _TTorizontalZ : number;

    constructor(_Scene : Scene, _FilePath : string)
    {
        this._Scene = _Scene;
        this._Path = _FilePath;

        this._TFBXLoader = new FBXLoader();
    }

    public CreateTorizontal() : void
    {
        this._TFBXLoader.load(this._Path,
            (object : Group) =>
            {
                let _TCurrentObject = new Group();
                _TCurrentObject = object;

                this._TCurrentObjects.push(_TCurrentObject);

                for (let i in this._TCurrentObjects)
                {
                    this._Scene.add(this._TCurrentObjects[i]);

                    // 처음 실행할때.. 이 함수를 선언해야합니다. 그렇지 않으면 위치를 설정할수 없습니다.
                    this._TCurrentObjects[i].position.set(this._TTorizontalX,this._TTorizontalY,this._TTorizontalZ);
                }
                
            }
        );
    }

    public DestoryTorizontal() : void
    {
        this._TCurrentObjects.forEach((obj : Group, index : number, objs : Group[])=>
        {
            this._Scene.remove(obj);
            objs.splice(index,1);
        });
    }

    // _Init 함수에서만 사용하십시오. 이 함수는 모델링을 처음 생성할때 지정해주는 값입니다.
    public StartPosition(cX : number, cY : number, cZ : number) : void
    {
        this._TTorizontalX = cX;
        this._TTorizontalY = cY;
        this._TTorizontalZ = cZ;
    }

    // _Update 함수에서만 사용하십시오. 이 함수는 모델링이 생성한 이후부터 사용할수 있습니다.
    // 그냥 _Init 함수에 넣을 경우, 설정이 제대로 설정되지 않을수 있습니다. 
    // 이유는 위치값이 제대로 적용되지 않은 과정인 것 같습니다.
    
    public ChangePosition(cX : number, cY : number, cZ : number) : void
    {
        for (let i in this._TCurrentObjects)
        {
            this._TCurrentObjects[i].position.set(cX,cY,cZ);
        }
    }
}