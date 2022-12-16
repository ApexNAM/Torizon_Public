
export default class _TGameScore 
{
    private _TScore : number = 0;
    private _THighScore : number = 0;

    constructor()
    {
        this._TScore = 0;
    }

    public _Update() : void
    {
        if (this._TScore > this._THighScore)
        {
            this._THighScore = this._TScore;
        }
    }

    get _GetterScore() : number
    {
        return this._TScore;
    }

    get _GetterHighScore() : number
    {
        return this._THighScore;
    }

    set _SetterScore(_Set : number)
    {
        this._TScore = _Set;
    }

    set _SetterHighScore(_Set : number)
    {
        this._THighScore = _Set;
    }

    public _TakeScore() : void
    {
        this._TScore += 1;
    }
}