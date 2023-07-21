import { defineStore } from "pinia"

export const useWindStore = defineStore("wind", {
    state: () => {
        return {

            wind : {
                directions: [
                    { id: "NW", img: require("@/assets/nw.png")},
                    { id: "N", img: require("@/assets/n.png")},
                    { id: "NE", img: require("@/assets/ne.png")},
                    { id: "E", img: require("@/assets/e.png")},
                    { id: "SE", img: require("@/assets/se.png")},
                    { id: "S", img: require("@/assets/s.png")},
                    { id: "SW", img: require("@/assets/sw.png")},
                    { id: "W", img: require("@/assets/w.png")},
                ],
                speeds: [

                    { m_s: 0, mph: 0, color: "#000000" },
                    { m_s: 1, mph: 2, color: "#00a5ff" },
                    { m_s: 2, mph: 4, color: "#0894ff" },
                    { m_s: 3, mph: 6, color: "#3481ff" },
                    { m_s: 4, mph: 8, color: "#5970ff" },
                    { m_s: 5, mph: 10, color: "#6a6cff" },
                    { m_s: 6, mph: 12, color: "#7964ff" },
                    { m_s: 7, mph: 14, color: "#8f53e8" },
                    { m_s: 8, mph: 16, color: "#a648b9" },
                    { m_s: 9, mph: 18, color: "#c53c9d" },
                    { m_s: 10, mph: 20, color: "#c43584" },

                ]
            },

            usedDirections: [],
            usedSpeeds: [],

            currentPair: [ {}, {} ],
            history: [ ],

        }
    },
    actions: {
        handleClick (ev, type, value) {
            
            switch (type) {
                case "direction":
            
                    this.currentPair[0] = value
                    
                    break
            
                case "speed":
                        
                    this.currentPair[1] = value
            
                    break
            
            }

            if (this.currentPair[0]?.id && this.currentPair[1]?.m_s !== undefined) {

                this.addToHistory(this.currentPair)

            }
            
        },
        addToHistory (arr) {

            if (arr == null || arr == undefined) {
                return
            }

            //push it to history
            this.history.push(arr)

            //push direction to used directions
            this.usedDirections.push(arr[0]);
            this.usedSpeeds.push(arr[1]);


            //clear it
            this.currentPair = [ {}, {} ]

            if (this.usedDirections.length == 8) {
                this.usedDirections = []
            }

            if (this.usedSpeeds.length == 9) {
                this.usedSpeeds = []
            }
        },
        reset () {
            this.usedDirections = []
            this.usedSpeeds = []
            this.currentPair = [ {}, {} ]
            this.history = []

            // todo: clear windString in TextMode.vue
        }
    },
})
