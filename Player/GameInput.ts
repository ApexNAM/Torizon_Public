import TGameLoop from "../GameLoop/GameLoop";
import TGameOverScene from "../Scenes/GameOverScene";
import TInGameScene from "../Scenes/InGameScene";
import TTorizontalSoldier from "../Torizontal/TorizontalSoldier";
import TPlayer from "./Player";

export default class _TInput
{
    public _UpdateInput(_TGameLoop : TGameLoop, _TPlayer : TPlayer, 
        _GameScene : TInGameScene, _Eneimes : TTorizontalSoldier[],_TGameOverScene : TGameOverScene)
    {
        let _MainCommand : any = document.getElementById("answer");
        
        if (!_TPlayer._GetterGameOn) 
        {
            if (!_TPlayer._GetterGameOver)
            {
                _MainCommand.placeholder = "Select Level (1 ~ 3)";
            }
            else 
            {
                _MainCommand.placeholder = Math.floor(_TGameOverScene._GetterCountDown) + " Left!";
            }
        }

        _MainCommand.addEventListener("keydown", function(e : KeyboardEvent)
        {
            if (e.key === 'Enter' && _TPlayer._GetterGameOn && !_TPlayer._GetterGameOver)
            {
                if (_MainCommand.value === _GameScene._GetterCurText)
                {
                    _Eneimes[0].TakeDamageSoldier();
                    _GameScene._ResetCurrentText();
                }

                _MainCommand.value = "";
            }    
            else if (e.key === 'Enter' && !_TPlayer._GetterGameOn && !_TPlayer._GetterGameOver)
            {
                switch(_MainCommand.value)
                {
                    case "1":
                    case "Level 1":
                    case "Level1":
                        {
                            _MainCommand.placeholder = "Level Min";
                            _TGameLoop._WaitingScene("Level 1", _MainCommand);
                            break;
                        }
                    case "2":
                    case "Level 2":
                    case "Level2":
                        {
                            _MainCommand.placeholder = "Level Center";
                            _TGameLoop._WaitingScene("Level 2", _MainCommand);
                            break;
                        }
                    case "3":
                    case "Level 3":
                    case "Level3":
                        {
                            _MainCommand.placeholder = "Level Max!";
                            _TGameLoop._WaitingScene("Level 3", _MainCommand);
                            break;
                        }
                    default:
                        break;
                }

                _MainCommand.value = "";
            }    
            else if (e.key === 'Enter' && !_TPlayer._GetterGameOn && _TPlayer._GetterGameOver)
            {
                if (_MainCommand.value === "Tontinue")
                {
                    _TGameOverScene._SetterCountDown = 30;
                    _TGameOverScene._ChanceMinus();
                    _TPlayer._SetterGameOver = false;
                    _TGameLoop._AddScene("Main");
                    _MainCommand.value = "";
                }
            }
        }
        );
    }
} 