import { Scene, Vector3, WebGLRenderer } from "three";
import _TInput from "../Player/GameInput";
import TPlayer from "../Player/Player";
import TGameOverScene from "../Scenes/GameOverScene";
import TInGameScene from "../Scenes/InGameScene";
import TReadyScene from "../Scenes/ReadyScene";
import TWaitingScene from "../Scenes/WaitScene";

interface LevelLoader 
{
    Level_Min : TReadyScene;
    Level_Center : TReadyScene;
    Level_Max : TReadyScene;
}

export default class TGameLoop
{
    private m_TPlayer : TPlayer;
    private m_TScene : Scene;

    private m_InGameScene : TInGameScene;
    private m_WaitScene : TWaitingScene;
    private m_GameOverScene : TGameOverScene;

    private m_LevelLoaders : LevelLoader
    
    private m_TCanvas: Element;
    private m_Renderer : WebGLRenderer;
    private m_TInput : _TInput;

    // 생성자 
    constructor() 
    {
        this.m_TPlayer = new TPlayer(100);

        this.m_TScene = new Scene();

        this.m_WaitScene = new TWaitingScene();
        this.m_GameOverScene = new TGameOverScene();
        this.m_InGameScene = new TInGameScene();

        this.m_LevelLoaders = 
        { 
            Level_Min : new TReadyScene("Level 1", "It's Easssy!", "/models/Level_1_ThreeWheelCar_1.fbx", new Vector3(3,0,-4)),
            Level_Center : new TReadyScene("Level 2", "This Level is 'NOT' Normal!", "/models/Level_1_ThreeWheelCar_2.fbx",new Vector3(5.5,0,-5)),
            Level_Max : new TReadyScene("Level 3", "OH NO! YOU CAN'T! FASTER!", "/models/Level_1_ThreeWheelCar_3.fbx",new Vector3(4,0,-4))
        };


        this.m_TCanvas = document.querySelector('#TorizonCanvas');
        this.m_Renderer = new WebGLRenderer( { canvas : this.m_TCanvas, antialias: true } );
        
        this.m_TInput = new _TInput();
        this._Init();
    }

    private TResizeRenderDisplaySize(_TCanvas : HTMLCanvasElement) : boolean
    {
        const _TPixelRatio : number = window.devicePixelRatio;
        const _TWidth : number = _TCanvas.clientWidth * _TPixelRatio | 0;
        const _THeight : number = _TCanvas.clientHeight * _TPixelRatio | 0;

        const _TNeedResize : boolean = _TCanvas.width !== _TWidth || _TCanvas.height !== _THeight;

        if (_TNeedResize) {
            this.m_Renderer.setSize(_TWidth, _THeight, false);
        }
        
        return _TNeedResize;
    }

    // initialize Function 
    public _Init() : void
    {
        this.m_TPlayer._Init();
        this.m_Renderer.setClearColor( "rgb(255,255,255)");

        this.m_Renderer.shadowMap.enabled = true;

        document.body.appendChild(this.m_Renderer.domElement);

        this.m_TScene = this.m_WaitScene;
        this.m_TScene.add(this.m_TPlayer._GetterObject);
    }

    // Update Function
    public _Update() : void
    {
        this.m_TInput._UpdateInput(this, this.m_TPlayer, this.m_InGameScene, 
            this.m_InGameScene._GetEnemies, this.m_GameOverScene);

        switch(this.m_TScene)
        {
            case this.m_InGameScene:
                {
                    this.m_InGameScene._Update(this.m_TPlayer);
                    this.m_TPlayer._Update(this);
                    break;
                }
            case this.m_GameOverScene:
                {
                    this.m_GameOverScene._Update(this, this.m_TPlayer);
                    break;
                }
            case this.m_LevelLoaders.Level_Min:
                {
                    this.m_LevelLoaders.Level_Min._Update(this,"/models/Level_1_ThreeWheelCar_1.fbx", 
                    this.m_InGameScene,3 * 3, 1);
                    break;
                }
            case this.m_LevelLoaders.Level_Center:
                {
                    this.m_LevelLoaders.Level_Center._Update(this,"/models/Level_1_ThreeWheelCar_2.fbx",
                    this.m_InGameScene,6 * 3,2);
                    break;
                }
            case this.m_LevelLoaders.Level_Max:
                {
                    this.m_LevelLoaders.Level_Max._Update(this,"/models/Level_1_ThreeWheelCar_3.fbx", 
                    this.m_InGameScene,6 * 3,3);
                    break;
                }
        }

        this._Draw();
    }

    // Rendering N Draw Function
    public _Draw() : void
    {
        if (this.TResizeRenderDisplaySize(this.m_Renderer.domElement))
        {
            this.m_TPlayer.SetCameraCanvasSize(this.m_Renderer.domElement);
        }

        this.m_Renderer.render(this.m_TScene, this.m_TPlayer._GetterPCamera);
    }

    public _AddScene(selectCount : string) : void
    {
        switch (selectCount)
        {
            case "Start":
                {
                    this.m_Renderer.setClearColor( "rgb(255,255,255)");
                    this.m_TScene = this.m_InGameScene;
                    break;
                }
            case "GameOver":
                {
                    this.m_Renderer.setClearColor( "rgb(0,117,255)");
                    this.m_TScene =  this.m_GameOverScene;
                    break;
                }
            case "Main":
                {
                    this.m_Renderer.setClearColor( "rgb(255,255,255)");
                    this.m_TScene = this.m_WaitScene;
                    break;
                }
        }
    }

    public _WaitingScene(selectCount : string, _MainCommand : any) : void
    {
        switch(selectCount)
        {
            case "Level 1":
                {
                    this.m_Renderer.setClearColor( "rgb(0,117,255)");
                    this.m_TScene = this.m_LevelLoaders.Level_Min;
                    break;
                }
            case "Level 2":
                {
                    this.m_Renderer.setClearColor( "rgb(0,117,255)");
                    this.m_TScene = this.m_LevelLoaders.Level_Center;
                    break;
                }
            case "Level 3":
                {
                    this.m_Renderer.setClearColor( "rgb(0,117,255)");
                    this.m_TScene = this.m_LevelLoaders.Level_Max;
                    break;
                }
        }

        this.m_TPlayer._SetterGameOn = true;
        _MainCommand.value = "";
    }
}