import { useState } from "react";
import { User, PlayerPosition, PlayerStats } from "../../types/userTypes";

// Tipos adicionais para posições na quadra
type CourtPosition = 1 | 2 | 3 | 4 | 5 | 6;

// Tipo para jogador em quadra
type PlayerOnCourt = {
  player: User;
  courtPosition: CourtPosition;
  gameStats: {
    points: number;
    errors: number;
    blocks: number;
    aces: number;
    assists: number;
  };
};

// Tipo para o estado do jogo
type GameState = {
  team1: {
    name: string;
    score: number;
    players: PlayerOnCourt[];
    bench: User[];
  };
  team2: {
    name: string;
    score: number;
    players: PlayerOnCourt[];
    bench: User[];
  };
  currentSet: number;
  sets: {
    team1Score: number;
    team2Score: number;
  }[];
};

// Jogadores mockados
const mockPlayers = (teamPrefix: string): User[] => {
  const createMockStats = (): PlayerStats => ({
    attack: { total: 0, points: 0, errors: 0, blockeds: 0, efficiency: 0 },
    block: { total: 0, points: 0, errors: 0, blockeds: 0 },
    serve: { total: 0, aces: 0, errors: 0, efficiency: 0 },
    reception: { total: 0, errors: 0, efficiency: 0 },
    defense: { total: 0, errors: 0, efficiency: 0 },
    setter: { total: 0, assists: 0, errors: 0, efficiency: 0 },
  });

  return [
    {
      id: `${teamPrefix}-1`,
      name: `${teamPrefix} Levantador`,
      email: "levantador@example.com",
      phone: "123456789",
      team: teamPrefix,
      role: "player",
      height: 185,
      weight: 80,
      inGameNumber: 1,
      position: PlayerPosition.Levantador,
      image: "",
      stats: createMockStats(),
      hasConfigured: true,
    },
    {
      id: `${teamPrefix}-2`,
      name: `${teamPrefix} Oposto`,
      email: "oposto@example.com",
      phone: "123456789",
      team: teamPrefix,
      role: "player",
      height: 195,
      weight: 90,
      inGameNumber: 2,
      position: PlayerPosition.Oposto,
      image: "",
      stats: createMockStats(),
      hasConfigured: true,
    },
    {
      id: `${teamPrefix}-3`,
      name: `${teamPrefix} Ponteiro 1`,
      email: "ponteiro1@example.com",
      phone: "123456789",
      team: teamPrefix,
      role: "player",
      height: 190,
      weight: 85,
      inGameNumber: 3,
      position: PlayerPosition.Ponteiro,
      image: "",
      stats: createMockStats(),
      hasConfigured: true,
    },
    {
      id: `${teamPrefix}-4`,
      name: `${teamPrefix} Ponteiro 2`,
      email: "ponteiro2@example.com",
      phone: "123456789",
      team: teamPrefix,
      role: "player",
      height: 188,
      weight: 83,
      inGameNumber: 4,
      position: PlayerPosition.Ponteiro,
      image: "",
      stats: createMockStats(),
      hasConfigured: true,
    },
    {
      id: `${teamPrefix}-5`,
      name: `${teamPrefix} Central 1`,
      email: "central1@example.com",
      phone: "123456789",
      team: teamPrefix,
      role: "player",
      height: 200,
      weight: 95,
      inGameNumber: 5,
      position: PlayerPosition.Central,
      image: "",
      stats: createMockStats(),
      hasConfigured: true,
    },
    {
      id: `${teamPrefix}-6`,
      name: `${teamPrefix} Central 2`,
      email: "central2@example.com",
      phone: "123456789",
      team: teamPrefix,
      role: "player",
      height: 198,
      weight: 93,
      inGameNumber: 6,
      position: PlayerPosition.Central,
      image: "",
      stats: createMockStats(),
      hasConfigured: true,
    },
    {
      id: `${teamPrefix}-7`,
      name: `${teamPrefix} Líbero`,
      email: "libero@example.com",
      phone: "123456789",
      team: teamPrefix,
      role: "player",
      height: 180,
      weight: 75,
      inGameNumber: 7,
      position: PlayerPosition.Líbero,
      image: "",
      stats: createMockStats(),
      hasConfigured: true,
    },
    {
      id: `${teamPrefix}-8`,
      name: `${teamPrefix} Reserva 1`,
      email: "reserva1@example.com",
      phone: "123456789",
      team: teamPrefix,
      role: "player",
      height: 187,
      weight: 82,
      inGameNumber: 8,
      position: PlayerPosition.Ponteiro,
      image: "",
      stats: createMockStats(),
      hasConfigured: true,
    },
    {
      id: `${teamPrefix}-9`,
      name: `${teamPrefix} Reserva 2`,
      email: "reserva2@example.com",
      phone: "123456789",
      team: teamPrefix,
      role: "player",
      height: 192,
      weight: 88,
      inGameNumber: 9,
      position: PlayerPosition.Central,
      image: "",
      stats: createMockStats(),
      hasConfigured: true,
    },
  ];
};

