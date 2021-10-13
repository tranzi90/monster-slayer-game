const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min

const app = Vue.createApp({
    data() {
        return {
            playerHP: 100,
            monsterHP: 100,
            currentRound: 0
        }
    },
    computed: {
        monsterBarStyles() {
            return { width: this.monsterHP + '%' }
        },
        playerBarStyles() {
            return { width: this.playerHP + '%' }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0
        }
    },
    methods: {
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
        }
    }
})

app.mount('#game')