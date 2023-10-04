import { useEffect, useRef, useState } from "react"
import classnames from "classnames"
import { Dialog } from "@headlessui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAnchor, 
  faBomb,
  faBug,
  faCar,
  faCloud,
  faCompass,
  faFire,
  faFlask, 
  faFutbol,
  faGhost,
  faHandSpock,
  faMoon,
  faRocket,
  faSnowflake,
  faSun,
  faTurkishLiraSign,
  faUmbrella,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons'

import Logo from "./Logo"

import { IconProp } from "@fortawesome/fontawesome-svg-core"

export const enum gameTypes {
  numbers = "numbers",
  icons = "icons"
}

const enum resultTypes {
  win = "win",
  tie = "tie",
}

export type IconMap = {
  [key:number]: IconProp,
}

export const shuffle = (arr:any[]) => {
  const result = [...arr]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const s = result[i] 
    result[i] = result[j]
    result[j] = s
  }

  return result
}

const generateIconMap = (cellCount:number) => {
  const iconMap:IconMap = {}

  const icons = shuffle([
    faAnchor, 
    faBomb,
    faBug,
    faCar,
    faCloud,
    faCompass,
    faFire,
    faFlask, 
    faFutbol,
    faGhost,
    faHandSpock,
    faMoon,
    faRocket,
    faSnowflake,
    faSun,
    faTurkishLiraSign,
    faUmbrella,
    faWandMagicSparkles,
  ])

  for (let i = 0; i < (cellCount / 2); i++) {
    iconMap[i] = icons[i]
  }

  return iconMap
}

const generateNumberGrid = (cellCount:number) => {
  const grid = Array.from(Array(Math.round(cellCount / 2)).keys())

  return shuffle([...grid, ...grid])
}

