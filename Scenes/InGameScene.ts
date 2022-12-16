import { DirectionalLight, Scene } from "three";
import TPlayer from "../Player/Player";
import TTorizontalPlane from "../Torizontal/TorizontalModel";
import TTorizontalSoldier from "../Torizontal/TorizontalSoldier";
import TTorizontalText from "../Torizontal/TorizontalText";

interface _TypingLevel
{
    _SetTyping : string[];
    _CurrentTyping : string[];
}

export default class TInGameScene extends Scene
{
    private _TLight : DirectionalLight;
    private _TTorizontal : TTorizontalPlane;
    private _TTruck : TTorizontalSoldier[] = [];
    private _TText : TTorizontalText;

    private _TSetTruckPosition : number[] = [];
    private _TSetTruckPosLen : number = 5;
 
    private _TCurrentTyingTexts_Level1 : _TypingLevel;
    private _TCurrentTyingTexts_Level2 : _TypingLevel;
    private _TCurrentTyingTexts_Level3 : _TypingLevel;

    private _TCurrentTyingTexts : string[] = [];

    private _LevelSpeed : number;
    private _TargetModel : string;

    private _Speed : number;

    private _SpawnTimer : number = 0;
    private _CurrentText : string;

    constructor()
    {
        super();
        this._Init();
    }

    get _GetEnemies() : TTorizontalSoldier[]
    {
        return this._TTruck;
    }

    get _GetterCurText() : string
    {
        return this._CurrentText;
    }

    get _GetterText() : TTorizontalText
    {
        return this._TText;
    }

    public _Init() : void
    {
        this._TText = new TTorizontalText(this);
        this._TLight = new DirectionalLight(0xFFFFFF,2);

        this._RandomGridPositionX(this._TSetTruckPosition, this._TSetTruckPosLen);

        this._TCurrentTyingTexts_Level1 = 
        { 
            _SetTyping : ["Table", "Tabby","Taboo","Tacky","Taffy","Tacks","Tacit",
                          "Taint","Tails","Taken","Taker","Takes","Tales","Tally",
                          "Talon","Truck","Tank","Thrid","Three","Types","Toast",
                          "Torico","Tolong","Tuban","Tomas","ToToTo","Two","TwT",
                          "Tour","Tourbo","Turrets","Tells","Teams","Thanks",
                          "Theme","Texts","Teads","ToOne","TODO","TATAS","TONGA",
                          "Turn","Tune","Talk","Tent","Toolkit","Tool","Toolbar",
                          "Tray","Times","Teltas","Troy","Trons","Tanker","TRUE",
                          "Triper","Toss","Tirl","Tube","Tilemap","Toymap","Trueman",
                          "Toping","ToHigh","ToHot","Tolow","Toton","Twoh","Trass",
                          "Tozong","Togas","Tangga","Twest","Tlood","Touse","Tilp",
                          "T_T","T-T","TmT","TpT","TqT","TxT","ToT","TcT","TvT"],

            _CurrentTyping : []
        }

        this._TCurrentTyingTexts_Level2 = 
        { 
            _SetTyping : ["Taxis","Tieras","Tabaco","Taberna","Tacon",
                          "Talento","Tampo", "Tarjea", "Tecoloia", "Tshirt",
                          "Tabaise","Tabaser","Telvion", "Tahiten","Taille",
                          "Taire","Tajine","Taloche","Talonade","Trauare","Tragito",
                          "Train","Tramre","Traezo","Trautae","Traezio","Tralic",
                          "Toggle","Twitch","Thumber","Tissue","Tender","Tycoon",
                          "TeeLee", "Taara!","Toobis","Trenchs","Tumblers","Traps",
                          "Tournam","Tooth","Trnform","Trnlate","TotalTime","Tolerant",
                          "TruckTown","Triange","Tornera","Trnsito","Tintin","tetria",
                          "Titles","Tronera","Toparas","Tanggoa","Tempore","Tentant",
                          "Tuncos","Tabula","Tonequs","Testrap","TubaRep","Tolorado",
                          "Tableite","Trance","Trutzige","Twosle","Towerbera","Trueiste"],
            _CurrentTyping : []
        }

        this._TCurrentTyingTexts_Level3 = 
        { 
            _SetTyping : ["Tabasco","Tabelle","Tableau","Tablett","Tachyon",
                          "Tacitus","Tadashi","Tadeusz","Tafelig", "Tenderheat",
                          "Tagalog","Tagebau","Tagetes","Tablette","Tabstopp",
                          "Tagungs","Taiping","Takeshi","Taktlos","Talheim",
                          "Tapioka", "Tarnung","Tafelland","Tatzeit","Tafel","Tacho",
                          "Taxobox","Telekom","Teodoro","Thadden","Thomann",
                          "Telelens","Teenst","Temporos","Trinitrop","Theatreg",
                          "Topesses","Tubers","Torrify","Tarlies","Tahanun","Turjite",
                          "Thrummer","Turbine","Teleroid","Talkyers","Taskmes","TripeAAA","Tannate"],
            _CurrentTyping : []
        }

        this.Set_RandomTextSetting(this._TCurrentTyingTexts_Level1._CurrentTyping, this._TCurrentTyingTexts_Level1._SetTyping);
        this.Set_RandomTextSetting(this._TCurrentTyingTexts_Level2._CurrentTyping, this._TCurrentTyingTexts_Level2._SetTyping);
        this.Set_RandomTextSetting(this._TCurrentTyingTexts_Level3._CurrentTyping, this._TCurrentTyingTexts_Level3._SetTyping);

        for (let i = 0; i < 10; i++)
        {
            for (let j = -2; j < 3; j++)
            {
                this._TTorizontal = new TTorizontalPlane(this,"/models/TorizonGround.fbx");
                this._TTorizontal.CreateTorizontal();

                this._TTorizontal.StartPosition(j * 4, 0, -i * 4);
            }
        }

        this.add(this._TLight);
    }

