import TGameLoop from "./GameLoop/GameLoop";
import _TGameScore from "./GameLoop/GameScore";


// Game 관련 클래스 변수를 여기에 선언해야 합니다.
const _TGameLoop : TGameLoop = new TGameLoop();
export const _TCScore = new _TGameScore();


let _TLastTime = 0;
let _SecondRemaining : number = 3 * 60 + 0;

export let _StatePopup : string = "none";

// 여기까지.

export function _ChangeStatePopup(_Change : string)
{
    _StatePopup = _Change;
}

window.onbeforeunload = function() 
{
    const _StatePopupString = JSON.stringify(_StatePopup);
    localStorage.setItem("_StatePopup", _StatePopupString);

    const _PlayerScoreString = JSON.stringify(_TCScore._GetterHighScore);
    localStorage.setItem("_PlayerScore",_PlayerScoreString);

    const _PlayerTodayScoreString = JSON.stringify(_TCScore._GetterScore);
    localStorage.setItem("_TodayScore",_PlayerTodayScoreString);
};

export function _BeginPlay()
{
    _TCScore._SetterScore = 0;
    _SecondRemaining = _Get_SecondRemaining() || 3 * 60 + 0;

    const _CurrentStatePopup = localStorage.getItem("_StatePopup");
    const _GetCurrentStatePopup = JSON.parse(_CurrentStatePopup);

    if (_GetCurrentStatePopup !== null) {
        _StatePopup = _GetCurrentStatePopup;
    }

    const _CurrentPlayerScore = localStorage.getItem("_PlayerScore");
    const _GetCurrentPlayerScore = JSON.parse(_CurrentPlayerScore);

    _TCScore._SetterHighScore = _GetCurrentPlayerScore;

    const _CurrentTodayPlayerScore = localStorage.getItem("_TodayScore");
    const _GetCurrentTodayPlayerScore = JSON.parse(_CurrentTodayPlayerScore);

    if (_GetCurrentPlayerScore !== null && _StatePopup === "flex") 
    {
        _TCScore._SetterScore = _GetCurrentTodayPlayerScore;
    } 
    else if ( _StatePopup !== "flex")
    {
        _TCScore._SetterScore = 0;
    }
}

export function _Tick(_TDeltaTime : number) : void
{
    let _TGDeltaTime = _TDeltaTime - _TLastTime;
    
    // 여기에 업데이트 함수를 선언해야 합니다.
    _TCScore._Update();
    _TGameLoop._Update();

    (document.querySelector('.GameEndPopup_Background') as HTMLElement).style.display = _StatePopup;
    (document.querySelector('.TodayScore') as HTMLElement).textContent = `TodayScore : ${_TCScore._GetterScore}`;
    (document.querySelector('.HighScore') as HTMLElement).textContent = `HighScore : ${_TCScore._GetterHighScore}`;
    // 여기까지.

    _TLastTime = _TDeltaTime;

    window.requestAnimationFrame(_Tick);
}

function _Get_SecondRemaining() : any
{
    return localStorage ? localStorage.getItem("_SecondRemaining") : '';
}

function _Set_SecondRemaining(_SecondRemainingString : any)
{
    localStorage.setItem("_SecondRemaining", _SecondRemainingString);
    return _SecondRemainingString;
}

export function _StoppedGameTime()
{
    function paddedFormat(num : number)
    {
        return num < 10 ? "0" + num : num;
    }

    let _Min : number = 0;
    let _Sec : number = 0;

    addEventListener("keydown", function(e : KeyboardEvent)
    {
        const _Style : HTMLElement = (document.querySelector('.GameEndPopup_Background') as HTMLElement);
        if (e.key === 'Enter' && _Style.style.display === "flex")
        {
            _SecondRemaining = 0;
        }
    });

    document.getElementById("CloseButton_Skip").addEventListener("click", function()
    {
        const _Style : HTMLElement = (document.querySelector('.GameEndPopup_Background') as HTMLElement);
        if (_Style.style.display === "flex")
        {
            _SecondRemaining = 0;
        }
    });

    const _Element : HTMLElement = document.querySelector("._30Count");

    let _Count30Min = setInterval(function()
    {
        _Min = parseInt((_SecondRemaining / 60).toString());
        _Sec = parseInt((_SecondRemaining % 60).toString());

        _Element.textContent = `${paddedFormat(_Min)}:${paddedFormat(_Sec)}`;

        if (_StatePopup === "flex")
        {
            _SecondRemaining = _Set_SecondRemaining(_SecondRemaining - 1);
        }

        if (_SecondRemaining < 0)
        {
            _SecondRemaining = _Set_SecondRemaining(3 * 60 + 0);
            _TCScore._SetterScore = 0;

            _StatePopup = "none";
        }
    },1000);
}

