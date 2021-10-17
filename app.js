const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min

const app = Vue.createApp({
    data() {
        return {
            playerHP: 100,
            monsterHP: 100,
            currentRound: 0,
            winner: null
        }
    },
    computed: {
        monsterBarStyles() {
            return this.monsterHP < 0 ? { width: '0%' } : { width: this.monsterHP + '%' }
        },
        playerBarStyles() {
            return this.playerHP < 0 ? { width: '0%' } : { width: this.playerHP + '%' }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        playerHP(value) {
            if (value <= 0 && this.monsterHP <= 0)
                this.winner = 'draw'
            else if (value <= 0)
                this.winner = 'monster'
        },
        monsterHP(value) {
            if (value <= 0 && this.playerHP <= 0)
                this.winner = 'draw'
            else if (value <= 0)
                this.winner = 'player'
        }
    },
    methods: {
        startGame() {
            this.playerHP = 100
            this.monsterHP = 100
            this.currentRound = 0
            this.winner = null
        },
        attackMonster() {
            this.currentRound++
            const attackValue = getRandomValue(5, 12)
            this.monsterHP -= attackValue
            this.attackPlayer()
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15)
            this.playerHP -= attackValue
        },
        specialAttackMonster() {
            this.currentRound++
            const attackValue = getRandomValue(10, 25)
            this.monsterHP -= attackValue
            this.attackPlayer()
        },
        healPlayer() {
            this.currentRound++
            const healValue = getRandomValue(8, 20)

            if (this.playerHP + healValue > 100)
                this.playerHP = 100
            else
                this.playerHP += healValue

            this.attackPlayer()
        },
        surrender() {
            this.winner = 'monster'
        }
    }
})

app.mount('#game')