    public _SpawnEnemy(_TargetModel : string, _Speed : number, _LevelIndex : number) : void
    {
        switch(_LevelIndex)
        {
            case 1:
                this._TCurrentTyingTexts = this._TCurrentTyingTexts_Level1._CurrentTyping;
                break;
            case 2:
                this._TCurrentTyingTexts = this._TCurrentTyingTexts_Level2._CurrentTyping;
                break;
            case 3:
                this._TCurrentTyingTexts = this._TCurrentTyingTexts_Level3._CurrentTyping;
                break;
        }
        
        this._LevelSpeed = _LevelIndex + 500;
        this._TargetModel = _TargetModel;

        this._Speed = _Speed;

        if (this._TTruck)
        {
            for (let i = 0; i < this._TTruck.length; i++) {
                this._TTruck[i].DestoryTorizontal();               
            }

            this._TTruck.splice(0);
            this._TText.DestoryTorizontal();
        }

        this._CreateCurrentText();
    }

    public _Update(_Player : TPlayer) : void
    {
        if (_Player._GetterGameOn)
        {
            this._SpawnTimer -= 0.8;

            if (this._SpawnTimer < 0)
            {
                this._SpawnTimer = this._LevelSpeed;

                const _CurrentTruck : TTorizontalSoldier = new TTorizontalSoldier(this, this._TargetModel); 
                _CurrentTruck.CreateTorizontal(this._Speed);

                const rnd = Math.floor(Math.random() * this._TSetTruckPosLen);
                _CurrentTruck.StartPosition(this._TSetTruckPosition[rnd] * 4, 0, -32);
                
                this._TTruck.push(_CurrentTruck);
            }

            if (this._TTruck)
            {
                for (let i = 0; i < this._TTruck.length; i++)
                {
                    this._TTruck[i]._Update(_Player, this, i);
                }
            }
        }
        else
        {
            for (let i = 0; i < this._TTruck.length; i++)
            {
                this._TTruck[i].DestoryTorizontal();               
            }

            this._TTruck.splice(0);
        }
    }

    public _SpeedUp()
    {
        this._Speed += 1;

        if (this._LevelSpeed > 200)
        {
            this._LevelSpeed -= 3;
        }
    }

    private _RandomGridPositionX(_Target : number[], _Length : number) : number[]
    {
        const _Min : number = -2;
        const _Max : number = 3;
        
        for (let i = 0; i < _Length; i++)
        {
            let rndValue : number =  Math.floor(Math.random() * (_Max - _Min)) + _Min;

            if (_Target.indexOf(rndValue) === -1) {
                _Target.push(rndValue);
            } else {
                i--;
            }
        }

        return _Target;
    }

    private Set_RandomTextSetting(_TargetArray : string[], _LengthArray : string[]) : string[]
    {
        for (let i = 0; i < _LengthArray.length; i++)
        {
            const rndValue : string =  _LengthArray[Math.floor(Math.random() * _LengthArray.length)];

            if (_TargetArray.indexOf(rndValue) === -1)
            {
                _TargetArray.push(rndValue);
            }
            else
            {
                i--;
            }

        }

        return _TargetArray;
    }

    public _ResetCurrentText() : void
    {
        this._TText.DestoryTorizontal();
        this._CreateCurrentText()
    }

    public _CreateCurrentText() : void
    {
        const rndName = Math.floor(Math.random() * this._TCurrentTyingTexts.length);
        const _GetName : string = this._TCurrentTyingTexts[rndName];

        this._CurrentText = _GetName;
        this._TText.CreateTorizontal(this._CurrentText);
    }
}