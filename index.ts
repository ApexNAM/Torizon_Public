import { _BeginPlay, _StatePopup, _StoppedGameTime, _Tick } from "./InGame";

_BeginPlay();

window.onload = function()
{
    _StoppedGameTime();

    document.getElementById("WhatIsGame").addEventListener("click", function()
    {
        (document.querySelector(".WhatIsTorizon") as HTMLElement).style.display = 'flex';
    });

    document.getElementById("HowToPlay").addEventListener("click", function()
    {
        (document.querySelector(".HowToPlay_Torizon") as HTMLElement).style.display = 'flex';
    });

    document.getElementById("Credits").addEventListener("click", function()
    {
        (document.querySelector(".Credits_Torizon") as HTMLElement).style.display = 'flex';
    });

    document.getElementById("CloseButton_FirstID").addEventListener("click",function()
    {
        (document.querySelector(".WhatIsTorizon") as HTMLElement).style.display = 'none';
    });

    document.getElementById("CloseButton_SecondID").addEventListener("click",function()
    {
        (document.querySelector(".HowToPlay_Torizon") as HTMLElement).style.display = 'none';
    });

    document.getElementById("CloseButton_ThridID").addEventListener("click", function()
    {
        (document.querySelector(".Credits_Torizon") as HTMLElement).style.display = 'none';
    });

    window.requestAnimationFrame(_Tick);
}