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

room_list = {
    "fast_food" : room(5, 20, "1234"),
    "slow_food" : room(3, 15, ""),
    "drink" : room(3, 15, "")
}