const initialGridSize = 4
const initialGameType = gameTypes.numbers
const initialNumPlayers = 1

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [gridSize, setGridSize] = useState(initialGridSize)
  const [gameType, setGameType] = useState(initialGameType)
  const [numPlayers, setNumPlayers] = useState(initialNumPlayers)

  const [cell1, setCell1] = useState<number|null>(null)
  const [cell2, setCell2] = useState<number|null>(null)
  const [solved, setSolved] = useState<number[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const [moveCount, setMoveCount] = useState(0)
  const [secondsElapsed, setSecondsElapsed] = useState(0)

  const [activePlayerIndex, setActivePlayerIndex] = useState(0)
  const [scores, setScores] = useState([])

  const iconMapRef = useRef<IconMap>()
  const iconMap = iconMapRef.current

  const gridRef = useRef([])
  const grid = gridRef.current

  const timerRef = useRef(null)
  const clearCellsTimeoutRef = useRef(null)

  const isGameOver = (solved:number[]) => grid.length > 1 && (grid.length === solved.length)
  const isSinglePlayerGame = numPlayers === 1

  const cellCount = gridSize * gridSize

  const generateGrid = () => {
    gridRef.current = generateNumberGrid(cellCount)

    if (gameType === gameTypes.icons) {
      iconMapRef.current = generateIconMap(cellCount)
    }
  }

  const initScores = () => {
    setScores(Array(numPlayers).fill(0))
  }

  const startGame = () => {
    generateGrid()

    if (!isSinglePlayerGame) {
      initScores()
    }

    setIsPlaying(true)
  }

  const resetGame = () => {
    setCell1(null)
    setCell2(null)
    setSolved([])

    if (isSinglePlayerGame) {
      setSecondsElapsed(0)
      setMoveCount(0)
      resetGameTimer()
    } else {
      initScores()
    }
  }

  const newGame = () => {
    resetGame()

    setIsPlaying(false)

    setGridSize(initialGridSize)
    setGameType(initialGameType)
    setNumPlayers(initialNumPlayers)
  }

  const restart = () => {
    resetGame()
    generateGrid()
  }

  const isHidden = (index:number) => {
    if (index === cell1 || index === cell2) {
      return false
    }

    return !solved.includes(index)
  }

  const resetGameTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = null
  }

  const handleCellClick = (index:number) => {
    if (!isHidden(index)) { return }

    if (isSinglePlayerGame) {
      if (timerRef.current === null) {
        timerRef.current = setInterval(() => {
          setSecondsElapsed(value => value + 1)
        }, 1000)
      }

      setMoveCount(moveCount + 1)
    }

    if (cell1 === null) {
      setCell1(index)
      return
    }
      
    if (cell1 !== null && cell2 !== null) {
      setCell1(index)
      setCell2(null)
      if (clearCellsTimeoutRef.current !== null) {
        clearTimeout(clearCellsTimeoutRef.current)
        clearCellsTimeoutRef.current = null
      }
      return
    }

    const cell2Value = index
    setCell2(cell2Value)

    if (grid[cell1] === grid[cell2Value]) {
      const newSolved = [
        ...solved,
        cell1,
        cell2Value,
      ]
      setSolved(newSolved)
      setCell1(null)
      setCell2(null)

      if (isSinglePlayerGame && isGameOver(newSolved)) {
        resetGameTimer()
      }

      if (!isSinglePlayerGame) {
        setScores([
          ...scores.slice(0, activePlayerIndex),
          scores[activePlayerIndex] + 1,
          ...scores.slice(activePlayerIndex + 1),
        ])
      }
    } else {
      clearCellsTimeoutRef.current = setTimeout(() => {
        setCell1(null)
        setCell2(null)
      }, 1000)

      if (!isSinglePlayerGame) {
        const newIndex = (activePlayerIndex === numPlayers - 1) ? 0 : activePlayerIndex + 1
        setActivePlayerIndex(newIndex)
      }
    }
  }

  const padZero = (value:number):string => {
    if (value < 10) {
      return `0${value}`
    }

    return value.toString()
  }

  const formatTime = (elapsedSeconds:number) => {
    let diff = elapsedSeconds

    const seconds = Math.round(diff % 60)

    diff = Math.round(diff / 60)
    const minutes = Math.round(diff % 60)

    let result = `${padZero(minutes)}:${padZero(seconds)}`

    diff = Math.round(diff / 60)
    const hours = Math.round(diff % 24)

    if (hours > 0) {
      result = `${padZero(hours)}:${result}`
    }

    return result
  }

  let gameResults:{
    resultType: resultTypes,
    maxScore: number,
    players: Array<{
      index: number,
      score: number,
    }>
  } = {
    resultType: resultTypes.win,
    maxScore: 0,
    players: [],
  }
  if (isGameOver(solved) && !isSinglePlayerGame) {
    gameResults.players = scores.map((score, index) => ({ index, score }))
    gameResults.players.sort((p1, p2) => p2.score - p1.score)

    const maxScore = gameResults.players[0].score
    gameResults.maxScore = maxScore

    const playersWithMaxScore = gameResults.players.filter(player => player.score === maxScore)
    if (playersWithMaxScore.length > 1) {
      gameResults.resultType = resultTypes.tie
    } else {
      gameResults.resultType = resultTypes.win
    }
  }

  // useEffect(() => {
  //   startGame()
  // }, [])

  if (!isPlaying) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-800">
        <div className="px-6 w-full max-w-screen-sm">
          <div className="flex justify-center">
            <Logo className="w-32 md:w-40 fill-gray-100" />
          </div>
          <div className="mt-12 md:mt-20 p-6 md:p-14 bg-gray-100 rounded-[20px]">
            <div>
              <p className="text-16 md:text-20 font-bold text-gray-600">Select Theme</p>
              <div className="mt-2 flex space-x-3 md:space-x-7">
                {[
                  {
                    type: gameTypes.numbers,
                    name: "Numbers",
                  },
                  {
                    type: gameTypes.icons,
                    name: "Icons",
                  }
                ].map((data, index) => (
                  <button 
                    type="button" 
                    className={classnames("w-1/2 py-2.5 text-16 md:text-26 font-bold text-gray-100 rounded-full transition-colors duration-200", {
                      "bg-gray-400 hover:bg-gray-500": gameType !== data.type,
                      "bg-gray-700": gameType === data.type,
                    })}
                    onClick={() => setGameType(data.type)}
                    key={index}
                  >
                    {data.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-16 md:text-20 font-bold text-gray-600">Number of Players</p>
              <div className="mt-2 flex space-x-3 md:space-x-5">
                {[...Array(4).keys()].map(index => {
                  const num = index + 1

                  return (
                    <button 
                      type="button" 
                      className={classnames("w-1/2 py-2.5 text-16 md:text-26 font-bold text-gray-100 rounded-full transition-colors duration-200", {
                        "bg-gray-400 hover:bg-gray-500": numPlayers !== num,
                        "bg-gray-700": numPlayers === num,
                      })}
                      onClick={() => setNumPlayers(num)}
                      key={index}
                    >
                      {num}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-16 md:text-20 font-bold text-gray-600">Grid Size</p>
              <div className="mt-2 flex space-x-3 md:space-x-7">
                {[4, 6].map((size, index) => (
                  <button 
                    type="button" 
                    className={classnames("w-1/2 py-2.5 text-16 md:text-26 font-bold text-gray-100 rounded-full transition-colors duration-200", {
                      "bg-gray-400 hover:bg-gray-500": gridSize !== size,
                      "bg-gray-700": gridSize === size,
                    })}
                    onClick={() => setGridSize(size)}
                    key={index}
                  >
                    {size}x{size}
                  </button>
                ))}
              </div>
            </div>
            <button 
              type="button"
              className="w-full mt-8 py-4 bg-orange-200 hover:bg-orange-100 text-18 md:text-32 font-bold text-gray-100 rounded-full transition-colors duration-200"
              onClick={() => startGame()}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    ) 
  }

  return (
    <>
      <div className="w-full h-screen p-6 flex flex-col">
        <div className="w-full max-w-screen-lg mx-auto flex items-center justify-between">
          <Logo className="w-24 md:w-32 fill-gray-800" />
          <div>
            <button 
              type="button" 
              className="md:hidden px-5 py-3 bg-orange-200 text-16 font-bold text-gray-100 rounded-full"
              onClick={() => setIsOpen(true)}
            >
              Menu
            </button>
            <button 
              type="button" 
              className="hidden md:inline-block px-5 py-3 bg-orange-200 hover:bg-orange-100 text-20 font-bold text-gray-100 rounded-full transition-colors duration-200"
              onClick={() => restart()}
            >
              Restart
            </button>
            <button 
              type="button" 
              className="hidden md:inline-block ml-4 px-5 py-3 bg-gray-300 hover:bg-gray-400 text-20 font-bold text-gray-700 rounded-full transition-colors duration-200"
              onClick={() => newGame()}
            >
              New Game
            </button>
          </div>
        </div>
        <div className="flex grow items-center justify-center">
          <div className="w-full max-w-xl flex flex-wrap select-none">
            {grid.map((num, index) => {
              const hidden = isHidden(index)

              const buttonBg = (index === cell1 || index === cell2) ? "bg-orange-200" : "bg-gray-400"
              const buttonFontSize = (gridSize === 4) ? "text-48" : "text-34"
              const buttonPadding = (gridSize === 4) ? "p-1" : "p-0.5 md:p-1"

              const symbol = (gameType === gameTypes.numbers)
                ? num
                : <FontAwesomeIcon icon={iconMap[num]} className="text-26 md:text-40" />

              return (
                <div className={buttonPadding} style={{ width: `${100/gridSize}%` }} key={index}>
                  <button
                    key={index}
                    className={`w-full relative aspect-square flex items-center justify-center ${buttonFontSize} ${buttonBg} font-bold text-gray-100 rounded-full overflow-hidden transition-colors duration-200`}
                    onClick={() => handleCellClick(index)}
                  >
                    {hidden && (
                      <div className="absolute inset-0 bg-gray-700"></div>
                    )}
                    {!hidden && symbol}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        {isSinglePlayerGame ? (
          <div className="w-full max-w-xl mx-auto flex space-x-6 md:space-x-8">
            <div className="w-1/2 px-5 py-3 md:py-6 flex flex-wrap justify-between items-center bg-gray-300 rounded-md md:rounded-xl">
              <p className="w-full md:w-auto text-center text-16 md:text-18 font-bold text-gray-600">Time</p>
              <p className="w-full md:w-auto text-center text-24 md:text-32 font-bold text-gray-700">{formatTime(secondsElapsed)}</p>
            </div>
            <div className="w-1/2 px-5 py-3 md:py-6 flex flex-wrap justify-between items-center bg-gray-300 rounded-md md:rounded-xl">
              <p className="w-full md:w-auto text-center text-16 md:text-18 font-bold text-gray-600">Moves</p>
              <p className="w-full md:w-auto text-center text-24 md:text-32 font-bold text-gray-700">{moveCount}</p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-screen-lg mx-auto flex justify-center space-x-6 lg:space-x-8">
            {scores.map((score, index) => {
              const active = index === activePlayerIndex

              return (
                <div 
                  key={index}
                  className="w-1/4"
                >
                  <div className={classnames("px-4 py-2 relative flex flex-wrap items-center justify-between rounded md:rounded-xl lg:px-5 lg:py-6", {
                    "bg-gray-300": !active,
                    "bg-orange-200": active,
                  })}>
                    {active && (
                      <div className="w-3 h-3 bg-orange-200 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 md:w-5 md:h-5"></div>
                    )}
                    <p className={classnames("w-full text-center md:text-left text-16 font-bold lg:w-auto lg:text-18", {
                      "text-gray-600": !active,
                      "text-gray-100": active,
                    })}>
                      <span className="md:hidden">P{index + 1}</span>
                      <span className="hidden md:block">Player {index + 1}</span>
                    </p>
                    <p className={classnames("w-full text-center md:text-left text-24 font-bold lg:w-auto lg:text-32", {
                      "text-gray-700": !active,
                      "text-gray-100": active,
                    })}>{score}</p>
                  </div>
                  {active && (
                    <p className="hidden lg:block mt-6 text-center text-14 font-bold tracking-[5px] text-gray-800">CURRENT TURN</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
      {isGameOver(solved) && (
        <Dialog open={true} onClose={() => {}}>
          <div className="p-6 fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <Dialog.Panel className="w-full max-w-screen-sm px-6 py-8 relative z-10 bg-gray-200 rounded-xl md:px-14 md:py-12">
              <>
                <p className="text-center text-24 font-bold text-gray-800 md:text-48">
                  {isSinglePlayerGame ? (
                    "You did it!"
                  ) : (
                    <>
                      {(gameResults.resultType === resultTypes.win) ? (
                        `Player ${gameResults.players[0].index + 1} Wins!`
                      ) : (
                        "It's a tie!"
                      )}
                    </>
                  )}
                </p>
                <p className="text-center text-14 font-bold text-gray-600 md:text-18">
                  {isSinglePlayerGame ? (
                    "Game over! Here's how you got on..."
                  ) : (
                    "Game over! Here are the results..."
                  )}
                </p>
                <div className="mt-6 space-y-2 md:mt-10 md:space-y-4">
                  {isSinglePlayerGame ? (
                    <>
                      <div className="p-4 flex justify-between items-center bg-gray-300 rounded-md md:px-8 md:py-4">
                        <p className="text-14 font-bold text-gray-600 md:text-18">Time elapsed:</p> 
                        <p className="text-20 font-bold text-gray-700 md:text-32">{formatTime(secondsElapsed)}</p>
                      </div>
                      <div className="p-4 flex justify-between items-center bg-gray-300 rounded-md md:px-8 md:py-4">
                        <p className="text-14 font-bold text-gray-600 md:text-18">Moves Taken:</p>
                        <p className="text-20 font-bold text-gray-700 md:text-32">{moveCount}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      {gameResults.players.map((player, index) => {
                        const isWinner = player.score === gameResults.maxScore

                        return (
                          <div className={classnames("p-4 flex justify-between items-center rounded-md md:px-8 md:py-4", {
                            "bg-gray-800": isWinner,
                            "bg-gray-300": !isWinner,
                          })} key={index}>
                            <p className={classnames("text-14 font-bold md:text-18", {
                              "text-gray-600": !isWinner,
                              "text-gray-100": isWinner,
                            })}>
                              Player {player.index + 1}
                              {isWinner && <span className="ml-1">(Winner!)</span>}
                            </p>
                            <p className={classnames("text-20 font-bold text-gray-100 md:text-32", {
                              "text-gray-700": !isWinner,
                              "text-gray-100": isWinner,
                            })}>
                              {player.score} Pair{player.score === 1 ? <span>&nbsp;</span> : "s"}
                            </p>
                          </div>
                        )
                      })}
                    </>
                  )}
                </div>
                <div className="mt-6 space-y-4 md:mt-10 md:flex md:space-x-4 md:space-y-0">
                  <button
                    type="button" 
                    onClick={() => restart()}
                    className="py-3 w-full bg-orange-200 text-18 font-bold text-gray-100 rounded-full md:w-1/2 md:text-20"
                  >
                    Restart
                  </button>
                  <button
                    type="button" 
                    onClick={() => newGame()}
                    className="py-3 w-full bg-gray-300 text-18 font-bold text-gray-700 rounded-full md:w-1/2 md:text-20"
                  >
                    Setup New Game
                  </button>
                </div>
              </>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
      <Dialog open={isOpen} onClose={() => {}}>
        <div className="p-6 fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <Dialog.Panel className="w-full max-w-screen-sm px-6 py-8 space-y-4 relative z-10 bg-gray-200 rounded-xl">
            <button
              type="button" 
              onClick={() => {
                restart()
                setIsOpen(false)
              }}
              className="py-3 w-full bg-orange-200 text-18 font-bold text-gray-100 rounded-full"
            >
              Restart
            </button>
            <button
              type="button" 
              onClick={() => {
                newGame()
                setIsOpen(false)
              }}
              className="py-3 w-full bg-gray-300 text-18 font-bold text-gray-700 rounded-full"
            >
              Setup New Game
            </button>
            <button
              type="button" 
              onClick={() => setIsOpen(false)}
              className="py-3 w-full bg-gray-300 text-18 font-bold text-gray-700 rounded-full"
            >
              Resume Game
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

export default App