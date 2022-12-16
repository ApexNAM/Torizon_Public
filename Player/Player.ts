import { Euler, Object3D, PerspectiveCamera, Vector3 } from "three";
import TGameLoop from "../GameLoop/GameLoop";

export default class TPlayer
{
    private readonly TPObject : Object3D;
    private readonly TPCamera : PerspectiveCamera;

    private TPPosition : Vector3;
    private TPRotation : Euler;
    private readonly TPScale : Vector3;

    private _Health : number = 5;

    private TGameOn : boolean = false;
    private TGameOver : boolean = false;

    constructor(_SetHP : number)
    {
        this.TPObject = new Object3D();

        const _Screen = window.innerWidth / window.innerHeight;
        this.TPCamera = new PerspectiveCamera(80,_Screen,0.1,2000);

        this.TPPosition = new Vector3(0,0,0);
        this.TPRotation = new Euler(0,0,0);
        this.TPScale = new Vector3(1,1,1);
    }

    get _GetterPCamera() : PerspectiveCamera {
        return this.TPCamera;
    }

    get _GetterObject() : Object3D {
        return this.TPObject;
    }

    get _GetterGameOn() : boolean {
        return this.TGameOn;
    }

    set _SetterGameOn(_Check : boolean) {
        this.TGameOn = _Check;
    }
    
    get _GetPlayerTransform() {
        return this.TPObject.position;
    }

    get _GetterGameOver() : boolean {
        return this.TGameOver;
    }

    set _SetterGameOver(_Check : boolean) {
        this.TGameOver = _Check;
    }
    
    public SetCameraCanvasSize(_TCanvas : HTMLCanvasElement) : void
    {
        this.TPCamera.aspect = _TCanvas.clientWidth / _TCanvas.clientHeight;
        this.TPCamera.updateProjectionMatrix();
    }

    public _Init() : void
    {
        this.TPObject.position.set(this.TPPosition.x, this.TPPosition.y, this.TPPosition.z);
        this.TPObject.rotation.set(this.TPRotation.x, this.TPRotation.y, this.TPRotation.z);
        this.TPObject.scale.set(this.TPScale.x, this.TPScale.y, this.TPScale.z);

        this.TPObject.add(this.TPCamera);
        this.TPCamera.position.set(0.0, 2.0, 0.5);
    }

    public _Update(_TGameLoop : TGameLoop) : void
    {
        if (this._Health == 0)
        {
            _TGameLoop._AddScene("GameOver");
            this.TGameOn = false;
            this.TGameOver = true;
            this._Health = 5;
        }
    }

    public TakeDamage() : void
    {
        this._Health--;
    }
}