// Função para inicializar jogadores em quadra
const initializePlayersOnCourt = (players: User[]): PlayerOnCourt[] => {
  const starters = players.slice(0, 6);

  return starters.map((player, index) => ({
    player,
    courtPosition: (index + 1) as CourtPosition,
    gameStats: {
      points: 0,
      errors: 0,
      blocks: 0,
      aces: 0,
      assists: 0,
    },
  }));
};

export const GameControl = () => {
  // Estado do jogo
  const [gameState, setGameState] = useState<GameState>(() => {
    const team1Players = mockPlayers("Time A");
    const team2Players = mockPlayers("Time B");

    return {
      team1: {
        name: "Time A",
        score: 0,
        players: initializePlayersOnCourt(team1Players),
        bench: team1Players.slice(6),
      },
      team2: {
        name: "Time B",
        score: 0,
        players: initializePlayersOnCourt(team2Players),
        bench: team2Players.slice(6),
      },
      currentSet: 1,
      sets: [{ team1Score: 0, team2Score: 0 }],
    };
  });

  // Estado para controlar o time selecionado para ações
  const [selectedTeam, setSelectedTeam] = useState<"team1" | "team2">("team1");

  // Estado para controlar jogador selecionado para substituição
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [benchPlayerToSub, setBenchPlayerToSub] = useState<string | null>(null);

  // Função para adicionar ponto ao time
  const addPoint = (teamKey: "team1" | "team2") => {
    setGameState((prev) => {
      // Para evitar atualizações duplicadas, verificamos o estado atual
      const newState = JSON.parse(JSON.stringify(prev)); // deep clone para evitar problemas com referências
      newState[teamKey].score += 1;

      // Atualizar o set atual
      const currentSetIndex = prev.currentSet - 1;
      if (teamKey === "team1") {
        newState.sets[currentSetIndex].team1Score += 1;
      } else {
        newState.sets[currentSetIndex].team2Score += 1;
      }

      return newState;
    });
  };

  // Função para atualizar estatísticas de um jogador
  const updatePlayerStat = (
    teamKey: "team1" | "team2",
    playerId: string,
    statKey: keyof PlayerOnCourt["gameStats"]
  ) => {
    setGameState((prev) => {
      // Deep clone para evitar atualizações duplicadas por referência
      const newState = JSON.parse(JSON.stringify(prev));
      const playerIndex = newState[teamKey].players.findIndex(
        (p: PlayerOnCourt) => p.player.id === playerId
      );

      if (playerIndex !== -1) {
        newState[teamKey].players[playerIndex].gameStats[statKey] += 1;
      }

      return newState;
    });
  };

  // Função para fazer rotação dos jogadores
  const rotateTeam = (teamKey: "team1" | "team2") => {
    setGameState((prev) => {
      // Deep clone para evitar atualizações duplicadas
      const newState = JSON.parse(JSON.stringify(prev));
      const players = [...newState[teamKey].players];

      // Mover o jogador da posição 1 para a posição 6
      // e todos os outros avançam uma posição
      const firstPlayer = players.shift();
      if (firstPlayer) {
        players.push({
          ...firstPlayer,
          courtPosition: 6,
        });
      }

      // Atualizar posições
      players.forEach((player, index) => {
        player.courtPosition = (index + 1) as CourtPosition;
      });

      newState[teamKey].players = players;
      return newState;
    });
  };

  // Função para substituir jogadores
  const substitutePlayer = (
    teamKey: "team1" | "team2",
    courtPlayerId: string,
    benchPlayerId: string
  ) => {
    setGameState((prev) => {
      // Deep clone para evitar atualizações duplicadas
      const newState = JSON.parse(JSON.stringify(prev));

      // Encontrar jogador em quadra
      const courtPlayerIndex = newState[teamKey].players.findIndex(
        (p: PlayerOnCourt) => p.player.id === courtPlayerId
      );

      // Encontrar jogador no banco
      const benchPlayerIndex = newState[teamKey].bench.findIndex(
        (p: User) => p.id === benchPlayerId
      );

      if (courtPlayerIndex !== -1 && benchPlayerIndex !== -1) {
        // Obter posição do jogador em quadra
        const courtPosition =
          newState[teamKey].players[courtPlayerIndex].courtPosition;

        // Criar novo jogador em quadra
        const newCourtPlayer: PlayerOnCourt = {
          player: newState[teamKey].bench[benchPlayerIndex],
          courtPosition,
          gameStats: {
            points: 0,
            errors: 0,
            blocks: 0,
            aces: 0,
            assists: 0,
          },
        };

        // Adicionar jogador de quadra ao banco
        const removedPlayer =
          newState[teamKey].players[courtPlayerIndex].player;
        newState[teamKey].bench[benchPlayerIndex] = removedPlayer;

        // Colocar jogador do banco em quadra
        newState[teamKey].players[courtPlayerIndex] = newCourtPlayer;
      }

      return newState;
    });

    // Limpar seleções
    setSelectedPlayer(null);
    setBenchPlayerToSub(null);
  };

  // Renderizar jogador na posição da quadra
  const renderPlayerInPosition = (
    teamKey: "team1" | "team2",
    position: CourtPosition
  ) => {
    const team = gameState[teamKey];
    const playerOnPosition = team.players.find(
      (p) => p.courtPosition === position
    );

    if (!playerOnPosition) return null;

    const { player, gameStats } = playerOnPosition;

    return (
      <div
        className={`court-position position-${position} ${
          teamKey === "team1" ? "team1" : "team2"
        } ${selectedPlayer === player.id ? "selected" : ""}`}
        onClick={() => setSelectedPlayer(player.id)}
      >
        <div className="position-number">{position}</div>
        <div className="player-number">{player.inGameNumber}</div>
        <div className="player-name">{player.name.split(" ")[1]}</div>
        <div className="player-stats">
          <div>P: {gameStats.points}</div>
          <div>B: {gameStats.blocks}</div>
          <div>A: {gameStats.aces}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="game-control">
      <div className="score-board">
        <div className="team-score">
          <h2>{gameState.team1.name}</h2>
          <div className="score">{gameState.team1.score}</div>
        </div>
        <div className="sets-info">
          <div>Set {gameState.currentSet}</div>
          <div className="sets-score">
            {gameState.sets.map((set, index) => (
              <div key={index} className="set-score">
                {set.team1Score} - {set.team2Score}
              </div>
            ))}
          </div>
        </div>
        <div className="team-score">
          <h2>{gameState.team2.name}</h2>
          <div className="score">{gameState.team2.score}</div>
        </div>
      </div>

      <div className="volleyball-court">
        <div className="court-half team1-half">
          <div className="court-positions">
            {[4, 3, 2, 5, 6, 1].map((pos) =>
              renderPlayerInPosition("team1", pos as CourtPosition)
            )}
          </div>
        </div>
        <div className="net"></div>
        <div className="court-half team2-half">
          <div className="court-positions">
            {[2, 3, 4, 1, 6, 5].map((pos) =>
              renderPlayerInPosition("team2", pos as CourtPosition)
            )}
          </div>
        </div>
      </div>

      <div className="game-controls">
        <div className="team-selection">
          <button
            className={selectedTeam === "team1" ? "active" : ""}
            onClick={() => setSelectedTeam("team1")}
          >
            {gameState.team1.name}
          </button>
          <button
            className={selectedTeam === "team2" ? "active" : ""}
            onClick={() => setSelectedTeam("team2")}
          >
            {gameState.team2.name}
          </button>
        </div>

        <div className="team-actions">
          <button onClick={() => addPoint(selectedTeam)}>
            Adicionar Ponto
          </button>
          <button onClick={() => rotateTeam(selectedTeam)}>Rotacionar</button>
        </div>

        <div className="players-list">
          <h3>Jogadores em Quadra</h3>
          <div className="player-cards">
            {gameState[selectedTeam].players.map((playerOnCourt) => (
              <div
                key={playerOnCourt.player.id}
                className={`player-card ${
                  selectedPlayer === playerOnCourt.player.id ? "selected" : ""
                }`}
                onClick={() => setSelectedPlayer(playerOnCourt.player.id)}
              >
                <div className="player-info">
                  <span className="player-number">
                    {playerOnCourt.player.inGameNumber}
                  </span>
                  <span className="player-name">
                    {playerOnCourt.player.name}
                  </span>
                  <span className="player-position">
                    {playerOnCourt.player.position}
                  </span>
                </div>
                <div className="player-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updatePlayerStat(
                        selectedTeam,
                        playerOnCourt.player.id,
                        "points"
                      );
                    }}
                  >
                    Ponto
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updatePlayerStat(
                        selectedTeam,
                        playerOnCourt.player.id,
                        "errors"
                      );
                    }}
                  >
                    Erro
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updatePlayerStat(
                        selectedTeam,
                        playerOnCourt.player.id,
                        "blocks"
                      );
                    }}
                  >
                    Bloqueio
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updatePlayerStat(
                        selectedTeam,
                        playerOnCourt.player.id,
                        "aces"
                      );
                    }}
                  >
                    Ace
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updatePlayerStat(
                        selectedTeam,
                        playerOnCourt.player.id,
                        "assists"
                      );
                    }}
                  >
                    Assistência
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3>Jogadores no Banco</h3>
          <div className="bench-players">
            {gameState[selectedTeam].bench.map((player) => (
              <div
                key={player.id}
                className={`bench-player ${
                  benchPlayerToSub === player.id ? "selected" : ""
                }`}
                onClick={() => setBenchPlayerToSub(player.id)}
              >
                <span className="player-number">{player.inGameNumber}</span>
                <span className="player-name">{player.name}</span>
                <span className="player-position">{player.position}</span>
              </div>
            ))}
          </div>

          {selectedPlayer && benchPlayerToSub && (
            <button
              className="substitute-button"
              onClick={() =>
                substitutePlayer(selectedTeam, selectedPlayer, benchPlayerToSub)
              }
            >
              Substituir
            </button>
          )}
        </div>
      </div>

      <style>
        {`
         .game-control {
           display: flex;
           flex-direction: column;
           gap: 20px;
           padding: 20px;
           max-width: 1200px;
           margin: 0 auto;
         }
         
         .score-board {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 10px;
           background-color: #f0f0f0;
           border-radius: 8px;
         }
         
         .team-score {
           display: flex;
           flex-direction: column;
           align-items: center;
         }
         
         .score {
           font-size: 48px;
           font-weight: bold;
         }
         
         .sets-info {
           text-align: center;
         }
         
         .sets-score {
           display: flex;
           gap: 10px;
         }
         
         .volleyball-court {
           display: flex;
           height: 400px;
           background-color: #8ecb6d;
           position: relative;
           border: 2px solid #555;
           border-radius: 4px;
         }
         
         .court-half {
           flex: 1;
           position: relative;
           display: flex;
           justify-content: center;
           align-items: center;
         }
         
         .court-positions {
           width: 100%;
           height: 100%;
           display: grid;
           grid-template-columns: repeat(3, 1fr);
           grid-template-rows: repeat(2, 1fr);
         }
         
         .team1-half {
           background-color: rgba(0, 0, 255, 0.1);
         }
         
         .team1-half .position-1 { grid-area: 2 / 3 / 3 / 4; }
         .team1-half .position-2 { grid-area: 1 / 3 / 2 / 4; }
         .team1-half .position-3 { grid-area: 1 / 2 / 2 / 3; }
         .team1-half .position-4 { grid-area: 1 / 1 / 2 / 2; }
         .team1-half .position-5 { grid-area: 2 / 1 / 3 / 2; }
         .team1-half .position-6 { grid-area: 2 / 2 / 3 / 3; }
         
         .team2-half {
           background-color: rgba(255, 0, 0, 0.1);
         }
         
         .team2-half .position-1 { grid-area: 2 / 1 / 3 / 2; }
         .team2-half .position-2 { grid-area: 1 / 1 / 2 / 2; }
         .team2-half .position-3 { grid-area: 1 / 2 / 2 / 3; }
         .team2-half .position-4 { grid-area: 1 / 3 / 2 / 4; }
         .team2-half .position-5 { grid-area: 2 / 3 / 3 / 4; }
         .team2-half .position-6 { grid-area: 2 / 2 / 3 / 3; }
         
         .net {
           width: 4px;
           height: 100%;
           background-color: #000;
           position: relative;
         }
         
         .court-position {
           background-color: white;
           border-radius: 50%;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
           width: 80px;
           height: 80px;
           margin: auto;
           cursor: pointer;
           border: 2px solid #333;
           transition: all 0.2s;
           position: relative;
         }
         
         .court-position:hover {
           transform: scale(1.1);
         }
         
         .court-position.selected {
           border: 3px solid #ff9900;
           box-shadow: 0 0 10px rgba(255, 153, 0, 0.7);
         }
         
         .position-number {
           position: absolute;
           top: -8px;
           left: -8px;
           background-color: #333;
           color: white;
           width: 20px;
           height: 20px;
           border-radius: 50%;
           display: flex;
           justify-content: center;
           align-items: center;
           font-size: 12px;
           font-weight: bold;
         }
         
         .team1 {
           background-color: #b3c9ff;
         }
         
         .team2 {
           background-color: #ffb3b3;
         }
         
         .player-number {
           font-size: 24px;
           font-weight: bold;
         }
         
         .player-name {
           font-size: 12px;
           margin-top: -4px;
         }
         
         .player-stats {
           font-size: 10px;
           display: flex;
           gap: 5px;
         }
         
         .game-controls {
           display: flex;
           flex-direction: column;
           gap: 15px;
           padding: 15px;
           background-color: #f5f5f5;
           border-radius: 8px;
         }
         
         .team-selection {
           display: flex;
           gap: 10px;
           margin-bottom: 10px;
         }
         
         .team-selection button {
           flex: 1;
           padding: 10px;
           border: none;
           border-radius: 4px;
           cursor: pointer;
         }
         
         .team-selection button.active {
           background-color: #3f51b5;
           color: white;
         }
         
         .team-actions {
           display: flex;
           gap: 10px;
           margin-bottom: 15px;
         }
         
         .team-actions button {
           flex: 1;
           padding: 10px;
           background-color: #4caf50;
           color: white;
           border: none;
           border-radius: 4px;
           cursor: pointer;
         }
         
         .team-actions button:hover {
           background-color: #388e3c;
         }
         
         .players-list {
           display: flex;
           flex-direction: column;
           gap: 15px;
         }
         
         .player-cards {
           display: flex;
           flex-direction: column;
           gap: 10px;
           max-height: 400px;
           overflow-y: auto;
         }
         
         .player-card {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 10px;
           background-color: white;
           border-radius: 4px;
           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
           cursor: pointer;
         }
         
         .player-card.selected {
           border: 2px solid #ff9900;
         }
         
         .player-info {
           display: flex;
           gap: 10px;
           align-items: center;
         }
         
         .player-actions {
           display: flex;
           gap: 5px;
         }
         
         .player-actions button {
           padding: 5px;
           font-size: 12px;
           background-color: #f0f0f0;
           border: 1px solid #ddd;
           border-radius: 3px;
           cursor: pointer;
         }
         
         .player-actions button:hover {
           background-color: #e0e0e0;
         }
         
         .bench-players {
           display: flex;
           flex-wrap: wrap;
           gap: 10px;
         }
         
         .bench-player {
           background-color: #f0f0f0;
           padding: 10px;
           border-radius: 4px;
           display: flex;
           flex-direction: column;
           align-items: center;
           cursor: pointer;
           width: 120px;
         }
         
         .bench-player.selected {
           border: 2px solid #ff9900;
           background-color: #fff3e0;
         }
         
         .substitute-button {
           margin-top: 15px;
           padding: 10px;
           background-color: #ff5722;
           color: white;
           border: none;
           border-radius: 4px;
           cursor: pointer;
         }
         
         .substitute-button:hover {
           background-color: #e64a19;
         }
       `}
      </style>
    </div>
  );
};
