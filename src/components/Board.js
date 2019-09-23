import React from 'react';
import Square from './Square';
import './Board.css';

export default function Board(){
  const [sym, setSym] = React.useState(Array(9).fill(null));
  const [locked, setLocked] = React.useState(Array(9).fill(false));
  const [isX, setX] = React.useState(true);
  const [winner, setWinner] =  React.useState(null);

  const declareWinner = () =>{
    const lines = 
      [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];

    for(let i=0; i<lines.length; i++)
    {
      const [a,b,c] = lines[i];

      if(sym[a]===sym[b] && sym[b]===sym[c])
      {
        if(sym[a]==='X')
          setWinner('X');
        else if(sym[a]==='O')
          setWinner('O');
      }

    }
  }

  const clickHandler= (num) =>{
    if(!locked[num])
    {
      const s = isX? 'X':'O';
      setSym([...sym.slice(0,num), s, ...sym.slice(num+1)]);
      setX(!isX);
      setLocked([...locked.slice(0,num), true, ...locked.slice(num+1)])
    }
  }

  React.useEffect(()=>{
    if(sym.indexOf(null)===-1)
    {
      setX(null);
    }
    declareWinner();
  }, [sym])

  React.useEffect(()=>{
    if(winner)
    {
      setX(null);
      setLocked(Array(9).fill(true));
    }
  }, [winner])

  return(
    <div className="board">
      <div className="lines">
        <Square value={sym[0]} onClick={()=>clickHandler(0)} />
        <Square value={sym[1]} onClick={()=>clickHandler(1)} />
        <Square value={sym[2]} onClick={()=>clickHandler(2)} />
      </div>
      <div className="lines">
        <Square value={sym[3]} onClick={()=>clickHandler(3)} />
        <Square value={sym[4]} onClick={()=>clickHandler(4)} />
        <Square value={sym[5]} onClick={()=>clickHandler(5)} />
      </div>
      <div className="lines">
        <Square value={sym[6]} onClick={()=>clickHandler(6)} />
        <Square value={sym[7]} onClick={()=>clickHandler(7)} />
        <Square value={sym[8]} onClick={()=>clickHandler(8)} />
      </div>
      <p>
      {
        isX!==null?<>{
          isX?'Next Player : X':'Next Player : O'
        }</>:null
      }
      </p>
      <p>
        {
          (winner)? `Player ${winner} won`:null
        }
      </p>
      <p>
        {
          (sym.indexOf(null)===-1 && !winner)? `It is a draw`:null
        }
      </p>

    </div>
    );
}