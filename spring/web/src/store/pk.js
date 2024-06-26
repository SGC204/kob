export default({
    state: {
        status: "matching",
        socket: null,
        opponent_username: "",
        opponent_photo: "",
        loser: "none",
        a_id: 0,
        a_sx: 0,
        a_sy: 0,
        a_steps: null,
        b_id: 0,
        b_sx: 0,
        b_sy: 0,
        b_steps: null,
        gamemap: null,
        gameObject: null,
    },
    getters: {
    },
    mutations: {
            updateSocket(state, socket) {
                state.socket = socket;
            },
            updateOpponent(state, opponent) {
                state.opponent_username = opponent.username;
                state.opponent_photo = opponent.photo;
            },
            updateStatus(state, status) {
                state.status = status;
            },
            updateGame(state, game) {
                state.gamemap = game.map;
                state.a_id = game.a_id;
                state.a_sx = game.a_sx;
                state.a_sy = game.a_sy;
                state.b_id = game.b_id;
                state.b_sx = game.b_sx;
                state.b_sy = game.b_sy;
            },
            updateGameObject(state, gameObject) {
                state.gameObject = gameObject;
            },
            updateLoser(state, loser) {
                state.loser = loser;
            },
    },
    actions: {
    },
    modules: {
    }
  })