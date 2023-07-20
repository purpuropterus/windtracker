import { defineStore } from "pinia"

export const useWindStore = defineStore("wind", {
    state: () => {
        return {

            wind : {
                directions: [
                  { id: "nw", img: require("@/assets/nw.jpg")},
                  { id: "n", img: require("@/assets/n.jpg")},
                  { id: "ne", img: require("@/assets/ne.jpg")},
                  { id: "e", img: require("@/assets/e.jpg")},
                  { id: "se", img: require("@/assets/se.jpg")},
                  { id: "s", img: require("@/assets/s.jpg")},
                  { id: "sw", img: require("@/assets/sw.jpg")},
                  { id: "w", img: require("@/assets/w.jpg")},
                ],
                speeds: [
                  { m_s: 0, mph: 0 },
                  { m_s: 1, mph: 2 },
                  { m_s: 2, mph: 4 },
                  { m_s: 3, mph: 6 },
                  { m_s: 4, mph: 8 },
                  { m_s: 5, mph: 10 },
                  { m_s: 6, mph: 12 },
                  { m_s: 7, mph: 14 },
                  { m_s: 8, mph: 16 },
                  { m_s: 9, mph: 18 },
                  { m_s: 10, mph: 20 },
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
            // let target = null
            let historyIndex = null
            
            switch (type) {
                case "direction":
            
                    // if (ev.target.className == "direction-img") {
                    //     target = ev.target.parentNode
                    // } else {
                    //     target = ev.target
                    // }
            
                    historyIndex = 0
                    
                    break
            
                case "speed":
            
                    // target = ev.target
            
                    historyIndex = 1
            
                    break
            
                }
            
            // ### History ### //
            
            this.currentPair[historyIndex] = value


            //if the current pair is full
            if (this.currentPair[0]?.id && this.currentPair[1]?.m_s !== undefined) {

                //push it to history
                this.history.push(this.currentPair)

                //push direction to used directions
                this.usedDirections.push(this.currentPair[0]);
                this.usedSpeeds.push(this.currentPair[1]);


                //clear it
                this.currentPair = [ {}, {} ]

                if (this.usedDirections.length == 8) {
                    this.usedDirections = []
                }

                if (this.usedSpeeds.length == 9) {
                    this.usedSpeeds = []
                }

            }
            
        },
        reset () {
            this.usedDirections = []
            this.usedSpeeds = []
            this.currentPair = [ {}, {} ]
            this.history = []
        }
    },
})
            // let target = null
            // let maxLength = null
            // let pushTo = null
            // let historyIndex = null

            // //todo: change this to use vue refs (put a ref on the parent)
            // let className = null

            // switch (type) {
            //     case "direction":

            //         if (ev.target.className == "direction-img") {
            //             target = ev.target.parentNode
            //         } else {
            //             target = ev.target
            //         }

            //         maxLength = 7
            //         pushTo = this.usedDirections
            //         className = ".directions-item"
            //         historyIndex = 0

            //         break

            //     case "speed":

            //         target = ev.target

            //         maxLength = 8
            //         pushTo = this.usedSpeeds
            //         className = ".speeds-item"
            //         historyIndex = 1

            //         break

            // }



            // if (pushTo.length == maxLength) {

            //     //todo: change this to use vue refs (put a ref on the parent)
            //     document.querySelectorAll(className).forEach((el) => {
            //         el.style.display = "inline-block"                            
            //     })

            //     // clear the array
            //     pushTo.splice(0)
                

            // } else {

            //     // target.style.display = "none"
            //     target.classList.add("highlighted")

            //     // pushTo.push(value)

            // }



            // // ### History ### //


            // this.currentPair[historyIndex] = value

            // console.log(this.currentPair)

            // if ("id" in this.currentPair[0] && "m_s" in this.currentPair[1]) {
            //     this.history.push(this.currentPair)
            //     this.currentPair = [ {}, {} ]
            // }


            // switch (type) {
                
            //     case "direction":

            //         if (this.usedDirections.length == 7) {

            //             //todo: change this to use vue refs (put a ref on the parent)
            //             document.querySelectorAll(".directions-item").forEach((el) => {
            //                 el.style.display = "inline-block"                            
            //             })

            //             this.usedDirections = []

            //             break
            //         }

            //         if (ev.target.className == "direction-img") {
            //             target = ev.target.parentNode
            //         } else {
            //             target = ev.target
            //         }

            //         target.style.display = "none"

            //         this.usedDirections.push(value)
            //         console.log(this.usedDirections)

            //         break

            //     case "speed":
                    
            //         if (this.usedSpeeds.length == 8) {

            //             //todo: change this to use vue refs (put a ref on the parent)
            //             document.querySelectorAll(".speeds-item").forEach((el) => {
            //                 el.style.display = "inline-block"                            
            //             })

            //             this.usedSpeeds = []

            //             break
            //         }

            //             ev.target.style.display = "none"

            //             this.usedSpeeds.push(value)
            //             console.log(this.usedSpeeds)
            