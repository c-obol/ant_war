class room():
    def __init__(self, min_player, max_player, password):
        self.min_player = min_player
        self.max_player = max_player
        self.player_cnt = 0
        self.player_list = []

        self.password = password
        self.lock = len(password) != 0

    def new_player(name):
        pass

room_list = {"room1" : room(5, 20, "sdakljflsdiejerlekd"), "room2" : room(3, 15, "")}